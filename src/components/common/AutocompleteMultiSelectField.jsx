import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutocompleteMultiSelectField = (props) => {
  const {
    id,
    multiple,
    fullWidth,
    optionData,
    searchType,
    disabled,
    autocompleteValue,
    handleAutocomplete,
    inputValueAuto,
    onInputChangeAuto,
    label,
    variant,
    placeholder,
    error,
    helperText,
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
  AutocompleteMultiSelectField.defaultProps = {
    fullWidth: true,
    variant: "outlined",
    optionData: [],
    margin: "none", //normal, dense, none
    error: false,
    helperText: null,
    disabled: false,
    multiple: true,
    disableCloseOnSelect: true,
  };
  return (
    <Autocomplete
      ChipProps={{
        color: "primary",
        variant: "outlined",
      }}
      multiple={multiple}
      fullWidth={fullWidth}
      id={id}
      value={autocompleteValue}
      onChange={handleAutocomplete}
      inputValue={inputValueAuto}
      onInputChange={onInputChangeAuto}
      options={optionData}
      disableCloseOnSelect
      disabled={disabled}
      getOptionLabel={(option) =>
        option[searchType] ? option[searchType] : ""
      }
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
          {option[searchType]}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
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

export default AutocompleteMultiSelectField;
