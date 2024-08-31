import { makeStyles, withStyles } from "@material-ui/core/styles";
import { StepConnector } from "@material-ui/core";

export const ColorlibConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      borderColor: theme.palette.primary.main,
    },
  },
  completed: {
    "& $line": {
      borderColor: theme.palette.primary.main,
    },
  },
  line: {
    borderColor: theme.palette.lightGrays.liter,
    borderTopStyle: "dotted",
    borderTopWidth: 3,
  },
}))(StepConnector);

export const useColorlibStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.lightGrays.tooLiter,
    zIndex: 1,
    color: theme.palette.grey.main,
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  },
  active: {
    backgroundColor: theme.palette.brandPrimary.dark,
    color: theme.palette.common.white,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundColor: theme.palette.primary.main,
    "& img": {
      filter: "brightness(0) invert(1)",
    },
  },
  errorSteps: {
    backgroundColor: "red",
    color: theme.palette.common.white,
  },

  activeMode: {
    filter: "brightness(0) invert(1)",
  },

  completedMode: {
    borderRadius: "50%",
    boxShadow: "0px 0px 0px 3px #003761",
    border: "2px solid white",
    padding: "7px",
  },
}));
