define([
  'nishe',
  'nisheviz',
  'third_party/mocha',
  'third_party/should',
  'third_party/svg'], function(nishe, nisheviz) {
  describe('nisheviz', function() {
    describe('SvgPartitionRenderer', function() {
      describe('#render', function() {
        it('gives wider partitions wider bboxes', function() {
          var renderer = new nisheviz.SvgPartitionRenderer(SVG('svg'));
          var a = nishe.Partition.from([['a']]);
          var aSvg = renderer.render(a);
          var ab = nishe.Partition.from([['a', 'b']]);
          var abSvg = renderer.render(ab);
          aSvg.bbox().width.should.be.lessThan(abSvg.bbox().width);
        });
        it('gives shorter partitions shorter bboxes', function() {
          var renderer = new nisheviz.SvgPartitionRenderer(SVG('svg'));
          var a = nishe.Partition.from([['a']]);
          var aSvg = renderer.render(a);
          var b = nishe.Partition.from([['b']]);
          var bSvg = renderer.render(b);
          bSvg.bbox().height.should.not.be.lessThan(aSvg.bbox().height);
        });
        it('gives finer partitions wider bboxes', function() {
          var renderer = new nisheviz.SvgPartitionRenderer(SVG('svg'));
          var ab = nishe.Partition.from([['a', 'b']]);
          var abSvg = renderer.render(ab);
          var abFiner = nishe.Partition.from([['a'], ['b']]);
          var abFinerSvg = renderer.render(abFiner);
          abSvg.bbox().width.should.not.be.lessThan(abFinerSvg.bbox().width);
        });
        it('gives identical partitions identical bboxes', function() {
          var renderer = new nisheviz.SvgPartitionRenderer(SVG('svg'));
          var a = nishe.Partition.from([['a']]);
          var aSvg = renderer.render(a);
          var a2 = nishe.Partition.from([['a']]);
          var a2Svg = renderer.render(a2);
          aSvg.bbox().width.should.equal(a2Svg.bbox().width);
          aSvg.bbox().height.should.equal(a2Svg.bbox().height);
        });
      });
    });
  });
});
