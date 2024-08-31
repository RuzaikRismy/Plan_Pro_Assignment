
import React, { useEffect, useState, useRef } from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { setTextFeildValue } from '../../../../actions/formBuilderServiceAction';

const Inputs = (props) => {

    const {
        inputsData,
        metaData
    } = props;

    const [elementValueError, setElemenyValueError] = useState(false);
    const [newHelperText, setNewHelperText] = useState(null);
    const [elementValue, seteEementValue] = useState(inputsData?.value);
    const [elementDisabled, setlementDisabled] = useState(inputsData?.disabled);
    const dispatch = useDispatch();

    if (inputsData?.type == "date") {
        inputsData.InputLabelProps = { shrink: true };
    }

    useEffect(() => {
        if (metaData?.readOnlyData) {
            setlementDisabled(true)
            const key = inputsData?.name + '*' + inputsData?.id
            const jsObject = metaData?.readOnlyData;
            if (jsObject?.hasOwnProperty && jsObject?.hasOwnProperty(key)) {
                let item = jsObject[key];
                seteEementValue(item);

            }
        }
    }, []);

    /**
    |--------------------------------------------------
    | Onchange text inputs validate and set values in to Store
    |--------------------------------------------------
    */
    const onChangeTextFeaild = (event) => {
        seteEementValue(event.target.value);
        let errorArray = [];

        if (inputsData?.validations) {
            const validationLength = inputsData.validations.length;
            const valdation = inputsData.validations;
            if (validationLength > 0) {

                valdation?.forEach && valdation.forEach(element => {

                    if (element?.id === inputsData?.id) {

                        if (element?.condition === "inputMinLenth") {
                            if (element?.boundryValue > event.target.value.length) {
                                errorArray.push(element.helperText);
                            }
                        }

                        if (element?.condition === "inputMinLenth") {
                            if (event.target.value.length > element?.boundryValue) {
                                errorArray.push(element.helperText);
                            }
                        }

                        if (inputsData?.type === "number") {

                            let numberPattern = '';
                            switch (element?.condition) {
                                case "minValue":
                                    if (element.boundryValue > event.target.value) {
                                        errorArray.push(element.helperText);
                                    }
                                    break;
                                case "maxValue":
                                    if (event.target.value > element.boundryValue) {
                                        errorArray.push(element.helperText);
                                    }
                                    break;
                                case "PW-type-03":
                                    numberPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
                                    if (!event.target.value.match(numberPattern)) {
                                        errorArray.push(element.helperText);
                                    }
                                    break;
                                case "PW-type-04":
                                    numberPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
                                    if (!event.target.value.match(numberPattern)) {
                                        errorArray.push(element.helperText);
                                    }
                                    break;
                                default:
                                    break;
                            }

                        }

                        if (inputsData?.type === "email") {

                            if (element?.condition === "pattern") {
                                const mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                                if (!event.target.value.match(mailformat)) {
                                    errorArray.push(element.helperText);
                                }
                            }

                        }

                        if (inputsData?.type === "password") {

                            // PW-type-01 =  password between 7 to 16 characters which contain only characters, 
                            //               numeric digits, underscore and first character must be a letter

                            // PW-type-02 =  password between 6 to 20 characters which contain at least one numeric digit,
                            //               one uppercase and one lowercase letter

                            // PW-type-03 =  password between 7 to 15 characters which contain at least one numeric digit and a special character

                            // PW-type-04 =  password between 8 to 15 characters which contain at least one lowercase letter, 
                            //               one uppercase letter, one numeric digit, and one special character

                            let pwPattern = '';
                            switch (element?.condition) {
                                case "PW-type-01":
                                    pwPattern = /^[A-Za-z]\w{7,14}$/;
                                    if (!event.target.value.match(pwPattern)) {
                                        errorArray.push(element.helperText);
                                    }
                                    break;
                                case "PW-type-02":
                                    pwPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
                                    if (!event.target.value.match(pwPattern)) {
                                        errorArray.push(element.helperText);
                                    }
                                    break;
                                case "PW-type-03":
                                    pwPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
                                    if (!event.target.value.match(pwPattern)) {
                                        errorArray.push(element.helperText);
                                    }
                                    break;
                                case "PW-type-04":
                                    pwPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
                                    if (!event.target.value.match(pwPattern)) {
                                        errorArray.push(element.helperText);
                                    }
                                    break;
                                default:
                                    break;
                            }

                        }

                    }
                });

                if (event.target.value == '') {
                    errorArray = [];
                    setNewHelperText(null);
                    setElemenyValueError(false);
                }
                if (errorArray?.length > 0) {
                    setElemenyValueError(true);
                    const error = errorArray.join()
                    setNewHelperText(error);
                } else {
                    setNewHelperText(null);
                    setElemenyValueError(false);
                }
            }
        }
        dispatch(setTextFeildValue(inputsData?.id, event.target.value));
    };

    return (
        <TextField
            id={inputsData?.id}
            type={inputsData?.type}
            error={elementValueError}
            fullWidth={inputsData?.fullWidth}
            helperText={newHelperText ? newHelperText : inputsData?.helperText}
            variant={inputsData?.variant}
            label={inputsData?.label}
            defaultValue={inputsData?.defaultValue}
            value={elementValue}
            InputProps={inputsData?.InputProps}
            InputLabelProps= {inputsData?.InputLabelProps}
            required={inputsData?.required}
            onChange={onChangeTextFeaild}
            autoFocus={inputsData?.autoFocus}
            size={inputsData?.size}
            color={inputsData?.color}
            rows={inputsData?.rows}
            multiline={inputsData?.multiline}
            disabled={elementDisabled}
        />
    );
};



export default Inputs;