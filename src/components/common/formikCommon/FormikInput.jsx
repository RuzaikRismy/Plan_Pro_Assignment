import React from "react";
import { ErrorMessage, FastField } from "formik";
import { TextField, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import TextError from "./TextError";

import { getLabel } from "../../../utils/localization";

const FormikInput = (props) => {
  const {
    label,
    type,
    name,
    error,
    shrink,
    helperText,
    disabled,
    maxDate,
    minDate,
    multiline,
    rows,
    language,
    direction,
    required,
    maxlength,
    maxValue,
    variant,
    placeholder,
    backColor,
    hasLable,
    hasError,
    ...rest
  } = props;

  const theme = useTheme();

  return (
    <FastField name={name}>
      {({ field, form }) => (
        <div style={{ position: "relative", width: "100%" }}>
          {!hasLable ? (
            <div style={{ display: "flex" }}>
              {label && (
                <Typography
                  variant="body2"
                  style={{ color: theme.palette.primary.dark, fontWeight: 400 }}
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

          <TextField
            style={{ backgroundColor: theme.palette.background.textField }}
            error={error}
            margin="dense"
            variant={variant || "outlined"}
            id={name}
            {...rest}
            {...field}
            label={hasLable ? label : null}
            placeholder={placeholder || getLabel({module:"common", label:"pleaseEnter"})}
            type={type}
            multiline={multiline}
            rows={rows}
            fullWidth
            disabled={disabled}
            inputProps={{
              max: maxDate,
              min: minDate,
              lang: language,
              dir: direction,
              maxlength: maxlength,
              max: maxValue,
            }}
            InputLabelProps={{
              shrink: shrink,
            }}
            helperText={helperText}
          />
          {!hasError ? (
            <ErrorMessage component={TextError} name={name} />
          ) : null}
        </div>
      )}
    </FastField>
  );
};

export default FormikInput;
