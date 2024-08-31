import React from 'react';
import { Grid, Typography, useTheme } from '@material-ui/core';
import PropTypes from "prop-types";
import { ErrorMessage, Field } from 'formik';

import DropDown from './DropDown';
import Input from './Input';
import { useStyles } from '../../../assets/styles/styles';
import TextError from '../formikCommon/TextError';
import { useSelector } from 'react-redux';

const CountryCodeTelephoneField = (props) => {
    const {
        mainWrapperProps,
        countryGridProps,
        mobileFieldGridProps,
        countryCodeSelectorProps,
        mobileNoFieldProps,
        countryFlagClass,
        isUnicodeFlags,
        handleDropdownChange,
        dropDownOptionUniqueKey,
        fieldLabelId,
        fieldLabel,
        formikFieldName,
        formikFieldLevelValidation,
        fieldLabelClass,
    } = props;
    /**
    |--------------------------------------------------
    | Uses App Theme
    |--------------------------------------------------
    */
    const commonStyles = useStyles();

    const theme = useTheme();
    /**
    |--------------------------------------------------
    | Redux integrations
    |--------------------------------------------------
    */
    const { isRequestLoading, countryFlagsDialCodesData } = useSelector((state) => state.countryFlagsDialCodesData);
    /**
    |--------------------------------------------------
    | Country code options data
    |--------------------------------------------------
    */
    const [countryFlagOptionData, setCountryFlagOptionData] = React.useState([]);

    /**
    |--------------------------------------------------
    | On Country Code Sources changed
    |--------------------------------------------------
    */
    React.useEffect(() => {
        if (countryFlagsDialCodesData?.length) {
            let tempCountriesData = [...countryFlagsDialCodesData];
            tempCountriesData = (tempCountriesData || []).sort((a, b) => a["dialCode"] - b["dialCode"])
            tempCountriesData = tempCountriesData.map(countryData => {
                let tempCountry = countryData;
                tempCountry = {
                    ...tempCountry,
                    id: countryData?.[dropDownOptionUniqueKey || "countryCode"],
                    countryName: countryData.countryName,
                    name: countryData.dialCode,
                    icon: isUnicodeFlags ? countryData.unicodeFlag : <img src={countryData?.flagImage} name={countryData.countryName} alt={countryData.countryName} className={countryFlagClass ? countryFlagClass : commonStyles.countrySelectorFlagIcon} />,
                }
                return tempCountry
            });

            setCountryFlagOptionData(tempCountriesData)
        }
    }, [countryFlagsDialCodesData?.length]);

    return (
        <>
        {fieldLabel && <Typography
            id={fieldLabelId ? fieldLabelId : 'fieldLabelId'}
            variant="body2"
            className={fieldLabelClass || commonStyles.countryCodeTelephoneLabel}
            >
            {fieldLabel}
        </Typography>}
        <Grid wrap='nowrap' container {...(mainWrapperProps ? mainWrapperProps : {})}>
            <Grid 
                item
                className={commonStyles.countryCodeSelectorWrapper} 
                {...(countryGridProps ? countryGridProps : { lg: 6, md: 6, sm: 6, xs: 12 })} 
            >
                <DropDown
                    id={"country-code"}
                    name={"Country Code"}
                    optionData={countryFlagOptionData}
                    variant={"outlined"}
                    margin={"dense"}
                    dropDownClass={commonStyles.countryCodeSelector}
                    onChange={(event,child)=>{
                        let selectOption = countryFlagOptionData && countryFlagOptionData.find(country=>country?.[ dropDownOptionUniqueKey || "countryCode"] === event.target?.value)
                        handleDropdownChange && handleDropdownChange(event,child, selectOption)
                    }}
                    
                    {...countryCodeSelectorProps}
                />
            </Grid>
            <Grid 
                item 
                className={commonStyles.telephoneFieldWrapper}
                {...(mobileFieldGridProps ? mobileFieldGridProps : { lg: 12, md: 12, sm: 12, xs: 12 })} 
            >
                {formikFieldName ? <Field  name={formikFieldName} validate={(fieldValue) => formikFieldLevelValidation && formikFieldLevelValidation(fieldValue, formikFieldName)}>
                {({ field, form }) => <Input
                        id={"phone-number"}
                        name={"Phone Number"}
                        variant={"outlined"}
                        margin={"dense"}
                        className={commonStyles.telephoneField}
                        autoComplete="off"
                        inputProps={{
                            form: {
                                autocomplete:"off"
                            }
                        }}
                        {...field}
                        {...mobileNoFieldProps} 
                    />}
                </Field>:<Input
                    id={"phone-number"}
                    name={"Phone Number"}
                    variant={"outlined"}
                    margin={"dense"}
                    className={commonStyles.telephoneField}
                    {...mobileNoFieldProps}
                />}
            </Grid>
        </Grid>
        {formikFieldName && <ErrorMessage component={TextError} name={formikFieldName} />}   
    </>)
}

/**
|--------------------------------------------------
| prop-types definitions
|--------------------------------------------------
*/
CountryCodeTelephoneField.propTypes = {
    mainWrapperProps:PropTypes.object,
    countryGridProps:PropTypes.object,
    mobileFieldGridProps:PropTypes.object,
    countryCodeSelectorProps:PropTypes.object,
    mobileNoFieldProps:PropTypes.object,
    countryFlagClass:PropTypes.any,
    isUnicodeFlags:PropTypes.bool,
    //to handle controlled option and property visibility
    handleDropdownChange: PropTypes.func,
    dropDownOptionUniqueKey: PropTypes.string,
    //if within formik field context, related Yup schema mapping error's field name
    formikFieldName: PropTypes.string,
    formikFieldLevelValidation: PropTypes.func,
    //field label
    fieldLabelClass: PropTypes.object,
    fieldLabel: PropTypes.string,
};


export default React.memo(CountryCodeTelephoneField);