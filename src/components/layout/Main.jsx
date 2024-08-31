import React, { useMemo } from "react";
import { Redirect } from "react-router-dom";
import { useTheme, withStyles } from "@material-ui/core/styles";
import PermissionChecker from "../common/PermissionChecker";
import { permissionValidator } from "../../utils/permissionValidator"
import clsx from "clsx";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Grid,
  Typography,
  useMediaQuery,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import { getLabel } from "../../utils/localization";
import ConfirmationModal from "../common/ConfirmationModal";
import DrawerButton from "./DrawerButton";
import {
  dashboardSvg,
  goldColorDashboardSvG,
  groupManagementSvg,
  goldGroupManagementSvg,
  eventCreationSvg,
  goldEventCreationSvg
} from "./svgIcons";

import { layoutStyles } from "./layoutStyles";
import { useStyles } from "../../assets/styles/styles";
import { cloneDeep } from "lodash";
import DrawerMenuButton from "./DrawerMenuButton";


const Main = (props) => {
 
  const isChangesOccured = true;
  /**
    |--------------------------------------------------
    | material ui styles and use theme
    |--------------------------------------------------
  */
  const classes = layoutStyles();
  const commonclasses = useStyles();
  const theme = useTheme();

  /**
     |--------------------------------------------------
    | drawer open and close state and functions
    |--------------------------------------------------
    */
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  /**
     |--------------------------------------------------
    | Responsiveness  
    |--------------------------------------------------
    */
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const matches2 = useMediaQuery(theme.breakpoints.up("md"));

  /**
     |--------------------------------------------------
    | set active tab
    |--------------------------------------------------
    */
  const [active, setActive] = React.useState(
    window.location.pathname.toString().replace("/main/", "")
  );

  const [appTopbarMenuState, setAppTopbarMenuState] = React.useState(null);

  const handleClick = (event) => {
    setAppTopbarMenuState(event.currentTarget);
  };

  const handleClose = () => {
    setAppTopbarMenuState(null);
  };

  /**
     |--------------------------------------------------
    | state for handle permission and others drawer
    |--------------------------------------------------
    */

  const [permissionArray, setPermissionArray] = React.useState([]);
  const [changesConfirmationModal, setChangesConfirmationModal] = React.useState(false);
  const [clickedLink, setClickedLink] = React.useState("");
  const [isModalSucceed, setIsModalSucceed] = React.useState(false);


  React.useEffect(() => {
    setPermissionArray(
      localStorage.getItem("permissions")
        ? JSON.parse(localStorage.getItem("permissions"))
        : []
    );
  }, []);

  const sideTabClick = (link) => {
    setChangesConfirmationModal(isChangesOccured);
    setClickedLink(link);
  };
  const sideTabLogOut = (link) => {
    setChangesConfirmationModal(isChangesOccured);
    // setClickedLink(link);
  };

  /**
    |--------------------------------------------------
    |app top bar state and function
    |--------------------------------------------------
    */

  const [isLogoutModal, setIsLogoutModal] = React.useState(false);
  const [isLogout, setIsLogout] = React.useState(false);

  const cancelModalButtonClickAction = () => {
    setIsLogoutModal(false);
  };

  const logoutModalButtonClickAction = () => {
    setIsLogoutModal(false);
    setIsModalSucceed(false);
    setClickedLink("");
    setChangesConfirmationModal(false);
    const prevPermissions = cloneDeep(localStorage.getItem("permissions"));
    localStorage.clear();
    localStorage.setItem("prevPermissions", prevPermissions);
    setTimeout(() => {
      setIsLogout(true);
      // dispatch(changesCheckAction(false));
    }, 50);
  };

  /**
  |--------------------------------------------------
  | popover state and functions
  |--------------------------------------------------
  */
  const [anchorElPopover, setAnchorElPopover] = React.useState(null);

  const handleClickPopover = (event) => {
    setAnchorElPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorElPopover(null);
  };

  const openPopover = Boolean(anchorElPopover);

  /**
  |-----------------------------------------------------
  | Profile Card Popover state and functions
  |-----------------------------------------------------
  */
  const [profileCardPopover, setProfileCardPopover] = React.useState(null);

  /**
  |--------------------------------------------------
  | Admin Drawer State and functions
  |--------------------------------------------------
  */
  const [adminDrawerStates, dispatchAdminDrawerStates] = React.useReducer((state, action)=>{
    switch(action.type){
      case 'closeAdminDrawer':
        return {isAdminDrawerOpen:false}
      case 'openAdminDrawer':
        return {isAdminDrawerOpen:true}
      default:
        break;
    }
  },{isAdminDrawerOpen:false})

  /**
     |--------------------------------------------------
    | side bar navigation button
    |--------------------------------------------------
    */

  const dashboardDrawerBtn = (
    <Grid
      container
      style={{ marginTop: "1rem" }}
      onClick={() => sideTabClick("/exotic")}
    >
      <DrawerButton
        id='dashboardDrawerBtn'
        classes={classes}
        open={open}
        active={active}
        setActive={setActive}
        subTitle={getLabel({ module: "layout", label: "dashboard" })}
        linkPath={!isChangesOccured && "/exotic"}
        selectButton={"/exotic"}
        drawerIcon={active ? goldColorDashboardSvG : dashboardSvg}
      />
    </Grid>
  );

  const groupMangDrawerBtn = (
    <Grid
    container
    style={{ marginTop: "1rem" }}
    onClick={() => sideTabClick("/exotic/groupCreation")}
    >
      <DrawerButton
        id='groupCreationDrawerBtn'
        classes={classes}
        open={open}
        active={active}
        setActive={setActive}
        subTitle={"Group Management"}
        linkPath={!isChangesOccured && "/exotic/groupCreation"}
        selectButton={"/exotic/groupCreation"}
        drawerIcon={active ? goldGroupManagementSvg : groupManagementSvg}
      />
    </Grid>
  );

  const eventCreationDrawerBtn = (
    <Grid
    container
    style={{ marginTop: "1rem" }}
    onClick={() => sideTabClick("/exotic/eventCreation")}
    >
      <DrawerButton
        id='eventCreationDrawerBtn'
        classes={classes}
        open={open}
        active={active}
        setActive={setActive}
        subTitle={"Calender"}
        linkPath={!isChangesOccured && "/exotic/eventCreation"}
        selectButton={"/exotic/eventCreation"}
        drawerIcon={active ? goldEventCreationSvg : eventCreationSvg}
      />
    </Grid>
  );

  return (
    <>

      <ConfirmationModal
        classes={commonclasses}
        isConfirmationModal={changesConfirmationModal}
        closeConfirmationAction={() => {
          setChangesConfirmationModal(false);
        }}
        modalConfirmAction={() => {
          setIsModalSucceed(true);
          setChangesConfirmationModal(false);
          setTimeout(() => setIsModalSucceed(false), 50);
        }}
        confirmationModalHeader="Move to Another Page"
        confirmationModalContent="Are You Sure You Want to Leave This Page?"
        noBtnId="redirectCancel"
        yesBtnId="redirectPage"
      />

      <ConfirmationModal
        classes={commonclasses}
        isConfirmationModal={isLogoutModal}
        closeConfirmationAction={cancelModalButtonClickAction}
        modalConfirmAction={logoutModalButtonClickAction}
        confirmationModalHeader={getLabel({ module: "auth", label: "confirmLogout" })}
        confirmationModalContent={getLabel({ module: "auth", label: "areYouSureYouWantToLogout" }) + " ?"}
        yesWord={getLabel({ module: "auth", label: "yes" })}
        noWord={getLabel({ module: "auth", label: "cancel" })}
        noBtnId="cancel"
        yesBtnId="logout"
      />


      <div className={classes.mainRoot}>
        {isLogout && <Redirect to="/" />}
        {isModalSucceed && <Redirect to={clickedLink} />}
        <CssBaseline />
        <AppBar
          style={{
            backgroundColor: "#2C3E50",
            zIndex: !open ? theme.zIndex.drawer + 1 : theme.zIndex.drawer + 100,
          }}
          position="fixed"
          className={clsx(classes.appBarDrawer, {
            [classes.appBarShiftDrawer]: open && matches,
          })}
        >
          <Toolbar>
            <Hidden smUp implementation="css">
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: false,
                })}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Grid container alignItems="center">
              <Grid
                item
                container
                justify="flex-end"
                alignItems="center"
                //  xs={!matches ? 12 : 9}
                xs={12}
                spacing={3}
              >
                  <Grid item>
                    <Typography className={classes.appBarProfileDesignation}>
                      {"Admin"}
                      </Typography>
                  </Grid>

              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            className={clsx(permissionValidator(26) ? classes.drawerMainNested : classes.drawerMain, {
              [permissionValidator(26) ? classes.drawerOpenMainNested : classes.drawerOpenMain]: open,
              [classes.drawerCloseMain]: !open,
            })}
            classes={{
              paper: clsx({
                [permissionValidator(26) ? classes.drawerOpenMainNested : classes.drawerOpenMain]: open,
                [classes.drawerCloseMain]: !open,
              }),
            }}
            onMouseOver={handleDrawerOpen}
            onMouseLeave={handleDrawerClose}
          >
            <div className={classes.toolbarMain}></div>

              <div style={{ marginTop: "1rem", overflowY: "auto" }}>
                {dashboardDrawerBtn}

                <PermissionChecker
                  permission={ 1002 }
                >
                    { groupMangDrawerBtn }
                </PermissionChecker>
                <PermissionChecker
                  permission={ 1002 }
                >
                    { eventCreationDrawerBtn }
                </PermissionChecker>

              </div>
          </Drawer>
        </Hidden>

        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              // paper: classes.drawerPaper,
              paper: classes.mobileDrawerMain,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div style={{ marginTop: "3rem" }}>
              {dashboardDrawerBtn}

              <PermissionChecker
                permission={ 24 }
              >
                  { groupMangDrawerBtn }
              </PermissionChecker>
            </div>
          </Drawer>
        </Hidden>

        <main
          className={clsx(classes.contentMain, {
            [classes.contentShiftMain]: open,
          })}
        >
          <div className={classes.drawerHeaderMain} />
          <div className={classes.mainContainer}>{/* {props.children} */}</div>
        </main>
      </div>
    </>
  );
};

export default Main;
