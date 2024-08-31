import React from "react";
import { FastField } from "formik";
import { TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "formik-material-ui-lab";

const FormikAutocomplete = (props) => {
  const { name, options, hasLable, required, label } = props;

  return (
    <>
      {!hasLable ? (
        <div style={{ display: "flex" }}>
          {label && (
            <Typography
             
              style={{ color: theme.palette.primary.dark, fontWeight:`${theme.typography.fontWeight.weight3 } !important` }}
            >
              {label}
            </Typography>
          )}

          <Typography
            style={{
              marginLeft: "0.5rem",
              color: required
                ? theme.palette.reds.dark
                : theme.palette.reds.contrastText,
              zIndex: 1,
            }}
          >
            *
          </Typography>
        </div>
      ) : null}
      <FastField
        name={name}
        component={Autocomplete}
        options={options}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            margin="dense"
            label={label}
            variant="outlined"
          />
        )}
      />
    </>
  );
};

export default FormikAutocomplete;
