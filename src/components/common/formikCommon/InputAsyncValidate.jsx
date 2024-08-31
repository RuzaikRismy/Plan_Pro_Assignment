import React from "react";
import { ErrorMessage, FastField } from "formik";
import { useTheme } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";

import TextError from "./TextError";
import { getLabel } from "../../../utils/localization";

const InputAsyncValidate = (props) => {
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
    maxlength,
    multiline,
    rows,
    language,
    direction,
    required,
    variant,
    placeholder,
    backColor,
    hasLable,
    hasError,
    fieldLevelValidation,

    ...rest
  } = props;

  const theme = useTheme();

  return (
    <FastField
      name={name}
      validate={(fieldValue) => fieldLevelValidation(fieldValue, name)}
    >
      {({ field, form }) => (
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

export default InputAsyncValidate;
