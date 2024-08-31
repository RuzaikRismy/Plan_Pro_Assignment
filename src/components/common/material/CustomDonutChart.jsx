import React from 'react';
import { useTheme } from "@material-ui/core/styles";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from "prop-types";

const CustomDonutChart = (props)=> {
  const {statusData, seriesArgumentNameString, seriesValueNameString, pieChartPalette, pieChartCenterText, chartElementStyles, hideLegend} = props;
  
  /**
  |--------------------------------------------------
  | To use color palette and styles theming
  |--------------------------------------------------
  */
  const theme = useTheme();
  //state for color palette (if string passed then default palette used)
  const [colorPalette, setColorPalette] = React.useState( typeof pieChartPalette !== "string" ? pieChartPalette : [theme.palette.doughnutCharts.green, theme.palette.doughnutCharts.lightblue, theme.palette.doughnutCharts.yellow, theme.palette.doughnutCharts.orange, theme.palette.doughnutCharts.purple, theme.palette.doughnutCharts.blue,theme.palette.doughnutCharts.darkBlue]);
  /**
  |--------------------------------------------------
  | Highchart component styles
  |--------------------------------------------------
  */
  const options = {
    subtitle:{
      align: "center",
      verticalAlign: 'middle',
      /**
      |--------------------------------------------------
      | Center text from the module properties
      |--------------------------------------------------
      */
      text:pieChartCenterText,
      y: chartElementStyles?.centerStatPositionY ? chartElementStyles?.centerStatPositionY : 22,
      x: chartElementStyles?.labelPositionX ? chartElementStyles.labelPositionX :-71,
      floating: true,
      style:{
        fontWeight:theme.typography.fontWeight.weight3,
        fontFamily:"Roboto",
        color: theme.palette.grey.light,
        fontSize: `${theme.typography.fontSize11}px`
      }
    },
    title: {
      /**
      |--------------------------------------------------
      | pie-chart title as the total number calculated
      |--------------------------------------------------
      */
      text: Array.isArray(statusData)
        ? (statusData.map(
          status => status?.[seriesValueNameString]
        )).reduce(
          ((prevCount, currentCount) => prevCount >= 0 && currentCount >= 0 && prevCount + currentCount),0
        )
        : 0,
      align: 'center',
      verticalAlign: 'middle',
      y: chartElementStyles?.labelPositionY ? chartElementStyles?.labelPositionY : 16,
      x: chartElementStyles?.labelPositionX ? chartElementStyles.labelPositionX :-71,
      floating: true,
      style:{
        fontWeight:theme.typography.fontWeight.weight5,
        fontFamily:"Roboto",
        color: theme.palette.grey.light,
        fontSize:`${theme.typography.fontSize11*2}px`
      }
    },
    tooltip:{
      enabled:false
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      type: 'pie',
      height: chartElementStyles?.chartHeight? chartElementStyles.chartHeight : 94,
      width:chartElementStyles?.chartWidth?chartElementStyles.chartWidth:250,
      plotShadow:false,
      backgroundColor: chartElementStyles?.chartBackgroundColor ? chartElementStyles.chartBackgroundColor : 'rgba(255, 255, 255, 0.0)'
    },
    credits: {
      enabled: false
    },
    legend:{
      enabled: hideLegend ?  false : true,
      useHTML:true,
      symbolPadding: 0,
      symbolWidth: 0,
      symbolHeight: 0,
      squareSymbol: false,
      align: 'right',
      verticalAlign: 'top',
      layout: 'vertical',
      /**
      |--------------------------------------------------
      | Legend labels count and the right label
      |--------------------------------------------------
      */
      labelFormatter: function () {
        let labelValue = this?.options?.y?this.options.y<10 ? `0${this.options.y}` : this.options.y : '00';
        return '<div style="margin:0.16rem 0;justify-content:flex-end; line-height:'+ (theme.typography.fontSize+2)+'px">' +
                '<div style="line-height:'+ (theme.typography.fontSize+2) +'px;width:2.5rem;text-align:end;color: ' + this.color +'; display: inline-block; margin-right:'+ theme.customSpacing.padding.padding1 +'px; font-weight:'+ theme.typography.fontWeight.weight6+';font-size:'+ theme.typography.h6.fontSize+'px; font-family:Roboto; text-overflow: ellipsis;overflow:hidden; "> '+ labelValue +'</div>' +
                "<span style='width:"+chartElementStyles?.legendLabelWidth+";font-family:Roboto; font-weight:"+ theme.typography.fontWeight.weight5+"; font-size:"+ theme.typography.fontSize+"px; color:"+ theme.palette.grey.light +"; text-overflow:ellipsis; overflow:hidden; display:inline-block; line-height:"+ (theme.typography.fontSize+2) +"px;' > " + this.name +  " </span>" +
            '</div>'
      },
      x: chartElementStyles?.legendPositionX ? chartElementStyles.legendPositionX: 24,
      y: -18,
      floating:true,
      maxHeight: "fit-content",
      width: chartElementStyles?.legendWidth? chartElementStyles.legendWidth:160 
    },
    plotOptions:{
      pie:{
        height: chartElementStyles?.pieChartHeight ? chartElementStyles?.pieChartHeight : 80,
        allowPointSelect: false,
        cursor: 'pointer',
        dataLabels: {
            enabled: false,
        },
        innerSize: chartElementStyles?.innerSize ? chartElementStyles.innerSize : "98%",
        showInLegend:true,
        size: chartElementStyles?.pieChartSize ? chartElementStyles?.pieChartSize : 78,
        slicedOffset:0,
        borderWidth:12,
        borderColor: null,
        animation: {
          duration: 1500,
          defer:1000
        },
        center:[chartElementStyles?.donutCenterX?chartElementStyles.donutCenterX:"19%", "53%"],
      },
      series:{
        states:{
          hover:{
            enabled:false
          },
          inactive: {
            opacity:1
          }
        },
        point:{
          visible:false
        }
      }
    },
    series: [{
      type: "pie",
      /**
      |--------------------------------------------------
      | Dataset set to the pie-chart data
      |--------------------------------------------------
      */
      data: Array.isArray(statusData) 
        ? statusData.map(
            (status,index)=>({
              name:status?.[seriesArgumentNameString],
              y:status?.[seriesValueNameString] && status?.[seriesValueNameString]>0 ?status?.[seriesValueNameString]:null,
              legendIndex:(index+1),
              color: index>=0 && index < colorPalette.length ?colorPalette[index] : colorPalette[0]
            })
          ).sort((prev, next)=> (+(next?.y)) - (+(prev?.y))) 
        : [],
      colorByPoint:true,
      
    }]
  }

  /**
  |--------------------------------------------------
  | Donut chart options are set to the component
  |--------------------------------------------------
  */
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}

/**
|--------------------------------------------------
| Default dataset
|--------------------------------------------------
*/
const defaultData = [
  { name: "Status 1", value: 0 },
  { name: "Status 2", value: 0 },
  { name: "Status 3", value: 0 },
  { name: "Status 4", value: 0 },
];

/**
|--------------------------------------------------
| Default properties and prop-types definitions
|--------------------------------------------------
*/
CustomDonutChart.defaultProps = {
  statusData: defaultData,
  seriesArgumentNameString: "name",
  seriesValueNameString: "value",
  chartElementStyles: {legendLabelWidth: "6.5rem"},
};

CustomDonutChart.propTypes = {
  statusData: PropTypes.any,
  seriesArgumentNameString: PropTypes.any,
  seriesValueNameString: PropTypes.any,
  pieChartPalette: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]).isRequired,
  pieChartIdentifier:PropTypes.any,
  pieChartCenterText: PropTypes.any,
  pieChartCenterValue: PropTypes.any,
  chartElementStyles: PropTypes.any,
};

export default CustomDonutChart;