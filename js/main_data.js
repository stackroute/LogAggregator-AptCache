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
  var bytesToString = function (bytes) {
    // One way to write it, not the prettiest way to write it.

    var fmt = d3.format('0.0f');
    if (bytes < 1024) {
        return fmt(bytes) + 'B';
    } else if (bytes < 1024 * 1024) {
        return fmt(bytes / 1024) + 'kB';
    } else  {
        return fmt(bytes / 1024 / 1024) + 'MB';
    }
}

  var xAxis = d3.svg.axis()
      .scale(x)
      .ticks(10)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .tickFormat(bytesToString)
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
        .text("Date Rate in MB (period-wise)");

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
function addPara(tab,when)
{
  $(tab + " p").remove();
  $(tab).append("<p>Data Rate for all of " + when + " </p>");
  $(tab + " p").css("margin-top","20px");
  $(tab + " p").css("font-size","17px");
}
$(function(){
  $('#y2015').click(function(){
      $('#dropdownMenu1').html('2015');
      addPara("#tab1","2015");
      createGraph("json/size/monthwise_data.json");
  });
  $('#y15').click(function(){
      $('#dropdownMenu2').html('2015');
      $('#jan').click(function(){
        $('#dropdownMenu3').html('January');
        addPara("#tab2","January");
        createGraph("json/size/Jan_data.json");
      });
      $('#feb').click(function(){
        $('#dropdownMenu3').html('February');
        addPara("#tab2","February");
        createGraph("json/size/Feb_data.json");
      });
      $('#mar').click(function(){
        $('#dropdownMenu3').html('March');
        addPara("#tab2","March");
        createGraph("json/size/Mar_data.json");
      });
      $('#apr').click(function(){
        $('#dropdownMenu3').html('April');
        addPara("#tab2","April");
        createGraph("json/size/Apr_data.json");
      });
      $('#may').click(function(){
        $('#dropdownMenu3').html('May');
        addPara("#tab2","May");
        createGraph("json/size/May_data.json");
      });
      $('#jun').click(function(){
        $('#dropdownMenu3').html('June');
        addPara("#tab2","June");
        createGraph("json/size/Jun_data.json");
      });
      $('#jul').click(function(){
        $('#dropdownMenu3').html('July');
        addPara("#tab2","July");
        createGraph("json/size/Jul_data.json");
      });
      $('#aug').click(function(){
        $('#dropdownMenu3').html('August');
        addPara("#tab2","August");
        createGraph("json/size/Aug_data.json");
      });
      $('#sep').click(function(){
        $('#dropdownMenu3').html('September');
        addPara("#tab2","September");
        createGraph("json/size/Sep_data.json");
      });
      $('#oct').click(function(){
        $('#dropdownMenu3').html('October');
        addPara("#tab2","October");
        createGraph("json/size/Oct_data.json");
      });
      $('#nov').click(function(){
        $('#dropdownMenu3').html('November');
        addPara("#tab2","November");
        createGraph("json/size/Nov_data.json");
      });
      $('#dec').click(function(){
        $('#dropdownMenu3').html('December');
        addPara("#tab2","December");
        createGraph("json/size/Dec_data.json");
      });
      $('#y2015').click(function(){
          $('#dropdownMenu1').html('2015');
          createGraph("json/size/monthwise_data.json");
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
