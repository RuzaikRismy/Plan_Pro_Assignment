import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: "1100",
  },
}));

const AutoSearchComWIthAdornment = (props) => {
  const classes = useStyles();
  const {
    searchName,
    optionData,
    iconName,
    labelName,
    autoComSearchValue,
    handleAutoComSearch,
    inputValueAuto,
    onInputChangeAuto,
    disabled,
  } = props;

  AutoSearchComWIthAdornment.defaultProps = {
    optionData: [],
  };

  return (
    <Autocomplete
      style={{ zIndex: "100" }}
      disabled={disabled}
      id={searchName}
      options={optionData}
      getOptionLabel={(option) =>
        option[searchName] ? option[searchName] : ""
      }
      classes={{
        popper: classes.popper,
      }}
      fullWidth
      value={autoComSearchValue}
      onChange={handleAutoComSearch}
      inputValue={inputValueAuto}
      onInputChange={onInputChangeAuto}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment style={{ marginRight: "1rem" }} position="end">
                {iconName}
              </InputAdornment>
            ),
          }}
          label={labelName}
          variant="outlined"
          margin="dense"
        />
      )}
    />
  );
};

export default AutoSearchComWIthAdornment;
