import React from "react";
import { FormControlLabel, Radio } from "@material-ui/core";
import { RadioGroup } from "formik-material-ui";
import { FastField } from "formik";

const FormikRadioGroup = (props) => {
  const { name, label, error, options, disabled, row, ...rest } = props;

  /**
    |--------------------------------------------------
    | Default Props
    |--------------------------------------------------
    */
  FormikRadioGroup.defaultProps = {
    row: true,
  };

  return (
    <>
      <FastField name={name}>
        {(field, form) => (
          <>
            <RadioGroup
              name={name}
              id={name}
              {...rest}
              {...field}
              error={error}
              row={row}
            >
              {options.map((option, index) => {
                return (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                    disabled={disabled}
                  />
                );
              })}
            </RadioGroup>
          </>
        )}
      </FastField>
    </>
  );
};

export default FormikRadioGroup;
