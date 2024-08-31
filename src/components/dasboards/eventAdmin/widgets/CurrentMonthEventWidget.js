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
const useStylesEventMonth = makeStyles((theme) => ({
    eventCount: {
        fontFamily:"Roboto",
        fontWeight:700,
        fontSize:"45px",
        color:"#3F3F3F"
    },
    widgetMainHeadingTypo:{
        fontFamily:"Roboto",
        fontWeight:500,
        fontSize:"20px",
        color:"#3F3F3F",
        display:"flex",
        justifyItems:"center"
    },
    redCountTypo:{
        fontFamily:"Roboto",
        fontWeight:700,
        fontSize:"36px",
        color:"#D53600"
    },
    subCountNameTypo:{
        fontFamily:"Roboto",
        fontWeight:300,
        fontSize:"14px",
        color:"#000000",
        alignContent:"center",
    },
    orangeCountTypo:{
        fontFamily:"Roboto",
        fontWeight:700,
        fontSize:"36px",
        color:"#FEB204"
    },
    greenCountTypo:{
        fontFamily:"Roboto",
        fontWeight:700,
        fontSize:"36px",
        color:"#4CBB17"
    },
    lightBlueCountTypo:{
        fontFamily:"Roboto",
        fontWeight:700,
        fontSize:"36px",
        color:"#0486FE"
    },
}));


function CurrentMonthEventWidget(props) {
    const {
        eventCount
    } = props

    const eventWidgetStyle = useStylesEventMonth();

  return (
    <div>
        <Card elevation={0}>
            <CardContent>
                <Grid container xs={12}>
                    <Grid item xs={2}>
                        <Typography className={eventWidgetStyle?.eventCount}>{eventCount?.totalEvents}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={eventWidgetStyle?.widgetMainHeadingTypo}>{"Total Number of Events"}</Typography>
                    </Grid>
                    <Grid item xs={6}></Grid>
                </Grid>
                <Grid container xs={12} style={{ borderTop: '1px solid #F2F2F2' , paddingTop:"15px"}}>
                    <Grid item xs={3}>
                        <Typography className={eventWidgetStyle?.redCountTypo}>{eventCount?.conferenceCount}</Typography>
                        <Typography className={eventWidgetStyle?.subCountNameTypo}>{"Conference"}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography className={eventWidgetStyle?.orangeCountTypo}>{eventCount?.seminarCount}</Typography>
                        <Typography className={eventWidgetStyle?.subCountNameTypo}>{"Seminar"}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography className={eventWidgetStyle?.greenCountTypo}>{eventCount?.workshopCount}</Typography>
                        <Typography className={eventWidgetStyle?.subCountNameTypo}>{"Workshop"}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography className={eventWidgetStyle?.lightBlueCountTypo}>{eventCount?.otherCount == null ? 0 : eventCount?.otherCount}</Typography>
                        <Typography className={eventWidgetStyle?.subCountNameTypo}>{"Others"}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
      
    </div>
  )
}

export default CurrentMonthEventWidget
