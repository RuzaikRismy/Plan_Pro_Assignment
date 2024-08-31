import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

const AutocompleteField = (props) => {
  const {
    id,
    autocompleteValue,
    handleAutocomplete,
    optionData,
    searchType,
    label,
    placeholder,
    fullWidth,
    variant,
    margin,
    error,
    helperText,
    disabled,
    className,
    isLoading
  } = props;
  /**
    |--------------------------------------------------
    | use theme- for get theme property
    |--------------------------------------------------
    */
  const theme = useTheme();

  /**
    |--------------------------------------------------
    | Default Props
    |--------------------------------------------------
    */
  AutocompleteField.defaultProps = {
    fullWidth: true,
    variant: "outlined",
    optionData: [],
    margin: "none", //normal, dense, none
    error: false,
    helperText: null,
    disabled: false,
  };

  return (
    <Autocomplete
      fullWidth={fullWidth}
      id={id}
      value={autocompleteValue}
      onChange={handleAutocomplete}
      options={optionData ? optionData : []}
      getOptionLabel={(option) =>
        option[searchType] ? option[searchType] : ""
      }
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          margin={margin}
          style={!className ? {
            backgroundColor: theme.palette.background.textField,
          } : {}}
          className={className}
          label={label}
          variant={variant}
          placeholder={placeholder}
          error={error}
          helperText={error && helperText}
        />
      )}
      loading={isLoading}
    />
  );
};

export default AutocompleteField;
