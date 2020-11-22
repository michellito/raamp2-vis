import React, {Component} from 'react';
import * as d3 from "d3";

class SleepChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    // const data = [12, 5, 6, 6, 9, 10];
    var positionX = 50;
    var positionY = 50;

    var paddingBottom = 20;
    var paddingLeft = 50;

    var width = this.props.width;
    var height = this.props.height;
    var data = this.props.data;

    console.log(data[0].date)
    console.log(data[data.length - 1].date)

    var xScale = d3.scaleTime()
      .domain([data[0].date, data[data.length - 1].date])
      .range([paddingLeft, width])
    
    var yScale = d3.scaleLinear()
      .domain(d3.extent(data.map(function (d) {
        return (d.sleepMinutes);
      })))
      .range([height, 0]);

    var colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain(d3.extent(data.map(function (d) {
        return (d.sleepMinutes);
      })))

    var xAxis = d3.axisBottom()
      .scale(xScale);
  
    var yAxis = d3.axisLeft()
      .scale(yScale);
    
    const svg = d3.select("body")
    .append("svg")
    .attr("width", this.props.width)
    .attr("height", this.props.height)
                  
    svg.selectAll("rect")
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
        return height - yScale(d.sleepMinutes);
      })
      .attr("fill", function(d, i) {
        return colorScale(d.sleepMinutes)
      })
    
      // append axes
    svg.append("g")
    .attr("transform", `translate(${0}, ${height - 15})`)
    .call(xAxis);
  
    svg.append("g")
      .attr("transform", `translate(${paddingLeft}, ${0})`)
      .call(yAxis);

    
  }
        
  render(){
    return null;
  }

}

export default SleepChart;