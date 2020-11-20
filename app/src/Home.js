import React, { Component } from "react";
import DistributedDemo from "./DistributedDemo";
import HeartRate from "./HeartRate";
import BarChart from "./BarChart";
import loadData from "./loadData";
import Spinner from 'react-spinkit';

export default class Home extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // data: null,
      data: [12, 5, 6, 6, 9, 10],
      width: 700,
      height: 500,
      id: 'root'
    };
  }

  async componentDidMount() {

    loadData().then(response => {
        // console.log(response)
        this.setState({data: response, loading: false});
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
      <div>
          {this.state.loading && this.renderLoading()}
          {/* {this.state.data && this.state.data && <HeartRate data={this.state.data}></HeartRate>} */}
          {this.state.data && this.state.data && <BarChart data={this.state.data} width={this.state.width} height={this.state.height} id={this.state.id}></BarChart>}
          {/* {this.state.data && this.state.data && <DistributedDemo data={this.state.data}></DistributedDemo>} */}
      </div>
    );
  }
}
