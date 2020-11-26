import React, { Component } from "react";
import SleepChart from "./components/SleepChart";
import Timeline from "./components/Timeline"
import loadData from "./dataReader/loadData";
import loadSummaryData from "./dataReader/loadSummaryData";
import Spinner from 'react-spinkit';
import * as d3 from "d3";

export default class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      timeRange: [new Date('2018-01-08'), new Date('2018-03-08')],
      data: null,
      data2: null,
      width: 700,
      height: 50,
      id: 'root'
    };

    this.updateTimeRange = this.updateTimeRange.bind(this)
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

  updateTimeRange(selection) {
    if (selection) {
      this.setState({timeRange: selection});
    } else {
      this.setState({timeRange: [new Date('2018-01-08'), new Date('2018-03-08')]});
    }
    
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
            <Timeline id="timeline"
                        width={this.state.width}
                        height={this.state.height}
                        positionX={50}
                        positionY={50}
                        updateTimeRange={this.updateTimeRange}>
            </Timeline>
            <SleepChart id="sleep1"
                        data={this.state.data}
                        width={this.state.width}
                        height={this.state.height}
                        positionX={50}
                        positionY={120}
                        timeRange={this.state.timeRange}>
            </SleepChart>
            <SleepChart id="sleep2"
                        data={this.state.data}
                        width={this.state.width}
                        height={this.state.height}
                        positionX={50}
                        positionY={170}
                        timeRange={this.state.timeRange}>
            </SleepChart>
          </>
        }
      </>
    );
  }
}
