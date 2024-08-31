import React, { Component } from 'react';
import DatePickerComponent from './DatePickerComponent';
import Chart from 'chart.js';
import "./commonStyle.css";
import moment from 'moment';
import { getLabel } from '../../utils/localization';

// Calling way
/**
 <ComparisonChartComponent
        chartType='line'
        dataLabels={this.state.graphDatalabel}
        dataPointSet1={this.state.graphDataPoints1}
        dataPointSet1Style= {this.state.graphDataPoint1Styles}
        dataPointSet2={this.state.graphDataPoints2}
        dataPointSet2Style={this.state.graphDataPoint2Styles}
        pointRadius='0'
        xAxes={this.state.xAxes}
        yAxes={this.state.yAxes}
        haveDatePicker={true}
        onChangeDateAction={this.onChangeDate}
 />

var graphDatalabel=["Jan'1", "Feb'1", "Mar'1","Apr'1","May'1","Jun'1", "Jul'1", "Aug'1", "Sep'1", "Oct'1", "Nov'1", "Dec'1"];
var graphDataPoints1=[10,8,6,5,12,9,7,11,6,12,6,5];
var graphDataPoints2=[8,6,4,7,9,3,7,6,5,9,8,7];
const graphDataPoint1Styles={lineColor:'#2659B6', borderWidth:1, fill:false, backgroundColor:''};
const graphDataPoint2Styles={ lineColor:'#f5d132', borderWidth:1, fill:false, backgroundColor:''};
const xAxes={ gridLines: false, drawBorder:true }
const yAxes={ gridLines: true, drawBorder:false }
*/
    
class ComparisonChartComponent extends Component {
    constructor(props) {
        super(props);
        this.openGraph=this.openGraph.bind(this);    
        this.onChangeDate=this.onChangeDate.bind(this);
    }

    componentDidMount(){
        this.openGraph();
    }

    componentDidUpdate(preProps, preState){
        this.openGraph();
    }

    render(){
        return(
            <div>
                { 
                    this.props.haveDatePicker &&
                    <div className="chart-date-pickers-div row">
                        <DatePickerComponent
                            datePickerClass="form-control mr-2"
                            datePickerId="from"
                            datePickerName={ getLabel({module: "ehr", label:"from"}) }
                            datePickerMaxDate={ moment(new Date()).format('YYYY-MM-DD') }
                            datePickerChangeAction={this.onChangeDate}
                            datePickerPlaceholder={ getLabel({module: "ehr", label:"from"}) }
                        />

                        <DatePickerComponent
                            datePickerClass="form-control ml-2"
                            datePickerId="to"
                            datePickerName={ getLabel({module: "ehr", label:"to"}) }
                            datePickerMaxDate={ moment(new Date()).format('YYYY-MM-DD') }
                            datePickerChangeAction={this.onChangeDate}
                            datePickerPlaceholder={ getLabel({module: "ehr", label:"to"}) }
                        />
                    </div>
                }
                <div>
                    <canvas id="myChart"></canvas>
                </div>               
            </div>   
        );   

    }

    openGraph(){
        var ctx = document.getElementById("myChart").getContext("2d");
        var lineChart = new Chart(ctx, {
          type: this.props.chartType,
          data: {
            labels: this.props.dataLabels,
            datasets: [
                {
                    data: this.props.dataPointSet1,
                    fill: this.props.dataPointSet1Style.fill,
                    backgroundColor:this.props.dataPointSet1Style.backgroundColor,
                    borderColor: this.props.dataPointSet1Style.lineColor,
                    borderWidth:this.props.dataPointSet1Style.borderWidth
                },
                {
                    data: this.props.dataPointSet2,
                    fill: this.props.dataPointSet2Style.fill,
                    backgroundColor:this.props.dataPointSet1Style.backgroundColor,
                    borderColor: this.props.dataPointSet2Style.lineColor,
                    borderWidth:this.props.dataPointSet2Style.borderWidth
                },
            ]
          },
          options: {
            scales: {
                yAxes: [{
                    stacked: false,
                    gridLines: {
                        display:this.props.yAxes.gridLines,
                        drawBorder: this.props.yAxes.border,
                      },
                    ticks: {
                        padding: 15
                    }                       
                }],
                xAxes:[{
                    stacked:false,
                    gridLines:{
                        display: this.props.xAxes.gridLines,
                        drawBorder:this.props.xAxes.border
                    },
                }]
            },
            legend: {
                display: false
              },
            elements: {
                point:{
                    radius: parseInt(this.props.pointRadius)
                }
            }
        }
        })
    }

    onChangeDate(event){
        if(this.props.onChangeDateAction){
            this.props.onChangeDateAction(event);
        }
    }

}

export default ComparisonChartComponent;