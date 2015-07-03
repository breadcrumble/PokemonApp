// 1. list out all the types and put them into a single array
// 2. count the number of occurences of each type and make it into an object or something.
// 3. rank them
// 4. display them in descending order
//
// 1. iterate through $scope.firstTeam, and get the array of pokemon.data.type, and combine all the arrays together.
//   1.1 Use union. (underscore.js)



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
