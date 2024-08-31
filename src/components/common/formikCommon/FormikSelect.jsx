import React from "react";
import { ErrorMessage, FastField } from "formik";

import TextError from "./TextError";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { MenuItem, Typography } from "@material-ui/core";
import Select from "@material-ui/core/Select";

import {getLabel} from "../../../utils/localization";

const usePlaceholderStyles = makeStyles((theme) => ({
  placeholder: {
    color: "#aaa",
  },
}));

const Placeholder = ({ children, id }) => {
  const classes = usePlaceholderStyles();
  return (
    <div className={classes.placeholder} id={id}>
      {children}
    </div>
  );
};
export default function FormikSelect(props) {
  const { label, name, options, disabled, required, placeholder, ...rest } =
    props;

  const theme = useTheme();

  return (
    <FastField name={name}>
      {({ field, form }) => (
        <div style={{ position: "relative", width: "100%" }}>
          <div style={{ display: "flex", marginBottom: "0.5rem" }}>
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
                  top: "1.8rem",
                  color: theme.palette.reds.dark,
                  zIndex: 1,
                }}
              >
                *
              </Typography>
            )}
          </div>
          <Select
            style={{ backgroundColor: theme.palette.background.textField }}
            disabled={disabled}
            {...rest}
            {...field}
            id={name}
            margin="dense"
            displayEmpty
            renderValue={
              placeholder !== ""
                ? undefined
                : () => (
                    <Placeholder id={`placeholder-select-${name}`}>
                      {getLabel({module:"common", label:"pleaseSelect"})}
                    </Placeholder>
                  )
            }
            variant="outlined"
            fullWidth
          >
            {options &&
              options.map((item) => (
                <MenuItem key={item.id} value={item.id} disabled={ item?.isDisabled }>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
          <ErrorMessage component={TextError} name={name} />
        </div>
      )}
    </FastField>
  );
}
