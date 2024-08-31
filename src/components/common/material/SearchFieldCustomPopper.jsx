import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Popper,
} from "@material-ui/core";
import classNames from 'classnames';
import PropTypes from "prop-types";

import CustomTextField from './CustomTextField';

import { useStyles } from "../../../assets/styles/styles";

const SearchFieldCustomPopper = (props) => {

    // props
    const {
        id,
        name,
        searchValue,
        handleSearchValue,
        searchFieldSectionStyle,
        placeholder,
        setAnchorEl,
        anchorEl,
        popperContent,
        propperStyle,
        popperContentContainerStyle,
        error,
        helperText,
        disabled,
        modifiers,
        searchFieldOtherProps,
        popperComOtherProps,
    } = props;

    // useStates
    const [isPopperShown, setIsPopperShown] = useState(true);

    // effect on search value
    useEffect((e) => {
        if(searchValue?.length > 2){
            setIsPopperShown(true);
        }
        else{
            setIsPopperShown(false);
        }
    }, [searchValue])    

    // custom styles
    const classes = useStyles();

    return (
        <Grid container>           
            <Grid item xs={12}>
                <Box
                    component="div"
                    display="flex"
                    alignItems="center"
                    mr={3}
                    className={classes.searchFeildBoxContainer}
                >
                    <CustomTextField
                        id={`${id}SearchField`}
                        name={`${name}SearchField`}
                        value={searchValue}
                        onchange={handleSearchValue}
                        placeholder={placeholder}
                        className={searchFieldSectionStyle}
                        onClick={(event) => {
                            setAnchorEl(anchorEl ? null : event.currentTarget);
                        }}
                        error={error}
                        helperText={helperText}
                        disabled={disabled}
                        {...searchFieldOtherProps}
                    />                   
                </Box>                
            </Grid>
            <Grid item xs={12}>
                <Popper
                    id={`${id}Popper`}                    
                    open={isPopperShown} 
                    anchorEl={anchorEl} 
                    transition
                    placement={'bottom-start'}
                    modifiers={modifiers}
                    className={propperStyle}
                    {...popperComOtherProps}
                >
                    {({ TransitionProps }) => (
                        <Grid 
                            wrap='nowrap' 
                            className={classNames(
                                classes.searchFieldCustomPopperContent,
                                popperContentContainerStyle
                            )}
                        >
                            {popperContent}
                        </Grid>
                    )}
                </Popper>    
            </Grid>
        </Grid>
    );
};
SearchFieldCustomPopper.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    handleSearchValue: PropTypes.func.isRequired,
    searchValue: PropTypes.any,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string,
};

export default SearchFieldCustomPopper;