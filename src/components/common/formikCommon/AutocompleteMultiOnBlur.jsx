import React from "react";
import { ErrorMessage, FastField, Field } from "formik";
import { TextField, Typography, Checkbox } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
// import { Autocomplete } from "formik-material-ui-lab";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import TextError from "./TextError";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const InputOnBlur = (props) => {
  const {
    name,
    options,
    label,
    disabled,
    required,
    error,
    handleSpecialtyDropDownData,
    autoFocus,
    ...rest
  } = props;

  const theme = useTheme();
  return (
    <Field name={name}>
      {({ field, form }) => (
        <div style={{ position: "relative", width: "100%" }}>
          {required && (
            <Typography
              style={{
                position: "absolute",
                right: "0.4rem",
                top: "0.2rem",
                color: theme.palette.reds.dark,
                zIndex: 1,
              }}
            >
              *
            </Typography>
          )}

          <Autocomplete
            {...rest}
            {...field}
            {...form}
            disabled={disabled}
            ChipProps={{
              color: "primary",
              variant: "outlined",
            }}
            fullWidth
            onChange={(e, value) => {
              form.setFieldValue(name, value);
              handleSpecialtyDropDownData(name, value);
            }}
            multiple
            name={name}
            options={options}
            id={`Autocomplete-${label}`}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField
                error={error}
                style={{ backgroundColor: theme.palette.background.textField }}
                margin={"none"}
                {...params}
                variant="outlined"
                label={label}
                fullWidth
                autoFocus={autoFocus}
              />
            )}
          />
          <ErrorMessage component={TextError} name={name} />
        </div>
      )}
    </Field>
  );
};

export default InputOnBlur;
