import React from "react";
import { FastField } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";

const CommonCheckBox = (props) => {
  const { label, name, disabled, ...rest } = props;
  return (
    <FastField
      {...rest}
      disabled={disabled}
      component={CheckboxWithLabel}
      type="checkbox"
      name={name}
      Label={{ label: label }}
    />
  );
};

export default CommonCheckBox;
