import React from "react";
import "date-fns";
import { FastField, ErrorMessage } from "formik";
import { Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import moment from "moment";
import { KeyboardDatePicker } from "@material-ui/pickers";
import TextError from "./TextError";
import plainCalendar from "../../../assets/images/icons/calendar_plain.svg";

const DateCom = (props) => {
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
    ...rest
  } = props;

  const theme = useTheme();

  return (
    <FastField name={name}>
      {({ form, field }) => {
        const { setFieldValue } = form;
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
              </div>
            ) : null}
            <KeyboardDatePicker
              style={{ backgroundColor: theme.palette.background.textField }}
              disabled={disabled}
              id={name}
              {...field}
              {...rest}
              autoOk
              error={error}
              invalidDateMessage={
                <Typography
                  variant="body2"
                  style={{ color: "red", display: "none" }}
                >
                  Invalid Date
                </Typography>
              }
              required
              variant="inline"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              margin="dense"
              fullWidth
              placeholder={placeholder || "dd/mm/yyyy"}
              maxDate={maxDate}
              maxDateMessage={
                <Typography
                  variant="body2"
                  style={{ color: "red", display: "none" }}
                >
                  Invalid Date
                </Typography>
              }
              minDate={minDate}
              minDateMessage={
                <Typography
                  variant="body2"
                  style={{ color: "red", display: "none" }}
                >
                  Invalid Date
                </Typography>
              }
              value={value}
              onChange={(val) => {
                return setFieldValue(
                  name,
                  moment(val).isValid()
                    ? moment(val).format("YYYY-MM-DD")
                    : null
                );
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              keyboardIcon={
                <img src={plainCalendar} height={20} alt="calender" />
              }
            />
            {!hasError ? (
              <ErrorMessage component={TextError} name={name} />
            ) : null}{" "}
          </div>
        );
      }}
    </FastField>
  );
};

export default DateCom;
