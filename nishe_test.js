define([
  'nishe',
  'third_party/mocha',
  'third_party/should'], function(nishe) {
  describe('nishe', function() {
    describe('Partition', function() {
      describe('constructor', function() {
        it('should reject non partitions', function() {
          (function() {
            new nishe.Partition();
          }).should.throw();
          (function() {
            new nishe.Partition([['a', 'a']]);
          }).should.throw();
          (function() {
            new nishe.Partition([['a'], ['a']]);
          }).should.throw();
          (function() {
            new nishe.Partition([[]]);
          }).should.throw();
        });
        it('should accept valid partitions', function() {
          new nishe.Partition([]).should.be.ok;
          new nishe.Partition([['a']]).should.be.ok;
          new nishe.Partition([['b']]).should.be.ok;
          new nishe.Partition([['a', 'b']]).should.be.ok;
          new nishe.Partition([['a'], ['b']]).should.be.ok;
        });
      });
      describe('#image', function() {
        it('should match input', function() {
          new nishe.Partition([['a']]).image('a').should.equal('a');

          new nishe.Partition([['a', 'b']]).image('a').should.equal('a');
          new nishe.Partition([['a', 'b']]).image('b').should.equal('a');

          new nishe.Partition([['a'], ['b']]).image('a').should.equal('a');
          new nishe.Partition([['a'], ['b']]).image('b').should.equal('b');

          new nishe.Partition([['b'], ['a']]).image('a').should.equal('b');
          new nishe.Partition([['b'], ['a']]).image('b').should.equal('a');
        });
      });
      describe('#domain', function() {
        it('should match input', function() {
          new nishe.Partition([['a']]).domain().should.eql(['a']);
          new nishe.Partition([['a', 'b']]).domain().should.eql(['a', 'b']);
          new nishe.Partition([['a'], ['b']]).domain().should.eql(['a', 'b']);
          new nishe.Partition([['b'], ['a']]).domain().should.eql(['a', 'b']);
        });
      });
    });
  });
});
