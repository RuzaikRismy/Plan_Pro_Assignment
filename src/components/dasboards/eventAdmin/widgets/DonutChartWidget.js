import React, { memo, useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { CanvasJSChart } from "canvasjs-react-charts";
import { useTheme } from "@material-ui/core/styles";
import {AdminDashboardStyle} from '../AdminDashboardStyle';

const DonutChartWidget = (props) => {
  const {
    eventCount
  } = props;

  const adminStyle = AdminDashboardStyle();
  const theme = useTheme();

  const options = {
    animationEnabled: true,
    data: [
      {
        type: "doughnut",
        cursor: "pointer",
        showInLegend: false,
        indexLabel: "{name} {y}",
        yValueFormatString: "#,###",
        radius: "80%",
        innerRadius: "70%",
        dataPoints: [
          {
            name:"Conference",
            y: eventCount?.conferenceCount,
            color: theme.palette.lightGreen.dark,
          },
          {
            name:"Seminar",
            y: eventCount?.seminarCount,
            color: theme.palette.doughnutCharts.purple,
          },
          {
            name: "Workshop",
            y: eventCount?.workshopCount,
            color: theme.palette.doughnutCharts.orange,
          },
          {
            name:"Others",
            y: eventCount?.otherCount == null ? 0 : eventCount?.otherCount,
            color: theme.palette.border.ash,
          },
        ],
        indexLabelFontColor: theme.palette.grey.light,
        indexLabelFontSize: 10,
        indexLabelFontFamily: "Roboto",
        indexLabelFontWeight: "bold",
      },
    ],
    height: 190,
  };
  return (
    <Card>
        <CardContent>
            <Grid className={adminStyle?.donutChart}>
                <Grid container xs={12}>
                    <Typography style={{fontFamily:"Roboto", fontWeight:500, fontSize:"20px", color:"#3F3F3F"}}>
                        {"Events Variations Month of August"}
                    </Typography>
                </Grid>
                <CanvasJSChart options={options} />
            </Grid>
        </CardContent>
    </Card>
  );
};

export default React.memo(DonutChartWidget);
