angular.module('app', ['ui.bootstrap', 'ngAnimate', 'ngFx'])
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
    $http.get('lib/json/attackMatrix.json').success(function(data) {
      $scope.attackMatrix = data;
    });
    $http.get('lib/json/typeMatrix.json').success(function(data) {
      $scope.typeMatrix = data;
    });

    $scope.listOfTypes = ["Bug",
      "Dark",
      "Dragon",
      "Electric",
      "Fairy",
      "Fighting",
      "Fire",
      "Flying",
      "Ghost",
      "Grass",
      "Ground",
      "Ice",
      "Normal",
      "Poison",
      "Psychic",
      "Rock",
      "Steel",
      "Water"
    ];


    //NOTE model data
    $scope.firstTeam = [{
      "appState": "read",
      "index": 0,
      "data": {
        "ndex": 652,
        "name": "Chesnaught",
        "type": ["Grass", "Fighting"],
        "moves": {
          "0": "Spiky Shield",
          "1": "Leech Seed",
          "2": "Pin Missile",
          "3": "Belly Drum"
        }
      }
    }, {
      "appState": "read",
      "index": 1,
      "data": {
        "ndex": 655,
        "name": "Delphox",
        "type": ["Fire", "Psychic"],
        "moves": {
          "0": "Flamethrower",
          "1": "Flame Charge",
          "2": "Lucky Chant",
          "3": "Shadow Ball"
        }
      }
    }, {
      "appState": "blank",
      "index": 2
    }];

    // NOTE this is just for testing and debugging. only use one scope.firstTeam at a time
    // $scope.firstTeam = [{
    //   "appState": "blank"
    // }];

    //NOTE to get array of attacks
    $scope.getAttackList = function(pokemon) {
      var index = _.findIndex($scope.firstTeam, function(pkmn) {
        return pkmn.index == pokemon.index;
      });
      var name = $scope.firstTeam[index].data.name + "";
      var array = $scope.learnset[name];
      return array;
    };

    //NOTE To retrieve data of the moveset
    $scope.getMovesetData = function(pokemon) {
      var array = [];
      for (var i = 0; i < 4; i++) {
        var move, moveData;
        if (pokemon.data.moves[i]) {
          move = pokemon.data.moves[i];
          move = move.replace(/\s+/g, '').toLowerCase();
          moveData = $scope.attackDex[move];
          array.push(moveData);
        }
      }
      return array;
    };
    //NOTE for retrieving strength/wk of pokemon type
    $scope.getStrengthAndWeakness = function(pokemon) {
      var pokemonType, test, array, finalArray;
      finalArray, array = [];
      for (var i = 0; i < 2; i++) {
        pokemonType = pokemon.data.type[i];
        test = $scope.typeMatrix[pokemonType];

        for (var j = 0; j < test.length; j++) {
          if (array.length < 18) {
            array[j] = test[j];
          } else if (array.length >= 18) {
            array[j + 18] = test[j];
          }

        }

      }
      return array;
    };
    $scope.multiplyArray = function(array) {
      var finalArray = [];

      for (var i = 0; i < 18; i++) {
        finalArray[i] = array[i] * array[i + 18];
      }
      return finalArray;
    };

    //WIP TODO lol wtf again
    $scope.typeStrengthWeakness = function() {
      var swArray = [], swObject= {};

      // for (var i = 0; i < 18; i++) {
      //   var swObject = {
      //     "type": $scope.listOfTypes[i];
      //     "numSW": typeArray[i];
      //   };
      //   strengthWeaknessObject.push(swObject);
      // }
      return swArray;
    };



    // NOTE this is the thing for the old overall panel
    // $scope.getTypesArray = function() {
    //   var array = [];
    //   for (var i = 0; i < $scope.firstTeam.length; i++) {
    //     if ($scope.firstTeam[i].appState == "read") {
    //       array.push($scope.firstTeam[i].data.type);
    //     }
    //   }
    //   var flatArray = _.compact(_.flatten(array));
    //   return flatArray;
    // };
    //
    // $scope.countNumArray = function(arr) {
    //   var a = [],
    //     b = [],
    //     prev;
    //   arr.sort();
    //   for (var i = 0; i < arr.length; i++) {
    //     if (arr[i] !== prev) {
    //       a.push(arr[i]);
    //       b.push(1);
    //     } else {
    //       b[b.length - 1]++;
    //     }
    //     prev = arr[i];
    //   }
    //   var compiledArray = [];
    //   for (var j = 0; j< a.length; j++) {
    //     var tempObject = {
    //       "name": a[j],
    //       "numCount": b[j]}
    //       compiledArray.push(tempObject);
    //   }
    //   return compiledArray;
    //
    //   };



    //TODO looks like we may not need this after all..?


    //NOTE Controlling state change functions
    $scope.shouldShowTypes = false;
    $scope.toggleShowTypes = function() {
      // if ($scope.shouldShowTypes) {
      //   $scope.shouldShowTypes = false;
      // }
      // else {
      //   $scope.shouldShowTypes = true;
      // }
      $scope.shouldShowTypes = !$scope.shouldShowTypes;
    };

    $scope.addPokemon = function(pokemon) {
      if ($scope.firstTeam.length < 7) {
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
  .directive("moveset", function() {
    return {
      templateUrl: 'states/moveset.html'
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
