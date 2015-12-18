var createGraph = function(fileName)
{
  d3.select('#somegraph').remove();
  var margin = {top: 20, right: 80, bottom: 30, left: 70},
      width = 660 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;


  var x = d3.scale.ordinal().rangeRoundBands([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .ticks(10)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) { return x(d.period); })
      .y(function(d) { return y(d.logs); });

  var svg = d3.select("body").append("svg")
      .attr('id','somegraph')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json(fileName, function(error, data) {
    if (error) throw error;

    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "period"; }));


    var continents = color.domain().map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {period: d.period, logs: +d[name]};
        })
      };
    });

    x.domain(data.map(function(d) { return d.period; }));

    y.domain([
      d3.min(continents, function(c) { return d3.min(c.values, function(v) { return v.logs; }); }),
      d3.max(continents, function(c) { return d3.max(c.values, function(v) { return v.logs; }); })
    ]);

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
        .text("Number of logs (period-wise)");

    var city = svg.selectAll(".city")
        .data(continents)
      .enter().append("g")
        .attr("class", "city");

    city.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return color(d.name); });


        var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color)
        .attr("transform", "translate(50,-10)");

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; })
        .attr("transform", "translate(50,-10)");;

  });

}
$(function(){
  $('#y2015').click(function(){
      $('#dropdownMenu1').html('2015');
      createGraph("json/monthwise_log.json");
  });
  $('#y15').click(function(){
      $('#dropdownMenu2').html('2015');
      $('#jan').click(function(){
        $('#dropdownMenu3').html('January');
        createGraph("json/Jan_log.json");
      });
      $('#feb').click(function(){
        $('#dropdownMenu3').html('February');
        createGraph("json/Feb_log.json");
      });
      $('#mar').click(function(){
        $('#dropdownMenu3').html('March');
        createGraph("json/Mar_log.json");
      });
      $('#apr').click(function(){
        $('#dropdownMenu3').html('April');
        createGraph("json/Apr_log.json");
      });
      $('#may').click(function(){
        $('#dropdownMenu3').html('May');
        createGraph("json/May_log.json");
      });
      $('#jun').click(function(){
        $('#dropdownMenu3').html('June');
        createGraph("json/Jun_log.json");
      });
      $('#jul').click(function(){
        $('#dropdownMenu3').html('July');
        createGraph("json/Jul_log.json");
      });
      $('#aug').click(function(){
        $('#dropdownMenu3').html('August');
        createGraph("json/Aug_log.json");
      });
      $('#sep').click(function(){
        $('#dropdownMenu3').html('September');
        createGraph("json/Sep_log.json");
      });
      $('#oct').click(function(){
        $('#dropdownMenu3').html('October');
        createGraph("json/Oct_log.json");
      });
      $('#nov').click(function(){
        $('#dropdownMenu3').html('November');
        createGraph("json/Nov_log.json");
      });
      $('#dec').click(function(){
        $('#dropdownMenu3').html('December');
        createGraph("json/Dec_log.json");
      });
  });
  $('#year_tab').click(function(){
      $('#dropdownMenu2').html('Year');
      $('#dropdownMenu3').html('Month');
  });
  $('#month_tab').click(function(){
      $('#dropdownMenu1').html('Year');
  });
});
