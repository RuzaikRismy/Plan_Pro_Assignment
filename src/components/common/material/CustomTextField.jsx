import React  from 'react';
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const  CustomizeTextField = withStyles((theme) => ({
    root: {
        "& .MuiInput-underline:after": {
            borderBottomColor: theme.palette.brandPrimary.contrastText,
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: theme.palette.brandPrimary.contrastText,
            },
            "&:hover fieldset": {
                borderColor: theme.palette.brandPrimary.contrastText,
            },
            "&.Mui-focused fieldset": {
                borderColor: theme.palette.brandPrimary.contrastText,
            },
        },
        "& .MuiTypography-colorTextSecondary": {
            color: theme.palette.brandPrimary.dark
        },
        "& .MuiOutlinedInput-adornedStart": {
            paddingLeft: "0px !important"
        },
        "& .MuiInputBase-formControl": {
            border: `0.063rem solid ${theme.palette.border.lightash}`,
        }
    },
}))(TextField)

const CustomTextField = (props) => {
    const {
        id,
        name,
        className,
        value,
        onchange,
        placeholder,
        error,
        helperText,
        disabled,
        ...otherProps
    } = props;

    return (        
        <CustomizeTextField
            id={id}
            name={name}
            margin="dense"
            variant="outlined"
            value={value}
            onChange={onchange}
            placeholder={placeholder}
            className={className}
            error={error}
			helperText={helperText}
            disabled={disabled}
            {...otherProps}
        />
    )
}
CustomTextField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string,
};

export default CustomTextField;