import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addExaminationData, getExaminationData } from "../../../../actions/clinicalExaminationsAction"
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';

export default function ButtonElement(props) {
  
  const {
    buttonData,
    metaData
  } = props

  const [actionType, setActionType] = React.useState(buttonData?.actionType);
  const [isImageSave, setIsImageSave] = React.useState(null);
  const [isImageEdite, setIsImageEdite] = React.useState(null);
  const [isImageNotEdite, setIsImageNotEdite] = React.useState(null);

  const [isReadOnly, setIsReadOnly] = React.useState(false);
  const {  isFormLoadingInSideFormBuilder, selectedTemplate } = useSelector((state) => state.formBuilderTemplateServicesReducer);
  const { isAddClinicalDataSuccess } = useSelector((state) => state.addClinicalExaminationReducer);
  

  const dispatch = useDispatch();

  useEffect(() => {
    if (metaData?.readOnlyData) {
      setIsReadOnly(true)
    }
  }, []);
  const chooseAction = () => {
    if (actionType === "onSubmit") {
      onSubmit();
    }
  };

  /**
  |--------------------------------------------------
  | Form data submit to Paticular Post Action
  |--------------------------------------------------
  */
  const onSubmit = () => {
    const formBuilderObject = {};
    let count = 0;
    let isImageEdited = true;
    if (isFormLoadingInSideFormBuilder) {
      selectedTemplate?.fields?.forEach && selectedTemplate.fields.forEach((ele) => {
        if (ele?.fieldType === "TextInput" || ele?.fieldType === "CheckBox" || ele?.fieldType === "Image") {
          if (ele?.fieldType === "Image" && ele?.value === "") {
            isImageEdited = false
            setIsImageNotEdite(true)
          }
          if (ele?.fieldType === "Image" && ele?.edited === false && ele?.value !== "") {
            isImageEdited = true
            setIsImageNotEdite(false)
            setIsImageEdite(true)
          }

          formBuilderObject[ele?.name + '*' + ele?.id] = ele?.value;
        }
        count++;
      });
    }

    if (isImageEdited) {
      const requestObj =
      {
        "encounterId": metaData?.encounterId,
        "patientId": metaData?.patientId,
        "templateId": selectedTemplate?._id,
        "templateName": selectedTemplate?.templateName,
        "examinationComments": formBuilderObject,
        "score": 90
      };
      dispatch(addExaminationData(requestObj, metaData?.ehrId));
      setIsImageSave(true);
    }
  }

  const handleClose = () => {
    setIsImageSave(false);
    setIsImageEdite(false);
    setIsImageNotEdite(false)
  }

  return (
    <div>
      {!isReadOnly ?
        <Button
          color={buttonData?.color || "primary"}
          size="large"
          variant="contained"
          onClick={chooseAction}
          disabled={buttonData?.disabled}
        >{buttonData?.label}</Button> : null

      }
      <Snackbar open={isImageSave} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert variant="filled" severity="success" sx={{ width: '100%' }} onClose={handleClose}>
          Save data  and image successfull !
        </Alert>
      </Snackbar>
      <Snackbar open={isImageNotEdite} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert variant="filled" severity="warning" sx={{ width: '100%' }} onClose={handleClose}>
          Image is not Edite please Edite and save !
        </Alert>
      </Snackbar>
    </div>
  );
}
