import React, { Children } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Grow,
  Box,
  Grid
} from "@material-ui/core";
import classNames from 'classnames';

import { useStyles } from '../../../assets/styles/styles';

import close from '../../../assets/images/icons/close.svg';
import whiteBorderClose from '../../../assets/images/icons/white_border_color_close.svg';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const CommonModal=(props)=>{
  const commonClass=useStyles();

  const { 
    isModalOpen, 
    modalWidth, 
    modalCloseAction, 
    modalHeader, 
    children,
    startIcon,
    endIcon,
    modalWrapperClass,
    modalHeaderClass,
    modalContentClass,
    modalCloseIcon
  }=props;

  return(
    <Dialog
      open={isModalOpen}
      onClose={modalCloseAction}
      TransitionComponent={Transition}
      aria-labelledby="conformation dailog"
      scroll="body"
      maxWidth={ modalWidth || "sm"}
      fullWidth={true}
      className={modalWrapperClass || commonClass.modalWrapper}
    >
      <DialogTitle
        className={modalHeaderClass || commonClass.commonModalHeader}
        id="conformation-dailog-title"
      >
        <Grid container justifyContent='space-between'>
          <Grid item>
          {
            startIcon && 
            <Box pr={2} component="span">
              <img src={startIcon}/>
            </Box>
          }
          {modalHeader}
          {
            endIcon && 
            <Box pl={2} component="span">
              <img src={endIcon}/>
            </Box>
          }
          </Grid>
          <Grid item>
            <img 
              className={commonClass.clickableBlock}
              src={modalCloseIcon ? modalCloseIcon : close}
              onClick={modalCloseAction}
            />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={modalContentClass || commonClass.modalContent}>  
        <DialogContentText
          // className={classNames(commonClass.removemargin)}
          id="iconformation-dailog-text"
        >
          {children}
        </DialogContentText>
      </DialogContent>
      {/* <DialogActions>
        
      </DialogActions> */}
    </Dialog>
  );

}

export default CommonModal;