define([
  'nishe',
  'nisheviz',
  'third_party/mocha',
  'third_party/should',
  'third_party/svg'], function(nishe, nisheviz) {
  describe('nisheviz', function() {
    describe('SvgPartitionRenderer', function() {
      describe('#render', function() {
        it('larger partitions should have larger bboxes', function() {
          var renderer = new nisheviz.SvgPartitionRenderer(SVG('svg'));
          var pa = nishe.Partition.from([['a']]);
          var paSvg = renderer.render(pa);
          var pab = nishe.Partition.from([['a', 'b']]);
          var pabSvg = renderer.render(pab);
          paSvg.bbox().width.should.be.lessThan(pabSvg.bbox().width);
        });
      });
    });
  });
});
