define([], function() {
  'use strict';
  function Partition(arrayOfCells) {
    var domain = [];
    var images = {};

    (function() {
      (function() {
        for (var i = 0; i < arrayOfCells.length; i++) {
          var cell = arrayOfCells[i];
          if (cell.length === 0) {
            throw new Error('All cells in ' + arrayOfCells +
                ' must be nonempty');
          }
          for (var j = 0; j < cell.length; j++) {
            var x = cell[j];
            if (domain.indexOf(x) != -1) {
              throw new Error(x + ' has been seen twice, ' +
                  arrayOfCells + ' is not disjoint');
            }
            domain.push(x);
          }
        }
      })();

      domain.sort();

      (function() {
        var index = 0;
        for (var i = 0; i < arrayOfCells.length; i++) {
          var cell = arrayOfCells[i];
          for (var j = 0; j < cell.length; j++) {
            var x = cell[j];
            images[x] = domain[index];
          }
          index += cell.length;
        }
      })();
    })();

    this.image = function(x) {
      return images[x];
    };

    this.domain = function() {
      var keys = Object.keys(images);
      keys.sort();
      return keys;
    };
  }

  return {
    Partition: Partition
  };
});
