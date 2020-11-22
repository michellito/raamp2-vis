import React, { useState } from 'react'; 
import { timeMonth } from 'd3-time';  
import { format } from 'd3-format';
import { extent } from 'd3-array'; 
import _ from "lodash"; 

import PeripheryPlots, {
            QuantitativeTraceGroup, 
            AverageLineGroup, 
            BarGroup, 
            MovingAverageEnvelopeGroup, 
            ScatterGroup,
            NominalTraceGroup, 
            EventGroup, 
            LineGroup, 
            getPeripheryPlotSubComponents
       } from "periphery-plots"; 

export default function PeripheryPlotSummary(props) {

    const [data, setData] = useState(props.data);
    console.log(data) 
    const [config, setConfig] = useState({

        trackwiseObservations: [data, data, data],
        trackwiseTimeKeys: ['date', 'date', 'date'], 
        trackwiseValueKeys: ['sleepMinutes', 'avgHeartRate', 'steps'], 
        trackwiseTypes: ['continuous', 'continuous', 'continuous'],
        trackwiseUnits: ['minutes', 'beats/minute', 'steps'],
        trackwiseValueDomainComputers: [null, null, null], 
        trackwiseNumAxisTicks: [3, 3, 3], 
        trackwiseAxisTickFormatters: [null, null, null], 
        trackwiseEncodings: [
            [
                [BarGroup], [BarGroup], [BarGroup]
            ], 
            [
                [BarGroup], [BarGroup], [BarGroup]            
            ], 
            [
                [BarGroup], [BarGroup], [BarGroup]            
            ]
        ],

        distributedMode: true, 
        fixedWidth: 800, 
    
        contextWidthRatio: .15, 
        numContextsPerSide: 1, 
        applyContextEncodingsUniformly: true,
        tickInterval: timeMonth.every(3), 
        timeExtentDomain: extent(data.map(d => d.date)),  
        msecsPadding: 1000 * 86400 * 14, // two weeks
        timeDomains: [
            ['2018-01-10', '2018-02-02'].map(dateStr => new Date(dateStr)),
            ['2018-02-03', '2018-02-18'].map(dateStr => new Date(dateStr)),
            ['2018-02-19', '2018-03-01'].map(dateStr => new Date(dateStr))
        ], 
    
        controlTimelineHeight: 70, 
        verticalAlignerHeight: 40
    
    }); 

    let { 
        PeripheryPlotsTimeline, 
        PeripheryPlotsAligner, 
        PeripheryPlotsTrack
    } = getPeripheryPlotSubComponents(); 

    function Component(props) {
        return <div>
            <div>
                <PeripheryPlotsTimeline/>
            </div>
            <div>
                <PeripheryPlotsAligner/>   
            </div>
            <div>
                {_.range(0, 3).map(i => <PeripheryPlotsTrack key={i} i={i}/>)}
            </div>
        </div>
    }

    // let updateEncodingType = (type) => {
    //     let Encoding = type === 'line' ? LineGroup : BarGroup; 
    //     let encodings = [[Encoding], [Encoding], [Encoding]];
    //     let new_schema = _.range(0, config.trackwiseEncodings.length).map(i => encodings); 
    //     let new_config = _.cloneDeep(config); 
    //     new_config['trackwiseEncodings'] = new_schema; 
    //     setConfig(new_config);
    // }

    // function addDaysToDate(date, days) {
    //     date = new Date(date.valueOf());
    //     date.setDate(date.getDate() + days);
    //     return date;
    // }

    // let moveTimeZones = () => {
    //     let timeDomains = _.cloneDeep(config.timeDomains); 
    //     let ndays = parseInt(Math.random() * 200) * (Math.random() < .5 ? 1 : -1); 
    //     timeDomains = timeDomains.map(domain => domain.map(date => addDaysToDate(date, ndays)));
    //     let new_config = _.cloneDeep(config); 
    //     new_config['timeDomains'] = timeDomains;
    //     setConfig(new_config);  
    // }

    return <React.Fragment>
        {/* <button onClick={(e) => updateEncodingType('line')}>line</button>
        <button onClick={(e) => updateEncodingType('bar')}>bar</button>
        <button onClick={(e) => moveTimeZones()}>shift time zones</button> */}
        <div style={{ width: '100%' }}>
            <PeripheryPlots Component={Component} config={config}/>
        </div>
    </React.Fragment>;

}; 
