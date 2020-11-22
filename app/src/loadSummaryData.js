import _ from "lodash"; 
import WeatherData from "./seattle-weather.csv";
import SummaryData from "./data/S001/S001_summary.csv"
import * as d3 from 'd3';
import {largestTriangleThreeBucket} from '@d3fc/d3fc-sample';

export default async function loadSummaryData() {

    var data = await d3.csv(SummaryData, function(d) {
      return {
        date: new Date(d.Steps_dateTime),
        sleepMinutes: +d.Sleep_Main_minutesAsleep,
        avgHeartRate: +d.HeartRate_value,
        steps: +d.Steps_duration,
      };
    });
  
    // // Create the sampler
    // const sampler = largestTriangleThreeBucket();

    // // Configure the x / y value accessors
    // sampler.x(d => d.date)
    //     .y(d => d.heartRate);

    // // Configure the size of the buckets used to downsample the data.
    // sampler.bucketSize(100);

    // // Run the sampler
    // const sampledData = sampler(data);

    return data; 
}; 



