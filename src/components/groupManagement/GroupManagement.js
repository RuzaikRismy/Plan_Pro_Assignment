import React, { memo, useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box
} from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import classNames from "classnames";
import Input from '../common/material/Input';
import ConfirmationModal from "../common/ConfirmationModal";
import TableComponent from '../common/material/TableComponent';
import GroupCreationModal from "./modals/GroupCreationModal";
import Snackbar from "../common/Snackbar";

//BackEnd
import { http_Request } from "../../utils/HTTP_Request";

// Redux Integrations
import { saveClickedActivityData } from "../../actions/clickedActivitySaveAction";

// icons
import searchSvg from "../../assets/images/icons/search-icon.svg";
import viewIcon from '../../assets/icons/viewIcon.png';
import editIcon from '../../assets/icons/editIcon.png';
import closeIcon from '../../assets/icons/closeIcon.png';


// styles
import {GroupManagementStyle} from './GroupManagementStyle';
import { useStyles } from '../../assets/styles/styles';
import { styles } from '@material-ui/pickers/views/Clock/Clock';

const  GroupManagement= () => {
    const groupManagmentStyles = GroupManagementStyle();
    const dispatch = useDispatch();
    const classes = useStyles();

    const [searchInput, setSearchInput] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [allGroups, setAllGroups] = useState([]);
    const [actionMode, setActionMode] = useState('');
    const [pageRefresh, setPageRefresh] = useState(false);
    const [changesConfirmationModal, setChangesConfirmationModal] = React.useState(false);
    const [isModalSucceed, setIsModalSucceed] = React.useState(false);
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
        search: "",
    });

    //rest snack
    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };
  

    const groupManagementColumnData = [
        {
          id: 'groupName',
          name: "Group Name",
           width: '20%'
        },
        {
            id: 'groupCode',
            name: "Group Code",
             width: '20%'
        },
        {
            id: "groupStatus",
            name: "Status",
            width: '20%',
            template:{
                type: "twoLineTextFields",
                fieldList: [{
                    id: "groupStatus",
                    options: [
                        {
                            id: "groupStatus",
                            value: "Active",
                            conditionClass: groupManagmentStyles?.greenChip 
                        },
                        {
                            id: "groupStatus",
                            value: "Inactive",
                            conditionClass: groupManagmentStyles?.darkRedChip 
                        }
                    ]
                }]
            }
        },
        {
            id: "groupType",
            name: "Group Type",
             width: '20%',
            template:{
                type: "twoLineTextFields",
                fieldList: [{
                    id: "groupType",
                    options: [
                        {
                            id: "groupType",
                            value: "Corporate",
                            conditionClass: groupManagmentStyles?.orangeChip 
                        },
                        {
                            id: "groupType",
                            value: "Public",
                            conditionClass: groupManagmentStyles?.yellowChip 
                        },
                        {
                            id: "groupType",
                            value: "Private",
                            conditionClass: groupManagmentStyles?.blueChip 
                        }
                    ]
                }]
            }
        },
        {
          id: 'Actions',
          name: "Action",
           width: '20%',
          template: {
            type: 'clickableIconBlock',
            iconClickAction:((e) => { iconClickAction && iconClickAction(e)}),
            icons: [
              {
                id: 'view',
                name: 'View',
                iconLink: viewIcon,
                istoolTipArrow: false,
                iconClass: groupManagmentStyles?.pointerClass
              },
              {
                id: 'edit',
                name: 'Edit',
                iconLink: editIcon,
                istoolTipArrow: false,
                iconClass: groupManagmentStyles?.pointerClass
              },
              {
                id: 'delete',
                name: 'Delete',
                iconLink: closeIcon,
                istoolTipArrow: false,
                iconClass: groupManagmentStyles?.pointerClass
              }
            ]
          },
        }
    ];

    const iconClickAction = (event) => {
        let clickedId = event.target.id;
        let actionType = clickedId.split("_")[0];
        let activityId = clickedId.split("_")[1];
        let clickedGroup = allGroups?.filter(
          (singleGroup) => singleGroup?._id?.toString() == activityId
        );
        if (actionType === "view") {
            dispatch(saveClickedActivityData(clickedGroup[0]));
            setActionMode('view');
            setOpenModal(true);
         
        }else if(actionType == 'edit'){
            dispatch(saveClickedActivityData(clickedGroup[0]));
            setActionMode('edit');
            setOpenModal(true);
        }else if(actionType == 'delete'){
            deleteGroupHandler(activityId);
            // setChangesConfirmationModal(true);
        }
      };

      const deleteGroupHandler=(id, clickedGroup)=>{
        http_Request(
            {
              url: `http://localhost:5000/api/group-delete/${id}`,
              method: "DELETE",
            },
            function successCallback(response) {
              if ((response.status === 200)) {
                // alert("Group Deleted Successfully...!");
                setSnackVariant("success");
                setSnackText("Group is Deleted Successfully...!");
                setTimeout(() => {
                    setPageRefresh(!pageRefresh);
                },2000)
              }
            },
            function errorCallback(error) {
              console.log("Error", error);
              setSnackVariant("error");
              setSnackText("Group Deletion Failed...!");
            }
        )
    }

    React.useEffect(()=> {
        http_Request(
            {
              url: "http://localhost:5000/api/all-groups",
              method: "POST",
              bodyData: paginationData
            },
            function successCallback(response) {
                console.log(response,"Heloooooooo")
              if ((response.status === 200)) {
                    setAllGroups(response?.data?.groups);
                    setPaginationData(prev=>({...prev, totalElements:response?.data?.totalElements}))
              }
            },
            function errorCallback(error) {
              console.log("Error", error);
            }
        )
    },[pageRefresh, paginationData?.search, paginationData?.pageNo])
    console.log(allGroups,"allGroups")

    return ( 
        <> 
        <Grid container  xs={12} className={groupManagmentStyles?.dashboardContainer} >
         < Snackbar text={snackText} variant={snackVariant} reset={resetSnack}/>
            <Grid  item xs={12}>
                <Typography className={groupManagmentStyles?.groupCreationWordTypo}>{"Group Creation"}</Typography>
            </Grid>
            <Grid container item xs={12} style={{flexBasis:"94%", width:"90%", marginTop:"12px"}}>
                <Grid item xs={6} md={6} sm={6} style={{display:"flex", justifyContent:"flex-start"}}>
                    <Input
                        id={"searchGroup"}
                        value={paginationData?.search}
                        onChange={(e) => {
                            // setSearchInput(e?.target?.value);
                            setPaginationData(()=>({
                              ...paginationData,
                              search: e?.target?.value
                            }))
                        }}
                        className={groupManagmentStyles?.searchComponent}
                        startIcon={<img src={searchSvg} height={"20px"} width={"20px"} />}
                        variant="outlined"
                        placeHolder={"Search by Group Name or Code"}
                        size="medium"
                        autoComplete="off"
                        fullWidth="true"
                    />
                </Grid>
                <Grid item xs={6} md={6} sm={6} style={{display:"flex", justifyContent:"flex-end"}}>
                    <Button style={{backgroundColor:"#73BA42", color:"#FFFFFF", textTransform:"capitalize", padding:"0 20px 0 20px"}} onClick={(()=> setOpenModal(true))}>{"Create New Group"}</Button>
                </Grid>
            </Grid>

            <Grid  item xs={12} style={{flexBasis:"94%"}}>
                <Card elevation={0} style={{ marginTop: "20px"}}>
                    <CardContent style={{ padding: 0 }}>
                        <Grid container item xs={12}>
                            <TableComponent
                                classes={classes}
                                columns={groupManagementColumnData}
                                rows={allGroups}
                                uniqueField="_id"
                                pageNo={paginationData?.pageNo}
                                pageDataCount={paginationData?.pageSize}
                                isPagination={true}
                                apiHandlePagination={true}
                                datatotalCount={paginationData?.totalElements}
                                paginationClass={groupManagmentStyles?.paginationStyle}
                                handlePagination={(page) => { setPaginationData(prev => ({ ...prev, pageNo: page })) }}
                            />
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            {/* Modal Section */}
            <Grid container xs={12}>
                <GroupCreationModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    pageRefresh={pageRefresh}
                    setPageRefresh={setPageRefresh}
                    actionMode={actionMode}
                    setActionMode={setActionMode}
                />
            </Grid>
            {/* <ConfirmationModal
                classes={classes}
                isConfirmationModal={changesConfirmationModal}
                closeConfirmationAction={() => {
                setChangesConfirmationModal(false);
                }}
                modalConfirmAction={() => {
                deleteGroupHandler();
                setIsModalSucceed(true);
                setChangesConfirmationModal(false);
                setTimeout(() => setIsModalSucceed(false), 50);
                }}
                confirmationModalHeader="Delete Group"
                confirmationModalContent="Are You Sure You Want to Delete...!"
                noBtnId="redirectCancel"
                yesBtnId="redirectPage"
            /> */}
        </Grid>
        </>
     );
}
 
export default GroupManagement;