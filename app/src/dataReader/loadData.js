import _ from "lodash"; 
// import HeartRateData from "../data/S001/S001_heartrate.csv"
import * as d3 from 'd3';
import {largestTriangleThreeBucket} from '@d3fc/d3fc-sample';

export default async function loadData() {

    // var data = await d3.csv(HeartRateData, function(d) {
    //   return {
    //     date: new Date(d.date + ' ' + d.time),
    //     heartRate: +d.heartRate,
    //   };
    // });
  
    // // Create the sampler
    // const sampler = largestTriangleThreeBucket();

    // // Configure the x / y value accessors
    // sampler.x(d => d.date)
    //     .y(d => d.heartRate);

    // // Configure the size of the buckets used to downsample the data.
    // sampler.bucketSize(100);

    // // Run the sampler
    // const sampledData = sampler(data);

    // return sampledData; 
}; 



