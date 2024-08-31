import React from "react";
import { useTheme, withStyles, makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  MenuItem,
  Select,
  Divider,
  FormControl,
  Box,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AutoComTextField = withStyles({
  root: {
    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fff",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  quantityRoot: {
    color: "#000",
    backgroundColor: "#fff",
    //  opacity: 1,
    //   borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#fff",
      // borderRadius: "5px",
      // opacity: 1,
    },
    "&:focus-within": {
      backgroundColor: "#fff",
      // borderRadius: "5px",
      //  opacity: 1,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #fff",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #fff",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #fff",
      borderRadius: "5px 5px 0 0",
    },
    "& .Mui-disabled": {
      color: "#FFFFFF",
      opacity: 0.6,
    },
    "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #fff",
    },
  },
}));

const searchImg = (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0)">
      <path
        d="M12.3184 12.4486C13.4282 11.2095 14.0418 9.60445 14.0414 7.94111C14.0414 4.20672 11.0032 1.16837 7.26865 1.16837C3.53042 1.16464 0.492188 4.20287 0.492188 7.93726C0.492188 11.6716 3.53042 14.71 7.26493 14.71C8.92875 14.7128 10.5345 14.0989 11.7723 12.9869L14.8336 16.0483C14.9058 16.1209 15.0044 16.1612 15.1067 16.1599C15.2087 16.1594 15.3067 16.1194 15.3799 16.0483C15.4517 15.9764 15.4922 15.8789 15.4922 15.7772C15.4922 15.6755 15.4517 15.5778 15.3799 15.506L12.3184 12.4486ZM1.26142 7.93726C1.26142 4.62595 3.9535 1.93388 7.26493 1.93388C10.5761 1.93388 13.2683 4.62595 13.2683 7.93726C13.2683 11.2486 10.5761 13.9408 7.26493 13.9408C3.9535 13.9445 1.26142 11.2486 1.26142 7.93726Z"
        fill="#063D6D"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(0 0.645447)"
        />
      </clipPath>
    </defs>
  </svg>
);

const SearchCom = React.forwardRef((props, ref) => {
  const {
    selectData,
    selectName,
    selectValue,
    selectShowName,
    handleChangeSelect,
    isAdvancedSearch,
    comName,
    autoComValue,
    handleChangeAuto,
    searchType,
    autoComData,
    multiple,
    inputValueAuto,
    onInputChangeAuto,
    placeholder,
  } = props;

  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box
      ref={ref}
      component="div"
      display="flex"
      bgcolor="#fff"
      alignItems="center"
      mr={3}
      border={1}
      borderColor="#E1E7F3"
      borderRadius={5}
      style={{ width: "100%" }}
    >
      <div
        style={{
          backgroundColor: theme.palette.background.textField,
          margin: "0rem 1rem",
        }}
      >
        {searchImg}
      </div>
      {isAdvancedSearch && (
        <FormControl
          variant="outlined"
          classes={{
            root: classes.quantityRoot,
          }}
          style={{ width: "20%", marginBottom: -4 }}
        >
          <Select
            labelId={`${comName}-referral-select-label`}
            id={`${comName}-referral-simple-label`}
            value={selectName}
            onChange={handleChangeSelect}
            margin="dense"
          >
            {selectData &&
              selectData.map((data, index) => {
                return (
                  <MenuItem key={index} value={data[selectValue]}>
                    {data[selectShowName]}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      )}

      <Divider orientation="vertical" flexItem style={{ margin: 2 }} />
      <Autocomplete
        ChipProps={{
          color: "primary",
          variant: "outlined",
        }}
        multiple={multiple}
        id={`${comName}-referral-box-demo`}
        value={autoComValue}
        onChange={handleChangeAuto}
        inputValue={inputValueAuto}
        onInputChange={onInputChangeAuto}
        options={autoComData}
        getOptionLabel={(option) =>
          option[searchType] ? option[searchType] : ""
        }
        style={{ width: "100%" }}
        renderInput={(params) => (
          <AutoComTextField
            {...params}
            margin="dense"
            variant="outlined"
            placeholder={placeholder}
          />
        )}
      />
    </Box>
  );
});

export default SearchCom;
