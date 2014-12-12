define([
  'nishe',
  'node_modules/chai/chai'], function(
    nishe,
    chai) {
  'use strict';
  var expect = chai.expect;
  describe('nishe', function() {
    describe('#refine', function() {
      var cases = [
        {g: {a: ['b'], b: ['c']}, p: [['a', 'c'], ['b']]},
        {g: {a: ['b'], b: ['c'], c: ['d']}, p: [['a', 'd'], ['b', 'c']]},
        {g: {a: ['b'], b: ['c'], c: ['d', 'e']}, p: [['a'], ['b'], ['c'], ['d', 'e']]}
      ];
      var expectation = function(cse) {
        return function() {
          var g = new nishe.Graph(cse.g);
          var p = new nishe.Partition([g.vertexes()]);
          expect(nishe.refine(g, p).unorderedCells()).to.have.deep.members(cse.p);
        };
      };
      for (var i = 0; i < cases.length; i++) {
        var cse = cases[i];
        it('should return ' + JSON.stringify(cse.p) + ' for ' + JSON.stringify(cse.g), expectation(cse));
      }
    });
    describe('Graph', function() {
      describe('constructor', function() {
        it('should reject non-simple graphs', function() {
          expect(function() {
            new nishe.Graph();
          }).to.throw(Error);
          expect(function() {
            new nishe.Graph({a: ['a']});
          }).to.throw(Error);
        });
      });
    });
    describe('#nbhd', function() {
      it('should match input', function() {
        var g = new nishe.Graph({a: 'b'});
        expect(g.nbhd('a')).to.have.members(['b']);
        expect(g.nbhd('b')).to.have.members(['a']);
      });
    });
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
      describe('#cell', function() {
        it('should match input', function() {
          expect(new nishe.Partition([['a']]).cell(0)).to.have.members(['a']);
          expect(new nishe.Partition([['a', 'b']]).cell(0)).to.have.members(['a', 'b']);
          var p = new nishe.Partition([['a'], ['b']]);
          expect(p.cell(0)).to.have.members(['a']);
          expect(p.cell(1)).to.have.members(['b']);
          p = new nishe.Partition([['a', 'b'], ['c']]);
          expect(p.cell(0)).to.have.members(['a', 'b']);
          expect(p.cell(2)).to.have.members(['c']);
          p = new nishe.Partition([['a'], ['b', 'c']]);
          expect(p.cell(0)).to.have.members(['a']);
          expect(p.cell(1)).to.have.members(['b', 'c']);
        });
      });
      describe('#cells', function() {
        var inputs = [
          [['a']],
          [['a', 'b']],
          [['a', 'b'], ['c']],
          [['a'], ['b', 'c']]
        ];
        var expectCells = function(cells) {
          return function() {
            expect(new nishe.Partition(cells).cells()).to.have.deep.members(cells);
          };
        };
        for (var i = 0; i < inputs.length; i++) {
          var cells = inputs[i];
          var cellsString = JSON.stringify(cells);
          it('should return ' + cellsString + ' for ' + cellsString, expectCells(cells));
        }
      });
      describe('#unorderedCells', function() {
        var cases = [
          {input: [['a']], output: [['a']]},
          {input: [['b'], ['a']], output: [['a'], ['b']]},
          {input: [['c'], ['b'], ['a']], output: [['a'], ['b'], ['c']]}
        ];
        var expectCells = function(cse) {
          return function() {
            var p = new nishe.Partition(cse.input);
            expect(p.unorderedCells()).to.have.deep.members(cse.output);
          };
        };
        for (var i = 0; i < cases.length; i++) {
          var cse = cases[i];
          it('should return ' + JSON.stringify(cse.output) + ' for ' + JSON.stringify(cse.input), expectCells(cse));
        }
      });

      describe('#sortAndSplit', function() {
        it('should not modify partition', function() {
          var p = new nishe.Partition([['a', 'b']]);
          var split = p.sortAndSplit({a: 0, b: 0});
          expect(split.image('a')).to.equal('a');
          expect(split.image('b')).to.equal('a');
        });
        it('should split with "a" first', function() {
          var p = new nishe.Partition([['a', 'b']]);
          var split = p.sortAndSplit({a: 0, b: 1});
          expect(split.image('a')).to.equal('a');
          expect(split.image('b')).to.equal('b');
        });
        it('should split with "b" first', function() {
          var p = new nishe.Partition([['a', 'b']]);
          var split = p.sortAndSplit({a: 1, b: 0});
          expect(split.image('a')).to.equal('b');
          expect(split.image('b')).to.equal('a');
        });
      });
    });
  });
});
