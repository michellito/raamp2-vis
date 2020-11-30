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
      participants: null,
      width: 700,
      height: 50,
      id: 'root',
    };

    this.updateTimeRange = this.updateTimeRange.bind(this)
  }

  async componentDidMount() {
    
    var svg = d3.select("#main-container")
      .append("svg")
      .attr("width", window.innerWidth - 240)
      .attr("height", window.innerHeight)

    loadSummaryData(this.props.participants).then(response => {
      // console.log(response)
      this.setState({participants: [{ id: 'S001', data: response}], loading: false});
    });
  }

  componentDidUpdate() {
    let updatedParticipants = this.props.participants;

    const prevParticipants = this.state.participants.slice() //copy the array

    for (var i = 0; i < updatedParticipants.length; i++) {

    }
    // if (data.checked) {
    //   selectedFiles.push(file_path);
    // } else {
    //   var index = selectedFiles.indexOf(file_path);
    //   selectedFiles.splice(index, 1);
    // }
    // this.setState({
    //   selectedFiles: selectedFiles,
    //   selectionStatus: {
    //     ...this.state.selectionStatus,
    //     [file_path]: data.checked
    //   }, 
    // });



    console.log("Main - partipants updated!x")
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

    const participants = this.state.participants;
    return (
      <>
        {this.state.loading && this.renderLoading()}
        {participants && participants.length &&
          <>
            
            <Timeline id="timeline"
                        width={this.state.width}
                        height={this.state.height}
                        positionX={50}
                        positionY={50}
                        updateTimeRange={this.updateTimeRange}>
            </Timeline>
            { participants.map((participant) => (
            <SleepChart id="sleep1"
                        data={participant.data}
                        width={this.state.width}
                        height={this.state.height}
                        positionX={50}
                        positionY={120}
                        timeRange={this.state.timeRange}>
            </SleepChart>
            ))}
            {/* <SleepChart id="sleep2"
                        data={this.state.data}
                        width={this.state.width}
                        height={this.state.height}
                        positionX={50}
                        positionY={170}
                        timeRange={this.state.timeRange}>
            </SleepChart> */}

          </>
        }
      </>
    );
  }
}
