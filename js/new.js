var createGraph = function(fileName)
{
  d3.select('#somegraph').remove();
var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.scale.ordinal().rangeRoundBands([0, width]);


var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.period); })
    .y(function(d) { return y(d.logs); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv(fileName, function(error, data) {
  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "period"; }));



  var cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {period: d.period, logs: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.period; }));

  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.logs; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.logs; }); })
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
      .text("logs (ºF)");

  var city = svg.selectAll(".city")
      .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.period) + "," + y(d.value.logs) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
});


}
function addPara(tab,when)
{
  $(tab + " p").remove();
  $(tab).append("<p>Data Rate for all of " + when + " </p>");
  $(tab + " p").css("margin-top","20px");
  $(tab + " p").css("font-size","17px");
}
function filter(value)
{
  $("#radio").show();
  $('#radio input[value="all"]').prop('checked', true);
  $('#radio input').on('change', function() {
  var data=$('input[name="filter"]:checked', '#radio').val();
    createGraph("json/size/"+data+"/"+value+"_data_"+data+".json");
  });
}
$(function(){
  $('#y2015').click(function(){
      $('#dropdownMenu1').html('2015');
      addPara("#tab1","2015");
      createGraph("json/size/all/monthwise_data_all.json");
      filter("monthwise");
    });
  $('#y15').click(function(){
      $('#dropdownMenu2').html('2015');

      $("#monthList1 li").click(function() {

        $('#dropdownMenu3').html('jan');
          var month = $(this).text();
          var id = $(this).children().attr('id');
          $('#dropdownMenu3').html(month);
          addPara("#tab2",month);
          createGraph("json/size/all/"+id+"_data_all.json");
            filter(id);
      });


      $('#y2015').click(function(){
          $('#dropdownMenu1').html('2015');
          addPara("#tab1","2015");
          createGraph("json/size/all/monthwise_data.json");
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
