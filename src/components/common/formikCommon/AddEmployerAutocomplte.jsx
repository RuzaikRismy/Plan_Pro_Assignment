import React from "react";
import { FastField, ErrorMessage } from "formik";
import { TextField } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Autocomplete } from "formik-material-ui-lab";
import TextError from "./TextError";
const AddEmployerAutocomplte = (props) => {
  const { name, options, label, autoFocus } = props;

  const theme = useTheme();

  return (
    <>
      {/* {!hasLable ? (
        <div style={{ display: "flex" }}>
          {label && <Typography variant="body2">{label}</Typography>}

          <Typography
            style={{
              marginLeft: "0.5rem",
              color: required ? "red" : "#fff",
            }}
          >
            *
          </Typography>
        </div>
      ) : null} */}
      <FastField
        name={name}
        component={Autocomplete}
        options={options}
        autoHighlight
        getOptionLabel={(option) => option.organizationName}
        renderInput={(params) => (
          <TextField
            style={{ backgroundColor: theme.palette.background.textField }}
            {...params}
            margin="dense"
            label={label}
            variant="outlined"
            autoFocus={autoFocus}
          />
        )}
      />

      <ErrorMessage component={TextError} name={name} />
    </>
  );
};

export default AddEmployerAutocomplte;
