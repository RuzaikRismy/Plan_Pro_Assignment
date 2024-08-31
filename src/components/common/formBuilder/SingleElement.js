import { Checkbox, Grid } from '@material-ui/core';
import CheckboxElement from './elementComponents/CheckBox'
import React, { useEffect, useState ,useRef } from 'react';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { Autocomplete } from '@material-ui/lab';
import Inputs from './elementComponents/Inputs';
import ImageEditor from './elementComponents/ImageEditer'
import ButtonElement from './elementComponents/ButtonElement';
import DropDowunElement from './elementComponents/DropDown'

const SingleElement = (props) => {
    const { 
        metaData,
        elementData 
    }  = props;
    
    const [elementValue,setElemenyValue] =  useState();
    
    useEffect(() => {

        const dataOfElements = props.elementData;
        if(dataOfElements.fieldType === "Header"){
            setElemenyValue(<Typography variant={dataOfElements?.variant} align= {dataOfElements?.style.alignment}
                       style = {dataOfElements?.style} >{dataOfElements?.label}</Typography>)
        }

        if(dataOfElements?.fieldType === "Label"){
            setElemenyValue(<Typography variant={dataOfElements?.variant} align= {dataOfElements?.style.alignment}
                       style = {dataOfElements?.style} >{dataOfElements?.label}</Typography>)
        }
        if(dataOfElements?.fieldType === "TextInput" ){
            setElemenyValue(<Inputs inputsData = {dataOfElements} metaData={metaData}/>)
        }
        if(dataOfElements?.fieldType === "Checkboxes" ){
            setElemenyValue(<CheckboxElement checkBoxData = {dataOfElements} metaData={metaData}/>)
        }
        if(dataOfElements?.fieldType === "Button" ){
            setElemenyValue(<ButtonElement color = {dataOfElements?.color}  buttonData = {dataOfElements} metaData={metaData}/>)
        }
        
        if(dataOfElements?.fieldType === "RadioButtons" ){  // multiple choices and Radio button group
            setElemenyValue(<CheckboxElement checkBoxData = {dataOfElements} metaData={metaData}/>)
        }
        if(dataOfElements?.fieldType === "DropDowun" ){
            setElemenyValue(<DropDowunElement dropDowunData = {dataOfElements} metaData={metaData}/>)
        }
        if(dataOfElements?.fieldType === "Image" ){
            setElemenyValue(<ImageEditor imageData = {dataOfElements} metaData={metaData} />)
        }
    }, []);


    return (
            <Grid item lg = {elementData?.lg} md = {elementData?.md} sm= {elementData?.sm}  style={{ padding: "7.5px" }} >
                {elementValue}
            </Grid>
       );
 
};

export default SingleElement; 