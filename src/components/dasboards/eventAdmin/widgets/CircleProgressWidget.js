import * as React from "react";
import { Component } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  makeStyles
} from "@material-ui/core";

const radius = 175;
const diameter = Math.round(Math.PI * radius * 2);
const getOffset = (val = 0) =>
  Math.round(((100 - Math.min(val, 100)) / 100) * diameter);

export default class CircleProgressWidget extends Component {
  static defaultProps = {
    progress: 0,
    animate: true,
    animationDuration: "1s",
    showPercentage: true,
    showPercentageSymbol: true,
    progressColor: "rgb(76, 154, 255)",
    bgColor: "#ecedf0",
    textColor: "#6b778c",
    size: "100",
    lineWidth: "50",
    percentSpacing: 10,
    textStyle: {
      font: "bold 4rem Helvetica, Arial, sans-serif",
      fontSize: 100,
    },
    subTextStyle: {
      font: "bold 4rem Helvetica, Arial, sans-serif",
      fontSize: 40,
    },
    isSubTextStyle: false,
    totalAmount: 0,
  };

  get text() {
    const {
      progress,
      showPercentage,
      textColor,
      textStyle,
      subTextStyle,
      percentSpacing,
      showPercentageSymbol,
      isSubTextStyle,
      subHeading,
      totalAmount,
      monthOfEvents
    } = this.props;
    if (!showPercentage) {
      return;
    }
    return (
      <>
          <text
            style={textStyle}
            fill={textColor}
            x={radius}
            y={isSubTextStyle ? radius - 20 : radius}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {/* {80} */}
            {(monthOfEvents?.conferenceCount + monthOfEvents?.seminarCount + monthOfEvents?.workshopCount + monthOfEvents?.otherCount)/(monthOfEvents?.totalEvents) * 100}
            {showPercentageSymbol && <tspan dx={percentSpacing}>%</tspan>}
          </text>
        {/* {isSubTextStyle && (
          <text
            style={textStyle}
            fill={textColor}
            x={radius}
            y={isSubTextStyle ? radius - 20 : radius}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {totalAmount}
          </text>
        )} */}
      </>
    );
  }

  render() {
    const { text } = this;
    const {
      progress,
      size,
      bgColor,
      progressColor,
      lineWidth,
      animate,
      animationDuration,
      roundedStroke,
      responsive,
      onAnimationEnd,
    } = this.props;
    
    const circumference = Math.PI * radius * 2;  // Calculate circumference
    const strokeDashoffset = getOffset(progress);  // Calculate the offset based on progress
    const transition = animate
      ? `stroke-dashoffset ${animationDuration} ease-out`
      : undefined;
    const strokeLinecap = roundedStroke ? "round" : "butt";
    const svgSize = responsive ? "100%" : 120;
  
    return (
      <Card>
        <CardContent>
          <Grid container 
            xs={12}  
            justifyContent="center" 
            alignItems="center"
            style={{ height: "100%" }}
          >
            <svg width={svgSize} height={svgSize} viewBox="-25 -25 400 400">
              <circle
                stroke={bgColor}
                cx="175"
                cy="175"
                r="175"
                strokeWidth={lineWidth}
                fill="none"
              />
              <circle
                stroke={"#4CBB17"}  // Use progressColor for the stroke
                transform="rotate(-90 175 175)"
                cx="175"
                cy="175"
                r="175"
                strokeDasharray={circumference}  // Set strokeDasharray to the circumference
                strokeWidth={lineWidth}
                strokeDashoffset={strokeDashoffset}  // Offset the stroke based on progress
                strokeLinecap={strokeLinecap}
                fill="none"
                style={{ strokeDashoffset, transition }}
                onTransitionEnd={onAnimationEnd}
              />
              {text}
            </svg>
          </Grid>
          <Grid 
            container 
            justifyContent="center"  
            alignItems="center"
            style={{ marginTop: "20px" }} 
          >
            <Typography style={{fontFamily:"Roboto", fontWeight:500, textAlign:"center", fontSize:"14px", color:"#484848"}}>
              {"Event Month of August"}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    );
  }
  
}
