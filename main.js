angular.module('app', ['ui.bootstrap'])
  .factory('_', function() {
    return window._;
  })
  .controller('PokemonAppController', function($scope, $http, _) {

    //link to import other stuff into model
    $http.get('lib/json/attackDex.json').success(function(data) {
      $scope.attackDex = data;
    });
    $http.get('lib/json/validated_learnset.json').success(function(data) {
      $scope.learnset = data;
    });
    $http.get('lib/json/pokedex.json').success(function(data) {
      $scope.pokedex = data;
    });
    $http.get('lib/json/typechart.json').success(function(data) {
      $scope.typeChart = data;
    });

    // $scope.namesArray = [$scope.firstTeam[0].data.name];
    // var setNamesArray = function () {
    //   var copyFirstTeam = $scope.firstTeam;
    //   for (var i = 0; i < copyFirstTeam.length; i++) {
    //     namesArray.push(copyFirstTeam[i].data.name);
    //     return namesArray;
    //   }
    // };
    // setNamesArray();

    //model
    //TODO namesArray or a function to get retieve the name/property of an object
    var namesArray = function(index) {
      return firstTeam[index];
    };
    $scope.namesArray = namesArray;

//TODO wire this up to the form to check for duplicates. Validation.
    var checkForDuplicates = function(array) {
      for (var i = 0; i < array.length; i++) {
          for (var j = 1; j < array.length; j++) {
            if (array[i] == array[j] && i!==j) {
              return true;
            }
          }
      }
      return false;
    };


    var firstTeam = [{
      "data": {
        "ndex": 652,
        "name": "Chesnaught",
        "type": ["fighting", "grass"],
        "moves": ["Rollout", "Spiky Shield", "Mud Shot", "Wood Hammer"],
      },
      "appState": "read",
      "index": 0
    }, {
      "data": {
        "ndex": 655,
        "name": "Delphox",
        "type": ["psychic", "fire"],
        "moves": ["Flamethrower", "Sunny Day", "Psychic", "Mystical Fire"],
      },
      "appState": "read",
      "index": 1
    }, {
      "data": {
        "ndex": 658,
        "name": "Greninja",
        "type": ["water", "dark"],
        "moves": ["Water Shuriken", "Substitute", "Extrasensory", "Spikes"],
      },
      "appState": "read",
      "index": 2
    }, {
      "appState": "blank",
      "index": 3
    }];

    // NOTE this is just for testing and debugging. only use one scope.firstTeam at a time
    // $scope.firstTeam = [{
    //   "appState": "blank"
    // }];


//working
    $scope.getPokemonName = function (pokemon) {
      var index = _.findIndex($scope.firstTeam, function(pkmn) {
        return pkmn.index == pokemon.index;
      });
      var name = $scope.firstTeam[index].data.name + "";
      var nameString = name.toLowerCase();
      return nameString;
    };
    $scope.getPokemonAttacks = function(pokemonName) {
      var arrays = $scope.learnset[pokemonName];
      return arrays;
    };


//TODO work in progress. not working.
    $scope.getAttackList = function (pokemon) {
      var index = _.findIndex($scope.firstTeam, function(pkmn) {
        return pkmn.index == pokemon.index;
        //  && pkmn.appState == pokemon.appState;
      });
      var name = $scope.firstTeam[index].data.name + "";
      var nameString = name.toLowerCase();
      var arrays = $scope.learnset[nameString];
      return arrays;

    };
//TODO check for reoeats
// var checkForDuplicates = function(array) {
//   for (var i = 0; i < array.length; i++) {
//       for (var j = 1; j < array.length; j++) {
//         array[i] == array[j];
//       }
//   }
// };


    //NOTE this is not in use (yet) TODO create state to show this. (optional)
    var reallyBlankSlot = {
      "appState": "reallyBlank"
    };
    var retrieveAttackFromName = function(attackid) {
      var index = _.findIndex($scope.attackDex, function(attack) {
        return attack.id = attackid;
      });
        return $scope.attackDex[index]
    };

    //TODO create a function that populates blank (and really blank) slots into the array if not full
    // var pushOneObject = function() {
    //   var blankSlot = {
    //     "appState": "blank",
    //     "index": $scope.firstTeam.length
    //   };
    //   $scope.firstTeam.push(blankSlot);
    // };
    //
    // $scope.pushOneObject = pushOneObject;


    //NOTE there are a few appStates: read, add, c
    //Private functions (to be revealed at the bottom)

    // var deletePokemon = function (pkmn) {
    //   firstTeam.splice(pkmn);
    // }
    //Controlling App State

    //TODO
    var addPokemon = function(pokemon) {
      if ($scope.firstTeam.length < 6) {
        pokemon.appState = "add";
        var blankSlot = {
          "appState": "blank",
          "index": $scope.firstTeam.length,
          "data": {
            "moves": [""]
          }
        };
        $scope.firstTeam.push(blankSlot);
      } else {
        pokemon.appState = "add";
      }
    };

    var editPokemon = function(pokemon) {
      pokemon.appState = "edit";
    }

    var saveChanges = function(pokemon) {
        pokemon.appState = "read";
      }
      //revealing function pattern
    $scope.addPokemon = addPokemon;
    $scope.editPokemon = editPokemon;
    $scope.saveChanges = saveChanges;
    // $scope.deletePokemon = deletePokemon;
    $scope.firstTeam = firstTeam;
  })

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
  }).filter('zeroPadding', function() {

    //padding method
    var zeroPadding = function(number) {
      var numString = number + "";
      while (numString.length < 3) {
        numString = "0" + numString;
      };
      return numString;
    };

    return zeroPadding;

  });
