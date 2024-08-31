import React from "react";
import PropTypes from "prop-types";
import MultiDatePicker, { DateObject } from "react-multi-date-picker";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import Settings from "react-multi-date-picker/plugins/settings";
import {
  Grid,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
//gregorian calendar & locales
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
//persian calendar & locales
import persian from "react-date-object/calendars/persian";
//arabic calendar & locales
import arabic from "react-date-object/calendars/arabic";
import arabic_en from "react-date-object/locales/arabic_en";
import arabic_ar from "react-date-object/locales/arabic_ar";
//commons and classe imports
import { ErrorMessage } from "formik";
import { useStyles } from "../../../assets/styles/styles";
import TextError from "../formikCommon/TextError";
import plainCalendar from "../../../assets/images/icons/calendar_plain.svg";
import { numberValidator } from "../../../utils/validations";
//calendars and localies for picker
const Calendars = { gregorian, arabic, persian };
const Locales = {
  gregorian_en,
  gregorian_ar,
  arabic_en,
  arabic_ar,
};

const localeNames = {
  gregorian_en: "GE",
  arabic_en: "AR",
};
const calendarTitles = {
  gregorian: "Gregorian",
  persian: "Persian",
  arabic: "Arabic",
};

/**
|--------------------------------------------------
|  Renders Text Field
|--------------------------------------------------
*/
const CustomTextInput = ({
  value,
  openCalendar,
  handleValueChange,
  ...otherProps
}) => {
  const {
    componentId,
    commonStyles,
    textFieldProps,
    textFieldDateIcon,
    required,
    label,
    error,
    disabled,
    formikFieldName,
    datePickerProps,
    settingsData
  } = otherProps;
  /**
  |--------------------------------------------------
  |  Uses app theme
  |--------------------------------------------------
  */
  const theme = useTheme();
  /**
  |--------------------------------------------------
  |  To Identify keyboard changes on field
  |--------------------------------------------------
  */
  const fieldValueRef= React.useRef();
  /**
  |--------------------------------------------------
  |  On change action of Date Picker
  |--------------------------------------------------
  */
  const handleFieldValueChange = (event) =>{
    let datePickerFieldText = event.target?.value;
    //min and max date check when type
    let minDateValue = datePickerProps?.minDate;
    let maxDateValue = datePickerProps?.maxDate;
    if(minDateValue || maxDateValue){
      let isWithinMinMaxDates = true;
      let minDateObject = minDateValue && new DateObject({date: minDateValue, format:"DD/MM/YYYY", locale: settingsData.locale, calendar: settingsData.calendar});
      let maxDateObject = maxDateValue && new DateObject({date: maxDateValue, format: "DD/MM/YYYY", locale: settingsData.locale, calendar: settingsData.calendar});
      let isMatchingDateFormat =  event.target?.value  && 
                              (  
                                event.target.value.match(/^\d{2}\/\d{2}\/\d{4}$/) ||
                                event.target.value.match(/^\d{2}\/\d{1}\/\d{4}$/) || 
                                event.target.value.match(/^\d{1}\/\d{2}\/\d{4}$/) || 
                                event.target.value.match(/^\d{1}\/\d{1}\/\d{4}$/)
                              );
      let inputFieldEditDate = isMatchingDateFormat && new DateObject({date: event.target?.value, format: settingsData.format, locale: settingsData.locale, calendar: settingsData.calendar})
      if(inputFieldEditDate){
        if(minDateObject && inputFieldEditDate && minDateObject.toDate() > inputFieldEditDate.toDate()){
          isWithinMinMaxDates = false;
        }
        if(maxDateObject && inputFieldEditDate && maxDateObject.toDate() < inputFieldEditDate.toDate()){
          isWithinMinMaxDates = false;
        }
        if(!isWithinMinMaxDates){
          return;
        }
      }
    }
    let isDateIsErasing = datePickerFieldText?.length<fieldValueRef.current?.length;
    let isNumberValue = numberValidator((datePickerFieldText||"").replace(/\//g, ""))
    if (datePickerFieldText.match(/^\d{2}$/) !== null &&  isNumberValue && !isDateIsErasing) {
        datePickerFieldText = datePickerFieldText + '/';
    } else if (datePickerFieldText.match(/^\d{2}\/\d{2}$/) !== null &&  isNumberValue && !isDateIsErasing) {
        datePickerFieldText = datePickerFieldText + '/';
    }
    if(isDateIsErasing && datePickerFieldText.match(/^\d{2}$/)){
      datePickerFieldText = (datePickerFieldText || "").slice(0,1)
    }else if(isDateIsErasing && datePickerFieldText.match(/^\d{2}\/\d{2}$/)){
      datePickerFieldText = (datePickerFieldText || "").slice(0,4)
    }
    let tempEvent = {
      ...(event|| {}), 
      target: {
      ...(event.target || {}),
      value: datePickerFieldText
      }
    }
    fieldValueRef.current = datePickerFieldText;
    if(isNumberValue)
      handleValueChange(tempEvent);
  }

  return (
    <Grid container>
      {label && (
        <Grid container>
          <Typography
            variant="body2"
            className={commonStyles.datePickerInputLabel}          
          >
            {label}
          </Typography>
        </Grid>
      )}
      <Grid container>
        <TextField
          id={
            formikFieldName ? formikFieldName : componentId || "dateInputField"
          }
          name={
            formikFieldName ? formikFieldName : componentId || "dateInputField"
          }
          value={value || ""}
          onChange={handleFieldValueChange}          
          margin="dense"
          variant={"outlined"}
          fullWidth
          placeholder={"dd/mm/yyyy"}
          className={commonStyles.datePickerTextField}
          InputProps={{
            endAdornment:
              (required && (
                <InputAdornment position="end">
                  <>
                    <Typography
                     className={commonStyles.datePickerInputAsterisk}
                    >
                      *
                    </Typography>
                    <IconButton aria-label="calendar" onClick={openCalendar} disabled={disabled}>
                      <img src={textFieldDateIcon || plainCalendar} height={20} alt="calender" />
                    </IconButton>
                  </>
                </InputAdornment>
              )) ||
              null,
          }}
          inputProps={{
            maxLength:10
          }}
          error={error ? true : false}
          required={required}
          disabled={disabled}
          autoComplete={"off"}
          {...(textFieldProps || {})}
        />
      </Grid>
    </Grid>
  );
};

const DatePicker = (props) => {
  const {
    componentId,
    children,
    //use datePickerProps for overriding any react-multi-date-picker property
    datePickerProps,
    //calendar and locale for the Date Picker
    calendarAndLocale,
    //for overriding rendered text field properties (Material UI TextField)
    textFieldProps,
    textFieldDateIcon,
    //show default plugins
    showDatePickerHeader,
    showSettings,
    onChangePickerSetting,
    //Date Picker Plugin Properties
    pluginSettingsProps,
    pluginDateHeaderProps,
    //is date required
    required,
    //label  (label will render only if passed)
    label,
    // is date having error
    error,
    // is date picker disabled
    disabled,
    // pass formik field name if within formik context
    formikFieldName,
  } = props;
  /**
  |--------------------------------------------------
  |  Uses app theme
  |--------------------------------------------------
  */
  const commonStyles = useStyles();
  //states
  const [settingsData, setSettingsData] = React.useState({
    ...(calendarAndLocale || {}),
    format: datePickerProps?.format || calendarAndLocale?.format,
  });
  /**
  |--------------------------------------------------
  | Get Object's Key given the value
  |--------------------------------------------------
  */
  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };
  /**
  |--------------------------------------------------
  | Handle on click Date Picker Settings
  |--------------------------------------------------
  */
  const handleSettingsClick = (event) => {
    let changedCalendar = Calendars.arabic;
    let changedLocale = Locales.arabic_en;
    if (event.target?.title) {
      let calendarTitle = event.target?.title;
      let calendarKey = getKeyByValue(calendarTitles, calendarTitle);
      if (Calendars?.[calendarKey]) {
        changedCalendar = Calendars[calendarKey];
      }
    }

    if (event.target?.textContent) {
      let localeTitle = event.target?.textContent;
      let localeKey = getKeyByValue(localeNames, localeTitle);
      if (Locales?.[localeKey]) {
        changedLocale = Locales[localeKey];
      }
    }

    let newSetting = {
      ...(settingsData || {}),
      locale: changedLocale,
      calendar: changedCalendar,
    };

    setSettingsData((prevSettings) => newSetting);
    onChangePickerSetting && onChangePickerSetting(newSetting);
  };
  /**
  |--------------------------------------------------
  | Effect on component mount (initialize settings)
  |--------------------------------------------------
  */
  React.useEffect(() => {
    onChangePickerSetting && onChangePickerSetting(settingsData);
  }, []);

  //date picker plugins
  const datePickerPlugins = [];
  /**
  |--------------------------------------------------
  | Date Picker Header
  |--------------------------------------------------
  */
  showDatePickerHeader &&
    datePickerPlugins.push(
      <DatePickerHeader
        id={componentId + "-datePickerHeader"}
        position="top"
        size={pluginDateHeaderProps?.size || "small"}
        className={commonStyles.multiDatePickerHeader}
        disabled={disabled}
        locale={settingsData.locale}
        calendar={settingsData.calendar}
        {...(pluginDateHeaderProps || {})}
      />
    );
  /**
  |--------------------------------------------------
  | Date Picker Settings (Calendars, localization, theming...)
  |--------------------------------------------------
  */
  showSettings &&
    datePickerPlugins.push(
      <Settings
        id={componentId + "-dateSettings"}
        position="bottom"
        defaultActive="calendar"
        disabledList={["other", "mode", "locale"]}
        locales={["en", "ar"]}
        calendars={["gregorian", "arabic"]}
        disabled={disabled}
        onClick={handleSettingsClick}
        className={commonStyles.multiDateSettings}
        {...(pluginSettingsProps || {})}
      />
    );

  return (
    <>
      <MultiDatePicker
        id={componentId + "-datePicker"}
        render={
          <CustomTextInput
            componentId={componentId}
            commonStyles={commonStyles}
            textFieldProps={textFieldProps}
            textFieldDateIcon={textFieldDateIcon}
            required={required}
            label={label}
            error={error}
            disabled={disabled}
            formikFieldName={formikFieldName}
            datePickerProps={datePickerProps}
            settingsData={settingsData}
          />
        }
        calendarPosition={"bottom-center"}
        calendar={settingsData.calendar}
        locale={settingsData.locale}
        format={datePickerProps?.settings?.format || settingsData.format}
        disabled={disabled}
        arrow={datePickerProps.arrow || false}
        containerStyle={{
          width: "100%",
        }}
        plugins={datePickerPlugins}
        portal={
          datePickerProps && datePickerProps.hasOwnProperty("portal")
            ? datePickerProps.portal
            : true
        }
        zIndex={3000}
        {...(datePickerProps || {})}
      >
        {children}
      </MultiDatePicker>
      {formikFieldName && (
        <ErrorMessage component={TextError} name={formikFieldName} />
      )}
    </>
  );
};
//default props
DatePicker.defaultProps = {
  componentId: "multi-date-picker",
  textFieldDateIcon: plainCalendar,
  showDatePickerHeader: true,
  showSettings: true,
  calendarAndLocale: {
    locale: Locales?.gregorian_en,
    calendar: Calendars?.gregorian,
    format: "DD/MM/YYYY",
  },
};
//prop types
DatePicker.propTypes = {
  componentId: PropTypes.string,
  children: PropTypes.any,
  datePickerProps: PropTypes.object,
  calendarAndLocale: PropTypes.object,
  onChangePickerSetting: PropTypes.func,
  textFieldProps: PropTypes.object,
  textFieldDateIcon: PropTypes.any,
  pluginSettingsProps: PropTypes.object,
  pluginDateHeaderProps: PropTypes.object,
  showDatePickerHeader: PropTypes.bool,
  showSettings: PropTypes.bool,
  required: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  //formik field name if within formik context
  formikFieldName: PropTypes.string,
};

export default DatePicker;
