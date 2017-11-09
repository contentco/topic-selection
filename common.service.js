/**
 * Common Service
 * @namespace Services
 */
(function () {
  'use strict';

    angular
        .module('app')
        .factory('common', common);


    /**
    * @namespace common
    * @desc Includes common services used across applications
    * @requires RestService
    * @memberOf Services
    */
    function common($q, $timeout, $rootScope, $interval,
                    $location, lodash) {
        "ngInject";
        var service = {
            $broadcast: $rootScope.$broadcast,
            $interval: $interval,
            $location: $location,
            $timeout: $timeout,
            $rootScope: $rootScope,
            $q: $q,
            lodash: lodash,
        };

        return service;


        /**
        * @namespace getMoreItems
        * @desc Facilitates the getting of more data for a paginated list
        * @requires LoaderService, ScrollLoader Directive
        * @memberOf Services
        */
        function getMoreItems(listVar, next, loader) {
            if (!loader) {
                loader = {
                    spin: LoaderService.spin,
                    start: LoaderService.scrollStart,
                    stop: LoaderService.scrollStop
                };
            }

            if (next && loader.spin === false) {
                var currentPage = listVar.$metadata.page;
                loader.start();
                listVar
                    .$fetch({ page: currentPage + 1 })
                    .$then(function(){
                        loader.stop();
                });
            }
        }
    }


}());
