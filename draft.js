// 1. list out all the types and put them into a single array
// 2. count the number of occurences of each type and make it into an object or something.
// 3. rank them
// 4. display them in descending order
//
// 1. iterate through $scope.firstTeam, and get the array of pokemon.data.type, and combine all the arrays together.
//   1.1 Use union. (underscore.js)

//NOTE trash



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
    //
    // $scope.shouldShowTypes = false;
    // $scope.toggleShowTypes = function() {
    //   // if ($scope.shouldShowTypes) {
    //   //   $scope.shouldShowTypes = false;
    //   // }
    //   // else {
    //   //   $scope.shouldShowTypes = true;
    //   // }
    //   $scope.shouldShowTypes = !$scope.shouldShowTypes;
    // };

//
// var collateTypes = function() {
//   var array = [];
//   for (var i = 0; i < $scope.firstTeam.length; i++) {
//     var currentPokemonTypes = firstTeam[i].data.type;
//     array.concat(currentPokemonTypes);
//   }
//   return array;
// };

var listOfTypes = ["Bug",
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
//
//   countBy?
//   sort by?
//
//   [{
//     "typeName": "agwg",
//     "count": 0
//   },
//   {
//     etc
//   }]
// ng-repeat that stuff
