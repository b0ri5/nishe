define([], function() {
  var Partition = function() {
    function Partition(imagesArg) {
      var images = imagesArg;

      this.image = function(x) {
        return images[x];
      };
    };
    return {
      from: function(partition) {
        var domain = [];
        for (var i = 0; i < partition.length; i++) {
          for (var j = 0; j < partition[i].length; j++) {
            var pij = partition[i][j];
            if (domain.indexOf(pij) != -1) {
              throw new Error(pij + ' has been seen twice, ' +
                  partition + ' is not disjoint');
            }
            domain.push(pij);
          }
        }
        domain.sort();

        var images = {};
        var index = 0;
        for (var i = 0; i < partition.length; i++) {
          for (var j = 0; j < partition[i].length; j++) {
            images[partition[i][j]] = domain[index];
          }
          index += partition[i].length;
        }
        return new Partition(images);
      }
    };
  }();

  return {
    Partition: Partition
  };
});
