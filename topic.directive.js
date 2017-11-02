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
            controllerAs: 'tnVm',
            templateUrl: 'topic-tree.html'
         };
        return directive;

        function link(scope, element, attrs) {
        }

        function TopicTreeController(
                $scope, $document, $element) {
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

            init();

            function init(){
              vm.utmostTopics = vm.topics.filter(function(item) {return item.parent == null});
            }

            function openTree(item){
              if (vm.itemOpen && item.id == vm.itemOpen.id) {
                vm.itemOpen = {};
                vm.childOpen = {};
              }
              else{
                vm.itemOpen = item;
                vm.firstChildTopics = vm.topics.filter(function(child) {return child.parent == item.name});
              }
            }

            function openSecondTree(child){
              if (vm.childOpen && child.id == vm.childOpen.id) {
                vm.childOpen = {};
              }
              else{
                vm.childOpen = child;
                vm.secondChildTopics = vm.topics.filter(function(secondChild) {return secondChild.parent == child.name});
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

              // if (vm.selectedItems.includes(item)) {
              //   var index = vm.selectedItems.indexOf(item);
              //   vm.selectedItems.splice(index, 1);
              // }
              // else{
              //   vm.selectedItems.push(item);
              // }

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
