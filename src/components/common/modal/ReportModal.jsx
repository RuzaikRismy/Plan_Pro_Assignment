import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Dialog, DialogContent, DialogTitle, Grid, Box, IconButton, Typography } from "@material-ui/core";
import PropTypes from "prop-types"

//icons
import CancelIcon from "@material-ui/icons/Cancel";
import DownloadIcon from "../../../assets/images/icons/downloadWhite.svg";
import printerIcon from "../../../assets/images/icons/printerWhite.svg";

//classes and style imports
import { useStyles } from "../../../assets/styles/styles";
import { getLabel } from "../../../utils/localization";

/**
|--------------------------------------------------
| To load jasper report into the iframe
| able to render isolated component in popup
|--------------------------------------------------
*/

const ReportModal = ({
  children,
  iFrameProps,
  dialogProps,
  dialogTitleProps,
  dialogContentProps,
  dialogTitleTxt,
  closeModalAction,
  isPortalPopupOpened,
  iFrameEmbeddedSrc,
  reportFileName,
  ...props
}) => {
  /**
  |--------------------------------------------------
  | Uses App theme
  |--------------------------------------------------
  */
  const classes = useStyles();
  /**
  |--------------------------------------------------
  | Ref To set the portal node
  |--------------------------------------------------
  */
  const [contentRef, setContentRef] = useState(null);
  /**
  |--------------------------------------------------
  | Download / Print Pane
  |--------------------------------------------------
  */
  const [downloadPane,setDownloadPane] = React.useState(<></>);
  /**
  |--------------------------------------------------
  | Adding children elements to the portal of the iframe
  |--------------------------------------------------
  */
  const mountNode = contentRef?.contentWindow?.document?.body;
  /**
  |--------------------------------------------------
  | Handle Download Button Click action
  |--------------------------------------------------
  */
  const handleDownloadInvoice = (e) => {
    let link = document.createElement("a");
    if (link.download !== undefined) {
      var url = iFrameEmbeddedSrc;
      link.setAttribute("href", url);
      link.setAttribute("download", reportFileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  /**
  |--------------------------------------------------
  | Handles Print Button Click Action
  |--------------------------------------------------
  */
  const handlePrintReport = (e) => {
    let id = iFrameProps?.id || "reportFile"; //iframe element id
    const iframe = document.frames
      ? document.frames[id]
      : document.getElementById(id);
    const iframeWindow = iframe.contentWindow || iframe;
    iframe.focus();
    iframeWindow.print();
  }
  /**
  |--------------------------------------------------
  | Effect on iframe window is visible
  |--------------------------------------------------
  */
  React.useEffect(()=>{
    if(contentRef?.contentWindow?.document?.body){
      let tempDownloadPane = (<Grid container item xs={12}>
           <Grid
              item
              container
              className={classes.reportModalToolbar}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography className={classes.reportToolbarTypo}>
                  {reportFileName}
                </Typography>
              </Box>
              <Box>
                <IconButton className={classes.reportPrintIcon}>
                  <img alt={"print report"} height={25} src={printerIcon} onClick={handlePrintReport} />
                </IconButton>
                <IconButton>
                  <img
                    alt={"download report"}
                    height={40}
                    src={DownloadIcon}
                    onClick={handleDownloadInvoice}
                  />
                </IconButton>
              </Box>
            </Grid>
      </Grid>);

      setDownloadPane(tempDownloadPane);
    }
  },[contentRef])

  return (
    <Dialog
      id={"portal-report-modal"}
      open={isPortalPopupOpened}
      onClose={(e) => closeModalAction("close")}
      maxWidth={"lg"}
      fullWidth
      {...(dialogProps || {})}
    >
      <DialogTitle  className={classes.modelHeader} {...(dialogTitleProps || {})}>
        {dialogTitleTxt}
        <CancelIcon
          onClick={(e) => closeModalAction && closeModalAction("close")}
          className={classes.dialogCloseBtn}
        />
      </DialogTitle>
      <DialogContent {...(dialogContentProps || {})}>
        {(iFrameProps?.src || iFrameEmbeddedSrc || children) ? (
          <>
            {downloadPane}
            <Grid container>
              <iframe
                title={getLabel({module:"common", label:"reportDocument"})}
                id={"reportFile"}
                ref={setContentRef}
                src={iFrameEmbeddedSrc+`#view=fitH&download=${reportFileName}&toolbar=0&navpanes=0`||null}
                //* pass following from  iFrameProps if need to render JavaScript enabled doc
                // sandbox='allow-scripts allow-modal'
                className={classes.reportIFrameContainer}
                name={getLabel({module:"common", label:"reportDocument"})}
                width={"100%"}
                {...iFrameProps}
              >
                {mountNode && createPortal(children, mountNode)}
              </iframe>
            </Grid>
          </>
        ) : (
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <img
              id={"dialog-content-loading-spin"}
              name={"Loading Progress"}
              alt={"Loading.."}
              src={require("../../../assets/images/loadingsniperNew.gif")}
            ></img>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

ReportModal.defaultProps = {
  reportFileName: "Report File"
}

ReportModal.propTypes = {
  //render embedded isolated React Component[s] on the iframe 
  children: PropTypes.elementType,
  //iframe props
  iFrameProps: PropTypes.object,
  //dialog props
  dialogProps: PropTypes.object,
  //dialog title props
  dialogTitleProps: PropTypes.object,
  //dialog content props
  dialogContentProps: PropTypes.object,
  //Dialog Title Text/ the Typography element
  dialogTitleTxt: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  //close dialog modal action
  closeModalAction: PropTypes.func.isRequired,
  //portal popup is opened
  isPortalPopupOpened: PropTypes.bool.isRequired,
  //iframe src property (file object or reference src)
  iFrameEmbeddedSrc: PropTypes.any,
  //saving file name when download clicked
  reportFileName: PropTypes.string,
}

export default React.memo(ReportModal);
