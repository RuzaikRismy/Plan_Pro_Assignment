import React, { useState } from 'react';
import { useStyles } from "../../assets/styles/styles";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    DialogContentText,
    Grow,
} from "@material-ui/core";
import { useEffect } from 'react';
import { useHistory } from "react-router";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});

// clear localStorage on browser close action
// window.onbeforeunload = function (event) {
//     localStorage.clear();
// };

const SessionChecker = () => {

    const [ isSessionAllertModal, setIsSessionAllertModal ] = useState(false);

    useEffect(() => {
        setInterval(() => {
            if(window.location.pathname === "/"){
                setIsSessionAllertModal(false);
            }else if(!localStorage.getItem("jwtToken")){
                setIsSessionAllertModal(true);
            }
        },1000);
    }, []);

    // style class
    const classes = useStyles();
    // redirect hooks
    const history = useHistory();

    const redirectAction = () => {
        setIsSessionAllertModal(false);
        history && history.push({
            pathname: '/',
            state: {
                prevUrl: window.location.pathname
            }
        });
    };

    return(
        <Dialog
            open={isSessionAllertModal}
            // onClose={closeConfirmationAction}
            TransitionComponent={Transition}
            aria-labelledby="conformation dailog"
            scroll="body"
            maxWidth="sm"
            fullWidth={true}
        >
            <DialogTitle
                className={classes.modelHeader}
                id="conformation-dailog-title"
            >
                Session has Expired !
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    className={classes.conformationContentText}
                    id="iconformation-dailog-text"
                >
                    Your Session has Expired. 
                    Please Login Again
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                className={classes.mainButton}
                onClick={redirectAction}
            >
                Login
            </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SessionChecker;