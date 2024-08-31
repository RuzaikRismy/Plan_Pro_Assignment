import React from "react";
import { FastField, ErrorMessage } from "formik";
import { useTheme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import { Autocomplete } from "formik-material-ui-lab";
import TextError from "./TextError";

const AutoComSearchDoc = (props) => {
  const { name, searchFeild, options, label, disabled } = props;

  const theme = useTheme();

  return (
    <>
      <FastField
        disabled={disabled}
        name={name}
        component={Autocomplete}
        options={options}
        autoHighlight
        getOptionLabel={(option) => option[searchFeild]}
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

export default AutoComSearchDoc;
