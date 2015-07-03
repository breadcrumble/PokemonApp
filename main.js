angular.module('app', ['ui.bootstrap'])
  .factory('_', function() {
    return window._;
  })
  .controller('PokemonAppController', function($scope, $http, _, $window) {

    //link to import other stuff into model
    $http.get('lib/json/attackDex.json').success(function(data) {
      $scope.attackDex = data;
    });
    $http.get('lib/json/validated_learnset.json').success(function(data) {
      $scope.oldLearnset = data;
    });
    $http.get('lib/json/pokedex.json').success(function(data) {
      $scope.pokedex = data;
    });
    $http.get('lib/json/typechart.json').success(function(data) {
      $scope.typeChart = data;
    });
    $http.get('lib/json/learnset.json').success(function(data) {
      $scope.learnset = data;
    });

    //NOTE model data
    // $scope.firstTeam = [{
    //   "data": {
    //     "ndex": 652,
    //     "name": "Chesnaught",
    //     "type": ["fighting", "grass"],
    //     "moves": ["Rollout", "Spiky Shield", "Mud Shot", "Wood Hammer"],
    //   },
    //   "appState": "read",
    //   "index": 0
    // }, {
    //   "data": {
    //     "ndex": 655,
    //     "name": "Delphox",
    //     "type": ["psychic", "fire"],
    //     "moves": ["Flamethrower", "Sunny Day", "Psychic", "Mystical Fire"],
    //   },
    //   "appState": "read",
    //   "index": 1
    // }, {
    //   "data": {
    //     "ndex": 658,
    //     "name": "Greninja",
    //     "type": ["water", "dark"],
    //     "moves": ["Water Shuriken", "Substitute", "Extrasensory", "Spikes"],
    //   },
    //   "appState": "read",
    //   "index": 2
    // }, {
    //   "appState": "blank",
    //   "index": 3
    // }];

    // NOTE this is just for testing and debugging. only use one scope.firstTeam at a time
    $scope.firstTeam = [{
      "appState": "blank"
    }];


    //NOTE to get array of attacks
    $scope.getAttackList = function(pokemon) {
      var index = _.findIndex($scope.firstTeam, function(pkmn) {
        return pkmn.index == pokemon.index;
      });
      var name = $scope.firstTeam[index].data.name + "";
      var array = $scope.learnset[name];
      return array;
    };

    //NOTE Controlling state change functions
    $scope.addPokemon = function(pokemon) {
      if ($scope.firstTeam.length < 6) {
        pokemon.appState = "add";
        var blankSlot = {
          "appState": "blank",
          "index": $scope.firstTeam.length
        };
        $scope.firstTeam.push(blankSlot);
      } else {
        pokemon.appState = "add";
      }
    };

    $scope.editPokemon = function(pokemon) {
      pokemon.appState = "edit";
    };

    $scope.saveChanges = function(pokemon) {
      pokemon.appState = "read";
    };

    $scope.removeFromTeam = function(pokemon) {
      var pkmnIndex = _.findIndex($scope.firstTeam, function(pkmn) {
        return pkmn.index == pokemon.index;
      });
      var takenOutPokemon = $scope.firstTeam.splice(pkmnIndex, 1);
      return arrays;
    };

  }) //END NG CONTROLLER
  .filter('titlecase', function() {
    return function(s) {
      s = (s === undefined || s === null) ? '' : s;
      return s.toString().toLowerCase().replace(/\b([a-z])/g, function(ch) {
        return ch.toUpperCase();
      });
    };
  })
  .directive("blank", function() {
    return {
      templateUrl: 'states/blank.html'
    };
  })
  .directive("add", function() {
    return {
      templateUrl: 'states/add.html'
    };
  })
  .directive("edit", function() {
    return {
      templateUrl: 'states/edit.html'
    };
  })
  .directive("read", function() {
    return {
      templateUrl: 'states/read.html'
    };
  })
  .directive("overall", function() {
    return {
      templateUrl: 'states/overall.html'
    };
  })
  .directive("strengths", function() {
    return {
      templateUrl: 'states/strengths.html'
    };
  })
  .directive("weakness", function() {
    return {
      templateUrl: 'states/weakness.html'
    };
  })
  .filter('zeroPadding', function() {

    //padding method
    var zeroPadding = function(number) {
      var numString = number + "";
      while (numString.length < 3) {
        numString = "0" + numString;
      };
      return numString;
    };
    return zeroPadding;
  })
  .directive('ngReallyClick', [function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('click', function() {
          var message = attrs.ngReallyMessage;
          if (message && confirm(message)) {
            scope.$apply(attrs.ngReallyClick);
          }
        });
      }
    }
  }]);
