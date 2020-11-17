import _ from "lodash"; 
import WeatherData from "./seattle-weather.csv";
import * as d3 from 'd3';

export default async function loadData() {

    var data = await d3.csv(WeatherData, function(d) {
      return {
        date: new Date(d.date),
        precipitation: +d.precipitation,
        temp_max: +d.temp_max,
        temp_min: +d.temp_min,
        wind: +d.wind,
        weather: d.weather,
      };
    });

    return data; 
}; 



