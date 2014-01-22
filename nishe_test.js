'use strict';

const assert = require('assert');
const nishe = require('./nishe');

describe('nishe', function() {
  describe('Partition', function() {
    describe('#image', function() {
      it('should match input', function() {
        assert.equal('a', nishe.Partition.from([['a']]).image('a'));

        assert.equal('a', nishe.Partition.from([['a', 'b']]).image('a'));
        assert.equal('a', nishe.Partition.from([['a', 'b']]).image('b'));

        assert.equal('a', nishe.Partition.from([['a'], ['b']]).image('a'));
        assert.equal('b', nishe.Partition.from([['a'], ['b']]).image('b'));

        assert.equal('b', nishe.Partition.from([['b'], ['a']]).image('a'));
        assert.equal('a', nishe.Partition.from([['b'], ['a']]).image('b'));
      });
    });
  });
});
