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
