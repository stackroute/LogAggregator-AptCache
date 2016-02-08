/*Copyright 2016 Wipro Limited, NIIT Limited

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

This code is written by Prateek Reddy Yammanuru, Shiva Manognya Kandikuppa, Uday Kumar Mydam, Nirup TNL, Sandeep Reddy G, Deepak Kumar*/

angular.module('logAggregator').directive('trafficRateDirective', function() {
  return {
    restrict : 'E',
    replace : false,
    scope: {
      data: '=',
      year: '=',
      month: '='
    },
    link: function(scope, elem, attrs) {
      scope.$watch('data', function(newVal, oldValue) {

        var margin = {top: 20, right: 20, bottom: 30, left: 70},
        width = 800 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

        var parseDate = d3.time.format("%d-%b-%y").parse;
        var monthSelection;

        var x = d3.time.scale()
        .range([0, width]);

        var y = d3.scale.linear()
        .range([height, 0]);

        var color = d3.scale.category10();

        var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");


        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        function numberOfDays(year,month){
          var d = new Date(year,month,0);
          return d.getDate();
        }

        year_selected = scope.year;
        month_selected = scope.month;
        json = scope.data;
        monthSelection = month_selected;
        var dates = json[0];

        if(dates==2){
          d3.select('serverdown')
            .html('');
          d3.select('serverdown')
            .html('Something went wrong! Please wait while we connect to our servers');
        }
        else{
        d3.select('serverdown')
          .html('');
        var tempdata = json[1];
        var newdata = [];
        var keys = Object.keys(tempdata);
        for(i=0; i<keys.length; i++) {
          newdata.push(tempdata[keys[i]]);
        }

        if (month_selected === 0) { //year plotting
          margin.bottom = 100;
          if (newdata.length == 0) {
            d3.select('.traffic')
            .html('');
            d3.select('.traffic')
            .append('noData')
            .html('No Data Available for Selected Year');
          }

          else {
            var month_days;
            for(i=1; i<13; i++) {
              month_days = numberOfDays(year_selected,i-1)
              for(j=0; j<month_days; j++) {
                if (i<10) {
                  var month = '0' + i;
                }
                else {
                  month = i;
                }
                if (j<9) {
                  date_created = year_selected+ '-' + month + '-' + '0' + (j+1);
                }
                else {
                  date_created = year_selected+ '-' + month + '-' + (j+1);
                }

                if (!dates[date_created]) {
                  var obj = {};
                  obj.date = date_created;
                  obj.GET = 0;
                  obj.POST = 0;
                  obj.OPTIONS = 0;
                  obj.HEAD = 0;
                  newdata.push(obj);
                }
              }
            }

          }
        }

        else {  //month plotting
          if (newdata.length == 0) {
            d3.select('.traffic')
            .html('');
            d3.select('.traffic')
            .append('noData')
            .html('No Data Available for Selected Month');
          }
          else {
            var month_days;
            var parts = newdata[0].date.split('-');
            var year = parts[0];
            var month = parts[1];
            var date_created;
            month_days = numberOfDays(year_selected,month_selected);
            for(i=0; i<month_days; i++) {
              flag = 0;
              if (i<9) {
                date_created = year+ '-' + month + '-' + '0' + (i+1);
              }
              else {
                date_created = year+ '-' + month + '-' + (i+1);
              }
              if(!dates[date_created]) {
                var obj = {};
                obj.date = date_created;
                obj.GET = 0;
                obj.POST = 0;
                obj.OPTIONS = 0;
                obj.HEAD = 0;
                newdata.push(obj);
              }
            }
          }
        }


    /*************************************** Final Analysis Part ********************************************/

        data = newdata;
        if (data.length!=0) {
          data.forEach(function(d) {
            var parts = (d.date).split('-');
            d.date = new Date(parts[0], parts[1]-1, parts[2]);
          });

          var line = d3.svg.line()
          .interpolate("monotone")
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.count); });

          d3.select('noData')
          .html('');

          d3.select('.traffic')
          .html('');

          var svg = d3.select(".traffic")
          .append('svg')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left+ "," + margin.top + ")");

          color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

          data.sort(function (a, b) {
            return d3.ascending(a.date, b.date);
          });

          var methods = color.domain().map(function(name) {
            return {
              REQUEST: name,
              values: data.map(function(d) {
                return {date: d.date, count: +d[name]};
              })
            };
          });

          x.domain([new Date(data[0].date), d3.time.day.offset(new Date(data[data.length-1].date),0)]);
          xAxis.tickFormat(d3.time.format('%B %d'))
          .outerTickSize(0);
          if (monthSelection != 0) {
            xAxis.tickFormat(d3.time.format('%d'));
          }
          y.domain([
            d3.min(methods, function(c) { return d3.min(c.values, function(v) { return v.count; }); }),
            d3.max(methods, function(c) { return (d3.max(c.values, function(v) { return v.count; }))*1.1; })
          ]);
          svg.append("g")
          .attr("class","x axis")
          .attr("transform","translate(0,"+ height +")")
          .call(xAxis)
          .selectAll("text")
          .attr("transform","rotate(-60)")
          .attr("dx","-.8em")
          .attr("dy",".25em")
          .style("text-anchor","end")

          svg.append("g")
          .attr("class","y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Request Rate Traffic");

          var plot = svg.selectAll(".city")
          .data(methods)
          .enter()
          .append("g")
          .attr("class", "city");

          plot.append("path")
          .attr("class", "line")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return color(d.REQUEST); });

          $('.traffic svg').attr("width", width+220);

          var legend = svg.selectAll(".legend")
          .data(color.domain().slice())
          .enter()
          .append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(80," + i * 25 + ")"; });

          legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

          legend.data(methods);

          legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d.REQUEST; });
        } // analysis ends
      }
      });
    }
  }
});
