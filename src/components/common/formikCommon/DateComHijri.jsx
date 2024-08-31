import React from "react";
import { FastField, ErrorMessage } from "formik";
import { Typography, TextField } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextError from "./TextError";
import HijriUtils from "@date-io/hijri";
import moment from "moment-hijri";
import "moment/locale/ar-sa";
import "moment/locale/en-gb";

import { format, isBefore } from "date-fns";
//images
import plainCalendar from "../../../assets/images/icons/calendar_plain.svg";

const DateComHijri = (props) => {
    //need the en localization on formatting texts
    moment().locale("en")

    //properties
    const {
        label,
        name,
        error,
        disabled,
        maxDate,
        minDate,
        required,
        placeholder,
        hasLable,
        hasError,
        onHijriDOBChange,
        ...rest
    } = props;
    /**
    |--------------------------------------------------
    |  Uses app theme
    |--------------------------------------------------
    */
    const theme = useTheme();
    /**
    |--------------------------------------------------
    |  Date picker moment state (different calendar system applied)
    |--------------------------------------------------
    */
    const [dobState, setDobState] = React.useState(moment())
    /**
    |--------------------------------------------------
    | Renders an customized text field for the date picker
    | @param { string } fieldValue  Hijri Date string
    | @param { boolean } fieldError whether field has error
    | @param { object } inputProps date picker passing props of its own
    |--------------------------------------------------
    */
    const renderInputField = (fieldValue, fieldError, inputProps) => {
        return (<div style={{ position: "relative" }}>
            {required && <Typography
                style={{
                    position: "absolute",
                    right: "0.4rem",
                    top: "0.55rem",
                    color: theme.palette.reds.dark,
                    zIndex: 1,
                }}
            >
                *
            </Typography>}
            <TextField
                margin="dense"
                variant={"outlined"}
                fullWidth
                onClick={inputProps.onClick}
                placeholder={"dd/mm/yyyy"}
                // value={moment(formik.values.dobHijri, "iYYYY-iMM-iDD").format("iMMMM iDD[,] iYYYY [AH]")}
                value={fieldValue ? moment(fieldValue, "iYYYY-iMM-iDD").locale("en").format("iDD/iMM/iYYYY") : ""}
                ref={inputProps.inputRef}
                style={{ backgroundColor: theme.palette.background.textField }}
                InputProps={{ ...inputProps.InputProps }}
                error={fieldError?true:false}
                required={required}
                disabled={disabled}
            /></div>)
    }
    /**
    |--------------------------------------------------
    |  moment locale should change to english
    |--------------------------------------------------
    */
    React.useEffect(()=>{
        moment().locale("ar-SA")
    },[])

    return (
        <FastField name={name}>
            {({ form, field }) => {
                const { errors, touched } = form;
                const { value } = field;

                return (
                    <div style={{ position: "relative" }}>
                        {!hasLable ? (
                            <div style={{ display: "flex" }}>
                                {label && (
                                    <Typography
                                        variant="body2"
                                        style={{
                                            color: theme.palette.primary.dark,
                                            fontWeight: theme.typography.fontWeight.weight3,
                                        }}
                                    >
                                        {label}
                                    </Typography>
                                )}
                            </div>
                        ) : null}
                        <MuiPickersUtilsProvider utils={HijriUtils} locale={'ar-SA'}>
                            <KeyboardDatePicker
                                value={dobState}
                                onChange={(date)=>{
                                    if(date){
                                        setDobState(date);
                                        onHijriDOBChange(date)
                                    }
                                }}
                                inputName="dobHijri"
                                TextFieldComponent={(props) => renderInputField(value, touched?.[name] && errors?.[name], props)}
                                labelFunc={date => (date ? date.format("iYYYY/iMM/iDD") : "")}
                                inputId="dobHijri"
                                contentEditable={"false"}
                                variant={"inline"}
                                lang={"en"}
                                autoOk={true}
                                error={errors?.[name]?true:false}
                                mask={"__/__/____"}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                                keyboardIcon={
                                    <img src={plainCalendar} height={20} alt="calender" />
                                }
                                minDate={minDate?minDate:"1937-03-14"}
                                maxDate={maxDate?maxDate:isBefore(new Date(), new Date("2076-11-26")) ? format(new Date(), "yyyy-MM-dd") : "2076-11-26"}
                                disabled={disabled}
                            />
                        </MuiPickersUtilsProvider>
                        {errors?.[name] ? (
                            <ErrorMessage component={TextError} name={name} />
                        ) : null}
                    </div>
                );
            }}
        </FastField>
    );
};

export default DateComHijri;
