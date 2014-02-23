define([], function() {
  var SvgPartitionRenderer = function(svgDocArg) {
    var svgDoc = svgDocArg;
    return {
      render: function(p) {
        var draw = svgDoc.nested();
        var domain = p.domain();
        return draw.text(domain.join(' '));
      }
    };
  };
  return {
    SvgPartitionRenderer: SvgPartitionRenderer
  };
});
