import React from "react";
import { Checkbox, SvgIcon } from "@material-ui/core";
import {
  withStyles,
  useTheme,
} from "@material-ui/core/styles";
import PropTypes from "prop-types";

//icons
import  { ReactComponent as FilterCheckbox } from "../../assets/images/FilterCheckbox.svg"
import  { ReactComponent as FilterCheckboxChecked } from "../../assets/images/FilterCheckboxChecked.svg"

const CustomColoredCheckbox = (props) => {
  const { checkedColor, uncheckedColor } = props;
  /**
  |--------------------------------------------------
  | Uses app theming
  |--------------------------------------------------
  */
  const theme = useTheme();
  /**
  |--------------------------------------------------
  | Styled Checkbox component
  |--------------------------------------------------
  */
  const BlueCheckBox = withStyles({
      root: {
        stroke: uncheckedColor?uncheckedColor:theme.palette.lightGrey.light,
        "&$checked": {
          color: checkedColor?checkedColor:theme.palette.primary.dark,
        },
      },
      checked: {},
    })((propsPassed) =>{ 
      const { checkedColor, uncheckedColor , ...propData} = propsPassed;
      return (
      <Checkbox
        checkedIcon={<SvgIcon component={FilterCheckboxChecked} viewBox={"0 0 20 20"} style={{borderRadius:theme.customSpacing.borderRadius.radius3
        }}/>}
        icon={<SvgIcon component={FilterCheckbox} style={{fill:theme.palette.primary.contrastText}} viewBox={"0 0 20 20"}/>}
        color="default"
        {...propData}
      />
    )});

    return <BlueCheckBox {...props}/>
  }

  CustomColoredCheckbox.defaultProps = {
    uncheckedColor:false,
    checkedColor:false,
    size:"small",
  }

  CustomColoredCheckbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.any,
    size: PropTypes.any,
    uncheckedColor:PropTypes.any,
    checkedColor:PropTypes.any,
  };

  export default React.memo(CustomColoredCheckbox);