import React from "react";
import { ErrorMessage, FastField } from "formik";
import { useTheme } from "@material-ui/core/styles";
import { TextField, MenuItem, Typography } from "@material-ui/core";
import TextError from "./TextError";

const CommonSelect = (props) => {
  const { label, name, options, disabled, required, ...rest } = props;
  const theme = useTheme();
  return (
    <div>
      <FastField name={name}>
        {({ field, form }) => (
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", marginTop: "0.4rem" }}>
              <Typography
                variant="body2"
                style={{
                  color: theme.palette.primary.dark,
                  fontWeight: theme.typography.fontWeight.weight3,
                }}
              >
                {label}
              </Typography>

              {required && (
                <Typography
                  style={{
                    position: "absolute",
                    right: "0.4rem",
                    top: "2rem",
                    color: theme.palette.reds.dark,
                    zIndex: 1,
                  }}
                >
                  *
                </Typography>
              )}
            </div>
            <TextField
              style={{ backgroundColor: theme.palette.background.textField }}
              select
              margin="dense"
              variant="outlined"
              id={name}
              {...rest}
              {...field}
              label={label}
              fullWidth
              disabled={disabled}
            >
              {options &&
                options.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </TextField>
            <ErrorMessage component={TextError} name={name} />
          </div>
        )}
      </FastField>
    </div>
  );
};

export default CommonSelect;
