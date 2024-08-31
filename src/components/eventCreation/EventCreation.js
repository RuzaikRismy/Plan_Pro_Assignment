import React, { memo, useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import axios from 'axios';
import classNames from "classnames";
import { useSelector, useDispatch } from 'react-redux';
import Input from '../common/material/Input';
import TableComponent from '../common/material/TableComponent';
import Snackbar from "../common/Snackbar";
import NewEventCreationModal from "./modals/NewEventCreationModal";

//BackEnd
import { http_Request } from "../../utils/HTTP_Request";

// icons
import searchSvg from "../../assets/images/icons/search-icon.svg";
import viewIcon from '../../assets/icons/viewIcon.png';
import editIcon from '../../assets/icons/editIcon.png';
import closeIcon from '../../assets/icons/closeIcon.png';

// Redux Integrations
import { saveClickedEventData } from "../../actions/clickedEventAction";


// styles
import {EventCreationStyle} from './EventCreationStyle';
import { useStyles } from '../../assets/styles/styles';
import { styles } from '@material-ui/pickers/views/Clock/Clock';

const  EventCreation= () => {
    const eventCreationStyles = EventCreationStyle();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [searchInput, setSearchInput] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const [actionMode, setActionMode] = useState('');
    const [pageRefresh, setPageRefresh] = useState(false);
    const [snackText, setSnackText] = React.useState();
    const [snackVariant, setSnackVariant] = React.useState();
    /**
    |--------------------------------------------------
    | pagination data
    |--------------------------------------------------
    */
    const [paginationData, setPaginationData] = React.useState({
        pageNo: 1,
        pageSize: 8,
        search: ""
    });

    //rest snack
    const resetSnack = () => {
      setSnackText();
      setSnackVariant();
  };

    const groupManagementColumnData = [
        {
          id: 'eventTitle',
          name: "Event Title",
        },
        {
            id: 'eventDescription',
            name: "Description",
        },
        {
            id: 'dateAndtime',
            name: "Date & Time",
        },
        {
            id: 'location',
            name: "Venue",
        },
        {
            id: 'eventType',
            name: "Event Type",
            template:{
              type: "twoLineTextFields",
              fieldList: [{
                  id: "eventType",
                  options: [
                      {
                          id: "eventType",
                          value: "Conference",
                          conditionClass: eventCreationStyles?.outLineblueChip 
                      },
                      {
                          id: "eventType",
                          value: "Workshop",
                          conditionClass: eventCreationStyles?.outLineDarkYellowChip 
                      },
                      {
                        id: "eventType",
                        value: "Seminar",
                        conditionClass: eventCreationStyles?.outLineDarkGreenChip 
                    }
                  ]
              }]
          }
        },
        {
            id: 'eventStatus',
            name: "Status",
            template:{
              type: "twoLineTextFields",
              fieldList: [{
                  id: "eventStatus",
                  options: [
                      {
                          id: "eventStatus",
                          value: "On Going",
                          conditionClass: eventCreationStyles?.greenChip 
                      },
                      {
                          id: "eventStatus",
                          value: "Postpone",
                          conditionClass: eventCreationStyles?.orangeChip 
                      },
                      {
                        id: "eventStatus",
                        value: "Scheduled",
                        conditionClass: eventCreationStyles?.blueChip 
                    },
                    {
                      id: "eventStatus",
                      value: "Cancel",
                      conditionClass: eventCreationStyles?.darkRedChip 
                  }
                  ]
              }]
          }
        },
        {
          id: 'Actions',
          name: "Action",
          template: {
            type: 'clickableIconBlock',
            iconClickAction:((e) => { iconClickAction && iconClickAction(e)}),
            icons: [
              {
                id: 'view',
                name: 'View',
                iconLink: viewIcon,
                istoolTipArrow: false,
                iconClass: eventCreationStyles?.pointerClass
              },
              {
                id: 'edit',
                name: 'Edit',
                iconLink: editIcon,
                istoolTipArrow: false,
                iconClass: eventCreationStyles?.pointerClass
              },
              {
                id: 'delete',
                name: 'Delete',
                iconLink: closeIcon,
                istoolTipArrow: false,
                iconClass: eventCreationStyles?.pointerClass
              }
            ]
          },
        }
    ];
    const iconClickAction = (event) => {
        let clickedId = event.target.id;
        let actionType = clickedId.split("_")[0];
        let activityId = clickedId.split("_")[1];
        let clickedEvent = allEvents?.filter(
          (singleEvent) => singleEvent?._id?.toString() == activityId
        );
        if (actionType === "view") {
          dispatch(saveClickedEventData(clickedEvent[0]));
          setActionMode('view');
          setOpenModal(true);
         
        }else if(actionType == 'edit'){
          dispatch(saveClickedEventData(clickedEvent[0]));
          setActionMode('edit');
          setOpenModal(true);
        }else if(actionType == 'delete'){
            deleteEventHandler(activityId);
        }
      };

    const deleteEventHandler=(id)=>{
        http_Request(
            {
              url: `http://localhost:5000/api/event-delete/${id}`,
              method: "DELETE",
            },
            function successCallback(response) {
              if ((response.status === 200)) {
                // alert("Deleted...!")
                setSnackVariant("success");
                setSnackText("Event is Deleted Successfully...!");
                setTimeout(() => {
                    setPageRefresh(!pageRefresh);
                },2000)
              }
            },
            function errorCallback(error) {
              console.log("Error", error);
              setSnackVariant("error");
              setSnackText("Event Deletion Failed...!");
            }
        )
    }

    React.useEffect(()=> {
        http_Request(
            {
              url: "http://localhost:5000/api/event-allEvetnts",
              method: "POST",
              bodyData: paginationData
            },
            function successCallback(response) {
              if ((response.status === 200)) {
                let modifiedData = response?.data?.events?.map((singleEvent)=>({
                    ...singleEvent,
                    location : singleEvent?.eventVenue?.addressLine_one + ", " + singleEvent?.eventVenue?.addressLine_two,
                    date: new Date(singleEvent?.eventDate).toISOString().split('T')[0],
                    time: new Date(singleEvent?.eventDate).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
                    dateAndtime: new Date(singleEvent?.eventDate).toISOString().split('T')[0] + " " + new Date(singleEvent?.eventDate).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

                    }))
                    setAllEvents(modifiedData)
                    setPaginationData(prev=>({...prev, totalElements:response?.data?.totalElements}))
              }
            },
            function errorCallback(error) {
              console.log("Error", error);
            }
        )
    },[pageRefresh, paginationData?.pageNo, paginationData?.search]);
    console.log(allEvents,"paginationDatapaginationData")
    
    return ( 
        <> 
        <Grid container  xs={12} className={eventCreationStyles?.dashboardContainer} >
         < Snackbar text={snackText} variant={snackVariant} reset={resetSnack}/>
            <Grid  item xs={12}>
                <Typography className={eventCreationStyles?.groupCreationWordTypo}>{"Event Creation"}</Typography>
            </Grid>
            <Grid container item xs={12} style={{flexBasis:"94%", width:"90%", marginTop:"12px"}}>
                <Grid item xs={6} md={6} sm={6} style={{display:"flex", justifyContent:"flex-start"}}>
                    <Input
                        id={"searchEvent"}
                        value={paginationData?.search}
                        onChange={(e) => {
                            // setSearchInput(e?.target?.value);
                            setPaginationData(()=>({
                              ...paginationData,
                              search: e?.target?.value
                            }))
                        }}
                        className={eventCreationStyles?.searchComponent}
                        startIcon={<img src={searchSvg} height={"20px"} width={"20px"} />}
                        variant="outlined"
                        placeHolder={"Search by Event Title or Description"}
                        size="medium"
                        autoComplete="off"
                        fullWidth="true"
                    />
                </Grid>
                <Grid item xs={6} md={6} sm={6} style={{display:"flex", justifyContent:"flex-end"}}>
                    <Button style={{backgroundColor:"#73BA42", color:"#FFFFFF", textTransform:"capitalize", padding:"0 20px 0 20px"}} onClick={(()=> setOpenModal(true))}>{"Create New Event"}</Button>
                </Grid>
            </Grid>

            <Grid  item xs={12} style={{flexBasis:"94%"}}>
                <Card elevation={0} style={{ marginTop: "20px"}}>
                    <CardContent style={{ padding: 0 }}>
                        <Grid container item xs={12}>
                            <TableComponent
                                classes={classes}
                                columns={groupManagementColumnData}
                                rows={allEvents}
                                uniqueField="_id"
                                pageNo={paginationData?.pageNo}
                                pageDataCount={paginationData?.pageSize}
                                isPagination={true}
                                apiHandlePagination={true}
                                datatotalCount={paginationData?.totalElements}
                                paginationClass={eventCreationStyles?.paginationStyle}
                                handlePagination={(page) => { setPaginationData(prev => ({ ...prev, pageNo: page })) }}
                            />
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            {/* Modal Section */}
            <Grid container xs={12}>
                <NewEventCreationModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    actionMode={actionMode}
                    setActionMode={setActionMode}
                    pageRefresh={pageRefresh}
                    setPageRefresh={setPageRefresh}
                />
            </Grid>
        </Grid>
        </>
     );
}
 
export default EventCreation;