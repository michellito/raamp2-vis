import React, {Component} from 'react';
import * as d3 from "d3";
import { tip as d3tip } from "d3-v6-tip";

class SleepChart extends Component {
  
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {

    var width = this.props.width;
    var height = this.props.height;
    var paddingLeft = 50;
    console.log('sleep chart updated!')
    var sleepGroup = d3.select("#" + this.props.id);

    var xScale = d3.scaleTime()
      .domain(this.props.timeRange)
      .range([paddingLeft, width])

    var xAxis = d3.axisBottom()
      .scale(xScale);

    sleepGroup.select(".xAxis").call(xAxis)
  }

  drawChart() {

    var positionX = this.props.positionX;
    var positionY = this.props.positionY;
    var id = this.props.id;

    var paddingBottom = 20;
    var paddingLeft = 50;

    var width = this.props.width;
    var height = this.props.height;
    var data = this.props.data;

    var xScale = d3.scaleTime()
      .domain([data[0].date, data[data.length - 1].date])
      .range([paddingLeft, width])
    
    var yScale = d3.scaleLinear()
      .domain(d3.extent(data.map(function (d) {
        return (d.sleepMinutes);
      })))
      .range([height - paddingBottom, 0]);

    var colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain(d3.extent(data.map(function (d) {
        return (d.sleepMinutes);
      })))

    var xAxis = d3.axisBottom()
      .scale(xScale);
  
    var yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(3);
    
    var sleepGroup = d3.select("#main-container").select("svg")
      .append("g")
      .attr("id", id)
      .attr("transform", `translate (${positionX}, ${positionY})`);

    var tooltip = d3tip()
      .attr('class', 'd3-tip')
      .direction('n')
      .offset([-10, 0])
      .html(function(event ,d) {
        var formatTime = d3.timeFormat("%a, %b %e")
        return "<strong>" + formatTime(d.date) + "<br/></strong> <div style='margin-top:5px'>" + d.sleepMinutes + " minutes</div>"
      });
    
    sleepGroup.call(tooltip)
    
    sleepGroup.selectAll("rect")
      .data(this.props.data)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        console.log(xScale(d.date))
        return xScale(d.date);
      })
      .attr("y", function(d, i) {
        return yScale(d.sleepMinutes);
      })
      .attr("width", 10)
      .attr("height", function(d, i) {
        return height -paddingBottom -  yScale(d.sleepMinutes);
      })
      .attr("fill", function(d, i) {
        return colorScale(d.sleepMinutes)
      })
      .on('mouseover', function(event,d) {
        tooltip.show(event, d)
      })
      .on('mouseout', tooltip.hide)
    
      // append axes
    sleepGroup.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${0}, ${height - 20})`)
    .call(xAxis);
  
    sleepGroup.append("g")
      .attr("transform", `translate(${paddingLeft}, ${0})`)
      .call(yAxis);
  
  }
        
  render(){
    return null;
  }

}

export default SleepChart;