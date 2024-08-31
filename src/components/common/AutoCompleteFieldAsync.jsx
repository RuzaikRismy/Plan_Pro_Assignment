import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

const AutoCompleteFieldAsync = (props) => {
  const {
    id,
    autocompleteValue,
    handleAutocomplete,
    inputValueAuto,
    onInputChangeAuto,
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
  AutoCompleteFieldAsync.defaultProps = {
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
      inputValue={inputValueAuto}
      onInputChange={onInputChangeAuto}
      options={optionData ? optionData : []}
      getOptionLabel={(option) =>
        option[searchType] ? option[searchType] : ""
      }
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          margin={margin}
          style={{
            backgroundColor: theme.palette.background.textField,
          }}
          label={label}
          variant={variant}
          placeholder={placeholder}
          error={error}
          helperText={error && helperText}
        />
      )}
    />
  );
};

export default AutoCompleteFieldAsync;
