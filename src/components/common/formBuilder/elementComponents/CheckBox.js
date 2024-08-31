import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useDispatch } from "react-redux";
import { setCheckBoxesValue } from '../../../../actions/formBuilderServiceAction';

export default function CheckboxElement(props) {
  const [checked, setChecked] = React.useState(props.checkBoxData.value);
  const [elementDisabled, setlementDisabled] = React.useState();
  const dispatch = useDispatch();

  const { 
    checkBoxData, 
    metaData 
  } = props

/**
|--------------------------------------------------
| Onchange CheckBoxes  values Set in to Store
|--------------------------------------------------
*/
  const handleChange = (event) => {
    setChecked(event.target.checked)
    dispatch(setCheckBoxesValue(checkBoxData?.id, event.target.checked));
  };

  useEffect(() => {
    if (metaData?.readOnlyData) {
      setlementDisabled(true)
      const key = checkBoxData?.name + '*' + checkBoxData?.id
      const jsObject = metaData?.readOnlyData;
      if (jsObject?.hasOwnProperty && jsObject.hasOwnProperty(key)) {
        let item = jsObject[key];
        if (item === "true") {
          setChecked(true);
        } else {
          setChecked(false);
        }

      }
    }
  }, []);


  return (
    <FormControlLabel
      control={
        <Checkbox
          id={checkBoxData?.id}
          name={checkBoxData?.name}
          color={checkBoxData?.color || "primary"}
          //value = {elementValue}
          checked={checked}
          size={checkBoxData?.size}
          indeterminate={checkBoxData?.indeterminate}
          onChange={handleChange}
          className={checkBoxData?.className}
          disabled={elementDisabled}
        />
      }
      labelPlacement={checkBoxData?.labelPlacement}
      label={checkBoxData?.label}
    />
  );
}
