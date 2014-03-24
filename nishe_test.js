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
          expect(new nishe.Partition([['a']]).domain()).to.eql(['a']);
          expect(new nishe.Partition([['a', 'b']]).domain())
              .to.eql(['a', 'b']);
          expect(new nishe.Partition([['a'], ['b']]).domain())
              .to.eql(['a', 'b']);
          expect(new nishe.Partition([['b'], ['a']]).domain())
              .to.eql(['a', 'b']);
        });
      });
    });
  });
});
