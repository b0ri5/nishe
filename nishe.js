'use strict';

const Partition = function() {
  function Partition(imagesArg) {
    const images = imagesArg;

    this.image = function(x) {
      return images.get(x);
    };
  };
  return {
    from: function(partition) {
      const domain = [];
      for (let i = 0; i < partition.length; i++) {
        for (let j = 0; j < partition[i].length; j++) {
          if (domain.indexOf(partition[i][j]) != -1) {
            return undefined;
          }
          domain.push(partition[i][j]);
        }
      }
      domain.sort();

      const images = new Map();
      let index = 0;
      for (let i = 0; i < partition.length; i++) {
        for (let j = 0; j < partition[i].length; j++) {
          images.set(partition[i][j], domain[index]);
        }
        index += partition[i].length;
      }
      return new Partition(images);
    }
  };
}();

if (typeof exports == 'undefined') {
  const exports = this['nishe'] = {};
}

exports.Partition = Partition;
