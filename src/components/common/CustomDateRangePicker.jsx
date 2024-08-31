import React, { useRef } from "react";
import {
  TextField,
  InputAdornment,
  Popover,
  Grid,
  IconButton,
} from "@material-ui/core";
import ClearRounded from "@material-ui/icons/ClearRounded";
import { makeStyles } from "@material-ui/core/styles";

/**Date Range Picker imports */
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import classNames from "classnames";
import PropTypes from "prop-types";

//util import
import { getLabel } from "../../utils/localization"

//common component theme
const useCustomDateRangePickerStyles = makeStyles((infirmaTheme) => ({
  textFieldClearIcon: {
    width: "1rem",
    height: "1rem",
    backgroundColor: "transparent",
  },
  textFieldClearIconBtn: {
    width: "1.2rem",
    height: "1.2rem",
  },
  dateRangeFieldDefaultStyle: {
    '& fieldset':{
      border:"none",
    },
    "& input::placeholder": {
        color: infirmaTheme.palette.brandPrimary.dark,
        opacity: "1",
    },
    '& input': {
        color:infirmaTheme.palette.brandPrimary.dark,
    },
    color:infirmaTheme.palette.brandPrimary.dark,
  }
}));

const CustomDateRangePicker = (props) => {
  const {
    editableDateInputs,
    onDateChange,
    moveRangeOnFirstSelection,
    ranges,
    maxDate,
    minDate,
    setIsCalendarShown,
    isDateError,
    inputFieldDateRange,
    inputFieldIcon,
    inputEndFieldIcon,
    isCalendarShown,
    setAnchorEl,
    anchorEl,
    dateRangeContainerStyle,
    dateRangeInputStyle,
    setRanges,
    setInputFieldDateRange,
    handleClearRangeExtra,
    showSelectionPreview,
    showDateDisplay,
    pickerTextfieldLabel,
    fieldHelperText,
    componentId,
    isDisabled,
  } = props;

  /**
  |--------------------------------------------------
  | Passing the ref to components
  |--------------------------------------------------
  */
  const popoverRef = useRef();
  const dateRangePickerRef = useRef();
  const dateTextFieldRef = useRef();

  /**
  |--------------------------------------------------
  | Use styling local to this component
  |--------------------------------------------------
  */
  const customPickerStyles = useCustomDateRangePickerStyles();

  /**
  |--------------------------------------------------
  | handle clear icon action 
  |--------------------------------------------------
  */
  const handleClear = (event) => {
    event.preventDefault();
    setIsCalendarShown(false);
    setRanges && setRanges([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    setInputFieldDateRange && setInputFieldDateRange("");
    handleClearRangeExtra && handleClearRangeExtra();
  };
  return (
    <Grid container item lg={12} className={dateRangeContainerStyle}>
      <Grid container item lg={12}>
        <Popover
          open={isCalendarShown && !isDisabled}
          anchorEl={anchorEl}
          onClose={() => setIsCalendarShown(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          ref={popoverRef}
        >
          <DateRange
            ref={dateRangePickerRef}
            editableDateInputs={editableDateInputs ? editableDateInputs : true}
            onChange={onDateChange}
            moveRangeOnFirstSelection={
              moveRangeOnFirstSelection ? moveRangeOnFirstSelection : false
            }
            showSelectionPreview={showSelectionPreview}
            showDateDisplay={showDateDisplay}
            ranges={ranges}
            minDate={minDate && minDate}
            maxDate={maxDate && maxDate}
          />
        </Popover>
      </Grid>

      <Grid container item lg={12}>
        <TextField
          variant={"outlined"}
          value={inputFieldDateRange}
          placeholder={getLabel({module:"common", label:"fromTo"})}
          id={componentId?"date-range-input-".concat(componentId):"date-range-input-".concat(new Date().getTime())}
          label={pickerTextfieldLabel && pickerTextfieldLabel}
          autoComplete={"off"}
          margin={"dense"}
          ref={dateTextFieldRef}
          helperText={fieldHelperText&& fieldHelperText}
          error={isDateError}
          disabled={isDisabled}
          className={
            classNames(customPickerStyles.dateRangeFieldDefaultStyle, dateRangeInputStyle, isDateError &&"error-field")
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position={"start"}>
                <div> {inputFieldIcon} </div>
              </InputAdornment>
            ),
            endAdornment: (
              props.iconEndPlacement === true ?
              <InputAdornment position={"end"}>
                <div> {inputEndFieldIcon} </div>
              </InputAdornment>
              :
              <IconButton
                id={"custom-date-range-picker-icon"}
                onClick={(event) => {
                  handleClear && handleClear(event);
                }}
                aria-label="clear"
                size={"small"}
                className={customPickerStyles.textFieldClearIconBtn}
                hidden={
                  inputFieldDateRange === "" ||
                  inputFieldDateRange === getLabel({module:"common", label:"fromTo"})
                }
                disabled={isDisabled}
              >
                <ClearRounded
                  fontSize="default"
                  className={customPickerStyles.textFieldClearIcon}
                />
              </IconButton>
            ),
          }}
          onClick={(event) => {
            event.preventDefault();
            if (event.target.id.includes("date-range-input-")) {
              setAnchorEl(event.currentTarget);
              setIsCalendarShown((prevState) => !prevState);
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

CustomDateRangePicker.defaultProps = {
  showSelectionPreview: true,
  showDateDisplay: false,
  isDisabled:false,
};

CustomDateRangePicker.propTypes = {
  editableDateInputs: PropTypes.bool,
  onDateChange: PropTypes.func.isRequired,
  moveRangeOnFirstSelection: PropTypes.bool,
  ranges: PropTypes.array.isRequired,
  maxDate: PropTypes.any,
  minDate: PropTypes.any,
  setIsCalendarShown: PropTypes.func.isRequired,
  isDateError: PropTypes.bool,
  inputFieldDateRange: PropTypes.string.isRequired,
  inputFieldIcon: PropTypes.any,
  inputEndFieldIcon: PropTypes.any,
  isCalendarShown: PropTypes.bool.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
  anchorEl: PropTypes.oneOfType([PropTypes.any.isRequired, () => null]),
  dateRangeContainerStyle: PropTypes.any,
  dateRangeInputStyle: PropTypes.any,
  setRanges: PropTypes.func,
  setInputFieldDateRange: PropTypes.func,
  handleClearRangeExtra: PropTypes.func,
  showSelectionPreview: PropTypes.bool,
  showDateDisplay: PropTypes.bool,
  pickerTextfieldLabel:PropTypes.string,
  fieldHelperText:PropTypes.string,
  componentId:PropTypes.any,
  isDisabled:PropTypes.any,
};

export default CustomDateRangePicker;
