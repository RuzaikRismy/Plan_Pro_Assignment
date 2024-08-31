import React, { useEffect } from 'react';
import './LayoutStyle.css';
  import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PermissionChecker from '../common/PermissionChecker';
// import ErrorBound from "../errorBoundary/ErrorBound";
import Main from "./Main";
import DashboardComponent from '../dasboards/DashboardComponent';
import SessionChecker from '../authorization/SessionChecker';

// planpro
import GroupManagement from '../groupManagement/GroupManagement';
import EventCreation from '../eventCreation/EventCreation';
import GoogleMap from "../dasboards/eventAdmin/common/GoogleMap";

 

const Layout = (props) =>  {
    /**
    |--------------------------------------------------
    | Redux Integration
    |--------------------------------------------------
    */
    const dispatch = useDispatch();

    // const { isRequestLoading, countryFlagsDialCodesData } = useSelector((state) => state.countryFlagsDialCodesData);
    
    const hospitalDeciderData = useSelector((state) => state.hospitalDeciderReducer);
    /**
    |--------------------------------------------------
    | Logged in state
    |--------------------------------------------------
    */
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);
    /**
    |--------------------------------------------------
    | Permission Array
    |--------------------------------------------------
    */
    const [permissionsArray, setPermissionsArray] = React.useState([])

    /**
    |--------------------------------------------------
    | On Layout mount or Unmount cleanup
    |--------------------------------------------------
    */
    useEffect(() => {
        setIsLoggedIn(prev=>localStorage.getItem("jwtToken") ? true : false);
        setPermissionsArray(prev=>localStorage.getItem("permissions") ? JSON.parse(localStorage.getItem("permissions")) : []);

        let loggedInUser = {
            id: 0
        }
        if(localStorage.getItem("userDetail")){
            loggedInUser = localStorage.getItem("userDetail") && JSON.parse(localStorage.getItem("userDetail"));
        }
        //reset dashboard status when logged in
        let dashStatus ={
            user: loggedInUser,
            dashboardName: "",
            clickedWidget: "",
            userPageLocation: 1,
            additionalData: false,
        }
    }, []);

    return (
        <div style={{ backgroundColor: "#E1E7F3", minHeight: "100vh" }}>
            <Main />
            {!isLoggedIn && <Redirect to="/"></Redirect>}
            <SessionChecker/>
            {/* <ErrorBound> */}
                <div>  
                 {/* <Routes> */}
                    <Route path="/exotic" exact component={DashboardComponent}/>
                    <PermissionChecker
                        permission={ 1000 }
                    >
                        {/* plan pro */}
                        <Route path="/exotic/groupCreation" component={GroupManagement}/>
                        <Route path="/exotic/eventCreation" component={EventCreation}/>
                        <Route path="/exotic/map" component={GoogleMap} />
                        
                    </PermissionChecker>
                {/* </Routes> */}
                </div>
            {/* </ErrorBound> */}
        </div>
    );
    
}

export default Layout;