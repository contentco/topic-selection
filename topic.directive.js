/**
 * Comments Directive
 * @namespace Directives
 */
(function() {
    'use strict';

    angular.module('app')
        .directive('topic', topic)
        .directive('listItem', listItem);

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
            controllerAs: 'tnVm',
            templateUrl: 'topic-tree.html'
         };
        return directive;

        function link(scope, element, attrs, $document) {
          //console.log(element);
          // element.bind('keydown', function(e) {
          //   if (e.keyCode == 38) {  // Up Arrow
          //       console.log('up');
          //       console.log(scope.tnVm);
          //     } else if (e.keyCode == 40) {  // Down Arrow
          //         console.log('down');
          //     } else if (e.keyCode == 13) {  // Enter
          //         console.log('enter');
          //     }
          //
          //     scope.$apply();
          // })
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
            vm.openSecondTree = openSecondTree;
            vm.pushToSelect = pushToSelect;
            vm.deselectItem = deselectItem;
            vm.filterChange = filterChange;
            vm.child = [];
            var lodash = common.lodash;

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
              var elem = angular.element(document.querySelector(".active"));
              vm.openTree(vm.selectedOne);
            }

            function _upArrow(){
              vm.dummyArray = vm.utmostTopics;
              _checkArrayLevel();
              if (vm.selectedIndex > 0) {
                vm.selectedIndex --;
              }
              vm.selectedOne = vm.dummyArray[vm.selectedIndex];
              var elem = angular.element(document.querySelector(".active"));
            }

            function _downArrow(){
              vm.dummyArray = vm.utmostTopics;
              _checkArrayLevel();
              if (vm.selectedIndex < vm.dummyArray.length - 1) {
                  vm.selectedIndex ++;
              }
              vm.selectedOne = vm.dummyArray[vm.selectedIndex];
              var elem = angular.element(document.querySelector(".active"));
              elem[0].scrollIntoView();
              elem[0].focus();
            }

            function _rightArrow(){
              var elem = angular.element(document.querySelector(".active"));
              if (vm.selectedOne.hasChild && vm.selectedOne.parent == null) {
                vm.openTree(vm.selectedOne);
                vm.selectedIndex = 0;
                vm.selectedOne = vm.firstChildTopics[vm.selectedIndex];
              }
              else{
                vm.openSecondTree(vm.selectedOne);
                vm.selectedIndex = 0;
                vm.selectedOne = vm.secondChildTopics[vm.selectedIndex];
              }
            }

            function _enterKey(){
              vm.pushToSelect(vm.selectedOne);
            }

            function _checkArrayLevel(){
              if (vm.firstChildTopics && !vm.secondChildTopics) {
                vm.dummyArray = vm.firstChildTopics;
              }
              else if(vm.secondChildTopics){
                vm.dummyArray = vm.secondChildTopics;
              }
            }

            function init(){
              //vm.utmostTopics = vm.topics.filter(function(item) {return item.parent == null});
              var topics = vm.topics.filter(function(item) {return item.parent == null;});
              vm.utmostTopics = common.lodash.orderBy(topics, ['label'], ['asc']);
              angular.forEach(vm.utmostTopics, function(topic, index){
                  _addFieldIfItemHasChild(topic);
                  if (topic.label === "Other") {
                    vm.utmostTopics.push(vm.utmostTopics.splice(index,1)[0]);
                  }
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
              if (vm.itemOpen && item.id == vm.itemOpen.id) {
                vm.itemOpen = {};
                vm.childOpen = {};
              }
              else{
                vm.itemOpen = item;
                vm.firstChildTopics = _getChildTopics(item);
                angular.forEach(vm.firstChildTopics, function(topic, index){
                    _addFieldIfItemHasChild(topic);
                });
              }
            }

            function openSecondTree(child){
              if (vm.childOpen && child.id == vm.childOpen.id) {
                vm.childOpen = {};
              }
              else{
                vm.childOpen = child;
                vm.secondChildTopics = _getChildTopics(child);
              }
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
            }

            function filterChange(){
              vm.showTree = true;
              if (vm.filterKeyword !== undefined) {
                angular.forEach(vm.topics, function (item) {
                  if (item.name.toLowerCase().indexOf(vm.filterKeyword.toLowerCase()) !== -1) {
                    item.isFiltered = false;
                  } else {
                    item.isFiltered = true;
                  }
                });
              }
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

  function listItem($document){
    var directive = {
        restrict: 'EA',
        scope: {},
        link: link,
     };
    return directive;

    function link(scope, element, attrs, $document) {
      console.log(element);
    }
  }
}());
