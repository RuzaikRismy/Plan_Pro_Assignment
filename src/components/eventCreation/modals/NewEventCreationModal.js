import React, { memo, useEffect, useState } from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    FormControlLabel
  } from "@material-ui/core";
  import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import classNames from "classnames";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import TextAreaComponent from '../../common/TextAreaComponent';
// import CloseIcon from '@mui/icons-material/Close';
import Input from '../../common/material/Input';
import DropDown from '../../common/material/DropDown';
import Snackbar from "../../common/Snackbar";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
    DatePicker,
  } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import {EventCreationStyle} from '../EventCreationStyle';

//BackEnd
import { http_Request } from "../../../utils/HTTP_Request";

// icons
import closeVectorIcon from "../../../assets/icons/closeVectorIcon.png"
import plainCalendar from "../../../assets/images/icons/calendar_plain.svg";
import { boolean } from 'yup';
import { GridOnOutlined } from '@material-ui/icons';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs(props) {
    const {
        openModal,
        setOpenModal,
        actionMode,
        setActionMode,
        pageRefresh,
        setPageRefresh
    } = props;

    const  modalStyle = EventCreationStyle();

    const clickedGroupData = useSelector(
      (state) => state?.saveClickedEventReducer?.clickedEventData
    );

    console.log(clickedGroupData,"clickedGroupDataclickedGroupData")

     // Snackbar states.
    const [snackText, setSnackText] = React.useState();
    const [snackVariant, setSnackVariant] = React.useState();
    const [radioValue, setRadioValue] = React.useState('group');
    const [eventCreationData, setEventCreationData] = React.useState({
        eventId: "",
        eventTitle: "",
        eventDescription: "",
        eventDate: null,
        eventVenue: {
          addressLine_one:"",
          addressLine_two:""
        },
        eventType:"",
        publicEvent: "",
        status:"",
        inviteBy: radioValue,
        groupMembers:[],
    });
    const [individualMembers, setIndividualMembers] = React.useState([]);
    const [allGroupMembers, setAllGroupMembers] = React.useState([]);
      const [addEventDates, setEventDates] = React.useState({
        startDate: null,
      });

    //rest snack
    const resetSnack = () => {
      setSnackText();
      setSnackVariant();
    };

    // const handledChangeFieldFun =(event, field)=>{
    //     const { value } = event?.target;
    //     setEventCreationData((prev)=>({
    //         ...eventCreationData,
    //         [field]: value
    //     }))
    // }

    const handledChangeFieldFun = (e, field) => {
      const { name, value } = e.target;
    
      if (field === 'eventVenue') {
        setEventCreationData((prevState) => ({
          ...prevState,
          eventVenue: {
            ...prevState.eventVenue,
            [name]: value,
          },
        }));
      } else {
        setEventCreationData((prevState) => ({
          ...prevState,
          [field]: value,
        }));
      }
    };
    

    const handleRequestFilterDateChange = (value, filterType) => {
      setEventDates((prev) => ({ ...prev, [filterType]: value }));
    };
    const handleChange = (event) => {
        setRadioValue(event.target.value);
    };

  const handleClose = () => {
    setOpenModal(false);
    setActionMode('');
  };

  const handleClearFields =()=> {
    setEventCreationData({
      eventId: "",
      eventTitle: "",
      eventDescription: "",
      eventDate: null,
      eventVenue: {},
      eventType:"",
      publicEvent: "",
      status:"",
      inviteBy: radioValue,
      groupMembers:[],
      addressLine_one:"",
      addressLine_two:""
    })
    setEventDates(()=>({
      ...addEventDates,
      startDate: null
    }))
  }

  const handleCreateEvent =()=>{
    const individialMembers = eventCreationData?.groupMembers.map(memberId => {
      return individualMembers.find(user => user.id === memberId);
    });
    const fullGroupMembers = eventCreationData?.groupMembers.map(memberId => {
      return allGroupMembers.find(user => user.id === memberId);
    }); 

    let payload ={
      eventTitle: eventCreationData?.eventTitle,
      eventDescription: eventCreationData?.eventDescription,
      eventDate: addEventDates?.startDate,
      // eventVenue: eventCreationData?.eventVenue,
      addressLine_two:eventCreationData?.addressLine_one,
      eventVenue:{
          addressLine_one: eventCreationData?.eventVenue?.addressLine_one,
          addressLine_two: eventCreationData?.eventVenue?.addressLine_two
      },
      eventType: eventCreationData?.eventType,
      publicEvent: eventCreationData?.publicEvent,
      eventStatus:eventCreationData?.status,
      inviteBy: eventCreationData?.inviteBy || radioValue,
      groupMembers: radioValue == "individual" ?  individialMembers : fullGroupMembers,
    }
    if(eventCreationData?.eventTitle == ""){
      setSnackVariant("error");
      setSnackText("Event Title is Required...!");
      return
    }else if(addEventDates?.startDate == null){
      setSnackVariant("error");
      setSnackText("Event Date is Required...!");
      return
    }else if(eventCreationData?.eventDescription == ""){
      setSnackVariant("error");
      setSnackText("Event Description is Required...!");
      return
    }else if(eventCreationData?.eventVenue?.addressLine_one == ""){
      setSnackVariant("error");
      setSnackText("Address Line One is Required...!");
      return
    }else if(eventCreationData?.eventVenue?.addressLine_two == ""){
      setSnackVariant("error");
      setSnackText("Address Line Two is Required...!");
      return
    }else if(eventCreationData?.eventType == ""){
      setSnackVariant("error");
      setSnackText("Event Type is Required...!");
      return
    }else if(eventCreationData?.publicEvent == ""){
      setSnackVariant("error");
      setSnackText("Public Event is Required...!");
      return
    }else if(eventCreationData?.status == ""){
      setSnackVariant("error");
      setSnackText("Status is Required...!");
      return
    }else if(radioValue == "individual" ?  individialMembers.length < 1 : fullGroupMembers.length < 1){
      setSnackVariant("error");
      setSnackText(radioValue == "individual" ? "At Least One Member is Required...!" : "At Least One Group is Required...!");
      return
    }
    if(actionMode !== "edit"){
      http_Request(
        {
          url: "http://localhost:5000/api/event-creation", 
          method: "POST",
          bodyData: payload
        },
        function successCallback(response) {
          if ((response.status === 200 || response.status === 201)) {
              // alert("Event Created");
              console.log(payload,"payloadpayload")
              setSnackVariant("success");
              setSnackText(`${eventCreationData?.eventTitle} is Created Successfully...!`);
              setTimeout(() => {
                setOpenModal(false);
                setPageRefresh(!pageRefresh);
                setActionMode('');
            },2000)
              
          }
        },
        function errorCallback(error) {
          console.log("Error", error);
          setSnackVariant("error");
          setSnackText(`${eventCreationData?.eventTitle}  Creation Failed...!`);
        }
      )
    }else{
      const individialMembers = eventCreationData?.groupMembers.map(memberId => {
        return individualMembers.find(user => user.id === memberId);
      });
      const fullGroupMembers = eventCreationData?.groupMembers.map(memberId => {
        return allGroupMembers.find(user => user.id === memberId);
      });
      let ediPayload ={
        eventTitle: eventCreationData?.eventTitle,
        eventDescription: eventCreationData?.eventDescription,
        eventDate: new Date(addEventDates?.startDate),
        // eventVenue: eventCreationData?.eventVenue,
        eventVenue:{
          addressLine_one: eventCreationData?.eventVenue?.addressLine_one,
          addressLine_two: eventCreationData?.eventVenue?.addressLine_two
      },
        eventType: eventCreationData?.eventType,
        publicEvent: eventCreationData?.publicEvent,
        eventStatus:eventCreationData?.status,
        inviteBy: eventCreationData?.inviteBy,
        groupMembers: clickedGroupData?.groupMembers,
      }
      http_Request(
        {
          url: `http://localhost:5000/api/event-update/${eventCreationData?.eventId}`, 
          method: "PUT",
          bodyData: ediPayload
        },
        function successCallback(response) {
          if ((response.status === 200 || response.status === 201)) {
            setSnackVariant("success");
            setSnackText(`${eventCreationData?.eventTitle} is Updated Successfully...!`);
            setTimeout(() => {
              setOpenModal(false);
              setPageRefresh(!pageRefresh);
              setActionMode('');
          },2000)
              
              // alert("Event Updated")
              // console.log(actionMode,eventCreationData?.eventId,payload,"AAAAAAAAAAAA")
          }
        },
        function errorCallback(error) {
          setSnackVariant("error");
          setSnackText(`${eventCreationData?.eventTitle}  Updation Failed...!`);
          console.log("Error", error);
        }
      )
    }

  }

  React.useEffect(()=>{
    if(actionMode == "view" || actionMode == "edit"){
      setEventCreationData({
        eventId: clickedGroupData?._id,
        eventTitle: clickedGroupData?.eventTitle,
        eventDescription: clickedGroupData?.eventDescription,
        // eventVenue: clickedGroupData?.groupCode,
        eventVenue: {
          addressLine_one: clickedGroupData?.eventVenue?.addressLine_one,
          addressLine_two: clickedGroupData?.eventVenue?.addressLine_two
        },
        eventType: clickedGroupData?.eventType,
        publicEvent: clickedGroupData?.publicEvent,
        status: clickedGroupData?.eventStatus,
        inviteBy: clickedGroupData?.inviteBy,
        groupMembers: clickedGroupData?.groupMembers?.map(member => member?.name)
      })
      setEventDates({
        ...addEventDates,
        startDate: new Date(clickedGroupData?.eventDate)
      })
    }else if(actionMode == ""){
      setEventCreationData({
        eventId: "",
        eventTitle: "",
        eventDescription: "",
        // eventVenue: clickedGroupData?.groupCode,
        eventVenue: {
          addressLine_one: "",
          addressLine_two: ""
        },
        eventType: "",
        publicEvent: "",
        status: "",
        inviteBy: "",
        groupMembers:[],
      })
      setEventDates({
        ...addEventDates,
        startDate: null
      })
      
    }
  },[actionMode, clickedGroupData])
  
  // to get all groups
  React.useEffect(()=>{
    http_Request(
      {
        url: "http://localhost:5000/api/all-groups", 
        method: "POST",
        bodyData: {
           page: 1,
           limit: 10,
           searc: ""
        }
      },
      function successCallback(response) {
        if ((response.status === 200 || response.status === 201)) {
          let modifiedData = response?.data?.groups?.map((group)=>({
            id: group?.groupName,
            name: group?.groupName
          }))
            setAllGroupMembers(modifiedData)
        }
      },
      function errorCallback(error) {
        console.log("Error", error);
      }
    )
  },[])

  // to get all users
  React.useEffect(()=>{
    http_Request(
      {
        url: "http://localhost:5000/api/all-users", 
        method: "GET",
      },
      function successCallback(response) {
        if ((response.status === 200 || response.status === 201)) {
          let modifiedData = response?.data?.map((user)=>({
            id: user?.userName,
            name: user?.userName
          }))
          setIndividualMembers(modifiedData)
        }
      },
      function errorCallback(error) {
        console.log("Error", error);
      }
    )
  },[])
  

  console.log(eventCreationData,"eventCreationData")
  console.log(actionMode,radioValue,"actionMode")

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModal}
         maxWidth="lg"
         fullWidth={true}
      >
        <DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title" style={{backgroundColor:"#2C3E50", color:"#FED606", fontSize:"18px"}}>
            Add New Event
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 20,
            top: 10,
          }}
        >
          <img src={closeVectorIcon} alt="closeIcon" width="15" height="15" />
        </IconButton>
        <DialogContent dividers>
            <Grid container xs={12} spacing={2}>
            < Snackbar text={snackText} variant={snackVariant} reset={resetSnack}/>
                <Grid item xs={4}>
                    <Typography className={modalStyle?.modalFieldsWordTypo}>{"Event Title"}</Typography>
                    <Input
                        id={"eventTitle"}
                        value={eventCreationData?.eventTitle}
                        onChange={(e) => handledChangeFieldFun(e, "eventTitle")}
                        variant="outlined"
                        placeHolder={"Title"}
                         size="small"
                        autoComplete="off"
                        fullWidth="true"
                        disabled={actionMode == "view"}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography className={modalStyle?.modalFieldsWordTypo}>{"Event Date"}</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        className={classNames(
                        //   adminClasses.startDatePickerFilter
                        )}
                        format="dd/MM/yyyy"
                        mask={"__/__/____"}
                        name="event date"
                        id="guideSince"
                        fullWidth
                        minDate={new Date()}
                        minDateMessage={""}
                        onChange={(date) => {
                          handleRequestFilterDateChange(date, "startDate");
                        }}
                        variant="inline"
                        value={addEventDates?.startDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        keyboardIcon={
                          <img
                            alt="start date"
                            src={plainCalendar}
                            height={20}
                          />
                        }
                        InputAdornmentProps={{
                          position: "end",
                          title: "Search by Date",
                          "aria-label": "Search by Date",
                          "aria-labelledby": "Search by Date",
                        }}
                        inputVariant={"outlined"}
                        placeholder={"DD/MM/YYYY"}
                        margin={"dense"}
                        disabled={actionMode == "view"}
                      />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={modalStyle?.modalFieldsWordTypo}>{"Event Description"}</Typography>
                      {/* <div className="row">
                          <div className="col-lg-12">
                              <TextAreaComponent
                                  IsEditMode={ true }
                                  textAreaClass="form-control"
                                  parentClass = ""
                                  textAreaId="description"
                                  textRows="4"
                                  textAreaCols="18"
                                  textAreaName="description"
                                  textAreaPlaceholder={"Description"}
                                  labelClass = "label"
                                  textAreaValue={eventCreationData?.eventDescription}
                                  defaultValue={eventCreationData?.eventDescription}
                                  onChange={(e) => handledChangeFieldFun(e, "eventDescription")}
                              />
                          </div>
                      </div> */}
                      <Input
                        id={"eventDescription"}
                        value={eventCreationData?.eventDescription}
                        onChange={(e) => handledChangeFieldFun(e, "eventDescription")}
                        variant="outlined"
                        placeHolder={"Title"}
                         size="small"
                        autoComplete="off"
                        fullWidth="true"
                        disabled={actionMode == "view"}
                    />
                </Grid>
                <Grid item container xs={6} direction="column" style={{ display: "flex", justifyContent: "flex-start" }}>
                  <Typography className={modalStyle?.modalFieldsWordTypo} style={{ marginBottom: "2px" }}>
                    {"Venue"}
                  </Typography>
                  
                  <Grid container item direction="row" style={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid item style={{ flex: 1, marginRight: "10px" }}>
                      <Input
                        id={"eventVenue1"}
                        name="addressLine_one"
                        value={eventCreationData?.eventVenue?.addressLine_one}
                        onChange={(e) => handledChangeFieldFun(e, "eventVenue")}
                        variant="outlined"
                        placeHolder={"Address Line 1"}
                         size="small"
                        autoComplete="off"
                        fullWidth={true}
                        disabled={actionMode === "view"}
                      />
                    </Grid>
                    
                    <Grid item style={{ flex: 1 }}>
                      <Input
                        id={"eventVenue2"}
                        name="addressLine_two"
                        value={eventCreationData?.eventVenue?.addressLine_two}
                        onChange={(e) => handledChangeFieldFun(e, "eventVenue")}
                        variant="outlined"
                        placeHolder={"Address Line 2"}
                         size="small"
                        autoComplete="off"
                        fullWidth={true}
                        disabled={actionMode === "view"}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Typography className={modalStyle?.modalFieldsWordTypo}>{"Event Type"}</Typography>
                    <DropDown
                        id="groupType"
                        size="small"
                        variant="outlined"
                        value={eventCreationData?.eventType}
                        optionData={[
                        { id: "Conference", name: "Conference"},
                        { id: "Workshop", name: "Workshop"},
                        { id: "Seminar", name: "Seminar"},
                        ]}
                        onChange={(e)=>handledChangeFieldFun(e,"eventType")}
                        label={ actionMode !=="view" && "Group Type"}
                        disabled={actionMode == "view"}
                        // className={classNames(
                        // browserClasses.bedCreationModalDropdown,
                        // browserClasses.requiredField
                        // )}
                        // required={true}
                        // error={formErrors.bedStatus}
                        // helperText={formErrors.bedStatus && getLabel({ module: "bedBrowser", label: "bedStatusIsRequied" })}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography className={modalStyle?.modalFieldsWordTypo}>{"Public Event"}</Typography>
                    <DropDown
                        id="groupType"
                        size="small"
                        variant="outlined"
                        value={eventCreationData?.publicEvent}
                        optionData={[
                        { id: "Yes", name: "Yes"},
                        { id: "No", name: "No"},
                        ]}
                        onChange={(e)=>handledChangeFieldFun(e,"publicEvent")}
                        label={actionMode !=="view" && "Select Event"}
                        disabled={actionMode == "view"}
                        // className={classNames(
                        // browserClasses.bedCreationModalDropdown,
                        // browserClasses.requiredField
                        // )}
                        // required={true}
                        // error={formErrors.bedStatus}
                        // helperText={formErrors.bedStatus && getLabel({ module: "bedBrowser", label: "bedStatusIsRequied" })}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography className={modalStyle?.modalFieldsWordTypo}>{"Status"}</Typography>
                    <DropDown
                        id="groupType"
                        size="small"
                        variant="outlined"
                        value={eventCreationData?.status}
                        optionData={[
                        { id: "On Going", name: "On Going"},
                        { id: "Postpone", name: "Postpone"},
                        { id: "Cancel", name: "Cancel"},
                        ]}
                        onChange={(e)=>handledChangeFieldFun(e,"status")}
                        label={actionMode !=="view" && "Group Type"}
                        disabled={actionMode == "view"}
                        // className={classNames(
                        // browserClasses.bedCreationModalDropdown,
                        // browserClasses.requiredField
                        // )}
                        // required={true}
                        // error={formErrors.bedStatus}
                        // helperText={formErrors.bedStatus && getLabel({ module: "bedBrowser", label: "bedStatusIsRequied" })}
                    />
                </Grid>
                <Grid item xs={4}>
                <   Typography className={modalStyle?.modalFieldsWordTypo}>{"Invite By"}</Typography>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="groupType" name="groupType" value={radioValue} onChange={handleChange} row>
                            <FormControlLabel value="group" control={<Radio />} label="Group" />
                            <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                <Typography className={modalStyle?.modalFieldsWordTypo}>{radioValue == "group" ? "Group" : "Individual Members"}</Typography>
                {radioValue == "group" &&
                    <DropDown
                    id="groupMembers"
                    name={"groupMembers"}
                    size="small"
                    variant="outlined"
                    value={eventCreationData?.groupMembers ?eventCreationData?.groupMembers : []}
                    className={classNames(
                    modalStyle?.creationModalDropdown,
                    modalStyle?.addGuidePageDropdown
                    )}
                    handleChange={(e)=>handledChangeFieldFun(e,"groupMembers")}
                    optionData={allGroupMembers}
                    multiple
                    displayEmpty
                //   error={formErrors?.guideLanguage}
                    renderValue={(selected) => {
                    if (Array.isArray(selected)) {
                        let dropdownValues = selected?.join(", ");
                        return selected?.length === 0 ? (
                        <Typography style={{color:"#ACACAC"}}>{"Select Group"}</Typography>
                        ) : (
                        <Typography>{dropdownValues}</Typography>
                        );
                    }
                    }}
                    disabled={actionMode == "view"}
                    />
                }
                {radioValue == "individual" &&
                    <DropDown
                    id="individualMembers"
                    name={"individualMembers"}
                    size="small"
                    variant="outlined"
                    value={eventCreationData?.groupMembers ? eventCreationData?.groupMembers : []}
                    className={classNames(
                    modalStyle?.creationModalDropdown,
                    modalStyle?.addGuidePageDropdown
                    )}
                    handleChange={(e)=>handledChangeFieldFun(e,"groupMembers")}
                    optionData={individualMembers}
                    multiple
                    displayEmpty
                //   error={formErrors?.guideLanguage}
                    renderValue={(selected) => {
                    if (Array.isArray(selected)) {
                        let dropdownValues = selected?.join(", ");
                        return selected?.length === 0 ? (
                        <Typography style={{color:"#ACACAC"}}>{"Select Members"}</Typography>
                        ) : (
                        <Typography>{dropdownValues}</Typography>
                        );
                    }
                    }}
                    disabled={actionMode == "view"}
                    />
                }
                </Grid>
            </Grid>
            {actionMode !== "view" &&
              <Grid container xs={12} className={modalStyle.buttonsContainer} justify="flex-end" spacing={2}>
                  <Button variant="contained" className={modalStyle.clearButton} onClick={handleClearFields}>
                      {"Clear"}
                  </Button>
                  <Button variant="contained" className={modalStyle.addNewButton} onClick={handleCreateEvent}>
                      {actionMode == "edit" ? "Edit" : "Save"}
                  </Button>
              </Grid>
            }
          
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}