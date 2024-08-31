import React from "react";
import { FastField, ErrorMessage } from "formik";
import { useTheme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "formik-material-ui-lab";
import TextError from "./TextError";
const ClinicAutocomplte = (props) => {
  const { name, options, label } = props;
  const theme = useTheme();
  return (
    <>
      <FastField
        name={name}
        component={Autocomplete}
        options={options}
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            style={{ backgroundColor: theme.palette.background.textField }}
            {...params}
            margin="dense"
            label={label}
            variant="outlined"
          />
        )}
      />
      <ErrorMessage component={TextError} name={name} />
    </>
  );
};

export default ClinicAutocomplte;
