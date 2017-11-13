(function(angular){

  angular
    .module('app', ['ngLodash','duScroll'])
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

  AppController.$inject = ['$scope', 'AppService','$document'];
  AppService.$inject = [];



  function AppController($scope, AppService,$document) {
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
      "id": 1,
      "label": "Automotive",
      "specialty": true,
      "parent": null
    },
    {
      "id": 2,
      "label": "Business & Finance",
      "specialty": true,
      "parent": null
    },
    {
      "id": 3,
      "label": "Energy & Manufacturing",
      "specialty": true,
      "parent": null
    },
    {
      "id": 4,
      "label": "Human Resources & Recruitment",
      "specialty": true,
      "parent": null
    },
    {
      "id": 5,
      "label": "Lifestyle",
      "specialty": false,
      "parent": null
    },
    {
      "id": 6,
      "label": "Nutrition & Healthcare",
      "specialty": true,
      "parent": null
    },
    {
      "id": 7,
      "label": "Technology & Innovation",
      "specialty": true,
      "parent": null
    },
    {
      "id": 8,
      "label": "Travel & Hospitality",
      "specialty": false,
      "parent": null
    },
    {
      "id": 9,
      "label": "Other",
      "specialty": true,
      "parent": null
    },
    {
      "id": 28,
      "label": "Politics & Law",
      "specialty": true,
      "parent": null
    },
    {
      "id": 29,
      "label": "Science",
      "specialty": true,
      "parent": null
    },
    {
      "id": 30,
      "label": "Education",
      "specialty": true,
      "parent": null
    },
    {
      "id": 31,
      "label": "Hospitality",
      "specialty": false,
      "parent": {
        "id": 8,
        "label": "Travel & Hospitality"
      }
    },
    {
      "id": 32,
      "label": "Travel & Tourism",
      "specialty": false,
      "parent": {
        "id": 8,
        "label": "Travel & Hospitality"
      }
    },
    {
      "id": 33,
      "label": "Staffing and Recruiting",
      "specialty": true,
      "parent": {
        "id": 4,
        "label": "Human Resources & Recruitment"
      }
    },
    {
      "id": 34,
      "label": "Outsourcing / Offshoring",
      "specialty": true,
      "parent": {
        "id": 4,
        "label": "Human Resources & Recruitment"
      }
    },
    {
      "id": 35,
      "label": "Human Resources",
      "specialty": true,
      "parent": {
        "id": 4,
        "label": "Human Resources & Recruitment"
      }
    },
    {
      "id": 36,
      "label": "Professional Training & Coaching",
      "specialty": true,
      "parent": {
        "id": 4,
        "label": "Human Resources & Recruitment"
      }
    },
    {
      "id": 37,
      "label": "Food & Beverage",
      "specialty": false,
      "parent": {
        "id": 5,
        "label": "Lifestyle"
      }
    },
    {
      "id": 38,
      "label": "Home & Living",
      "specialty": false,
      "parent": {
        "id": 5,
        "label": "Lifestyle"
      }
    },
    {
      "id": 39,
      "label": "Nutrition, Wellness & Fitness",
      "specialty": false,
      "parent": {
        "id": 5,
        "label": "Lifestyle"
      }
    },
    {
      "id": 40,
      "label": "Retirement",
      "specialty": false,
      "parent": {
        "id": 5,
        "label": "Lifestyle"
      }
    },
    {
      "id": 41,
      "label": "Wedding",
      "specialty": false,
      "parent": {
        "id": 5,
        "label": "Lifestyle"
      }
    },
    {
      "id": 42,
      "label": "Art",
      "specialty": false,
      "parent": {
        "id": 5,
        "label": "Lifestyle"
      }
    },
    {
      "id": 43,
      "label": "Entertainment",
      "specialty": false,
      "parent": {
        "id": 5,
        "label": "Lifestyle"
      }
    },
    {
      "id": 44,
      "label": "Fashion",
      "specialty": false,
      "parent": {
        "id": 5,
        "label": "Lifestyle"
      }
    },
    {
      "id": 45,
      "label": "Food",
      "specialty": false,
      "parent": {
        "id": 5,
        "label": "Lifestyle"
      }
    },
    {
      "id": 46,
      "label": "Recreation",
      "specialty": false,
      "parent": {
        "id": 5,
        "label": "Lifestyle"
      }
    },
    {
      "id": 47,
      "label": "Parenting",
      "specialty": false,
      "parent": {
        "id": 5,
        "label": "Lifestyle"
      }
    },
    {
      "id": 48,
      "label": "Hospital & Healthcare",
      "specialty": true,
      "parent": {
        "id": 6,
        "label": "Nutrition & Healthcare"
      }
    },
    {
      "id": 49,
      "label": "Health, Wellness and Fitness",
      "specialty": true,
      "parent": {
        "id": 6,
        "label": "Nutrition & Healthcare"
      }
    },
    {
      "id": 50,
      "label": "Mental Healthcare",
      "specialty": true,
      "parent": {
        "id": 6,
        "label": "Nutrition & Healthcare"
      }
    },
    {
      "id": 51,
      "label": "Pharmaceuticals",
      "specialty": true,
      "parent": {
        "id": 6,
        "label": "Nutrition & Healthcare"
      }
    },
    {
      "id": 52,
      "label": "Veterinary",
      "specialty": true,
      "parent": {
        "id": 6,
        "label": "Nutrition & Healthcare"
      }
    },
    {
      "id": 53,
      "label": "Medical Devices",
      "specialty": true,
      "parent": {
        "id": 6,
        "label": "Nutrition & Healthcare"
      }
    },
    {
      "id": 54,
      "label": "Senior Care",
      "specialty": true,
      "parent": {
        "id": 6,
        "label": "Nutrition & Healthcare"
      }
    },
    {
      "id": 55,
      "label": "Business",
      "specialty": true,
      "parent": {
        "id": 2,
        "label": "Business & Finance"
      }
    },
    {
      "id": 56,
      "label": "Finance",
      "specialty": true,
      "parent": {
        "id": 2,
        "label": "Business & Finance"
      }
    },
    {
      "id": 57,
      "label": "Services",
      "specialty": true,
      "parent": {
        "id": 2,
        "label": "Business & Finance"
      }
    },
    {
      "id": 58,
      "label": "International Affairs",
      "specialty": true,
      "parent": {
        "id": 28,
        "label": "Politics & Law"
      }
    },
    {
      "id": 59,
      "label": "Politics",
      "specialty": true,
      "parent": {
        "id": 28,
        "label": "Politics & Law"
      }
    },
    {
      "id": 60,
      "label": "Military",
      "specialty": true,
      "parent": {
        "id": 28,
        "label": "Politics & Law"
      }
    },
    {
      "id": 61,
      "label": "Public Policy",
      "specialty": true,
      "parent": {
        "id": 28,
        "label": "Politics & Law"
      }
    },
    {
      "id": 62,
      "label": "Law Enforcement",
      "specialty": true,
      "parent": {
        "id": 28,
        "label": "Politics & Law"
      }
    },
    {
      "id": 63,
      "label": "Business Law",
      "specialty": true,
      "parent": {
        "id": 28,
        "label": "Politics & Law"
      }
    },
    {
      "id": 64,
      "label": "Property Law",
      "specialty": true,
      "parent": {
        "id": 28,
        "label": "Politics & Law"
      }
    },
    {
      "id": 65,
      "label": "Personal Law",
      "specialty": true,
      "parent": {
        "id": 28,
        "label": "Politics & Law"
      }
    },
    {
      "id": 66,
      "label": "Consumer Technology",
      "specialty": true,
      "parent": {
        "id": 7,
        "label": "Technology & Innovation"
      }
    },
    {
      "id": 67,
      "label": "Enterprise Technology",
      "specialty": true,
      "parent": {
        "id": 7,
        "label": "Technology & Innovation"
      }
    },
    {
      "id": 68,
      "label": "Innovation",
      "specialty": true,
      "parent": {
        "id": 7,
        "label": "Technology & Innovation"
      }
    },
    {
      "id": 69,
      "label": "High Tech",
      "specialty": true,
      "parent": {
        "id": 7,
        "label": "Technology & Innovation"
      }
    },
    {
      "id": 70,
      "label": "Early childhood",
      "specialty": true,
      "parent": {
        "id": 30,
        "label": "Education"
      }
    },
    {
      "id": 71,
      "label": "Primary Education",
      "specialty": true,
      "parent": {
        "id": 30,
        "label": "Education"
      }
    },
    {
      "id": 72,
      "label": "Secondary Education",
      "specialty": true,
      "parent": {
        "id": 30,
        "label": "Education"
      }
    },
    {
      "id": 73,
      "label": "University Education",
      "specialty": true,
      "parent": {
        "id": 30,
        "label": "Education"
      }
    },
    {
      "id": 74,
      "label": "Continuing Education",
      "specialty": true,
      "parent": {
        "id": 30,
        "label": "Education"
      }
    },
    {
      "id": 75,
      "label": "Education Services",
      "specialty": true,
      "parent": {
        "id": 30,
        "label": "Education"
      }
    },
    {
      "id": 76,
      "label": "E-learning",
      "specialty": true,
      "parent": {
        "id": 30,
        "label": "Education"
      }
    },
    {
      "id": 77,
      "label": "Manufacturing",
      "specialty": true,
      "parent": {
        "id": 3,
        "label": "Energy & Manufacturing"
      }
    },
    {
      "id": 78,
      "label": "Logistics and Supply Chain",
      "specialty": true,
      "parent": {
        "id": 3,
        "label": "Energy & Manufacturing"
      }
    },
    {
      "id": 79,
      "label": "Renewable Energy",
      "specialty": true,
      "parent": {
        "id": 3,
        "label": "Energy & Manufacturing"
      }
    },
    {
      "id": 80,
      "label": "Emerging Technologies",
      "specialty": true,
      "parent": {
        "id": 3,
        "label": "Energy & Manufacturing"
      }
    },
    {
      "id": 81,
      "label": "Oil & Fossil Fuels",
      "specialty": true,
      "parent": {
        "id": 3,
        "label": "Energy & Manufacturing"
      }
    },
    {
      "id": 82,
      "label": "Restaurants",
      "specialty": false,
      "parent": {
        "id": 45,
        "label": "Food"
      }
    },
    {
      "id": 83,
      "label": "Wine and Spirits",
      "specialty": false,
      "parent": {
        "id": 45,
        "label": "Food"
      }
    },
    {
      "id": 84,
      "label": "Gaming",
      "specialty": false,
      "parent": {
        "id": 46,
        "label": "Recreation"
      }
    },
    {
      "id": 85,
      "label": "Events",
      "specialty": false,
      "parent": {
        "id": 46,
        "label": "Recreation"
      }
    },
    {
      "id": 86,
      "label": "Sports",
      "specialty": false,
      "parent": {
        "id": 46,
        "label": "Recreation"
      }
    },
    {
      "id": 87,
      "label": "Shopping",
      "specialty": false,
      "parent": {
        "id": 46,
        "label": "Recreation"
      }
    },
    {
      "id": 88,
      "label": "Beauty",
      "specialty": false,
      "parent": {
        "id": 44,
        "label": "Fashion"
      }
    },
    {
      "id": 89,
      "label": "Men’s Style",
      "specialty": false,
      "parent": {
        "id": 44,
        "label": "Fashion"
      }
    },
    {
      "id": 90,
      "label": "Women’s Style",
      "specialty": false,
      "parent": {
        "id": 44,
        "label": "Fashion"
      }
    },
    {
      "id": 91,
      "label": "Architecture & Design",
      "specialty": false,
      "parent": {
        "id": 42,
        "label": "Art"
      }
    },
    {
      "id": 92,
      "label": "Arts & Culture",
      "specialty": false,
      "parent": {
        "id": 42,
        "label": "Art"
      }
    },
    {
      "id": 93,
      "label": "Design",
      "specialty": false,
      "parent": {
        "id": 42,
        "label": "Art"
      }
    },
    {
      "id": 94,
      "label": "Film & Entertainment",
      "specialty": false,
      "parent": {
        "id": 42,
        "label": "Art"
      }
    },
    {
      "id": 95,
      "label": "Photography",
      "specialty": false,
      "parent": {
        "id": 42,
        "label": "Art"
      }
    },
    {
      "id": 96,
      "label": "Writing and Editing",
      "specialty": false,
      "parent": {
        "id": 42,
        "label": "Art"
      }
    },
    {
      "id": 97,
      "label": "Corporate Finance",
      "specialty": true,
      "parent": {
        "id": 56,
        "label": "Finance"
      }
    },
    {
      "id": 98,
      "label": "Personal Finance",
      "specialty": true,
      "parent": {
        "id": 56,
        "label": "Finance"
      }
    },
    {
      "id": 99,
      "label": "Investment Management",
      "specialty": true,
      "parent": {
        "id": 56,
        "label": "Finance"
      }
    },
    {
      "id": 100,
      "label": "Real Estate / Property",
      "specialty": true,
      "parent": {
        "id": 56,
        "label": "Finance"
      }
    },
    {
      "id": 101,
      "label": "Banking",
      "specialty": true,
      "parent": {
        "id": 56,
        "label": "Finance"
      }
    },
    {
      "id": 102,
      "label": "Financial Services",
      "specialty": true,
      "parent": {
        "id": 56,
        "label": "Finance"
      }
    },
    {
      "id": 103,
      "label": "Capital Markets",
      "specialty": true,
      "parent": {
        "id": 56,
        "label": "Finance"
      }
    },
    {
      "id": 104,
      "label": "Commercial Real Estate",
      "specialty": true,
      "parent": {
        "id": 56,
        "label": "Finance"
      }
    },
    {
      "id": 105,
      "label": "Insurance",
      "specialty": true,
      "parent": {
        "id": 56,
        "label": "Finance"
      }
    },
    {
      "id": 106,
      "label": "Venture Capital & Private Equity",
      "specialty": true,
      "parent": {
        "id": 56,
        "label": "Finance"
      }
    },
    {
      "id": 107,
      "label": "Investment Banking",
      "specialty": true,
      "parent": {
        "id": 56,
        "label": "Finance"
      }
    },
    {
      "id": 108,
      "label": "Accounting",
      "specialty": true,
      "parent": {
        "id": 56,
        "label": "Finance"
      }
    },
    {
      "id": 109,
      "label": "Entrepreneurship",
      "specialty": true,
      "parent": {
        "id": 55,
        "label": "Business"
      }
    },
    {
      "id": 110,
      "label": "Marketing",
      "specialty": true,
      "parent": {
        "id": 55,
        "label": "Business"
      }
    },
    {
      "id": 111,
      "label": "Media",
      "specialty": true,
      "parent": {
        "id": 55,
        "label": "Business"
      }
    },
    {
      "id": 112,
      "label": "Advertising",
      "specialty": true,
      "parent": {
        "id": 55,
        "label": "Business"
      }
    },
    {
      "id": 113,
      "label": "Sales",
      "specialty": true,
      "parent": {
        "id": 55,
        "label": "Business"
      }
    },
    {
      "id": 114,
      "label": "Energy and Commodities",
      "specialty": true,
      "parent": {
        "id": 55,
        "label": "Business"
      }
    },
    {
      "id": 115,
      "label": "Business Development",
      "specialty": true,
      "parent": {
        "id": 55,
        "label": "Business"
      }
    },
    {
      "id": 116,
      "label": "Customer Success",
      "specialty": true,
      "parent": {
        "id": 55,
        "label": "Business"
      }
    },
    {
      "id": 117,
      "label": "Corporate Wellness",
      "specialty": true,
      "parent": {
        "id": 55,
        "label": "Business"
      }
    },
    {
      "id": 118,
      "label": "Human Resources",
      "specialty": true,
      "parent": {
        "id": 55,
        "label": "Business"
      }
    },
    {
      "id": 119,
      "label": "SaaS",
      "specialty": true,
      "parent": {
        "id": 55,
        "label": "Business"
      }
    },
    {
      "id": 120,
      "label": "Product Design",
      "specialty": true,
      "parent": {
        "id": 55,
        "label": "Business"
      }
    },
    {
      "id": 121,
      "label": "Productivity",
      "specialty": true,
      "parent": {
        "id": 55,
        "label": "Business"
      }
    },
    {
      "id": 122,
      "label": "Entertainment",
      "specialty": false,
      "parent": {
        "id": 43,
        "label": "Entertainment"
      }
    },
    {
      "id": 123,
      "label": "Gambling & Casinos",
      "specialty": false,
      "parent": {
        "id": 43,
        "label": "Entertainment"
      }
    },
    {
      "id": 124,
      "label": "Music",
      "specialty": false,
      "parent": {
        "id": 43,
        "label": "Entertainment"
      }
    },
    {
      "id": 125,
      "label": "Food Services",
      "specialty": true,
      "parent": {
        "id": 57,
        "label": "Services"
      }
    },
    {
      "id": 126,
      "label": "Information Services",
      "specialty": true,
      "parent": {
        "id": 57,
        "label": "Services"
      }
    },
    {
      "id": 127,
      "label": "Events Services",
      "specialty": true,
      "parent": {
        "id": 57,
        "label": "Services"
      }
    },
    {
      "id": 128,
      "label": "Consumer Services",
      "specialty": true,
      "parent": {
        "id": 57,
        "label": "Services"
      }
    },
    {
      "id": 129,
      "label": "Travel and Tourism Services",
      "specialty": true,
      "parent": {
        "id": 57,
        "label": "Services"
      }
    },
    {
      "id": 130,
      "label": "Defense",
      "specialty": true,
      "parent": {
        "id": 69,
        "label": "High Tech"
      }
    },
    {
      "id": 131,
      "label": "Space",
      "specialty": true,
      "parent": {
        "id": 69,
        "label": "High Tech"
      }
    },
    {
      "id": 132,
      "label": "Biotechnology",
      "specialty": true,
      "parent": {
        "id": 69,
        "label": "High Tech"
      }
    },
    {
      "id": 133,
      "label": "Software",
      "specialty": true,
      "parent": {
        "id": 69,
        "label": "High Tech"
      }
    },
    {
      "id": 134,
      "label": "Big Data",
      "specialty": true,
      "parent": {
        "id": 69,
        "label": "High Tech"
      }
    },
    {
      "id": 135,
      "label": "Cybersecurity",
      "specialty": true,
      "parent": {
        "id": 69,
        "label": "High Tech"
      }
    },
    {
      "id": 136,
      "label": "Automation",
      "specialty": true,
      "parent": {
        "id": 69,
        "label": "High Tech"
      }
    },
    {
      "id": 137,
      "label": "Information Technology and Services",
      "specialty": true,
      "parent": {
        "id": 69,
        "label": "High Tech"
      }
    },
    {
      "id": 138,
      "label": "Internet",
      "specialty": true,
      "parent": {
        "id": 69,
        "label": "High Tech"
      }
    },
    {
      "id": 139,
      "label": "Cloud Computing",
      "specialty": true,
      "parent": {
        "id": 69,
        "label": "High Tech"
      }
    },
    {
      "id": 140,
      "label": "Nanotechnology",
      "specialty": true,
      "parent": {
        "id": 69,
        "label": "High Tech"
      }
    },
    {
      "id": 141,
      "label": "Electronics & Hardware",
      "specialty": true,
      "parent": {
        "id": 69,
        "label": "High Tech"
      }
    }
  ]
    return service;

    function getMyMessage() {
      return service.message;
    }

    function saveMyMessage(msg) {
      service.message = msg;
    }
  }

}(angular));
