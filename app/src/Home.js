import React, { Component } from "react";
import DistributedDemo from "./DistributedDemo";
import HeartRate from "./HeartRate";
import loadData from "./loadData";
import Spinner from 'react-spinkit';

export default class Home extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
    };
  }

  async componentDidMount() {
    console.log('hi')
    loadData().then(response => {
        // console.log(response)
        this.setState({data: response, loading: false});
      
    });
  }


  renderLoading() {
    return (
      <div className="mx-auto row" style={{width:75}}>
        <Spinner name="three-bounce" color="#ab031f" fadeIn="quarter" className="mt-8"/>
      </div>
    );
  }

  render() {
    return (
      <div>
          {!this.state.loading && this.renderLoading()}
          {this.state.data && this.state.data && <HeartRate data={this.state.data}></HeartRate>}
          {/* {this.state.data && this.state.data && <DistributedDemo data={this.state.data}></DistributedDemo>} */}
      </div>
    );
  }
}
