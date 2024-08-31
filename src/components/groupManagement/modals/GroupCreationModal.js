import React, { memo, useEffect, useState } from 'react'
import {
    Grid,
    Typography,
    Button,
    Box
  } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import classNames from "classnames";
import Input from '../../common/material/Input';
import DropDown from '../../common/material/DropDown';
import Snackbar from "../../common/Snackbar";
import { useSelector, useDispatch } from 'react-redux';

//BackEnd
import { http_Request } from "../../../utils/HTTP_Request";

// styles
import {GroupManagementStyle} from '../GroupManagementStyle';

// icons
import closeVectorIcon from "../../../assets/icons/closeVectorIcon.png"

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
        pageRefresh,
        setPageRefresh,
        actionMode,
        setActionMode
    } = props;

    const clickedGroupData = useSelector(
      (state) => state?.clickedActivityReducer?.clickedActivityData
    );

    const  modalStyle = GroupManagementStyle();
    const dispatch = useDispatch();
    const [userData, setUserData] = React.useState([]);

    // Snackbar states.
    const [snackText, setSnackText] = React.useState();
    const [snackVariant, setSnackVariant] = React.useState();
    const [groupCreationData, setGroupCreationData] = React.useState({
        groupId:"",
        groupName: "",
        groupCode: "",
        status: "",
        groupMembers: [],
        groupType:""
    });

    //rest snack
    const resetSnack = () => {
      setSnackText();
      setSnackVariant();
    };

    const handledChangeFieldFun =(event, field)=>{
        const { value } = event?.target;
        setGroupCreationData((prev)=>({
            ...groupCreationData,
            [field]: value
        }))
    }
    const handledChangeFieldFunnn =(event, field)=>{
      const { value } = event?.target;
      setGroupCreationData((prev)=>({
          ...groupCreationData,
          [field]: event?.target
      }))
  }

  const handleClose = () => {
    setOpenModal(false);
    setActionMode('');
  };

  const handleClearFields =()=> {
    setGroupCreationData({
        groupName: "",
        groupCode: "",
        status: "",
        groupMembers: [],
        groupType:""
    })
  }

  const handleSubmitData =()=>{
    const fullGroupMembers = groupCreationData?.groupMembers.map(memberId => {
      return userData.find(user => user.id === memberId);
    });
    let payload ={
        groupName: groupCreationData?.groupName,
        groupCode: groupCreationData?.groupCode,
        groupStatus: groupCreationData?.status,
        groupMembers: fullGroupMembers,
        groupType: groupCreationData?.groupType
      }
      if(groupCreationData?.groupName == ""){
        setSnackVariant("error");
        setSnackText("Group Name is Required...!");
        return
      }else if(groupCreationData?.groupCode == ""){
        setSnackVariant("error");
        setSnackText("Group Code is Required...!");
        return
      }else if(groupCreationData?.status == ""){
        setSnackVariant("error");
        setSnackText("Status is Required...!");
        return
      }else if(fullGroupMembers.length < 1){
        setSnackVariant("error");
        setSnackText("At lease One  Group Member is Required...!");
        return
      }else if(groupCreationData?.groupType == ""){
        setSnackVariant("error");
        setSnackText("Group Type is Required...!");
        return
      }
      if(actionMode !== "edit"){
        http_Request(
          {
            url: "http://localhost:5000/api/group-creation", 
            method: "POST",
            bodyData: payload
          },
          function successCallback(response) {
            if ((response.status === 200 || response.status === 201)) {
                // alert("Group Created...!")
                setSnackVariant("success");
                setSnackText(`${groupCreationData?.groupName} is Created Successfully...!`);
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
            setSnackText(`${groupCreationData?.groupName}  Creation Failed...!`);
          }
        )
      }else{
        let editPayload ={
          groupName: groupCreationData?.groupName,
          groupCode: groupCreationData?.groupCode,
          groupStatus: groupCreationData?.status,
          groupMembers: clickedGroupData?.groupMembers,
          groupType: groupCreationData?.groupType
        }
        http_Request(
          {
            url: `http://localhost:5000/api/group-update/${groupCreationData?.groupId}`, 
            method: "PUT",
            bodyData: editPayload
          },
          function successCallback(response) {
            if ((response.status === 200 || response.status === 201)) {
              setSnackVariant("success");
              setSnackText(`${groupCreationData?.groupName} is Updated Successfully...!`);
              setTimeout(() => {
                setOpenModal(false);
                setPageRefresh(!pageRefresh);
                setActionMode('');
            },2000)
            }
          },
          function errorCallback(error) {
            setSnackVariant("error");
            setSnackText(`${groupCreationData?.groupName}  Updation Failed...!`);
            console.log("Error", error);
          }
        )
      }
      // console.log(payload,"payloadpayload")
  }

  React.useEffect(()=> {
    http_Request(
        {
          url: "http://localhost:5000/api/all-users",
          method: "GET",
        },
        function successCallback(response) {
          console.log(response,"responseresponse")
          if ((response.status === 200)) {
            let modifiedData = response?.data?.map((singleUser)=>({
              id: singleUser?.userName,
              name: singleUser?.userName
            }))  
              setUserData(modifiedData);
          }
        },
        function errorCallback(error) {
          console.log("Error", error);
        }
    )
},[])

React.useEffect(()=>{
  if(actionMode == "view" || actionMode == "edit"){
    // console.log(clickedGroupData?.groupMembers?.map(member => member?.id),"AAAAAAAAAAA")
    setGroupCreationData({
        groupId: clickedGroupData?._id,
        groupName: clickedGroupData?.groupName,
        groupCode: clickedGroupData?.groupCode,
        status: clickedGroupData?.groupStatus,
        groupMembers: clickedGroupData?.groupMembers?.map(member => member?.name),
        groupType:clickedGroupData?.groupType
    })
  }else if(actionMode == ""){
    setGroupCreationData({
      groupId: "",
      groupName: "",
      groupCode: "",
      status: "",
      groupMembers: [],
      groupType:""
    })

  }
},[actionMode,clickedGroupData])

  console.log(userData,"groupCreationDatagroupMembers")

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
            Add New Group
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
                    <Typography className={modalStyle?.modalFieldsWordTypo}>{"Group Name"}</Typography>
                    <Input
                        id={"groupName"}
                        value={groupCreationData?.groupName}
                        onChange={(e) => handledChangeFieldFun(e, "groupName")}
                        variant="outlined"
                        placeHolder={"Group Name"}
                        size="small"
                        autoComplete="off"
                        fullWidth="true"
                        disabled={actionMode == "view"}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography className={modalStyle?.modalFieldsWordTypo}>{"Group Code"}</Typography>
                    <Input
                        id={"groupCode"}
                        value={groupCreationData?.groupCode}
                        onChange={(e) => handledChangeFieldFun(e, "groupCode")}
                        variant="outlined"
                        placeHolder={"Search by Group Name"}
                         size="small"
                        autoComplete="off"
                        fullWidth="true"
                        disabled={actionMode == "view"}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography className={modalStyle?.modalFieldsWordTypo}>{"Status"}</Typography>
                    <DropDown
                        id="status"
                        size="small"
                        variant="outlined"
                        value={groupCreationData?.status}
                        optionData={[
                        { id: "Active", name: "Active"},
                        { id: "Inactive", name: "Inactive"},
                        ]}
                        onChange={(e)=> handledChangeFieldFun(e,"status")}
                        // label={"Status"}
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
                <Grid item xs={12}>
                    <Typography className={modalStyle?.modalFieldsWordTypo}>{"Group Members"}</Typography>
                    <DropDown
                      id="groupMembers"
                      name={"groupMembers"}
                      size="small"
                      variant="outlined"
                      value={groupCreationData?.groupMembers ? groupCreationData?.groupMembers : []}
                      className={classNames(
                        modalStyle?.creationModalDropdown,
                        modalStyle?.addGuidePageDropdown
                      )}
                      handleChange={(e)=>handledChangeFieldFun(e,"groupMembers")}
                      optionData={userData}
                      multiple
                      displayEmpty
                      disabled={actionMode == "view"}
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
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography className={modalStyle?.modalFieldsWordTypo}>{"Group Type"}</Typography>
                    <DropDown
                        id="groupType"
                        size="small"
                        variant="outlined"
                        value={groupCreationData?.groupType}
                        optionData={[
                        { id: "Corporate", name: "Corporate"},
                        { id: "Private", name: "Private"},
                        { id: "Public", name: "Public"},
                        ]}
                        onChange={(e)=>handledChangeFieldFun(e,"groupType")}
                        // label={"Group Type"}
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
            </Grid>
            {actionMode !== "view" && 
            <Grid container xs={12} className={modalStyle.buttonsContainer} justify="flex-end" spacing={2}>
                  <Button variant="contained" className={modalStyle.clearButton} onClick={handleClearFields}>
                      {"Clear"}
                  </Button>
                  <Button variant="contained" className={modalStyle.addNewButton} onClick={handleSubmitData}>
                      {actionMode == "edit" ? "Update" : "Submit"}
                  </Button>
            </Grid>
            }
          
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}