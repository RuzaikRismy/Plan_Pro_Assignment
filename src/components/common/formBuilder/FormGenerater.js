import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SingleElement from './SingleElement';

const FormGenerater = (props) => {
    const { 
        metaData 
    } = props;
    const [htmlForm, sethtml] = useState();
    
    
    let inputData = {};
    useEffect(() => {
        CreateForm(props.data);
    }, []);

    /**
    |--------------------------------------------------
    | Create Form Main Function
    |--------------------------------------------------
    */
    const CreateForm = (elementData) => {
        const form = [];

        let CurrentRowNumber = 1;
        let previosRowNumber = 1;
        let rowArr = [];
        const elementCount = elementData.length;
        let index = 0

        elementData?.forEach && elementData.forEach((ele) => {
            CurrentRowNumber = ele.rowNumber;
            if (CurrentRowNumber == previosRowNumber) {
                rowArr.push(ele);
            } else {
                let row = createRow(rowArr);
                console.log('row1', row);
                form.push(row);
                rowArr = [];
                rowArr.push(ele);
            }
            index++;
            previosRowNumber = ele.rowNumber
            if (elementCount === index) {
                let row = createRow(rowArr);
                console.log('row', row);
                form.push(row);
            }

        });
        sethtml(form);
    }
    /**
    |--------------------------------------------------
    | Create Rows in Forms
    |--------------------------------------------------
    */
    const createRow = (rawData) => {
        if (rawData) {
            return (
                <Grid container >
                    {createElements(rawData)}
                </Grid>
            );
        }
    }

    /**
    |--------------------------------------------------
    | Create Elements in Forms
    |--------------------------------------------------
    */
    const createElements = (elementsData) => {
        let elementArray = [];
        elementArray = elementsData.map((data) => {
            inputData = data;
            return (
                <SingleElement key={data.id} elementData={data} metaData={metaData} />
            );
        })
        return elementArray;
    }
    return (
        <div>
            {
                htmlForm
            }
        </div>
    );

};

export default FormGenerater;