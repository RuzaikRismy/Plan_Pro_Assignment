import React, { memo, useEffect, useState } from 'react'
import {
  Grid,
} from "@material-ui/core";
import classNames from "classnames";

//BackEnd
import { http_Request } from "../../../utils/HTTP_Request";

// styles
import { useStyles } from '../../../assets/styles/styles';
import { AdminDashboardStyle } from './AdminDashboardStyle';

// widgets
import CurrentMonthEventWidget from './widgets/CurrentMonthEventWidget';
import TotalEventWidget from './widgets/TotalEventWidget';
import CircleProgressWidget from './widgets/CircleProgressWidget';
import NotificationHandler from './common/NotificationHandler';
import DonutChartWidget from "./widgets/DonutChartWidget";

const AdminDashboard = () => {

  const adminClasses = AdminDashboardStyle();
  const classes = useStyles();
  
  // states
  const [eventCount, setEventCount] = React.useState({});
  const [monthOfEvents, setMonthOfEvents] = React.useState({});
  const [groupCounts, setGroupCounts] = React.useState({});

  // to get all event counts
  React.useEffect(()=>{
    http_Request(
      {
        url: "http://localhost:5000/api/event-counts", 
        method: "GET",
      },
      function successCallback(response) {
        if ((response.status === 200 || response.status === 201)) {
            setEventCount(response?.data);
        }
      },
      function errorCallback(error) {
        console.log("Error", error);
      }
    )
  },[])

  // to get events month of current
  React.useEffect(()=>{
    http_Request(
      {
        url: "http://localhost:5000/api/month-event-counts", 
        method: "GET",
      },
      function successCallback(response) {
        if ((response.status === 200 || response.status === 201)) {
            setMonthOfEvents(response?.data);
        }
      },
      function errorCallback(error) {
        console.log("Error", error);
      }
    )
  },[])
  // to get group counts
  React.useEffect(()=>{
    http_Request(
      {
        url: "http://localhost:5000/api/group-counts", 
        method: "GET",
      },
      function successCallback(response) {
        if ((response.status === 200 || response.status === 201)) {
          setGroupCounts(response?.data);
        }
      },
      function errorCallback(error) {
        console.log("Error", error);
      }
    )
  },[])
  return (
    <div className={adminClasses?.dashboardContainer}>
      <Grid container xs={12} spacing={2}>
        {/* Left Section */}
        <Grid container item xs={12} md={8} lg={8} spacing={2}>
          <Grid item xs={12}>
            <CurrentMonthEventWidget
              eventCount={eventCount} 
            />
          </Grid>
          <Grid item xs={6}>
            <TotalEventWidget 
              groupCounts={groupCounts}
            />
          </Grid>
          <Grid item xs={6} alignItems="center">
            <CircleProgressWidget 
              progress={(monthOfEvents?.conferenceCount + monthOfEvents?.seminarCount + monthOfEvents?.workshopCount + monthOfEvents?.otherCount) / (monthOfEvents?.totalEvents) * 100}
              monthOfEvents={monthOfEvents}
            />
          </Grid>
          <Grid item xs={12}>
            <DonutChartWidget 
             eventCount={eventCount}
            />
          </Grid>
        </Grid>
        {/* Right Section */}
        <Grid container item xs={12} md={4} lg={4}> 
          <NotificationHandler/>
        </Grid>
      </Grid>

      </div>
  )
}

export default AdminDashboard;
