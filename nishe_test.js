define([
  'nishe',
  'node_modules/chai/chai'], function(
    nishe,
    chai) {
  'use strict';
  var expect = chai.expect;
  describe('nishe', function() {
    describe('Partition', function() {
      describe('constructor', function() {
        it('should reject non partitions', function() {
          expect(function() {
            new nishe.Partition();
          }).to.throw(Error);
          expect(function() {
            new nishe.Partition([['a', 'a']]);
          }).to.throw(Error);
          expect(function() {
            new nishe.Partition([['a'], ['a']]);
          }).to.throw(Error);
          expect(function() {
            new nishe.Partition([[]]);
          }).to.throw(Error);
        });
      });
      describe('#image', function() {
        it('should match input', function() {
          expect(new nishe.Partition([['a']]).image('a')).to.equal('a');

          expect(new nishe.Partition([['a', 'b']]).image('a')).to.equal('a');
          expect(new nishe.Partition([['a', 'b']]).image('b')).to.equal('a');

          expect(new nishe.Partition([['a'], ['b']]).image('a')).to.equal('a');
          expect(new nishe.Partition([['a'], ['b']]).image('b')).to.equal('b');

          expect(new nishe.Partition([['b'], ['a']]).image('a')).to.equal('b');
          expect(new nishe.Partition([['b'], ['a']]).image('b')).to.equal('a');
        });
      });
      describe('#domain', function() {
        it('should match input', function() {
          expect(new nishe.Partition([['a']]).domain()).to.have.members(['a']);
          expect(new nishe.Partition([['a', 'b']]).domain()).to.have.members(['a', 'b']);
          expect(new nishe.Partition([['a'], ['b']]).domain()).to.have.members(['a', 'b']);
          expect(new nishe.Partition([['b'], ['a']]).domain()).to.have.members(['a', 'b']);
        });
      });
      describe('#indexes', function() {
        it('should match input', function() {
          expect(new nishe.Partition([['a']]).indexes()).to.have.members([0]);
          expect(new nishe.Partition([['a', 'b']]).indexes()).to.have.members([0]);
          expect(new nishe.Partition([['a'], ['b']]).indexes()).to.have.members([0, 1]);
          expect(new nishe.Partition([['a'], ['b'], ['c']]).indexes()).to.have.members([0, 1, 2]);
          expect(new nishe.Partition([['a', 'b'], ['c']]).indexes()).to.have.members([0, 2]);
          expect(new nishe.Partition([['a'], ['b', 'c']]).indexes()).to.have.members([0, 1]);
        });
      });
      describe('#indexSize', function() {
        it('should match input', function() {
          expect(new nishe.Partition([['a']]).indexSize(0)).to.equal(1);
          expect(new nishe.Partition([['a', 'b']]).indexSize(0)).to.equal(2);
          var p = new nishe.Partition([['a'], ['b']]);
          expect(p.indexSize(0)).to.equal(1);
          expect(p.indexSize(1)).to.equal(1);
          p = new nishe.Partition([['a', 'b'], ['c']]);
          expect(p.indexSize(0)).to.equal(2);
          expect(p.indexSize(2)).to.equal(1);
          p = new nishe.Partition([['a'], ['b', 'c']]);
          expect(p.indexSize(0)).to.equal(1);
          expect(p.indexSize(1)).to.equal(2);
        });
        it('should throw if not an index', function() {
          expect(function() {
            new nishe.Partition([['a']]).indexSize(-1);
          }).to.throw(Error);
        });
      });
    });
  });
});
