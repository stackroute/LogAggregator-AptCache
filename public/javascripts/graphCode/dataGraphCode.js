var createDataGraph = function(data)
{
  d3.select('#somegraph').remove();
  var margin = {top: 20, right: 100, bottom: 30, left: 100},
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  var x0 = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var x1 = d3.scale.ordinal();

  var y = d3.scale.linear()
      .range([height, 0]);

  var bytesToString = function (bytes) {
    // One way to write it, not the prettiest way to write it.

    var fmt = d3.format('0.0f');
    if (bytes < 1024) {
        return fmt(bytes) + ' B';
    } else if (bytes < 1024 * 1024) {
        return fmt(bytes / 1024) + ' kB';
    } else  {
        return fmt(bytes / 1024 / 1024) + ' MB';
    }
  }


  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x0)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .tickFormat(bytesToString)
      .orient("left");

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>Size:</strong> <span>" + bytesToString(d.value) + "</span>";
        })

  var svg = d3.select("div #main").append("svg")
      .attr('id','somegraph')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.call(tip);

    var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "period"; });
    data.forEach(function(d) {
      d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
    });
    x0.domain(data.map(function(d) { return d.period; }));
    x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Data Rate in MB");

    var period = svg.selectAll(".period")
        .data(data)
      .enter().append("g")
        .attr("class", "period")
        .attr("transform", function(d) { return "translate(" + x0(d.period) + ",0)"; });

    period.selectAll("rect")
        .data(function(d) { return d.ages; })
      .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.name); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .style("fill", function(d) { return color(d.name); });

      period.selectAll('rect')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
    var legend = svg.selectAll(".legend")
        .data(ageNames.slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color)
        .attr("transform", "translate(100,-20)");

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; })
        .attr("transform", "translate(100,-20)");



}
