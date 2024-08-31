import React from "react";
import { Grid, Typography } from "@material-ui/core";
import ExclamationCircle from "../../../assets/images/ExclamationCircle.svg";
import { getLabel } from '../../../utils/localization';

export default function NoContent(props) {
  return (
    <Grid container spacing={2} style={{ minHeight: "25rem" }}>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        justify="center"
        xs={12}
      >
        <img src={ExclamationCircle}></img>
        <Typography
          style={{
            marginTop: "2rem",
            fontSize: "1.125rem",
            fontWeight: "bold",
            color: "#003761",
          }}
        >
          { getLabel({ module: "common", label: "thisFeatureIsNotAvailableWithTheCurrentVersion" }) }
        </Typography>
      </Grid>
    </Grid>
  );
}
