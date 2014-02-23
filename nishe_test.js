define([
  'nishe',
  'third_party/mocha',
  'third_party/should'], function(nishe) {
  describe('nishe', function() {
    describe('Partition', function() {
      describe('#from', function() {
        it('should reject non partitions', function() {
          (function() {
            nishe.Partition.from();
          }).should.throw();
          (function() {
            nishe.Partition.from([['a', 'a']]);
          }).should.throw();
          (function() {
            nishe.Partition.from([['a'], ['a']]);
          }).should.throw();
        });
        it('should accept valid partitions', function() {
          nishe.Partition.from([]).should.be.ok;
          nishe.Partition.from([['a']]).should.be.ok;
          nishe.Partition.from([['b']]).should.be.ok;
          nishe.Partition.from([['a', 'b']]).should.be.ok;
          nishe.Partition.from([['a'], ['b']]).should.be.ok;
        });
      });
      describe('#image', function() {
        it('should match input', function() {
          nishe.Partition.from([['a']]).image('a').should.equal('a');

          nishe.Partition.from([['a', 'b']]).image('a').should.equal('a');
          nishe.Partition.from([['a', 'b']]).image('b').should.equal('a');

          nishe.Partition.from([['a'], ['b']]).image('a').should.equal('a');
          nishe.Partition.from([['a'], ['b']]).image('b').should.equal('b');

          nishe.Partition.from([['b'], ['a']]).image('a').should.equal('b');
          nishe.Partition.from([['b'], ['a']]).image('b').should.equal('a');
        });
      });
      describe('#domain', function() {
        it('should match input', function() {
          nishe.Partition.from([['a']]).domain().should.eql(['a']);
          nishe.Partition.from([['a', 'b']]).domain().should.eql(['a', 'b']);
          nishe.Partition.from([['a'], ['b']]).domain().should.eql(['a', 'b']);
          nishe.Partition.from([['b'], ['a']]).domain().should.eql(['a', 'b']);
        });
      });
    });
  });
});
