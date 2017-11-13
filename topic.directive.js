/**
 * Comments Directive
 * @namespace Directives
 */
(function() {
    'use strict';

    angular.module('app')
        .directive('topic', topic);

  function topic() {
        var directive = {
            restrict: 'EA',
            scope: {
              inputModel: '=',
              outputModel: '=?',
              multiSelect: '=?',
              selectOnlyLeafs: '=?',
              callback: '&',
              defaultLabel: '@'
            },
            link: link,
            controller: TopicTreeController,
            controllerAs: 'tsVm',
            templateUrl: 'topic-tree.html'
         };
        return directive;

        function link(scope, element, attrs, $document) {
        }

        function TopicTreeController(
                $scope, $document, $element, common) {
            "ngInject";
            var vm = this;
            vm.title = 'test';
            vm.topics = $scope.inputModel;
            vm.defaultLabel = $scope.defaultLabel;
            vm.showTree = false;
            vm.selectedItems = [];
            vm.selectedItem = null;
            vm.onControlClicked = onControlClicked;
            vm.docClickHide = docClickHide;
            vm.closePopup = closePopup;
            vm.openTree = openTree;
            vm.pushToSelect = pushToSelect;
            vm.deselectItem = deselectItem;
            vm.filterChange = filterChange;
            vm.child = [];
            var lodash = common.lodash;
            var topicScrollContainer = angular.element(document.getElementById('topic-item-container'));
            console.log(topicScrollContainer);
            init();


            $element.bind('keydown', function(e) {
              if (e.keyCode == 38) {  // Up Arrow
                _upArrow();
              } else if (e.keyCode == 40) {  // Down Arrow
                _downArrow();
              } else if (e.keyCode == 13) {  // Enter
                _enterKey();
              } else if (e.keyCode == 39) {  // right arrow
                _rightArrow();
              } else if (e.keyCode == 37) {  // left arrow
                _leftArrow();
              }

              $scope.$apply();
            });

            function _leftArrow(){
              if (vm.selectedOne.level == 1) {
                return;
              }
              _checkArrayLevel();
              var _parent = lodash.find(
                       vm.topics,
                       function(o) {return o.id == vm.selectedOne.parent.id;});
              vm.selectedOne = _parent;
              vm.selectedOne.childOpen = false;
              var item = angular.element(document.getElementById('item-'+vm.selectedOne.id));
              topicScrollContainer.scrollTo(item);
            }

            function _upArrow(){
              if (!vm.filterKeyword) {
                _checkArrayLevel();
              }
              if (vm.selectedIndex > 0) {
                vm.selectedIndex --;
              }
              var upperTopic = vm.dummyArray[vm.selectedIndex];
              if (typeof(upperTopic) == 'undefined') {
                upperTopic = vm.selectedOne;
              }
              vm.selectedOne = upperTopic;
              var elem = angular.element(document.querySelector(".active"));
              var item = angular.element(document.getElementById('item-'+vm.selectedOne.id));
              topicScrollContainer.scrollTo(item);
            }

            function _downArrow(){
              if (!vm.filterKeyword) {
                _checkArrayLevel();
                vm.selectedIndex = vm.selectedOne.index;
              }

              if (vm.selectedIndex < vm.dummyArray.length - 1) {
                  vm.selectedIndex ++;
              }
              vm.selectedOne = vm.dummyArray[vm.selectedIndex];
              var elem = angular.element(document.querySelector(".active"));
              var item = angular.element(document.getElementById('item-'+vm.selectedOne.id));
              topicScrollContainer.scrollTo(item);
            }

            function _rightArrow(){
              if (vm.selectedOne.hasChild) {
                vm.openTree(vm.selectedOne);
                var firstChild = vm.selectedOne.children[0];
                vm.selectedOne = firstChild;
                vm.dummyArray = vm.topics.filter(function(child) {
                  if (child.parent !== null && (child.parent.id == vm.selectedOne.parent.id)) {
                    return child;
                  }
                });
              }
            }

            function _enterKey(){
              vm.pushToSelect(vm.selectedOne);
            }

            function _checkArrayLevel(){
              if (vm.selectedOne.level == 1) {
                vm.dummyArray = vm.utmostTopics;
              }
              else if(vm.selectedOne.level == 3){
                var sameLevelTopics = vm.topics.filter(function(child) {
                  if (child.parent !== null && (child.parent.id == vm.selectedOne.parent.id)) {
                    return child;
                  }
                });
                vm.dummyArray = sameLevelTopics;
              }
              else{
                var sameLevelTopics = vm.topics.filter(function(child) {
                  if (child.parent !== null && (child.parent.id == vm.selectedOne.parent.id)) {
                    return child;
                  }
                });
                vm.dummyArray = sameLevelTopics;
              }
            }

            function init(){
              var topics = vm.topics.filter(function(item) {return item.parent == null;});
              vm.utmostTopics = common.lodash.orderBy(topics, ['label'], ['asc']);
              angular.forEach(vm.utmostTopics, function(topic, index){
                  _addFieldIfItemHasChild(topic);
                  if (topic.label === "Other") {
                    vm.utmostTopics.push(vm.utmostTopics.splice(index,1)[0]);
                  }
              });

              //put index field for up and down arrow
              angular.forEach(vm.utmostTopics, function(topic, index){
                  topic.level = 1;
                  topic.index = index;
              });
            }

            function _addFieldIfItemHasChild(topic){
              if (typeof(_checkItemHasChild(topic.id)) !== 'undefined') {
                topic.hasChild = true;
              }
              else{
                topic.hasChild = false;
              }
            }

            function _checkItemHasChild(topicId) {
               return lodash.find(
                  vm.topics,
                  function(o) {
                    if (o.parent !== null) {
                      return o.parent.id == topicId;
                    }
                  }
              );
            }

            function _getChildTopics(item){
              var childTopics = vm.topics.filter(function(child) {
                if (child.parent !== null) {
                  return child.parent.id == item.id;
                }
              });
              return childTopics;
            }

            function openTree(item){
              item.childOpen = !item.childOpen;
              var itemChild = _getChildTopics(item);
              var topicLevel = item.level + 1;
              angular.forEach(itemChild, function(topic, index){
                  _addFieldIfItemHasChild(topic);
                  topic.level = topicLevel;
                  topic.index = index;
              });

              item.children = _getChildTopics(item);
            }

            function pushToSelect(item){
              if (item.checked) {
                item.checked = false;
              } else{
                item.checked = true;
              }
              if (vm.selectedItem != item) {
                if (vm.selectedItem) {
                  vm.selectedItem.checked = false
                }
                vm.selectedItem = item;
              } else {
                vm.selectedItem = null;
              }

              if (vm.filterKeyword !== undefined) {
                vm.filterKeyword = '';
              }

              vm.showTree = !vm.showTree;
            }

            function filterChange(){
              vm.showTree = true;
              if (vm.filterKeyword !== undefined) {
                vm.filterTopics = [];
                angular.forEach(vm.topics, function (item, index) {
                  if (item.label.toLowerCase().indexOf(vm.filterKeyword.toLowerCase()) !== -1) {
                    item.index = index;
                    vm.filterTopics.push(item);
                  }
                });
              }
              vm.dummyArray = vm.filterTopics;
              vm.selectedOne = vm.dummyArray[0];
              vm.selectedIndex = 0;
            }

            function deselectItem(item){
              item.checked = false;
              vm.selectedItem = null;
              // vm.selectedItems.splice(vm.selectedItems.indexOf(item), 1);
            }

            function onControlClicked () {
              vm.showTree = !vm.showTree;
              if (vm.showTree) {
                vm.selectedIndex = 0;
                vm.selectedOne = vm.utmostTopics[vm.selectedIndex];
              }
            };

            function docClickHide() {
              closePopup();
              $scope.$apply();
            }

            function closePopup() {
              vm.showTree = false
              $document.off('click', docClickHide);
            }
        }
    }
}());
