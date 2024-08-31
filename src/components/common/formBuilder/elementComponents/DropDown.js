import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from "react-redux";
import { setDropDowunElementValue } from '../../../../actions/formBuilderServiceAction';

export default function DropDowunElement(props) {
  
  const { 
    dropDowunData, 
    metaData 
  } = props;

  const [dropDowunValue, setDropDowunValue] = React.useState("");
  const [disabledDropDown, setDropDownDisabled] = React.useState(dropDowunData?.disabled);
  const dispatch = useDispatch();

  const options = dropDowunData?.options ? dropDowunData?.options : [];
  const handleChange = (event) => {
    setDropDowunValue(event.target.value)
    dispatch(setDropDowunElementValue(dropDowunData?.id, event.target.value));
  };

  useEffect(() => {
    if (metaData?.readOnlyData) {
      setDropDownDisabled(true);
      const key = dropDowunData?.name + '*' + dropDowunData?.id
      const jsObject = metaData?.readOnlyData;
      if (jsObject?.hasOwnProperty && jsObject.hasOwnProperty(key)) {
        let value = jsObject[key];
        setDropDowunValue(value);

      } else {
        setDropDowunValue(dropDowunData?.value)
      }
    }
  }, []);
  return (
    <TextField
      select
      id={dropDowunData?.id}
      type={dropDowunData?.type}
      error={dropDowunData?.error}
      fullWidth={dropDowunData?.fullWidth}
      helperText={dropDowunData?.helperText}
      variant={dropDowunData?.variant}
      label={dropDowunData?.label}
      value={dropDowunValue}
      defaultValue={dropDowunData?.defaultValue}
      InputProps={dropDowunData?.InputProps}
      required={dropDowunData?.required}
      onChange={handleChange}
      autoFocus={dropDowunData?.autoFocus}
      size={dropDowunData?.size}
      disabled={disabledDropDown}
      color={dropDowunData?.color}
    >
      {options?.map && options.map((option) => (
        <MenuItem key={option?.value} value={option?.value}>
          {option?.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
