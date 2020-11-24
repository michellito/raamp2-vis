import React, { Component } from "react";
import DistributedDemo from "./PeripheryPlot";
import HeartRate from "./HeartRate";
import SleepChart from "./SleepChart";
import loadData from "./loadData";
import loadSummaryData from "./loadSummaryData";
import Spinner from 'react-spinkit';
import * as d3 from "d3";

export default class Home extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      data2: null,
      width: 700,
      height: 50,
      id: 'root'
    };
  }

  async componentDidMount() {
    var svg = d3.select("#main-container")
      .append("svg")
      .attr("width", window.innerWidth - 240)
      .attr("height", window.innerHeight)
    
    loadSummaryData().then(response => {
      // console.log(response)
      this.setState({data: response, data2: response, loading: false});
    });
  }


  renderLoading() {
    return (
      <div className="mx-auto row" style={{width:75}}>
        <Spinner name="line-spin-fade-loader" color="steelblue"/>
      </div>
    );
  }

  render() {
    return (
      <>
          {this.state.loading && this.renderLoading()}
          {this.state.data &&
          <>
            <SleepChart id="sleep1"
                        data={this.state.data}
                        width={this.state.width}
                        height={this.state.height}
                        positionX={50}
                        positionY={50}>
            </SleepChart>
            <SleepChart id="sleep2"
                        data={this.state.data}
                        width={this.state.width}
                        height={this.state.height}
                        positionX={50}
                        positionY={100}>
            </SleepChart>
          </>
          }
          {/* {this.state.data && <DistributedDemo data={this.state.data}></DistributedDemo>} */}
      </>
    );
  }
}
