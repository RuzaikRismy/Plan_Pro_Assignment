import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FormControl, FormLabel, FormGroup } from "@material-ui/core";
//commons and class imports
import { useStyles } from "../../../assets/styles/styles";

const LabeledOutlinedFormControl = (props) => {
  const {
    children,
    formControlClass,
    formLabelClass,
    formGroupClass,
    formControlOtherProps,
    formLabelOtherProps,
    formGroupOtherProps,
    formAreaLabel,
  } = props;

  /**
  |--------------------------------------------------
  | To use color palette and styles theming
  |--------------------------------------------------
  */
  const commonStyles = useStyles();

  return (
    <FormControl
      component={"fieldset"}
      variant={"outlined"}
      className={classNames(
        commonStyles.labeledFormControlOutlined,
        formControlClass
      )}
      {...formControlOtherProps}
    >
      <FormLabel
        component={"legend"}
        className={classNames(
          commonStyles.labeledFormControlFormLabel,
          formLabelClass
        )}
        {...formLabelOtherProps}
      >
        {formAreaLabel}
      </FormLabel>
      <FormGroup
        className={classNames(
          commonStyles.labeledFormGroupFlexGrow,
          formGroupClass
        )}
        {...formGroupOtherProps}
      >
        {children}
      </FormGroup>
    </FormControl>
  );
};
//prop types
LabeledOutlinedFormControl.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  formControlClass: PropTypes.object,
  formLabelClass: PropTypes.object,
  formGroupClass: PropTypes.object,
  formControlOtherProps: PropTypes.object,
  formLabelOtherProps: PropTypes.object,
  formGroupOtherProps: PropTypes.object,
  formAreaLabel: PropTypes.string.isRequired,
};

export default React.memo(LabeledOutlinedFormControl);
