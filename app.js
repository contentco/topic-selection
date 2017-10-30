(function(angular){

  angular
    .module('app', [])
    .controller('AppController', AppController)
    .factory('AppService', AppService)
    .filter('propsFilter', function() {
      return function(items, props) {
        var out = [];
        if (angular.isArray(items)) {
          if (props.parent && props.parent.length > 0) {
            out = items.filter(function(item) {
                  return item.parent == props.parent[props.parent.length - 1].name});
          }
          else{
            items.forEach(function(item) {
              var itemMatches = false;

              var keys = Object.keys(props);
              for (var i = 0; i < keys.length; i++) {
                var prop = keys[i];
                var text = props[prop].toLowerCase();
                if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                  itemMatches = true;
                  break;
                }
              }

              if (itemMatches) {
                out.push(item);
              }
            });
          }

        } else {
          // Let the output be the input untouched
          out = items;
        }

        return out;
      }
    });

  AppController.$inject = ['$scope', 'AppService'];
  AppService.$inject = [];



  function AppController($scope, AppService) {
    vm = this;
    vm.newMessage = '';
    vm.updateMessage = updateMessage;
    vm.saveMessage = saveMessage;
    vm.getTopics = getTopics;
    vm.resetTopic = resetTopic;

    vm.topics = AppService.topics;
    vm.filteredTopics = [];
    vm.topic = {};
    vm.nonFilterTopic = {};

    //initial
    vm.parentData = vm.topics.filter(function(item) {return item.parent == null});
    vm.modifiedData = vm.topics;

    getTopics();

    function resetTopic() {
      getTopics();
      vm.selectedTopic = null;
    }

    function getTopics(parent) {
      var name = parent && parent.name || null;
      vm.filteredTopics = vm.topics.filter(function(item) {return item.parent == name});
      vm.selectedTopic = parent;
      return vm.filteredTopics;
    }

    function updateMessage(name, msg) {
      console.log('updating message...');
      vm.newMessage = 'Hi ' + name + ', ' + msg;
    }

    function saveMessage(msg) {
      // a bit trivial but is recommended method for
      // sharing data across the application
      console.log('saving message...');
      AppService.saveMyMessage(msg);
    }
  }


  function AppService(){
    var service = {};
    service.message = 'initial message';
    service.saveMyMessage = saveMyMessage;
    service.getMyMessage = getMyMessage
    service.topics = [
      {
        id:1,
        parent: null,
        haschild: false,
        name: "Automotive",
        key: "Automotive"
      }, {
          id:2,
          parent: null,
          haschild: true,
          name: "Business & Finance",
          key: "Business & Finance"
      }, {
          id:3,
          parent: null,
          haschild: true,
          name: "Energy & Manufacturing",
          key: "Energy & Manufacturing"
      }, {
          id:4,
          parent: null,
          haschild: true,
          name: "Human Resources & Recruitment",
          key: "Human Resources & Recruitment"
      }, {
          id:5,
          parent: null,
          haschild: true,
          name: "Lifestyle",
          key: "Lifestyle"
      }, {
          id:6,
          parent: null,
          haschild: true,
          name: "Travel & Hospitality",
          key: "Travel & Hospitality"
      }, {
          id:7,
          parent: null,
          haschild: true,
          name: "Nutrition & Healthcare",
          key: "Nutrition & Healthcare"
      }, {
          id:8,
          parent: null,
          haschild: true,
          name: "Technology & Innovation",
          key: "Technology & Innovation"
      }, {
          id:9,
          parent: null,
          haschild: true,
          name: "Politics & Law",
          key: "Politics & Law"
      }, {
          id:10,
          parent: null,
          haschild: false,
          name: "Science",
          key: "Science"
      }, {
          id:11,
          parent: null,
          haschild: true,
          name: "Education",
          key: "Education"
      }, {
          id:12,
          parent: "Business & Finance",
          haschild: true,
          name: "Business",
          key: "Business & Finance > Business"
      }, {
          id:13,
          parent: "Business & Finance",
          haschild: true,
          name: "Finance",
          key: "Business & Finance > Finance"
      }, {
          id:14,
          parent: "Business & Finance",
          haschild: true,
          name: "Services",
          key: "Business & Finance > Services"
      }, {
          id:15,
          parent: "Energy & Manufacturing",
          name: "Manufacturing",
          key: "Energy & Manufacturing > Manufacturing"
      }, {
          id:16,
          parent: "Energy & Manufacturing",
          name: "Logistics and Supply Chain",
          key: "Energy & Manufacturing > Logistics and Supply Chain"
      }, {
          id:17,
          parent: "Energy & Manufacturing",
          name: "Renewable Energy",
          key: "Energy & Manufacturing > Renewable Energy"
      }, {
          id:18,
          parent: "Energy & Manufacturing",
          name: "Emerging Technologies",
          key: "Energy & Manufacturing > Emerging Technologies"
      }, {
          id:19,
          parent: "Energy & Manufacturing",
          name: "Oil & Fossil Fuels",
          key: "Energy & Manufacturing > Oil & Fossil Fuels"
      }, {
          id:20,
          parent: "Human Resources & Recruitment",
          name: "Staffing and Recruiting",
          key: "Human Resources & Recruitment > Staffing and Recruiting"
      }, {
          id:21,
          parent: "Human Resources & Recruitment",
          name: "Outsourcing / Offshoring",
          key: "Human Resources & Recruitment > Outsourcing / Offshoring"
      }, {
          id:22,
          parent: "Human Resources & Recruitment",
          name: "Human Resources",
          key: "Human Resources & Recruitment > Human Resources"
      }, {
          id:23,
          parent: "Human Resources & Recruitment",
          name: "Professional Training & Coaching",
          key: "Human Resources & Recruitment > Professional Training & Coaching"
      }, {
          id:24,
          parent: "Lifestyle",
          haschild: true,
          name: "Art",
          key: "Lifestyle > Art"
      }, {
          id:25,
          parent: "Lifestyle",
          haschild: true,
          name: "Entertainment",
          key: "Lifestyle > Entertainment"
      }, {
          id:26,
          parent: "Lifestyle",
          haschild: true,
          name: "Fashion",
          key: "Lifestyle > Fashion"
      }, {
          id:27,
          parent: "Lifestyle",
          name: "Lifestyle",
          key: "Lifestyle > Lifestyle"
      }, {
          id:28,
          parent: "Lifestyle",
          haschild: true,
          name: "Recreation",
          key: "Lifestyle > Recreation"
      }, {
          id:29,
          parent: "Travel & Hospitality",
          name: "Hospitality",
          key: "Travel & Hospitality > Hospitality"
      }, {
          id:30,
          parent: "Travel & Hospitality",
          haschild: true,
          name: "Travel & Tourism",
          key: "Travel & Hospitality > Travel & Tourism"
      },
      {
          id:31,
          parent: "Nutrition & Healthcare",
          name: "Hospital & Healthcare",
          key: "Nutrition & Healthcare > Hospital & Healthcare"
      }, {
          id:32,
          parent: "Nutrition & Healthcare",
          name: "Health, Wellness and Fitness",
          key: "Nutrition & Healthcare > Health, Wellness and Fitness"
      }, {
          id:33,
          parent: "Nutrition & Healthcare",
          name: "Mental Healthcare",
          key: "Nutrition & Healthcare > Mental Healthcare"
      }, {
          id:34,
          parent: "Nutrition & Healthcare",
          name: "Pharmaceuticals",
          key: "Nutrition & Healthcare > Pharmaceuticals"
      }, {
          id:35,
          parent: "Nutrition & Healthcare",
          name: "Veterinary",
          key: "Nutrition & Healthcare > Veterinary"
      }, {
          id:36,
          parent: "Nutrition & Healthcare",
          name: "Medical Devices",
          key: "Nutrition & Healthcare > Medical Devices"
      }, {
          id:37,
          parent: "Nutrition & Healthcare",
          name: "Senior Care",
          key: "Nutrition & Healthcare > Senior Care"
      }, {
          id:38,
          parent: "Technology & Innovation",
          name: "Consumer Technology",
          key: "Technology & Innovation > Consumer Technology"
      }, {
          id:39,
          parent: "Technology & Innovation",
          name: "Enterprise Technology",
          key: "Technology & Innovation > Enterprise Technology"
      }, {
          id:40,
          parent: "Technology & Innovation",
          name: "Innovation",
          key: "Technology & Innovation > Innovation"
      }, {
          id:41,
          parent: "Technology & Innovation",
          haschild: true,
          name: "High Tech",
          key: "Technology & Innovation > High Tech"
      }, {
          id:42,
          parent: "Politics & Law",
          name: "International Affairs",
          key: "Politics & Law > International Affairs"
      }, {
          id:43,
          parent: "Politics & Law",
          name: "Politics",
          key: "Politics & Law > Politics"
      }, {
          id:44,
          parent: "Politics & Law",
          name: "Military",
          key: "Politics & Law > Military"
      }, {
          id:45,
          parent: "Politics & Law",
          name: "Public Policy",
          key: "Politics & Law > Public Policy"
      }, {
          id:46,
          parent: "Politics & Law",
          name: "Law Enforcement",
          key: "Politics & Law > Law Enforcement"
      }, {
          id:47,
          parent: "Politics & Law",
          name: "Business Law",
          key: "Politics & Law > Business Law"
      }, {
          id:48,
          parent: "Politics & Law",
          name: "Property Law",
          key: "Politics & Law > Property Law"
      }, {
          id:49,
          parent: "Politics & Law",
          name: "Personal Law",
          key: "Politics & Law > Personal Law"
      }, {
          id:50,
          parent: "Education",
          name: "Early childhood",
          key: "Education > Early childhood"
      }, {
          id:51,
          parent: "Education",
          name: "Primary Education",
          key: "Education > Primary Education"
      }, {
          id:52,
          parent: "Education",
          name: "Secondary Education",
          key: "Education > Secondary Education"
      }, {
          id:53,
          parent: "Education",
          name: "University Education",
          key: "Education > University Education"
      }, {
          id:54,
          parent: "Education",
          name: "Continuing Education",
          key: "Education > Continuing Education"
      }, {
          id:55,
          parent: "Education",
          name: "Education Services",
          key: "Education > Education Services"
      }, {
          id:56,
          parent: "Education",
          name: "E-learning",
          key: "Education > E-learning"
      },
      {
          id:57,
          parent: "Business",
          name: "Entrepreneurship",
          key: "Business & Finance > Business > Entrepreneurship"
      }, {
          id:58,
          parent: "Business",
          name: "Marketing",
          key: "Business & Finance > Business > Marketing"
      }, {
          id:59,
          parent: "Business",
          name: "Media",
          key: "Business & Finance > Business > Media"
      }, {
          id:60,
          parent: "Business",
          name: "Advertising",
          key: "Business & Finance > Business > Advertising"
      }, {
          id:61,
          parent: "Business",
          name: "Sales",
          key: "Business & Finance > Business > Sales"
      }, {
          id:62,
          parent: "Business",
          name: "Energy and Commodities",
          key: "Business & Finance > Business > Energy and Commodities"
      }, {
          id:63,
          parent: "Business",
          name: "Business Development",
          key: "Business & Finance > Business > Business Development"
      }, {
          id:64,
          parent: "Business",
          name: "Customer Success",
          key: "Business & Finance > Business > Customer Success"
      }, {
          id:65,
          parent: "Business",
          name: "Corporate Wellness",
          key: "Business & Finance > Business > Corporate Wellness"
      }, {
          id:66,
          parent: "Business",
          name: "Human Resources",
          key: "Business & Finance > Business > Human Resources"
      }, {
          id:67,
          parent: "Business",
          name: "SaaS",
          key: "Business & Finance > Business > SaaS"
      }, {
          id:68,
          parent: "Business",
          name: "Product Design",
          key: "Business & Finance > Business > Product Design"
      }, {
          id:69,
          parent: "Business",
          name: "Productivity",
          key: "Business & Finance > Business > Productivity"
      },
      {
          id:70,
          parent: "Finance",
          name: "Corporate Finance",
          key: "Business & Finance > Finance > Corporate Finance"
      }, {
          id:71,
          parent: "Finance",
          name: "Personal Finance",
          key: "Business & Finance > Finance > Personal Finance"
      }, {
          id:72,
          parent: "Finance",
          name: "Investment Management",
          key: "Business & Finance > Finance > Investment Management"
      }, {
          id:73,
          parent: "Finance",
          name: "Real Estate / Property",
          key: "Business & Finance > Finance > Real Estate / Property"
      }, {
          id:74,
          parent: "Finance",
          name: "Banking",
          key: "Business & Finance > Finance > Banking"
      }, {
          id:75,
          parent: "Finance",
          name: "Financial Services",
          key: "Business & Finance > Finance > Financial Services"
      }, {
          id:76,
          parent: "Finance",
          name: "Capital Markets",
          key: "Business & Finance > Finance > Capital Markets"
      }, {
          id:77,
          parent: "Finance",
          name: "Commercial Real Estate",
          key: "Business & Finance > Finance > Commercial Real Estate"
      }, {
          id:78,
          parent: "Finance",
          name: "Insurance",
          key: "Business & Finance > Finance > Insurance"
      }, {
          id:79,
          parent: "Finance",
          name: "Venture Capital & Private Equity",
          key: "Business & Finance > Finance > Venture Capital & Private Equity"
      }, {
          id:80,
          parent: "Finance",
          name: "Investment Banking",
          key: "Business & Finance > Finance > Investment Banking"
      }, {
          id:81,
          parent: "Finance",
          name: "Accounting",
          key: "Business & Finance > Finance > Accounting"
      }, {
          id:82,
          parent: "Services",
          name: "Food Services",
          key: "Business & Finance > Services > Food Services"
      }, {
          id:83,
          parent: "Services",
          name: "Information Services",
          key: "Business & Finance > Services > Information Services"
      }, {
          id:84,
          parent: "Services",
          name: "Events Services",
          key: "Business & Finance > Services > Events Services"
      }, {
          id:85,
          parent: "Services",
          name: "Consumer Services",
          key: "Business & Finance > Services > Consumer Services"
      }, {
          id:86,
          parent: "Services",
          name: "Travel and Tourism Services",
          key: "Business & Finance > Services > Travel and Tourism Services"
      }, {
          id:87,
          parent: "Art",
          name: "Architecture & Design",
          key: "Lifestyle > Art > Architecture & Design"
      }, {
          id:88,
          parent: "Art",
          name: "Arts & Culture",
          key: "Lifestyle > Art > Arts & Culture"
      }, {
          id:89,
          parent: "Art",
          name: "Design",
          key: "Lifestyle > Art > Design"
      }, {
          id:90,
          parent: "Art",
          name: "Film & Entertainment",
          key: "Lifestyle > Art > Film & Entertainment"
      }, {
          id:91,
          parent: "Art",
          name: "Photography",
          key: "Lifestyle > Art > Photography"
      }, {
          id:92,
          parent: "Art",
          name: "Writing and Editing",
          key: "Lifestyle > Art > Writing and Editing"
      }, {
          id:93,
          parent: "Entertainment",
          name: "Entertainment",
          key: "Lifestyle > Entertainment > Entertainment"
      }, {
          id:94,
          parent: "Entertainment",
          name: "Gambling & Casinos",
          key: "Lifestyle > Entertainment > Gambling & Casinos"
      }, {
          id:95,
          parent: "Entertainment",
          name: "Music",
          key: "Lifestyle > Entertainment > Music"
      }, {
          id:96,
          parent: "Fashion",
          name: "Beauty",
          key: "Lifestyle > Fashion > Beauty"
      }, {
          id:97,
          parent: "Fashion",
          name: "Men’s Style",
          key: "Lifestyle > Fashion > Men’s Style"
      }, {
          id:98,
          parent: "Fashion",
          name: "Women’s Style",
          key: "Lifestyle > Fashion > Women’s Style"
      }, {
          id:99,
          parent: "Food",
          name: " Restaurants",
          key: "Lifestyle > Food > Restaurants"
      }, {
          id:100,
          parent: "Food",
          name: " Wine and Spirits",
          key: "Lifestyle > Food > Wine and Spirits"
      }, {
          id:101,
          parent: "Lifestyle",
          name: "Food & Beverage",
          key: "Lifestyle > Lifestyle > Food & Beverage"
      }, {
          id:102,
          parent: "Lifestyle",
          name: "Home & Living",
          key: "Lifestyle > Lifestyle > Home & Living"
      }, {
          id:103,
          parent: "Lifestyle",
          name: "Nutrition, Wellness & Fitness",
          key: "Lifestyle > Lifestyle > Nutrition, Wellness & Fitness"
      }, {
          id:104,
          parent: "Lifestyle",
          name: "Retirement",
          key: "Lifestyle > Lifestyle > Retirement"
      }, {
          id:105,
          parent: "Lifestyle",
          name: "Wedding",
          key: "Lifestyle > Lifestyle > Wedding"
      }, {
          id:106,
          parent: "Recreation",
          name: " Gaming",
          key: "Lifestyle > Recreation > Gaming"
      }, {
          id:107,
          parent: "Recreation",
          name: " Events",
          key: "Lifestyle > Recreation > Events"
      }, {
          id:108,
          parent: "Recreation",
          name: " Sports",
          key: "Lifestyle > Recreation > Sports"
      },
      {
          id:109,
          parent: "Recreation",
          name: " Shopping",
          key: "Lifestyle > Recreation > Shopping"
      },
      {
          id:110,
          parent: "High Tech",
          name: "Defense",
          key: "Technology & Innovation > High Tech > Defense"
      }, {
          id:111,
          parent: "High Tech",
          name: "Space",
          key: "Technology & Innovation > High Tech > Space"
      }, {
          id:112,
          parent: "High Tech",
          name: "Biotechnology",
          key: "Technology & Innovation > High Tech > Biotechnology"
      }, {
          id:113,
          parent: "High Tech",
          name: "Software",
          key: "Technology & Innovation > High Tech > Software"
      }, {
          id:114,
          parent: "High Tech",
          name: "Big Data",
          key: "Technology & Innovation > High Tech > Big Data"
      }, {
          id:115,
          parent: "High Tech",
          name: "Cybersecurity",
          key: "Technology & Innovation > High Tech > Cybersecurity"
      }, {
          id:116,
          parent: "High Tech",
          name: "Automation",
          key: "Technology & Innovation > High Tech > Automation"
      }, {
          id:117,
          parent: "High Tech",
          name: "Information Technology and Services",
          key: "Technology & Innovation > High Tech > Information Technology and Services"
      }, {
          id:118,
          parent: "High Tech",
          name: "Internet",
          key: "Technology & Innovation > High Tech > Internet"
      }, {
          id:119,
          parent: "High Tech",
          name: "Cloud Computing",
          key: "Technology & Innovation > High Tech > Cloud Computing"
      }, {
          id:120,
          parent: "High Tech",
          name: "Nanotechnology",
          key: "Technology & Innovation > High Tech > Nanotechnology"
      }, {
          id:121,
          parent: "High Tech",
          name: "Electronics & Hardware",
          key: "Technology & Innovation > High Tech > Electronics & Hardware"
      }];
    return service;

    function getMyMessage() {
      return service.message;
    }

    function saveMyMessage(msg) {
      service.message = msg;
    }
  }

}(angular));
