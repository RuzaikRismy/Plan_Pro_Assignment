import React from "react";
import { ErrorMessage, FastField } from "formik";
import { TextField, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import TextError from "./TextError";

const InputOnBlur = (props) => {
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
    variant,
    placeholder,
    backColor,
    hasLable,
    hasError,
    validateId,
    ...rest
  } = props;

  const theme = useTheme();
  return (
    <FastField name={name}>
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
            {...form}
            label={hasLable ? label : null}
            placeholder={placeholder || "Please Enter"}
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
            }}
            InputLabelProps={{
              shrink: shrink,
            }}
            helperText={helperText}
            onBlur={(event) => {
              form.handleBlur(event);
              validateId(event.target.name, field.value);
            }}
          />
          {!hasError ? (
            <ErrorMessage component={TextError} name={name} />
          ) : null}
        </div>
      )}
    </FastField>
  );
};

export default InputOnBlur;
