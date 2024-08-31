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

const AutocompleteWithLabel = (props) => {
  const {
    name,
    optionData,
    label,
    disabled,
    required,
    error,
    searchType,
    placeholder,
    autoFocus,
  } = props;

  const theme = useTheme();
  /**
    |--------------------------------------------------
    | Default Props
    |--------------------------------------------------
    */
  AutocompleteWithLabel.defaultProps = {
    optionData: [],
    disabled: false,
  };

  return (
    <>
      <div style={{ position: "relative", width: "100%" }}>
        {label && (
          <Typography
            variant="body2"
            style={{
              color: theme.palette.primary.dark,
              fontWeight: 400,
              marginBottom: "0.5rem",
            }}
          >
            {label}
          </Typography>
        )}

        {required && (
          <Typography
            style={{
              position: "absolute",
              right: "0.4rem",
              top: "1.8rem",
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
          options={optionData}
          id={`Autocomplete-${label}`}
          disableCloseOnSelect
          getOptionLabel={(option) =>
            option[searchType] ? option[searchType] : ""
          }
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option[searchType]}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              error={error}
              style={{ backgroundColor: theme.palette.background.textField }}
              margin={"none"}
              {...params}
              variant="outlined"
              fullWidth
              placeholder={placeholder}
              autoFocus={autoFocus}
            />
          )}
        />

        <ErrorMessage component={TextError} name={name} />
      </div>
    </>
  );
};

export default AutocompleteWithLabel;
