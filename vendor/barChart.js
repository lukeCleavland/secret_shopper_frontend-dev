function BarChart() {
  var width = 960, height = 500;
  var margin = {top: 20, right: 30, bottom: 75, left: 40};
  var svg;
  var colorScale = d3.scale.ordinal().range(['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641']);
  var x = d3.scale.ordinal();
  var y = d3.scale.linear();
  var tooltipText = '<h5>Tooltip text</h5>';
  updateSizeAndScales();

  var xAxis = d3.svg.axis()
    .orient('bottom');
  var yAxis = d3.svg.axis()
    .orient('left')
    .ticks(8);
  var legendData = [];
  var duration = 750, delay = 30;
  var selectedIds = [],
    clickCallback = null,
    noDataTemplate = null,
    data = [],
    fillAccessor = function(d){
      return colorScale(d.label);
    },
    strokeAccessor = function(d){
      return '#999';
    };
  var yAxisLabel = null;

  function chart(selection) {
    selection.each(function(data) {
      svg = d3.select(this).selectAll('svg');
      if (svg.empty()) {
        svg = svg.data([data]);
        svg.enter().append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('class', 'g-container')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        var g = svg.select('.g-container');
        // add a background rect for deselcetions
        g.append('rect')
          .attr('class', 'background')
          .attr('width', width)
          .attr('height', height)
          .on('click', function(rect){ });
        // Add the axes
        g.append('g')
          .attr('class', 'x axis');
        g.append('g')
          .attr('class', 'y axis');
        if (yAxisLabel) {
          g.append('text')
            .attr('class', 'y-label')
            .style('fill', '#777')
            .attr('text-anchor', 'end')
            .attr('dy', '-3em')
            .attr('transform', 'rotate(-90)')
            .text(yAxisLabel);
        }
        if (data.length === 6) {
          colorScale.range(['#d3d3d3', '#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641']);
        }
      }
      x.domain(data.map(function(d) { return d.label; }));
      y.domain([0, d3.max(data, function(d) { return d.value; })]).nice();

      xAxis.scale(x);
      svg.select('.x.axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .selectAll('.tick text')
        .call(wrap, x.rangeBand())
        .style('opacity', 1);

      yAxis.scale(y);

      var group = svg.select('.g-container').selectAll('.group')
        .data([data]);
      var groupEnter = group.enter();
      groupEnter.append('g')
        .attr('class', 'group');
      var bar = group.selectAll('.bar')
        .data(data, function(d) { return d.id; });
      var enter = bar.enter();
      enter.append('rect')
        .attr('class', 'bar')
        .on('click', function(d){
          clickCallback(d);
          var index = selectedIds.indexOf(d.id);
          if (index === -1) {
            selectedIds.push(d.id);
            d3.select(this).attr('class', 'bar selected-bar');
          } else {
            selectedIds.splice(index, 1);
            d3.select(this).attr('class', 'bar');
          }
        })
        .on('mouseover', function(d){
          $(this).tooltip({
            title: '<h5>' + d.value + tooltipText + '</h5>',
            html: true,
            container: svg.node().parentNode,
            placement: 'top'
          }).tooltip('show');
        })
        .on('mouseout', function(d){
          $(this).tooltip('destroy');
        });
      enter.append('text')
        .attr('class', 'bar-text');
      var exit = bar.exit();
      exit.remove();

      var transition = svg.transition()
        .duration(duration)
        .delay(function(d, i) { return i * delay; });

      transition.selectAll('.bar')
        .style('fill', fillAccessor)
        .style('font-family', 'FontAwesome')
        .attr('data-name', function(d) { return d.name; })
        .attr('x', function(d) { return x(d.label); })
        .attr('width', x.rangeBand())
        .attr('y', function(d) { return y(d.value); })
        .attr('height', function(d) { return height - y(d.value); })
        .attr('class', function(d){
          var selected = selectedIds.indexOf(d.id) !== -1;
          var cssClass;
          if ('sentiment' in d) {
            // Check it's sentiment, if it's < 0 then add the class 'negative-bar'
            cssClass = 'bar ';
            if (selected) {
              cssClass += 'selected-bar ';
            }
            if (d['sentiment'] < 0) {
              cssClass += 'negative-bar';
            }
          } else if ('grade' in d) {
            cssClass = 'bar ';
            if (selected) {
              cssClass += 'selected-bar ';
            }
            if (d['grade'] <= 3.5) {
              cssClass += 'negative-bar';
            }
          } else {
            cssClass = selected ? 'bar selected-bar' : 'bar';
          }
          return cssClass;
        });

      transition.select('.y.axis')
        .call(yAxis);
    });
  }

  function updateSizeAndScales(){
    if (width > 960) {
      width = 960;
    }
    height = (width * 500) / 960;
    width -= (margin.left + margin.right);
    height -= (margin.top + margin.bottom);
    x.rangeRoundBands([0, width], .1, .5);
    y.range([height, 0]);
  }

  /**
   * Helper for wrapping long labels in limited chart space
   * @param id {Array.<object>} An array of SVG elements (text) with __data__ == id of the element
   * @param width {number} the width of the element
   */
  function wrap(id, width) {
    id.each(function() {
      var text = d3.select(this);
      text.style('font-family', 'FontAwesome').style('font-size', '12px');
      var words = text.text().split(/(\s+|\/)/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr('y'),
          dy = parseFloat(text.attr('dy')),
          tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
        }
      }
    });
  }

  chart.resize = function(w) {
    width = w < 960 ? w : 960;
    height = Math.floor((width * 500) / (960));
    // update the dimensions of the svg
    svg.attr('width', width).attr('height', height);
    return chart;
  };

  chart.strokeAccessor = function(_) {
    if (!arguments.length) return strokeAccessor;
    strokeAccessor = _;
    return chart;
  };

  chart.yAxisTicks = function(_) {
    if (!arguments.length) return yAxis.ticks();
    yAxis.ticks(_);
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.colorScale = function(_) {
    if (!arguments.length) return colorScale;
    colorScale = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    updateSizeAndScales();
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    updateSizeAndScales();
    return chart;
  };

  chart.clickCallback = function(_) {
    if (!arguments.length) return clickCallback;
    clickCallback = _;
    return chart;
  };

  chart.noDataTemplate = function(_) {
    if (!arguments.length) return noDataTemplate;
    noDataTemplate = _;
    return chart;
  };

  chart.fillAccessor = function(_) {
    if (!arguments.length) return fillAccessor;
    fillAccessor = _;
    return chart;
  };

  chart.selectedIds = function(_) {
    if (!arguments.length) return selectedIds;
    selectedIds = _;
    return chart;
  };

  chart.legendData = function(_) {
    if (!arguments.length) return legendData;
    legendData = _;
    return chart;
  };

  chart.yAxisLabel = function(_) {
    if (!arguments.length) return yAxisLabel;
    yAxisLabel = _;
    return chart;
  };

  chart.tooltipText = function(_) {
    if (!arguments.length) return tooltipText;
    tooltipText = _;
    return chart;
  };

  return chart;
}
