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

angular.module('logAggregator').directive('agentPieChart', ['$compile', function($compile) {
  return {
    restrict : 'E',
    replace : false,
    scope : {
      data : '=',
      criteria : '=',
      userAgentFilters : '=',
      showAgentProgress : '='
    },
    link : function(scope, element, attrs) {
      // console.log("scope.$id = ",scope.$id);
      // console.log("scope.$id = ",scope.$id);
      var data = scope.data;

      var well = d3.select(element[0]);
      
      var svg = well.append("svg").attr("width",600).attr("height",400);
      var g = svg.append("g").attr("id","donut").attr("ng-hide", "showAgentProgress");
      color = d3.scale.category10();

      var colorLegendG = svg.append("g")
                  .attr("class", "color-legend")
                  .attr("ng-hide", "showAgentProgress")
                  .attr("transform", "translate(470, 120)")
                  .style("font-size", "16px");

      $compile(element.find('svg'))(scope);

      var colorLegend = d3.legend.color()
                      .scale(color)
                      .shapePadding(10)
                      .shapeWidth(18)
                      .shapeHeight(18)
                      .labelOffset(4)
                      .orient("vertical");
      $(".wrap .well agent-pie-chart").prepend($compile("<nodata ng-hide='showAgentProgress'></nodata>")(scope));

      scope.$watch('data', function (data, oldVal) {
        d3.select(".wrap .well nodata").html("");
        if(angular.equals({}, data)) {
          d3.select("#donut").html("");
          d3.select(".color-legend").html("");
          d3.select(".wrap .well nodata").html("No data Available");
          return;
        } else if(data == undefined) {
          d3.select(".wrap .well nodata").html("Something went wrong. Please wait while we connect to our servers");
          return;
        }
        if(angular.equals(data, oldVal))
          return;
        var render = function(nestKey, data, userAgentFilters) {
          d3.select("#donut").html="";
          d3.select(".color-legend").html="";
          var domainNames = [];
          for(var k=0,filterLen = userAgentFilters[nestKey].length; k < filterLen; k++) {
            domainNames.push(userAgentFilters[nestKey][k].names)
          }

          color.domain(domainNames);

          Donut3D.draw("donut", agentData(), 200, 200, 170, 140, 30, 0.4);

          colorLegendG.call(colorLegend);

          function agentData() {
            var result = [];
            var keys = Object.keys(data);
            for(var i=0, len = keys.length; i < len; i++) {
              result.push({label:keys[i], value:data[keys[i]], color:color(keys[i])})
            }
            return result;
          }
        };
        render(scope.criteria, data, scope.userAgentFilters);
      });

      !function(){
      	var Donut3D={};
        var tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {
                    return "<strong>"+d.data.label+" : </strong> <span style='color:lightblue'>" +d.value+ "</span>";
                  });

      	function pieTop(d, rx, ry, ir ){
      		if(d.endAngle - d.startAngle == 0 ) return "M 0 0";
      		var sx = rx*Math.cos(d.startAngle),
      			sy = ry*Math.sin(d.startAngle),
      			ex = rx*Math.cos(d.endAngle),
      			ey = ry*Math.sin(d.endAngle);

      		var ret =[];
      		ret.push("M",sx,sy,"A",rx,ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0),"1",ex,ey,"L",ir*ex,ir*ey);
      		ret.push("A",ir*rx,ir*ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0), "0",ir*sx,ir*sy,"z");
      		return ret.join(" ");
      	}

      	function pieOuter(d, rx, ry, h ){
      		var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
      		var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);

      		var sx = rx*Math.cos(startAngle),
      			sy = ry*Math.sin(startAngle),
      			ex = rx*Math.cos(endAngle),
      			ey = ry*Math.sin(endAngle);

      			var ret =[];
      			ret.push("M",sx,h+sy,"A",rx,ry,"0 0 1",ex,h+ey,"L",ex,ey,"A",rx,ry,"0 0 0",sx,sy,"z");
      			return ret.join(" ");
      	}

      	function pieInner(d, rx, ry, h, ir ){
      		var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
      		var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);

      		var sx = ir*rx*Math.cos(startAngle),
      			sy = ir*ry*Math.sin(startAngle),
      			ex = ir*rx*Math.cos(endAngle),
      			ey = ir*ry*Math.sin(endAngle);

      			var ret =[];
      			ret.push("M",sx, sy,"A",ir*rx,ir*ry,"0 0 1",ex,ey, "L",ex,h+ey,"A",ir*rx, ir*ry,"0 0 0",sx,h+sy,"z");
      			return ret.join(" ");
      	}

      	function getPercent(d){
      		return (d.endAngle-d.startAngle > 0.2 ?
      				Math.round(1000*(d.endAngle-d.startAngle)/(Math.PI*2))/10+'%' : '');
      	}

      	Donut3D.transition = function(id, data, rx, ry, h, ir){
      		function arcTweenInner(a) {
      		  var i = d3.interpolate(this._current, a);
      		  this._current = i(0);
      		  return function(t) { return pieInner(i(t), rx+0.5, ry+0.5, h, ir);  };
      		}
      		function arcTweenTop(a) {
      		  var i = d3.interpolate(this._current, a);
      		  this._current = i(0);
      		  return function(t) { return pieTop(i(t), rx, ry, ir);  };
      		}
      		function arcTweenOuter(a) {
      		  var i = d3.interpolate(this._current, a);
      		  this._current = i(0);
      		  return function(t) { return pieOuter(i(t), rx-.5, ry-.5, h);  };
      		}
      		function textTweenX(a) {
      		  var i = d3.interpolate(this._current, a);
      		  this._current = i(0);
      		  return function(t) { return 0.6*rx*Math.cos(0.5*(i(t).startAngle+i(t).endAngle));  };
      		}
      		function textTweenY(a) {
      		  var i = d3.interpolate(this._current, a);
      		  this._current = i(0);
      		  return function(t) { return 0.6*rx*Math.sin(0.5*(i(t).startAngle+i(t).endAngle));  };
      		}

      		var _data = d3.layout.pie().sort(null).value(function(d) {return d.value;})(data);

      		d3.select("#"+id).selectAll(".innerSlice").data(_data)
      			.transition().duration(750).attrTween("d", arcTweenInner);

      		d3.select("#"+id).selectAll(".topSlice").data(_data)
      			.transition().duration(750).attrTween("d", arcTweenTop);

      		d3.select("#"+id).selectAll(".outerSlice").data(_data)
      			.transition().duration(750).attrTween("d", arcTweenOuter);

      		d3.select("#"+id).selectAll(".percent").data(_data).transition().duration(750)
      			.attrTween("x",textTweenX).attrTween("y",textTweenY).text(getPercent);
      	}

      	Donut3D.draw=function(id, data, x /*center x*/, y/*center y*/,
      			rx/*radius x*/, ry/*radius y*/, h/*height*/, ir/*inner radius*/){
          d3.select("#"+id).call(tip, data);

      		var _data = d3.layout.pie().sort(null).value(function(d) {return d.value;})(data);

      		var slices = d3.select("#"+id).append("g").attr("transform", "translate(" + x + "," + y + ")")
      			.attr("class", "slices");

      		slices.selectAll(".innerSlice").data(_data).enter().append("path").attr("class", "innerSlice")
      			.style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
      			.attr("d",function(d){ return pieInner(d, rx+0.5,ry+0.5, h, ir);})
      			.each(function(d){this._current=d;})
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

      		slices.selectAll(".topSlice").data(_data).enter().append("path").attr("class", "topSlice")
      			.style("fill", function(d) { return d.data.color; })
      			.style("stroke", function(d) { return d.data.color; })
      			.attr("d",function(d){ return pieTop(d, rx, ry, ir);})
      			.each(function(d){this._current=d;})
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

      		slices.selectAll(".outerSlice").data(_data).enter().append("path").attr("class", "outerSlice")
      			.style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
      			.attr("d",function(d){ return pieOuter(d, rx-.5,ry-.5, h);})
      			.each(function(d){this._current=d;});

      		slices.selectAll(".percent").data(_data).enter().append("text").attr("class", "percent")
      			.attr("x",function(d){ return 0.7*rx*Math.cos(0.5*(d.startAngle+d.endAngle));})
      			.attr("y",function(d){ return 0.7*ry*Math.sin(0.5*(d.startAngle+d.endAngle));})
      			.text(getPercent).each(function(d){this._current=d;});

      	}

      	this.Donut3D = Donut3D;
      }();
    }
  };
}]);
