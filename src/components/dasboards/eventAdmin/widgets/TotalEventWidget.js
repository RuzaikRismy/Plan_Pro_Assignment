import React, { memo, useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  makeStyles
} from "@material-ui/core";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
// import Input from '../common/material/Input';

//Component themes
const useStylesEventCreated = makeStyles((theme) => ({
    totalEventCount:{
        // width:"74px",
        fontFamily:"Roboto",
        fontWeight:700,
        fontSize:"45px",
        color:"#3F3F3F"
    },
    widgetMainHeadingTypo:{
        width:"200px",
        height:'45px',
        fontFamily:"Roboto",
        fontWeight:500,
        fontSize:"20px",
        // lineHeight:"75px",
        color:"#3F3F3F",
    },
    subCountNameTypo:{
        fontFamily:"Roboto",
        fontWeight:300,
        fontSize:"14px",
        color:"#000000"
    },
    greenActiveCountTypo:{
        fontFamily:"Roboto",
        fontWeight:700,
        fontSize:"36px",
        color:"#4CBB17"
    },
    redIActiveCountTypo:{
        fontFamily:"Roboto",
        fontWeight:700,
        fontSize:"36px",
        color:"#D53600"
    },
}));


function TotalEventWidget(props) {

    const {
        groupCounts
    } = props;

    const eventWidgetStyle = useStylesEventCreated();

  return (
    <div>
        <Card elevation={0}>
            <CardContent>
                <Grid container xs={12}>
                    <Grid item xs={4}>
                        <Typography className={eventWidgetStyle?.totalEventCount}>{groupCounts?.totalCount}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={eventWidgetStyle?.widgetMainHeadingTypo}>{"Total Group Created"}</Typography>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <Grid container xs={12} style={{ borderTop: '1px solid #F2F2F2', paddingTop: '15px' }}>
                    <Grid item  xs={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justify:"flex-start" }}>
                        <Typography className={eventWidgetStyle?.greenActiveCountTypo}>{groupCounts?.activeCount}</Typography>
                        <Typography className={eventWidgetStyle?.subCountNameTypo}>{"Active"}</Typography>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justify:"flex-end" }}>
                        <Typography className={eventWidgetStyle?.redIActiveCountTypo}>{groupCounts?.inactiveCount}</Typography>
                        <Typography className={eventWidgetStyle?.subCountNameTypo}>{"Inactive"}</Typography>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
      
    </div>
  )
}

export default TotalEventWidget
