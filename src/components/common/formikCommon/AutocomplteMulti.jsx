import React from "react";
import { FastField, ErrorMessage } from "formik";
import { useTheme } from "@material-ui/core/styles";
import { TextField, Checkbox, Typography } from "@material-ui/core";
import { Autocomplete } from "formik-material-ui-lab";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import TextError from "./TextError";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutocomplteMulti = (props) => {
  const { name, options, label, disabled, required, error } = props;

  const theme = useTheme();

  return (
    <>
      <div style={{ position: "relative", width: "100%" }}>
        {required && (
          <Typography
            style={{
              position: "absolute",
              right: "0.4rem",
              top: "0.2rem",
              color: theme.palette.reds.dark,
              zIndex: 1,
            }}
          >
            *
          </Typography>
        )}

        <FastField
          disabled={disabled}
          ChipProps={{
            color: "primary",
            variant: "outlined",
          }}
          fullWidth
          multiple
          name={name}
          component={Autocomplete}
          options={options}
          id={`Autocomplete-${label}`}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              error={error}
              style={{ backgroundColor: theme.palette.background.textField }}
              margin={"none"}
              {...params}
              variant="outlined"
              label={label}
              fullWidth
            />
          )}
        />

        <ErrorMessage component={TextError} name={name} />
      </div>
    </>
  );
};

export default AutocomplteMulti;
