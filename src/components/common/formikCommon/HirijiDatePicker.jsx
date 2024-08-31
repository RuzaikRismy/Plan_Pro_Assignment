import React from "react";
import HijriDatePicker from "hijri-date-picker";

const HirijiDatePicker = (props) => {
  const { classes, handleHirijiDate } = props;

  return (
    <>
      <HijriDatePicker
        inputName="hijri_date"
        className={classes.hijriDatePicker}
        dateFormat="iYYYY/iMM/iDD"
        placeholder="Date of Birth Hijri"
        onChange={handleHirijiDate}
      />
    </>
  );
};

export default HirijiDatePicker;
