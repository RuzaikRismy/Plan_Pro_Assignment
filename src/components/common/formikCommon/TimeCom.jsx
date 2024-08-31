import React from "react";
import "date-fns";
import { FastField, ErrorMessage } from "formik";
import { Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import moment from "moment";
import { KeyboardTimePicker } from "@material-ui/pickers";
import TextError from "./TextError";
import clock from "../../../assets/images/icons/clock.svg";

const TimeCom = (props) => {
    const { label, name, error, disabled, maxDate, minDate, required, placeholder, hasLable, hasError, mappedWithDate, ...rest } = props;

    /**
    |--------------------------------------------------
    | Uses app theming
    |--------------------------------------------------
    */
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
                        <KeyboardTimePicker
                            style={{ backgroundColor: theme.palette.background.textField }}
                            disabled={disabled}
                            id={name}
                            {...field}
                            {...rest}
                            autoOk={rest.autoOk ? rest.autoOk : true}
                            error={error}
                            invalidDateMessage={
                                <Typography variant="body2" style={{ color: "red", display: "inline" }}>
                                    Invalid Time
                                </Typography>
                            }
                            required
                            variant="inline"
                            inputVariant="outlined"
                            format="HH:mm"
                            margin="dense"
                            views={["hours", "minutes"]}
                            openTo={"hours"}
                            fullWidth
                            placeholder={placeholder || "HH:mm"}
                            maxDate={maxDate}
                            maxDateMessage={
                                <Typography variant="body2" style={{ color: "red", display: "none" }}>
                                    Invalid Time
                                </Typography>
                            }
                            minDate={minDate}
                            minDateMessage={
                                <Typography variant="body2" style={{ color: "red", display: "none" }}>
                                    Invalid Time
                                </Typography>
                            }
                            value={value}
                            onChange={(val) => {
                                try {
                                    setFieldValue(
                                        name,
                                        mappedWithDate ? moment("".concat(mappedWithDate, " ", moment(val).format("HH:mm")), "YYYY-MM-DD HH:mm") : val
                                    );
                                } catch (error) {
                                    setFieldValue(name, val);
                                }
                            }}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                            keyboardIcon={<img src={clock} height={20} alt="timer" />}
                        />
                        { !hasError ? <ErrorMessage component={TextError} name={name}  /> : null}
                    </div>
                );
            }}
        </FastField>
    );
};

export default TimeCom;
