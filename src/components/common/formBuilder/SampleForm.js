import React, { useEffect, useState } from 'react';
import { useDispatch ,useSelector } from "react-redux";
import FormGenerater from './FormGenerater';
import { Card, CardContent, Grid } from '@material-ui/core';
import { getFormBuilderTemplateServices } from '../../../actions/formBuilderServiceAction';

const SampleForm = (props) => {

    const dispatch = useDispatch();

    const data = {
        "_id": "6343cd1c7dada724a39d91dd6ead",
        "templateType": "",
        "isScoreApplicable": true,
        "templateName": "Skin Assessment Form",
        "speciality": [
            {
                "specialityId": "PHY",
                "speciality": "Psychiatry and Addiction"
            }
        ],
        "publishedBy": "Form Builder App",
        "dateCreated": {
            "$date": {
                "$numberLong": "1622073600000"
            }
        },
        "templateStatus": "ACTIVE",
        // "fields":[
        //     {
        //        "fieldType": "TextInput",
        //        "name": "doctName",
        //        "id": "doctName",
        //        "type": "tel",
        //        "label": "Doctor Name",
        //        "placeHolder": "Enter Docter Name",
        //        "FieldSize": 6,
        //        "rowNum":1,
        //        "variant":"filled",
        //        "lg": 6,
        //        "md": 6,
        //        "sm": 12,
        //        },
        //     {
        //     "fieldType": "TextInput",
        //     "defaultValue": "Default Value",
        //     "name": "patientName",
        //     "id": "patienttName",
        //     "label": "Patient Name",
        //     "size": "small",
        //     "rowNum":1,
        //     "InputProps" : {
        //        readOnly: true,
        //        style: { color: '#B327DA'}
        //      },
        //      "InputLabelProps":{
        //        shrink: true,
        //      },
        //     "required": true,
        //     "disabled": false,
        //     "variant":"outlined",
        //     "autoFocus": false,
        //     "lg": 6,
        //     "md": 6,
        //     "sm": 12,
        //  },
        //  {
        //     "fieldType": "TextInput",
        //     "name": "doctName",
        //     "id": "doctNamewww",
        //     "label": "Doctor Name",
        //     "placeHolder": "Enter Docter Name",
        //     "FieldSize": 6,
        //     "rowNum":2,
        //     "error": true,
        //     "helperText":"Incorrect entry.",
        //     "lg": 4,
        //     "md": 4,
        //     "sm": 12,
        //     },
        //  {
        //        "fieldType": "TextInput",
        //        "name": "doctName",
        //        "id": "Password",
        //        "color": "warning",
        //        "label": "Password",
        //        "placeHolder": "Enter Docter Name",
        //        "FieldSize": 6,
        //        "rowNum":2,
        //        "type": "password",
        //        "fullWidth": false,
        //        "InputProps" : {
        //           startAdornment: (
        //              <InputAdornment position="start">
        //                <AccountCircle />
        //              </InputAdornment>
        //            ),
        //         },
        //        "helperText":"Add your password.",
        //        "lg": 4,
        //        "md": 4,
        //        "sm": 12,
        //        "variant":"outlined",
        //        },
        //  {
        //     "fieldType": "TextInput",
        //     "name": "doctName",
        //     "id":  "number",
        //     "label": "Number Values",
        //     "InputProps" : {
        //        endAdornment: (
        //           <InputAdornment position="end">
        //             Kg
        //           </InputAdornment>
        //         ),
        //      },
        //     "type": "number",
        //     "FieldSize": 6,
        //     "rowNum":2,
        //     "lg": 4,
        //     "md": 4,
        //     "sm": 12,
        //  },
        //  {
        //     "fieldType": "typography",
        //     "header": "Sample Drop downs",
        //     "variant": "h1",
        //     "rowNum":5,
        //     "lg": 12,
        //     "md": 12,
        //     "sm": 12,
        //  },
        //  {
        //        "fieldType": "dropDowun",
        //        "name": "doctName",
        //        "id":  "number",
        //        "label": "Curruncy Values",
        //        "type": "text",
        //        "rowNum":6,
        //        "lg": 4,
        //        "md": 4,
        //        "sm": 12,
        //        "options": [
        //           {
        //             value: 'USD',
        //             label: '$',
        //           },
        //           {
        //             value: 'EUR',
        //             label: '€',
        //           },
        //           {
        //             value: 'BTC',
        //             label: '฿',
        //           },
        //           {
        //             value: 'JPY',
        //             label: '¥',
        //           },
        //         ]

        //     }, 
        //     {
        //        "fieldType": "dropDowun",
        //        "name": "doctName",
        //        "id":  "number",
        //        "label": "Curruncy Values",
        //        "type": "text",
        //        "rowNum":6,
        //        "lg": 4,
        //        "md": 4,
        //        "sm": 12,
        //        "variant":"outlined",
        //        "options": [
        //           {
        //             value: 'USD',
        //             label: '$',
        //           },
        //           {
        //             value: 'EUR',
        //             label: '€',
        //           },
        //           {
        //             value: 'BTC',
        //             label: '฿',
        //           },
        //           {
        //             value: 'JPY',
        //             label: '¥',
        //           },
        //         ]

        //     }, 
        //     {
        //        "fieldType": "dropDowun",
        //        "name": "doctName",
        //        "id":  "number",
        //        "label": "Curruncy Values",
        //        "type": "text",
        //        "rowNum":6,
        //        "lg": 4,
        //        "md": 4,
        //        "sm": 12,
        //        "variant":"filled",
        //        "options": [
        //           {
        //             value: 'USD',
        //             label: '$',
        //           },
        //           {
        //             value: 'EUR',
        //             label: '€',
        //           },
        //           {
        //             value: 'BTC',
        //             label: '฿',
        //           },
        //           {
        //             value: 'JPY',
        //             label: '¥',
        //           },
        //         ]

        //     }, 
        //     {
        //       "fieldType": "autoCompleat",
        //       "name": "doctName",
        //       "id":  "number",
        //       "label": "Curruncy Values",
        //       "type": "text",
        //       "rowNum":7,
        //       "lg": 4,
        //       "md": 4,
        //       "sm": 12,
        //       "variant":"filled",
        //       "options": [
        //         { title: 'The Shawshank Redemption', year: 1994 },
        //         { title: 'The Godfather', year: 1972 },
        //         { title: 'The Godfather: Part II', year: 1974 },
        //         { title: 'The Dark Knight', year: 2008 },
        //         { title: '12 Angry Men', year: 1957 },
        //         { title: "Schindler's List", year: 1993 },
        //         { title: 'Pulp Fiction', year: 1994 },
        //         { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
        //        ]

        //    }

        // ],


        // Include with validationsss
        // "fields":[
        //   {
        //     "fieldType": "Header",
        //     "id": "94C4AC60-54E6-47AE-A3D4-28F0C82D65AE",
        //     "order": 1,
        //     "label": "Sample Form",
        //     "rowNumber": 1,
        //     "variant": "h3",
        //     "lg": 12,
        //     "md": 12,
        //     "sm": 12,
        //     "style": {
        //         "alignment": "left",
        //         "fontFace": "Arial",
        //         "fontSize": "16",
        //         "fontStyle": "Bold",
        //         "foregroundColor": "#FFFFFF",
        //         "backgroundColor": "#FF0000"
        //     },
        //     "dataBind": {
        //         "model": "",
        //         "property": ""
        //     },
        //     "dataSearch": {
        //         "baseUrl": "",
        //         "port": "",
        //         "method": "",
        //         "servicePath": "",
        //         "searchPropertyName": ""
        //     }
        // },
        // {
        //     "fieldType": "TextInput",
        //     "fullWidth": true,
        //     "id": "A2440C5A-7178-4D5A-824A-540953099791",
        //     "name": "email",
        //     "order": 2,
        //     "label": "Email",
        //     "type": "email",
        //     "onChange": (e)=>{ console.log('xxxxxxxxxxxxxxx',e.target.value)},
        //     "placeHolder": "",
        //     "disabled": false,
        //     "size": "small",
        //     "required": true,
        //     "helperText": "Enter your user name",
        //     "rowNumber": 2,
        //     "searchPropertyName": "",
        //     "autoFocus": true,
        //     "variant": "outlined",
        //     "lg": 6,
        //     "md": 6,
        //     "sm": 12,
        //     "validations": [{id: "A2440C5A-7178-4D5A-824A-540953099791",  condition: "pattern" , helperText: 'Enter a valid email !'},
        //                     ],
        //     "style": {
        //         "alignment": "left",
        //         "fontFace": "Arial",
        //         "fontSize": "16",
        //         "fontStyle": "Bold",
        //         "foregroundColor": "#FFFFFF",
        //         "backgroundColor": "#FF0000"
        //     },
        //     "dataBind": {
        //         "model": "",
        //         "property": ""
        //     },
        //     "dataSearch": {
        //         "baseUrl": "",
        //         "port": "",
        //         "method": "",
        //         "servicePath": "",
        //         "searchPropertyName": ""
        //     }
        // },
        // {
        //     "fieldType": "TextInput",
        //     "fullWidth": true,
        //     "id": "AA4FF531-BF0C-419A-8ADA-3F169EFD2B4C",
        //     "name": "Password",
        //     "order": 3,
        //     "label": "Password",
        //     "type": "password",
        //     "placeHolder": "",
        //     "disabled": false,
        //     "size": "small",
        //     "required": true,
        //     "helperText": "Enter your password",
        //     "rowNumber": 2,
        //     "searchPropertyName": "",
        //     "autoFocus": false,
        //     "variant": "outlined",
        //     "lg": 6,
        //     "md": 6,
        //     "sm": 12,
        //     "style": {
        //         "alignment": "left",
        //         "fontFace": "Arial",
        //         "fontSize": "16",
        //         "fontStyle": "Bold",
        //         "foregroundColor": "#FFFFFF",
        //         "backgroundColor": "#FF0000"
        //     },
        //     "validations": [{id: "AA4FF531-BF0C-419A-8ADA-3F169EFD2B4C",  condition: "PW-type-01" , helperText: 'Enter a valid Password  "7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter"!'},
        //                     ],
        //     "dataBind": {
        //         "model": "",
        //         "property": ""
        //     },
        //     "dataSearch": {
        //         "baseUrl": "",
        //         "port": "",
        //         "method": "",
        //         "servicePath": "",
        //         "searchPropertyName": ""
        //     }
        // },
        // {
        //     "fieldType": "TextInput",
        //     "fullWidth": true,
        //     "id": "561B8CD1-B7C3-4A9E-A3C3-BA046DFB09BF",
        //     "name": "Date",
        //     "order": 4,
        //     "label": "Date",
        //     "type": "date",
        //     "placeHolder": "",
        //     "onChange": (e)=>{ console.log('xxxxxxxxxxxxxxx',e.target.value)},
        //     "InputLabelProps" :{ shrink: true},
        //     "disabled": false,
        //     "size": "small",
        //     "required": false,
        //     "helperText": '',
        //     "rowNumber": 3,
        //     "searchPropertyName": "",
        //     "autoFocus": false,
        //     "variant": "outlined",
        //     "lg": 4,
        //     "md": 4,
        //     "sm": 12,
        //     "style": {
        //         "alignment": "left",
        //         "fontFace": "Arial",
        //         "fontSize": "16",
        //         "fontStyle": "Bold",
        //         "foregroundColor": "#FFFFFF",
        //         "backgroundColor": "#FF0000"
        //     },
        //     "dataBind": {
        //         "model": "",
        //         "property": ""
        //     },
        //     "dataSearch": {
        //         "baseUrl": "",
        //         "port": "",
        //         "method": "",
        //         "servicePath": "",
        //         "searchPropertyName": ""
        //     }
        // },
        // {
        //     "fieldType": "TextInput",
        //     "fullWidth": true,
        //     "id": "E8875911-7061-40F8-9642-2AE3D89B4BF1",
        //     "name": "Time",
        //     "order": 5,
        //     "label": "Number",
        //     "type": "number",
        //     "placeHolder": "",
        //     "disabled": false,
        //     "size": "small",
        //     "required": false,
        //     "helperText": 'Enter a number',
        //     "rowNumber": 3,
        //     "searchPropertyName": "",
        //     "autoFocus": false,
        //     "variant": "outlined",
        //     "lg": 4,
        //     "md": 4,
        //     "sm": 12,
        //     "validations": [{id: "E8875911-7061-40F8-9642-2AE3D89B4BF1", boundryValue: 10 , condition: "minValue" , helperText: 'Number must be morethan 10'},
        //                     {id: "E8875911-7061-40F8-9642-2AE3D89B4BF1", boundryValue: 100 , condition: "maxValue" , helperText: 'Number must be lessthan 100'}

        //                   ],
        //     "style": {
        //         "alignment": "left",
        //         "fontFace": "Arial",
        //         "fontSize": "16",
        //         "fontStyle": "Bold",
        //         "foregroundColor": "#FFFFFF",
        //         "backgroundColor": "#FF0000"
        //     },
        //     "dataBind": {
        //         "model": "",
        //         "property": ""
        //     },
        //     "dataSearch": {
        //         "baseUrl": "",
        //         "port": "",
        //         "method": "",
        //         "servicePath": "",
        //         "searchPropertyName": ""
        //     }
        // },
        // {
        //     "fieldType": "TextInput",
        //     "fullWidth": true,
        //     "id": "9A450316-FC1E-400A-BB70-6E82EA8D1DA4",
        //     "name": "Color",
        //     "order": 6,
        //     "label": "Color",
        //     "type": "color",
        //     "placeHolder": "",
        //     "disabled": false,
        //     "size": "small",
        //     "required": false,
        //     "helperText": "",
        //     "rowNumber": 3,
        //     "searchPropertyName": "",
        //     "autoFocus": false,
        //     "variant": "outlined",
        //     "lg": 4,
        //     "md": 4,
        //     "sm": 12,
        //     "style": {
        //         "alignment": "left",
        //         "fontFace": "Arial",
        //         "fontSize": "16",
        //         "fontStyle": "Bold",
        //         "foregroundColor": "#FFFFFF",
        //         "backgroundColor": "#FF0000"
        //     },
        //     "dataBind": {
        //         "model": "",
        //         "property": ""
        //     },
        //     "dataSearch": {
        //         "baseUrl": "",
        //         "port": "",
        //         "method": "",
        //         "servicePath": "",
        //         "searchPropertyName": ""
        //     }
        // },
        // {
        //     "fieldType": "TextInput",
        //     "fullWidth": true,
        //     "id": "A8C84165-721A-4D43-A57C-BEB56C1DBBCC",
        //     "name": "Address",
        //     "order": 7,
        //     "label": "Address",
        //     "type": "text",
        //     "placeHolder": "",
        //     "disabled": false,
        //     "size": "small",
        //     "required": false,
        //     "helperText": "",
        //     "rowNumber": 4,
        //     "searchPropertyName": "",
        //     "autoFocus": false,
        //     "variant": "outlined",
        //     "lg": 12,
        //     "md": 12,
        //     "sm": 12,
        //     "style": {
        //         "alignment": "left",
        //         "fontFace": "Arial",
        //         "fontSize": "16",
        //         "fontStyle": "Bold",
        //         "foregroundColor": "#FFFFFF",
        //         "backgroundColor": "#FF0000"
        //     },
        //     "dataBind": {
        //         "model": "",
        //         "property": ""
        //     },
        //     "dataSearch": {
        //         "baseUrl": "",
        //         "port": "",
        //         "method": "",
        //         "servicePath": "",
        //         "searchPropertyName": ""
        //     }
        // },
        // {
        //     "fieldType": "CheckBox",
        //     "fullWidth": true,
        //     "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC",
        //     "name": "Check_box",
        //     "order": 8,
        //     "label": "Check_box",
        //     "disabled": false,
        //     "size": "small",
        //     "status": true,
        //     "labelPlacement" : "End",
        //     "indeterminate" : true,
        //     "rowNumber": 5,
        //     "lg": 12,
        //     "md": 12,
        //     "sm": 12,
        //     "style": {
        //         "alignment": "left",
        //         "fontFace": "Arial",
        //         "fontSize": "16",
        //         "fontStyle": "Bold",
        //         "foregroundColor": "#FFFFFF",
        //         "backgroundColor": "#FF0000"
        //     },
        //     "dataBind": {
        //         "model": "",
        //         "property": ""
        //     },
        //     "dataSearch": {
        //         "baseUrl": "",
        //         "port": "",
        //         "method": "",
        //         "servicePath": "",
        //         "searchPropertyName": ""
        //     }
        // }
        // ],

        "fields": [
            {
                "fieldType": "Header",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC2",
                "order": 2,
                "label": "Complete at Interview",
                "rowNumber": 2,
                "variant": "h5",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "white",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#63A7D6",
                    "padding": "10px 20px",
                    "height": "40px"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "value": "",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC3",
                "name": "clientName",
                "order": 3,
                "label": "Client Name",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": true,
                "helperText": "Enter client name",
                "rowNumber": 3,
                "searchPropertyName": "",
                "autoFocus": true,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "DropDowun",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC4",
                "name": "sex",
                "order": 4,
                "label": "Sex",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": true,
                "helperText": "Enter Sex",
                "rowNumber": 3,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "options": [
                    {
                        value: 'male',
                        label: 'Male',
                    },
                    {
                        value: 'female',
                        label: 'Female',
                    }
                ],
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC5",
                "value": "",
                "name": "dateOfBirth",
                "order": 5,
                "label": "Date of Birth",
                "type": "date",
                "placeHolder": "",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "InputLabelProps": { shrink: true },
                "disabled": false,
                "size": "small",
                "required": false,
                "helperText": '',
                "rowNumber": 3,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC6",
                "name": "Time",
                "order": 6,
                "label": "Request Related to (Requestor completes) Check all that Apply",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 4,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "subtitle2",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "#2F89C8",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC7",
                "name": "Check_box",
                "value": false,
                "order": 7,
                "label": "Skin Observation",
                "disabled": false,
                "size": "small",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 5,
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC8",
                "name": "Check_box",
                "value": false,
                "order": 7,
                "label": "Other Referral Type (Describe) ",
                "disabled": false,
                "size": "small",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 6,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC9",
                "value": "",
                "name": "describe",
                "order": 9,
                "label": "Describe",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "helperText": "",
                "rowNumber": 6,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC10",
                "order": 10,
                "label": "Injuries Assessment Section",
                "rowNumber": 7,
                "variant": "h5",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "white",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#63A7D6",
                    "padding": "10px 20px",
                    "height": "40px"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Image",
                "id": "11",
                "value": "",
                "order": 11,
                "label": "Injuries Assessment Section",
                "rowNumber": 8,
                "variant": "h5",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "src": ["https://solarapp-bucket.s3.us-east-2.amazonaws.com/body.jpg"],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "white",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#003761",
                    "padding": "10px 20px",
                    "height": "40px"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC12",
                "order": 12,
                "label": "Basic Skin Assessment - Adiitional Details (Check - Off Notes)",
                "rowNumber": 9,
                "variant": "h5",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "white",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#63A7D6",
                    "padding": "10px 20px",
                    "height": "40px"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC13",
                "name": "Time",
                "order": 13,
                "label": "Consider History of Skin Condition",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 10,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "subtitle2",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "#2F89C8",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC14",
                "name": "Time",
                "order": 14,
                "label": "How long has the condition been present?",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 11,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC15",
                "value": "",
                "name": "pleaseEnter",
                "order": 15,
                "label": "Please Enter",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 11,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC16",
                "name": "Time",
                "order": 16,
                "label": "How often does it occur or recur?",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 12,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC17",
                "value": "",
                "name": "pleaseEnter",
                "order": 17,
                "label": "Please Enter",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 12,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC18",
                "name": "Time",
                "order": 18,
                "label": "Are there any seasonal variations?",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 13,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC19",
                "value": "",
                "name": "pleaseEnter",
                "order": 19,
                "label": "Please Enter",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 13,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC20",
                "name": "Time",
                "order": 20,
                "label": "Is there a family history of skin disease?",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 14,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC21",
                "value": "",
                "name": "pleaseEnter",
                "order": 21,
                "label": "Please Enter",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 14,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC22",
                "name": "Time",
                "order": 22,
                "label": "Any habits, behaviors or hobbies or other affecting the skin?",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 15,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC23",
                "value": "",
                "name": "pleaseEnter",
                "order": 23,
                "label": "Please Enter",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 15,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC24",
                "name": "Time",
                "order": 24,
                "label": "What medication is client taking?",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 16,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC25",
                "value": "",
                "name": "pleaseEnter",
                "order": 25,
                "label": "Please Enter",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 16,
                "searchPropertyNam": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC26",
                "name": "Time",
                "order": 26,
                "label": "Any known allergies?",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 17,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC27",
                "value": "",
                "name": "pleaseEnter",
                "order": 27,
                "label": "Please Enter",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 17,
                "searchPropertyNam": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC28",
                "name": "Time",
                "order": 28,
                "label": "Include previous and present treatments and their effectiveness.",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 18,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC29",
                "value": "",
                "name": "pleaseEnter",
                "order": 29,
                "label": "Please Enter",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 18,
                "searchPropertyNam": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC30",
                "name": "Time",
                "order": 30,
                "label": "Color",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 19,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "subtitle2",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "#2F89C8",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC31",
                "value": false,
                "name": "Check_box",
                "order": 31,
                "label": "Pale",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 20,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC32",
                "name": "Check_box",
                "value": false,
                "order": 32,
                "label": "WNL",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 20,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC33",
                "name": "Check_box",
                "value": false,
                "order": 33,
                "label": "Cyanotic",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 20,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC34",
                "name": "Check_box",
                "value": false,
                "order": 34,
                "label": "WNL",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 21,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC35",
                "name": "Check_box",
                "value": false,
                "order": 35,
                "label": "Cyanotic",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 21,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC36",
                "value": "",
                "name": "note",
                "order": 36,
                "label": "Note",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 22,
                "searchPropertyNam": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC37",
                "name": "Time",
                "order": 37,
                "label": "Temperature",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 23,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "subtitle2",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "#2F89C8",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC38",
                "name": "Check_box",
                "value": false,
                "order": 38,
                "label": "Afebrill",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 24,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC39",
                "name": "Check_box",
                "value": false,
                "order": 39,
                "label": "Warmer than Normal",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 24,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC40",
                "name": "Check_box",
                "value": false,
                "order": 40,
                "label": "Other (Describe)",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 24,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC41",
                "value": "",
                "name": "note",
                "order": 41,
                "label": "Note",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 25,
                "searchPropertyNam": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC42",
                "name": "Time",
                "order": 42,
                "label": "Turgor",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 26,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "subtitle2",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "#2F89C8",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC43",
                "name": "Check_box",
                "value": false,
                "order": 43,
                "label": "Normal",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 27,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC",
                "name": "Check_box",
                "value": false,
                "order": 44,
                "label": "Slow (Tenting)",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 27,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC45",
                "value": "",
                "name": "note",
                "order": 45,
                "label": "Note",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 28,
                "searchPropertyNam": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC46",
                "name": "Time",
                "order": 46,
                "label": "Any Foul Odor",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 29,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "subtitle2",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "#2F89C8",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC47",
                "name": "Check_box",
                "order": 47,
                "value": false,
                "label": "Yes",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 30,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC48",
                "name": "Check_box",
                "value": false,
                "order": 48,
                "label": "No",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 30,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC49",
                "value": "",
                "name": "note",
                "order": 49,
                "label": "Note",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 31,
                "searchPropertyNam": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC50",
                "name": "Time",
                "order": 50,
                "label": "Moisture",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 32,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "subtitle2",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "#2F89C8",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC51",
                "name": "Check_box",
                "value": false,
                "order": 51,
                "label": "WNL",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 33,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC52",
                "name": "Check_box",
                "value": false,
                "order": 52,
                "label": "Dry",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 33,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC53",
                "name": "Check_box",
                "value": false,
                "order": 53,
                "label": "Diaphoretic",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 33,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC54",
                "name": "Check_box",
                "value": false,
                "order": 54,
                "label": "Other (describe):",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 34,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC55",
                "value": "",
                "name": "note",
                "order": 55,
                "label": "Note",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 35,
                "searchPropertyNam": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC56",
                "name": "Time",
                "order": 56,
                "label": "Skin Integrity",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 36,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "subtitle2",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "#2F89C8",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC57",
                "name": "Check_box",
                "value": false,
                "order": 57,
                "label": "UNL/Intact",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 37,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC58",
                "name": "Check_box",
                "order": 58,
                "value": false,
                "label": "See Problem List",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 37,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC59",
                "value": "",
                "name": "pleaseEnter",
                "order": 59,
                "label": "Note",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 38,
                "searchPropertyNam": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC70",
                "name": "Time",
                "order": 70,
                "label": "Moles",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 39,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "subtitle2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "#2F89C8",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC71",
                "name": "Check_box",
                "value": false,
                "order": 71,
                "label": "Present",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 39,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC72",
                "name": "Time",
                "order": 72,
                "label": "A. Asymmetry",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 40,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC73",
                "name": "Check_box",
                "value": false,
                "order": 73,
                "label": "Yes",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 40,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC74",
                "name": "Check_box",
                "value": false,
                "order": 74,
                "label": "No",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 40,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC75",
                "name": "Time",
                "order": 75,
                "label": "B. Border",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 41,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC76",
                "name": "Check_box",
                "value": false,
                "order": 76,
                "label": "Regular",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 41,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC77",
                "name": "Check_box",
                "value": false,
                "order": 77,
                "label": "Irregular",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 41,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC78",
                "name": "Time",
                "order": 78,
                "label": "C. Color",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 42,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC79",
                "value": "",
                "name": "pleaseEnter",
                "order": 79,
                "label": "Please Enter",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 42,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC80",
                "order": 80,
                "label": "D. Diameter",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 44,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC81",
                "value": "",
                "name": "pleaseEnter",
                "order": 81,
                "label": "Please Enter",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 44,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC82",
                "name": "Time",
                "order": 82,
                "label": "Notes: Referral and follow-up for suspect/abnormal or irregular mole;",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 44,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC83",
                "name": "Time",
                "order": 83,
                "label": "Hair",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 45,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "subtitle2",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "#2F89C8",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC84",
                "name": "Check_box",
                "value": false,
                "order": 84,
                "label": "Even distributed",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 46,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC85",
                "name": "Check_box",
                "value": false,
                "order": 85,
                "label": "Hair loss",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 46,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC86",
                "name": "Check_box",
                "value": false,
                "order": 86,
                "label": "Other (Describe)",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 46,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC87",
                "value": "",
                "name": "Note",
                "order": 87,
                "label": "Note",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 47,
                "searchPropertyNam": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC88",
                "name": "Time",
                "order": 88,
                "label": "Nails",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 48,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "subtitle2",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "#2F89C8",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC89",
                "name": "Check_box",
                "value": false,
                "order": 89,
                "label": "WNL",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 49,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC90",
                "name": "Check_box",
                "value": false,
                "order": 90,
                "label": "Thickened",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 49,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC91",
                "name": "Check_box",
                "value": false,
                "order": 91,
                "label": "Clubbing",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 49,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC92",
                "name": "Check_box",
                "value": false,
                "order": 92,
                "label": "Discolored",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 50,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC93",
                "name": "Check_box",
                "value": false,
                "order": 93,
                "label": "Other (Describe)",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 50,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC94",
                "name": "Time",
                "order": 94,
                "label": "Cap Refill:",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 51,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "body2",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC95",
                "name": "Check_box",
                "order": 95,
                "value": false,
                "label": "<3 sec",
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 51,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "CheckBox",
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC96",
                "name": "Check_box",
                "order": 96,
                "label": ">3 sec",
                "value": false,
                "disabled": false,
                "size": "Normal",
                "status": false,
                "labelPlacement": "End",
                "indeterminate": false,
                "rowNumber": 51,
                "lg": 4,
                "md": 4,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Header",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC97",
                "name": "Time",
                "order": 97,
                "label": "Non-injury recommendations to CM / CRM (for follow-up with HCP, treatment, care planning, or other directions):",
                "type": "text",
                "placeHolder": "",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 52,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "subtitle2",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "color": "#2F89C8",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FFFFFF"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "TextInput",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC98",
                "value": "",
                "name": "Note",
                "order": 98,
                "label": "Note",
                "rows": 5,
                "multiline": true,
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "small",
                "required": false,
                "rowNumber": 53,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 12,
                "md": 12,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Button",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC99",
                "name": "clientName",
                "order": 99,
                "label": "Clear",
                "color": "primary",
                "placeHolder": "please enter",
                "disabled": false,
                "size": "Normal",
                "required": false,
                "rowNumber": 54,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
            {
                "fieldType": "Button",
                "fullWidth": true,
                "id": "A8C84165-721A-4D43-A57C-BEB56C3DBBCC100",
                "name": "clientName",
                "order": 100,
                "label": "Save",
                "actionType": "onSubmit",
                "color": "primary",
                "type": "text",
                "onChange": (e) => { console.log('xxxxxxxxxxxxxxx', e.target.value) },
                "placeHolder": "please enter",
                "disabled": false,
                "size": "Normal",
                "required": false,
                "rowNumber": 54,
                "searchPropertyName": "",
                "autoFocus": false,
                "variant": "outlined",
                "lg": 4,
                "md": 4,
                "sm": 12,
                "validations": [{ id: "A2440C5A-7178-4D5A-824A-540953099791", condition: "pattern", helperText: 'Enter a valid email !' },
                ],
                "style": {
                    "alignment": "left",
                    "fontFace": "Arial",
                    "fontSize": "16",
                    "fontStyle": "Bold",
                    "foregroundColor": "#FFFFFF",
                    "backgroundColor": "#FF0000"
                },
                "dataBind": {
                    "model": "",
                    "property": ""
                },
                "dataSearch": {
                    "baseUrl": "",
                    "port": "",
                    "method": "",
                    "servicePath": "",
                    "searchPropertyName": ""
                }
            },
        ],
        "_class": "",
        "_formBuilderUI": "ewogICAgInRhc2tfZGF0YSI6IFsKICAgICAgICB7CiAgICAgICAgICAgICJpZCI6ICIxRDYxNTVFMS04MzY4LTQ3RDYtOEE5MS00RDFGOEFDQzlGNDkiLAogICAgICAgICAgICAiZWxlbWVudCI6ICJMYWJlbCIsCiAgICAgICAgICAgICJ0ZXh0IjogIkxhYmVsIiwKICAgICAgICAgICAgInN0YXRpYyI6IHRydWUsCiAgICAgICAgICAgICJyZXF1aXJlZCI6IGZhbHNlLAogICAgICAgICAgICAiYm9sZCI6IGZhbHNlLAogICAgICAgICAgICAiaXRhbGljIjogZmFsc2UsCiAgICAgICAgICAgICJjb250ZW50IjogIlBsYWNlaG9sZGVyIFRleHQuLi4iLAogICAgICAgICAgICAiY2FuSGF2ZVBhZ2VCcmVha0JlZm9yZSI6IHRydWUsCiAgICAgICAgICAgICJjYW5IYXZlQWx0ZXJuYXRlRm9ybSI6IHRydWUsCiAgICAgICAgICAgICJjYW5IYXZlRGlzcGxheUhvcml6b250YWwiOiB0cnVlLAogICAgICAgICAgICAiY2FuSGF2ZU9wdGlvbkNvcnJlY3QiOiB0cnVlLAogICAgICAgICAgICAiY2FuSGF2ZU9wdGlvblZhbHVlIjogdHJ1ZSwKICAgICAgICAgICAgImNhblBvcHVsYXRlRnJvbUFwaSI6IHRydWUKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICAgImlkIjogIkM2OEI2NzNCLTM5NDgtNEQ2Mi1BRjZELTUzMjBDQUI0RERCNyIsCiAgICAgICAgICAgICJlbGVtZW50IjogIlRleHRJbnB1dCIsCiAgICAgICAgICAgICJ0ZXh0IjogIlRleHQgSW5wdXQiLAogICAgICAgICAgICAiY2FuSGF2ZUFuc3dlciI6IHRydWUKICAgICAgICB9CiAgICBdCn0="
    };
    useEffect(() => {
        dispatch(getFormBuilderTemplateServices());
    }, []);
    const { formBuilderTemplateData, isLoading ,selectedTemplate, isFormLoadingInSideFormBuilder } = useSelector((state) => state.formBuilderTemplateServicesReducer);
    
        return ( isFormLoadingInSideFormBuilder ?
            <Grid style={{ margin: '10px 20px 10px 100px' }}>
                <Card>
                    <CardContent>
                        <FormGenerater data={data.fields} metaData= {isLoading}/>
                    </CardContent>
                </Card>
            </Grid>: null
        );
    
};

export default SampleForm;