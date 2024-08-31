import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const GaugeChart = (props) => {
  const {
    backgroundColPercentage,
    backgroundColInner,
    backgroundColOuter,
    gaugeWidth,
    gaugeHeight,
    transformValue,
    label,
    labelFontSize,
  } = props;
  /**
    |--------------------------------------------------
    | Default Props
    |--------------------------------------------------
    */
  GaugeChart.defaultProps = {
    backgroundColPercentage: "#FFBE0B",
    backgroundColInner: "#fff",
    backgroundColOuter: "#E8E8E8",
    gaugeWidth: 100,
    gaugeHeight: 50,
    transformValue: 10,
    label: null,
    labelFontSize: 10,
  };

  const useStyles = makeStyles(() => ({
    gauge: {
      position: "relative",
      borderRadius: "50%/100% 100% 0 0",
      overflow: "hidden",
      width: gaugeWidth,
      height: gaugeHeight,
      transform: "rotate(0deg)",
      background: backgroundColPercentage,
      "&:before": {
        content: "",
        display: "block",
        paddingTop: "50%",
      },
      "& .mask": {
        position: "absolute",
        left: "20%",
        right: "20%",
        bottom: "0",
        top: "40%",
        backgroundColor: backgroundColInner,
        borderRadius: "50%/100% 100% 0 0",
      },

      "& .percentage": {
        position: "absolute",
        top: " -1px",
        left: "-1px",
        bottom: 0,
        right: "-1px",
        transform: `rotate(${transformValue}deg)`,
        transformOrigin: "bottom center",
        transitionDuration: 600,
      },
      "& .value": {
        position: "absolute",
        bottom: "0%",
        left: "0",
        width: "100%",
        textAlign: "center",
        fontSize: labelFontSize,
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.gauge}>
      <div
        className="percentage"
        style={{ backgroundColor: backgroundColOuter }}
      ></div>
      <div className="mask"></div>
      <span className="value">{label}</span>
    </div>
  );
};

export default React.memo(GaugeChart);
