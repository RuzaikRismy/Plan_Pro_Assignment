import React from "react";
import { FastField, ErrorMessage } from "formik";

import { Switch } from "formik-material-ui";
import TextError from "./TextError";

const FormikSwitch = (props) => {
  const { name, disabled } = props;
  return (
    <>
      <FastField
        component={Switch}
        type="checkbox"
        name={name}
        disabled={disabled}
      />
      <ErrorMessage component={TextError} name={name} />
    </>
  );
};

export default FormikSwitch;
