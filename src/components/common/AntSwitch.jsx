import React from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { FormGroup, Switch, Grid, Typography } from "@material-ui/core";

const AntSwitch = (props) => {
  const { switchState, handleChangeSwitch } = props;
  /**
  |--------------------------------------------------
  | material ui custom styles  
  |--------------------------------------------------
  */
  const theme = useTheme();

  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: "flex",
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(12px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.primary.dark,
          borderColor: theme.palette.primary.dark,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: "none",
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

  return (
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>
            <AntSwitch
              checked={switchState}
              onChange={handleChangeSwitch}
              name="checkedC"
            />
          </Grid>
          <Grid item>
            <Typography
              style={{
                color: theme.palette.primary.dark,
                fontSize: theme.typography.fontSize,
              }}
            >
              Advance Search
            </Typography>
          </Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
};

export default AntSwitch;
