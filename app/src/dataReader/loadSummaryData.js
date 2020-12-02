import _ from "lodash"; 
// import SummaryData from "./data/S001/S001_summary.csv"
import * as d3 from 'd3';
import {largestTriangleThreeBucket} from '@d3fc/d3fc-sample';

export default async function loadSummaryData(participants) {
    
  var allData = [];

  for (var i = 0; i < participants.length; i++) {
    var id = participants[i]
    var path = "/data/" + id + '/' + id + "_summary.csv"
    var sleep_path = "/data/" + id + '/' + id + "_sleep.csv"

    console.log(path)

    var data = await d3.csv(path, function(d) {
      return {
        date: new Date(d.Steps_dateTime),
        sleepMinutes: +d.Sleep_Main_minutesAsleep,
        avgHeartRate: +d.HeartRate_value,
        steps: +d.Steps_duration,
      };
    })

    var sleep_path = await d3.csv(path, function(d) {
      return {
        date: new Date(d.Steps_dateTime),
        sleepMinutes: +d.Sleep_Main_minutesAsleep,
        avgHeartRate: +d.HeartRate_value,
        steps: +d.Steps_duration,
      };
    })
    
    allData.push({id: id, data: data, sleepDetail: sleep_path});

  }
    
  
    // // Create the sampler
    // const sampler = largestTriangleThreeBucket();

    // // Configure the x / y value accessors
    // sampler.x(d => d.date)
    //     .y(d => d.heartRate);

    // // Configure the size of the buckets used to downsample the data.
    // sampler.bucketSize(100);

    // // Run the sampler
    // const sampledData = sampler(data);
    // console.log(allData)
    return allData; 
}; 



