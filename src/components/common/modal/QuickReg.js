import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, FieldArray, useFormikContext, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import { Grid, Button, Typography } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Dialog, DialogTitle, DialogContent, Slide } from "@material-ui/core";
import { makeStyles} from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import classNames from "classnames";
import { DateObject } from "react-multi-date-picker"
import { add, format, isDate, parse, sub } from "date-fns";
//locale and calendar for the DatePicker, value conversions from DateObject
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import arabic from "react-date-object/calendars/arabic";
import arabic_en from "react-date-object/locales/arabic_en";

import CountryCodeTelephoneField from "../material/CountryCodeTelephoneField"
import FormikInput from "../formikCommon/FormikInput";
import FormikSelect from "../formikCommon/FormikSelect";
import DateCom from "../formikCommon/DateCom";
import InputAsyncValidate from "../formikCommon/InputAsyncValidate";
import Snackbar from "../Snackbar";
import { getCompositeData } from "../../../actions/patientRegAction";
import { http_Request } from "../../../utils/HTTP_Request";
import { API_URL } from "../../../shared/API_URLS";
import { getLabel } from "../../../utils/localization";
import { useStyles } from "../../../assets/styles/styles";
import { formatDelimiterTextToCamelCase, camelCaseModifier } from "../../../utils/CamelCaseConverter";
import { patientIdentityExistValidator, patientMobileExistValidator, mobileNumberValidator } from "../../../utils/validations";
import DatePicker from "../material/DatePicker";

// import Trash from "../../../assets/images/icons/trash.svg";
// import Add from "../../../assets/images/icons/add.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useQuickRegistrationStyles = makeStyles((theme) => ({
  quickRegistrationDialogContent: {
    padding: "1.5rem 1rem 1rem 1.5rem"
  },
  mobileNoRequiredAsterisk: {
    position:"absolute", 
    right:"0.4rem", 
    top:0, 
    color: theme.palette.reds.dark
  },
}));

const QuickReg = (props) => {
  const { handleCloseDialog, openDialog, handleRegisterCallback } = props;

  /**
  |--------------------------------------------------
  | material ui common styles  
  |--------------------------------------------------
  */
  const classes = useStyles();
  /**
  |--------------------------------------------------
  | Uses Quick Registration Modal styles
  |--------------------------------------------------
  */
  const quickRegistrationClasses = useQuickRegistrationStyles();

  /**
  |--------------------------------------------------
  | snackbar state and functionality 
  |--------------------------------------------------
  */
  const [snackText, setSnackText] = React.useState();
  const [snackVariant, setSnackVariant] = React.useState();

  const resetSnack = () => {
    setSnackText();
    setSnackVariant();
  };

  /**
  |--------------------------------------------------
  | redux integration
  |--------------------------------------------------
  */
  const dispatch = useDispatch();

  const { compositeData, loading } = useSelector((state) => state.patientRegCompositeData);

  const { hospitalDetails : hospitalDetailData } = useSelector( (state) =>  state.hospitalDetailsReducer);

  const { countryFlagsDialCodesData } = useSelector((state) => state.countryFlagsDialCodesData);

  const { validationForRegistration, idTypeValueForPatientRegistration } =
    useSelector((state) => state.sharedProperty);

  /**
  |--------------------------------------------------
  |  number , arabic language, English language, mobile number id validation
  |--------------------------------------------------
  */
  const { englishRegex, numberRegex, mobileNoLength, idNoLength, passportNoLength } =
    validationForRegistration;

  /**
  |--------------------------------------------------
  | Date of Birth picker setting and the state
  |--------------------------------------------------
  */
  const [datePickerSetting, setDatePickerSetting] = React.useState(null);
  const [dobDateValue,setDobDateValue] = React.useState("")
  /**
  |--------------------------------------------------
  | to identify whether validating formik value changed from previous and invoke validation if so
  |--------------------------------------------------
  */
  const dialCodeRef = React.useRef()
  const mobileNoValueRef = React.useRef();
  const patientNICValueRef = React.useRef();

  /**
  |--------------------------------------------------
  | Id Type values
  |--------------------------------------------------
  */
  const { patientNicValue, patientPassportValue } =
    idTypeValueForPatientRegistration;

  React.useEffect(() => {
    dispatch(getCompositeData());
  }, []);

  const initialValues = {
    firstNameEn: "",
    familyNameEn: "",
    genderId: "",
    nationalityId: "",
    dob: null,
    mobile: "",
    countryCode: "SA",
    dialCode: hospitalDetailData?.countryCode,
    patientIdentities: [{ identityTypeId: "", value: "", expiaryDate: null }],
  };

  /**
  |--------------------------------------------------
  | IdType values
  |--------------------------------------------------
  */
  const nicValue = 1;
  const passportValue = 2;

  // validation for Id type(prevent duplicate)
  Yup.addMethod(Yup.array, "uniqueID", function (message, path) {
    return this.test("uniqueID", message, function (list) {
      const mapper = (x) => x.identityTypeId && x.identityTypeId;

      const set = [...new Set(list.map(mapper))];
      const isUnique = list.length === set.length;
      if (isUnique) {
        return true;
      }
      const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
      return this.createError({
        path: `patientIdentities[${idx}].identityTypeId`,
        message: message,
      });
    });
  });

  //patient age
  const [age, setAge] = React.useState(null);

  Yup.addMethod(Yup.date, "validateExpiryDate", function (message) {
    return this.test("validateExpiryDate", message, function (value) {
      const { path, createError, parent } = this;
      const checkIdentityType =
        parent.identityTypeId === "" || parent.identityTypeId === undefined;
      const checkIdNumber = parent.value === "" || parent.value === undefined;

      if (parent.expiaryDate !== null) {
        return true;
      } else {
        if (checkIdentityType && checkIdNumber) {
          return true;
        } else {
          return createError({
            path: path,
            message: message,
          });
        }
      }
    });
  });

  /**
  |--------------------------------------------------
  | get age(Personal Details)
  |--------------------------------------------------
  */
  const getAge = (dob) => {
    const selectedDate = moment(dob);
    const currentDate = moment(new Date());

    const years = currentDate.diff(selectedDate, "year");
    selectedDate.add(years, "years");

    setAge(years);
  };

  /**
  |--------------------------------------------------
  |  on change date picker setting (calendar/locale/formatting)
  |--------------------------------------------------
  */
  const onChangePickerSetting = (newPickerSetting) => {
    setDatePickerSetting(newPickerSetting);
  }

  /**
  |--------------------------------------------------
  |  handles the change to the text field value with correct formatting
  |--------------------------------------------------
  */
  const onHijriDOBChange = (dobValue, formik) => {
    let hijiriDobDate = null;
    let dobDate = null;
    let selectedDateFormatting = datePickerSetting?.format || "DD/MM/YYYY"
    let dobDateString = dobValue?.format && dobValue.format(selectedDateFormatting);
    if(datePickerSetting && dobDateString){
      let selectedLocale = datePickerSetting?.locale;
      let selectedCalendar = datePickerSetting?.calendar;
      let tempDateObject = new DateObject({date:dobDateString, locale:selectedLocale, calendar: selectedCalendar, format: selectedDateFormatting});
      if(selectedCalendar?.name === "arabic"){
        hijiriDobDate = tempDateObject.format(selectedDateFormatting)
        dobDate = tempDateObject.convert(gregorian,gregorian_en).format(selectedDateFormatting);
      }else if(selectedCalendar?.name === "gregorian"){
        dobDate = tempDateObject.format(selectedDateFormatting)
        hijiriDobDate = tempDateObject.convert(arabic,arabic_en).format(selectedDateFormatting)
      }
    }
    formik.setFieldValue("dob", dobDate, true);
    formik.setFieldValue("dobHijiri", hijiriDobDate, true);
    formik.setFieldTouched("dobHijiri", true, true)
    formik.setFieldTouched("dob", true, true);
    setTimeout(()=>{
      formik?.validateField && formik.validateField("dob");
      formik?.validateField && formik.validateField("dobHijiri");
    },1)

    setDobDateValue(dobValue)
  };
  /**
  |--------------------------------------------------
  | parses hijri date string to a Date object
  |--------------------------------------------------
  */
  const parseHijriDate = (dateString) => {
    let hijriDateObj = new DateObject({date:dateString, format: "DD/MM/YYYY", calendar:arabic, locale:arabic_en});
    if(hijriDateObj){
      return hijriDateObj.toDate();
    }else {
      return dateString
    }
  }
  /**
  |--------------------------------------------------
  | transform for the date to validate the date string
  |--------------------------------------------------
  */
  const parseDateString = (value, originalValue, isHijri) => {
    let parsedDate = isDate(originalValue) || !originalValue
    ? originalValue
    : !isHijri 
    ? parse(originalValue, "dd/MM/yyyy", new Date())
    : parseHijriDate(originalValue);
    
    let fieldTextValue = document.getElementById("dobHijiri")?.value;
    if(fieldTextValue && !parsedDate){
      parsedDate = ""
    }else if(!parsedDate && !fieldTextValue){
      parsedDate = null
    }
    return parsedDate;
  }
  /**
  |--------------------------------------------------
  | form Validation Yup Schema
  |--------------------------------------------------
  */
  const validationSchema = Yup.object().shape({
    firstNameEn: Yup.string()
    .required(getLabel({module:"common", label:"required"}))
    .matches(englishRegex, getLabel({module:"registration", label:"onlyEnglishLetters"}))
    .nullable(),

    familyNameEn: Yup.string()
      .required(getLabel({module:"common", label:"required"}))
      .matches(englishRegex, getLabel({module:"registration", label:"onlyEnglishLetters"}))
      .nullable(),

    genderId: Yup.number().required(getLabel({module:"common", label:"required"})).nullable(),

    nationalityId: Yup.number().required(getLabel({module:"common", label:"required"})).nullable(),
    
    dob: Yup.date()
      .required(getLabel({module:"common", label:"required"}))
      .transform((value, originalValue)=>parseDateString(value, originalValue, false))
      .max(new Date(), getLabel({module:"registration", label:"dateCannotBeInTheFuture"}))
      .min(sub(new Date(), {years:120}), getLabel({module:"registration", label:"shouldBeLessThan120Years"}))
      .typeError(getLabel({module:"registration", label:"invalidDate"}))
      .nullable(),

    dobHijiri: Yup.date()
      .required(getLabel({module:"common", label:"required"}))
      .transform((value, originalValue)=>parseDateString(value, originalValue, true))
      .typeError(getLabel({module:"registration", label:"invalidDate"}))
      .nullable(),
    mobile:
      age > 17
        ? Yup.string()
            .matches(numberRegex, getLabel({module:"registration", label:"invalidNumber"}))
            .required(getLabel({module:"common", label:"required"}))
            .nullable()
        : Yup.string()
            .matches(numberRegex, getLabel({module:"registration", label:"invalidNumber"}))
            .nullable(),

    
    patientIdentities: Yup.array()
      .of(
        Yup.object().shape({
          identityTypeId: Yup.number()
            .test("identityTypeTest",  getLabel({module:"registration", label:"invalidNumber"}),async(val, context) => {
              let pathOfID = context.path.replace("identityTypeId", "value");
              let errorMessage = await handleIdentityValidation(context.parent.value,pathOfID,context.parent,true);
              return errorMessage ? context.createError({
                path:pathOfID,
                message:errorMessage
              }) : true;
            })
            .required(getLabel({module:"common", label:"required"}))
            .nullable(),
          value: Yup.mixed().when("identityTypeId", {
            is: (val) => val !== passportValue,
            then: Yup.string()
              .length(idNoLength, getLabel({module:"registration", label:"invalidNumber"}))
              .matches(numberRegex, getLabel({module:"registration", label:"invalidNumber"}))
              .when("identityTypeId",{
                is: (val) => val,
                then: Yup.string()
                    .length(idNoLength, getLabel({module:"registration", label:"invalidNumber"}))
                    .matches(numberRegex, getLabel({module:"registration", label:"invalidNumber"}))
                    .required(getLabel({module:"common", label:"required"}))
                    .nullable(),
                otherwise: Yup.string()
                    .length(idNoLength, getLabel({module:"registration", label:"invalidNumber"}))
                    .matches(numberRegex, getLabel({module:"registration", label:"invalidNumber"}))
                    .nullable(),
              })
              .nullable(),
            otherwise: Yup.string()
              .when("identityTypeId",{
                is: (val) => val,
                then: Yup.string()
                    .required(getLabel({module:"common", label:"required"}))
                    .nullable(),
                otherwise: Yup.string()
                    .length(passportNoLength, getLabel({module:"registration", label:"invalidPassport"}))
                    .nullable(),
              })
              .nullable(),
          }),

          expiaryDate: Yup.date()
              //  .required("Required")
              .validateExpiryDate(getLabel({module:"common", label:"required"}))
              .min(new Date(), getLabel({module:"registration", label:"dateCannotBeInThePast"}))
              .typeError(getLabel({module:"registration", label:"invalidDate"}))
              .nullable(),
        })
      )
      .uniqueID(getLabel({module:"registration", label:"alreadyAdded"})),
  });

  // handle add or remove id type details
  const [idTypeArray, setIdTypentArray] = React.useState([0]);
  /**
  |--------------------------------------------------
  | Quick Registration request
  |--------------------------------------------------
  */
  const onSubmit = (values, submitProps) => {
    let requestBody = {
      ...values
    };
    requestBody.patientIdentities = requestBody.patientIdentities.filter((data, index) => {
      return data.identityTypeId !== ""
    });

    //dial code is mapping to payload
    if(requestBody?.dialCode){
      requestBody.countryCode = requestBody.dialCode
      delete requestBody.dialCode;
    }
    if(!requestBody.mobile){  
      typeof requestBody === "object" && requestBody.hasOwnProperty("mobile") && delete requestBody.mobile;
      typeof requestBody === "object" && requestBody.hasOwnProperty("countryCode") && delete requestBody.countryCode;
    
    }

    if(requestBody?.dob){
      requestBody.dob = new DateObject({date:requestBody.dob, format: "DD/MM/YYYY"}).format("YYYY-MM-DD");
    }
    if(requestBody?.dobHijiri){
      requestBody.dobHijiri = new DateObject({date:requestBody.dobHijiri, locale: arabic_en, calendar: arabic, format: "DD/MM/YYYY"}).format("YYYY-MM-DD");
    }
    http_Request(
      {
        url: API_URL.patient.quickRegistration.POST,
        method: "POST",
        bodyData: requestBody,
      },
      function successCallback(response) {
        if (response.status === 201) {
          console.log(response.data);
        
          setSnackVariant("success");
          setSnackText(`${formatDelimiterTextToCamelCase(values.firstNameEn)} ${formatDelimiterTextToCamelCase(values.familyNameEn)} is Registered Successfully!`);
          handleCloseDialog();
          //handle callback action from property function
          setTimeout(() => {
           /**
           * @param responseData registration response data
           */
            handleRegisterCallback && handleRegisterCallback(response.data);
          }, 1500)

        }
      },
      function errorCallback(error) {
        console.log("error", error)
        if (error.response && error.response.data) {
          setSnackVariant("error");
          setSnackText(error.response.data.errorMessage);
          setTimeout(() => {
            handleRegisterCallback && handleRegisterCallback({});
          }, 1500)
        }
      }
    );
  };

  /**
  |--------------------------------------------------
  | If selected nationality is Saudi Arabia, then only the National ID available as identity type
  |--------------------------------------------------
  */
  const AutoSelectIdentity = () => {
    const formikContext = useFormikContext();

    /**
    |--------------------------------------------------
    |  when formik nationalityId value changes hijri date value is updated
    |--------------------------------------------------
    */
    React.useEffect(() => {
      if (formikContext?.values?.["nationalityId"]) {
        let fieldName = "patientIdentities";
        let newFieldValue =  [{ identityTypeId: "", value: "", expiaryDate: null }];
        let nationalityData = compositeData?.nationalities || [];
        let isSaudiArabianNationality = nationalityData?.find && (nationalityData.find(
          singleNationality => singleNationality?.id === formikContext.values?.["nationalityId"]
        )?.countryCode === "SA");
        //for saudi arabian nationality automatic selection on the National ID  id type
        if(isSaudiArabianNationality){
          newFieldValue =  [{ identityTypeId: 1, value: "", expiaryDate: null, identityTypeDisabled:true }];
        }else{
          let existingFieldValue = formikContext.values[fieldName];
          if(existingFieldValue && existingFieldValue.length>=0){
            existingFieldValue =  existingFieldValue.filter(singleID=>!singleID?.identityTypeDisabled);
            if(!existingFieldValue || existingFieldValue.length===0){
              newFieldValue =  [{ identityTypeId: "", value: "", expiaryDate: null }];
            }else{
              newFieldValue =  existingFieldValue;
            }
          } 
        }
        formikContext.setFieldValue && formikContext.setFieldValue(fieldName, newFieldValue, true);
        //remove the formik validation happening with field touched when dynamic selection happens
        let formikFieldTouched = { ...(formikContext?.touched||{}) }
        formikFieldTouched?.patientIdentities && delete formikFieldTouched.patientIdentities;
        formikContext.setTouched && formikContext.setTouched(formikFieldTouched);
        formikContext.validateForm();
      }
    }, [formikContext?.values?.["nationalityId"]]);


    return null;
  }

  /**
  |--------------------------------------------------
  | Auto capitalize first letter of name
  |--------------------------------------------------
  */
  const AutoCapitalizeName = () => {
    const formikContext = useFormikContext();
    
    React.useEffect(()=>{
      
      if(formikContext?.values?.firstNameEn){
        let firstNameEnCapitalFirst = camelCaseModifier(formikContext.values.firstNameEn);
        formikContext.setFieldValue && formikContext.setFieldValue("firstNameEn", firstNameEnCapitalFirst, true);
      }
      if(formikContext?.values?.familyNameEn){
        let familyNameEnCapitalFirst = camelCaseModifier(formikContext?.values?.familyNameEn);
        formikContext.setFieldValue && formikContext.setFieldValue("familyNameEn", familyNameEnCapitalFirst, true);
      }

    },[formikContext?.values?.firstNameEn, formikContext?.values?.familyNameEn])
    
    return null;
  }
  /**
  |--------------------------------------------------
  | handles mobile no change
  |--------------------------------------------------
  */
  const handleMobileNoChange = (event, formik)=>{                    
    let mobileNoText = event?.target?.value;
    if(!formik.touched?.mobile){
      setTimeout(()=>{
        formik.setFieldTouched("mobile");
      },0)
    }
    formik.setFieldValue("mobile", mobileNoText);
  }
  /**
  |--------------------------------------------------
  | handles country code change
  |--------------------------------------------------
  */
  const handleCountrySelectChange = (event, childElement, selectedOption, formik) => {
    formik?.setFieldTouched && formik.setFieldTouched("countryCode", true)
    selectedOption?.countryCode && formik?.setFieldValue && formik.setFieldValue("countryCode", selectedOption?.countryCode);
    selectedOption?.["dialCode"] && formik?.setFieldValue && formik.setFieldValue("dialCode", selectedOption?.["dialCode"]);
    formik?.setFieldTouched && formik.setFieldTouched("mobile", true);
    setTimeout(()=>{
      formik?.validateField && formik.validateField("mobile")
    },1)
  }

  /**
   |--------------------------------------------------
   | check identities for added another field
   |--------------------------------------------------
   */
  const checkIdentities = (formik) =>
    formik.values.patientIdentities[formik.values.patientIdentities.length - 1].identityTypeId !== nicValue ||
    formik.values.patientIdentities[formik.values.patientIdentities.length - 1].identityTypeId === "";

  /**
   |--------------------------------------------------
   | Validate mobile number asynchronous
   |--------------------------------------------------
   */
  const handleMobileNumValidation = async (mobile,fieldName, formik) => {
    let selectedCountryOption =  countryFlagsDialCodesData?.find && countryFlagsDialCodesData.find(countryDetailData=>countryDetailData?.countryCode === formik.values?.countryCode);
   
    let activeDocEle = document.activeElement;
    let isMobileNumChange = mobile !== mobileNoValueRef.current;
    let isCountryCodeChange = (selectedCountryOption?.dialCode &&dialCodeRef.current !== selectedCountryOption?.dialCode);
    let isMobileNumberValid = mobileNumberValidator(mobile, selectedCountryOption)
    if(isMobileNumberValid && ((activeDocEle.id === "phone-number" && activeDocEle.name === fieldName) || ((isCountryCodeChange || isMobileNumChange) && mobile && selectedCountryOption?.dialCode))){
      if(isCountryCodeChange){
        dialCodeRef.current = selectedCountryOption?.dialCode;
      }
      if(isMobileNumChange){
        mobileNoValueRef.current = mobile;
      }
      let invalidMessage = getLabel({module:"registration", label:"mobileNumberAlreadyExists"});
      let parentData = {...formik.values, countryCode: selectedCountryOption?.dialCode}
      let isInvalid = await patientMobileExistValidator(fieldName, mobile, parentData, invalidMessage).then(successValue=>{
        return undefined;
      }).catch(reason=>{
        return reason
      })
      return isInvalid
    }else if(!isMobileNumberValid){
      let invalidMessage =  getLabel({module:"registration", label:"invalidNumber"});
      let requiredMessage = getLabel({module:"common", label:"required"}) 
      let errorMessage = mobile ? invalidMessage : requiredMessage ;
      return errorMessage;
    } else {
      return formik.errors?.[fieldName] || undefined;
    }
  }
  const idTypeNumRef = React.useRef()
  /**
  |--------------------------------------------------
  | validates id number field for existing number
  |--------------------------------------------------
  */
  const handleIdentityValidation = async (value, name, formik, isTest) => {
    let activeDocEle = document.activeElement;
    let isNICValueChange = patientNICValueRef.current !== value;
    let identityTypeIdAccessor = name.split(".")[0]+ ".identityTypeId"
    let identityTypeId = isTest && formik.identityTypeId|| identityTypeIdAccessor.replace("[", ".").split(".").reduce((obj, part) => obj ? obj[part.replace("[","").replace("]","")]: undefined,formik.values||{});
    // let requiredMessage = getLabel({module:"common", label:"required"});
    
    let isIDTypeChange = isTest && idTypeNumRef.current !== formik.identityTypeId;
    if(isNICValueChange){
      patientNICValueRef.current = value;
    }
    if(isIDTypeChange){
      idTypeNumRef.current = formik.identityTypeId;
    }
    let minLengthToValidate = identityTypeId === passportValue ? 1 : idNoLength;
    if((activeDocEle.id === name && isNICValueChange &&  value?.length >= minLengthToValidate) ||(isIDTypeChange &&  value?.length >= minLengthToValidate)){
      
      let errorMessage = getLabel({module:"registration", label:"idNoAlreadyExists"});
  
      let isInvalid = await patientIdentityExistValidator(name,value,formik.values,errorMessage).then(successValue=>{
        return undefined
      }).catch(reason=>{
        return reason
      })
      return isInvalid
    }else{
      return formik.errors?.[name] || undefined
    }
  }

  return (
    <>
      <Snackbar text={snackText} variant={snackVariant} reset={resetSnack} />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        aria-labelledby="payment-modal-dialog-title"
        aria-describedby="payment-modal-dialog-description"
        scroll="body"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="payment-modal-dialog-title" className={classes.modelHeader}>
          {getLabel({module:"registration", label:"quickPatientRegistration"})}
          <CancelIcon onClick={handleCloseDialog} className={classes.dialogCloseBtn} />
        </DialogTitle>
        <DialogContent className={classNames(classes.popupPaper, quickRegistrationClasses.quickRegistrationDialogContent)}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Snackbar text={snackText} variant={snackVariant} reset={resetSnack} />
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnBlur={false} validateOnChange={true}>
              {(formik) => {
                return (
                  <Form noValidate>
                    {getAge(formik.values.dob)}
                    <Grid container spacing={2}>
                      <Grid container item spacing={1} xs={12} sm={12} md={12} lg={12}>
                        <Grid container item xs={12} sm={12} md={3} lg={3}>
                          <div style={{ width: "100%" }}>
                            <FormikInput
                              error={formik.errors.firstNameEn && formik.touched.firstNameEn}
                              name={"firstNameEn"}
                              type="text"
                              label={getLabel({module:"registration", label:"firstName"})}
                              required
                              autoFocus
                              autoComplete="off"
                            />
                          </div>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={3} lg={3}>
                          <div style={{ width: "100%" }}>
                            <FormikInput
                              error={formik.errors.familyNameEn && formik.touched.familyNameEn}
                              name={"familyNameEn"}
                              type="text"
                              label={getLabel({module:"registration", label:"familyName"})}
                              required
                              autoComplete="off"
                            />
                          </div>
                        </Grid>
                        <AutoCapitalizeName />

                        <Grid container item xs={12} sm={12} md={3} lg={3}>
                          <div style={{ width: "100%" }}>
                            <FormikSelect
                              error={formik.errors.genderId && formik.touched.genderId}
                              name={"genderId"}
                              options={compositeData.genders}
                              placeholder={formik.values.genderId}
                              label={getLabel({module:"registration", label:"gender"})}
                              required
                            />
                          </div>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={3} lg={3}>
                          <div style={{ width: "100%" }}>
                            <FormikSelect
                              error={formik.errors.nationalityId && formik.touched.nationalityId}
                              name={"nationalityId"}
                              options={compositeData.nationalities}
                              placeholder={formik.values.nationalityId}
                              label={getLabel({module:"registration", label:"nationality"})}
                              required
                            />
                          </div>
                          <AutoSelectIdentity />
                        </Grid>
                      </Grid>

                      <Grid container item spacing={1} xs={12} sm={12} md={12} lg={12}>
                        <Grid container item xs={12} sm={12} md={3} lg={3}>
                          <div style={{ width: "100%" }}>
                            <DatePicker
                              formikFieldName={
                                ((formik.errors["dob"] && formik.touched["dob"]) && "dob" )||
                                ((formik.errors["dobHijiri"] && formik.touched["dobHijiri"]) && "dobHijiri")
                              }
                              datePickerProps={{
                                value:dobDateValue || "",
                                onChange:(dobValue)=>onHijriDOBChange(dobValue, formik),
                                format: "DD/MM/YYYY",
                                maxDate: new Date(),
                                minDate: add(sub(new Date(), {years:120}), {days:1}),
                                portal: true,
                              }}
                              showSettings={true}
                              onChangePickerSetting={onChangePickerSetting}
                              error={
                                (formik.errors["dob"] && formik.touched["dob"]) ||
                                (formik.errors["dobHijiri"] && formik.touched["dobHijiri"])
                              }
                              label={getLabel({ module: "registration", label: "dateOfBirth" })}
                              required
                            />

                          </div>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={6} lg={6}>
                          <div style={{ width: "100%" }}>
                            <CountryCodeTelephoneField 
                              key={"mobile"}
                              dropDownOptionUniqueKey={"countryCode"}
                              fieldLabel={getLabel({module:"registration", label:"mobileNumber"})}
                              countryCodeSelectorProps={{
                                defaultValue:"SA",
                                value: formik.values.countryCode,
                                error: formik.errors.mobile && formik.touched.mobile,
                              }}
                              handleDropdownChange={(event, child, selectOption)=>handleCountrySelectChange(event, child, selectOption, formik)}
                              mobileNoFieldProps={{
                                endIcon: age > 17 && <Typography className={quickRegistrationClasses.mobileNoRequiredAsterisk}>*</Typography>,
                                placeHolder: getLabel({module:"registration", label:"mobileNumber"}),
                                error:formik.errors.mobile && formik.touched.mobile,
                                required:age >17,
                                inputProps:{
                                  maxlength: (countryFlagsDialCodesData?.find && countryFlagsDialCodesData.find((countryDetailData) => countryDetailData.countryCode ===formik.values.countryCode )?.maxDigit)|| null,
                                  minlength: (countryFlagsDialCodesData?.find && countryFlagsDialCodesData.find((countryDetailData) => countryDetailData.countryCode ===formik.values.countryCode )?.minDigit) || null,
                                },
                                onChange:(event) => handleMobileNoChange(event,formik)
                              }}
                              // isUnicodeFlags={true}
                              formikFieldName={"mobile"}
                              formikFieldLevelValidation={(value, name)=>handleMobileNumValidation(value, name, formik)}
                            />
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container item xs={12} sm={12} md={12} lg={12}>
                        <FieldArray name={"patientIdentities"}>
                          {(fieldArrayProps) => {
                            const { push, remove, form } = fieldArrayProps;
                            const { values } = form;
                            const { patientIdentities } = values;
                            
                            return (
                              <>
                                {patientIdentities.map((patientIdentities, index) => (
                                  <div key={index} style={{ width: "100%" }}>
                                    <Grid container item spacing={1} xs={12} sm={12} md={12} lg={12}>
                                      <Grid container item xs={12} sm={12} md={3} lg={3}>
                                        <div
                                          style={{
                                            width: "100%",
                                          }}
                                        >
                                          <FormikSelect
                                            name={`patientIdentities[${index}].identityTypeId`}
                                            options={compositeData.identityTypes}
                                            placeholder={formik.values?.patientIdentities?.[index]?.identityTypeId ? formik.values.patientIdentities[index].identityTypeId : ""}
                                            label={getLabel({
                                              module: "registration",
                                              label: "idType",
                                            })}
                                            required
                                            disabled={formik.values?.patientIdentities?.[index]?.identityTypeDisabled}
                                            error={
                                              Object.keys(formik.errors).length !== 0 &&
                                              Object.keys(formik.touched).length !== 0 &&
                                              formik.errors.patientIdentities &&
                                              formik.touched.patientIdentities &&
                                              formik.errors.patientIdentities[index] &&
                                              formik.touched.patientIdentities[index] &&
                                              formik.errors.patientIdentities[index].identityTypeId &&
                                              formik.touched.patientIdentities[index].identityTypeId
                                            }
                                          />
                                        </div>
                                      </Grid>
                                      <Grid container item xs={12} sm={12} md={3} lg={3}>
                                        <div
                                          style={{
                                            width: "100%",
                                          }}
                                        >
                                          <InputAsyncValidate
                                            name={`patientIdentities[${index}].value`}
                                            type="text"
                                            label={getLabel({
                                              module: "registration",
                                              label: "number",
                                            })}
                                            fieldLevelValidation={(value,name)=>handleIdentityValidation(value,name, formik)}
                                            required={formik?.values?.patientIdentities?.[index]?.identityTypeId}
                                            error={
                                              Object.keys(formik.errors).length !== 0 &&
                                              Object.keys(formik.touched).length !== 0 &&
                                              formik.errors.patientIdentities &&
                                              formik.touched.patientIdentities &&
                                              formik.errors.patientIdentities[index] &&
                                              formik.touched.patientIdentities[index] &&
                                              formik.errors.patientIdentities[index].value &&
                                              formik.touched.patientIdentities[index].value
                                            }
                                            maxlength={
                                              formik.values.patientIdentities[
                                                index
                                              ].identityTypeId ===
                                                passportValue
                                                ? passportNoLength
                                                : idNoLength
                                            }
                                            autoComplete="off"
                                          />
                                        </div>
                                      </Grid>
                                      <Grid container item xs={12} sm={12} md={3} lg={3}>
                                        <div
                                          style={{
                                            width: "100%",
                                          }}
                                        >
                                          <DateCom
                                            name={`patientIdentities[${index}].expiaryDate`}
                                            label={getLabel({
                                              module: "registration",
                                              label: "expiryDate",
                                            })}
                                            minDate={moment(new Date()).format("YYYY-MM-DD")}
                                            required={formik?.values?.patientIdentities?.[index]?.identityTypeId}
                                            error={
                                              Object.keys(formik.errors).length !== 0 &&
                                              Object.keys(formik.touched).length !== 0 &&
                                              formik.errors.patientIdentities &&
                                              formik.touched.patientIdentities &&
                                              formik.errors.patientIdentities[index] &&
                                              formik.touched.patientIdentities[index] &&
                                              formik.errors.patientIdentities[index].expiaryDate &&
                                              formik.touched.patientIdentities[index].expiaryDate
                                            }
                                            autoComplete="off"
                                          />
                                        </div>
                                      </Grid>

                                      {/*<Grid container item alignItems="center" xs={12} sm={12} md={3} lg={3}>
                                        <img
                                          src={Add}
                                          alt="add"
                                          onClick={() => {
                                            return Object.values(formik.values.patientIdentities[formik.values.patientIdentities.length - 1]).some(
                                              (data) => data === ""
                                            ) && checkIdentities(formik)
                                              ? (setSnackVariant("error"), setSnackText("Please fill all fields"))
                                              : (push({s
                                                  identityTypeId: "",
                                                  value: "",
                                                  expiaryDate: null,
                                                }),
                                                idTypeArray.push(1),
                                                setIdTypentArray(idTypeArray));
                                          }}
                                          className={classes.addIcon}
                                          style={{ marginTop: "1.2rem" }}
                                        />
                                        {idTypeArray.length !== 1 && (
                                          <img
                                            src={Trash}
                                            alt="trash"
                                            onClick={() => {
                                              return idTypeArray.length === 1 ? null : (idTypeArray.pop(index), setIdTypentArray(idTypeArray), remove(index));
                                            }}
                                            className={classes.deleteIcon}
                                            style={{ marginTop: "1.2rem" }}
                                          />
                                        )}
                                          </Grid>*/}
                                    </Grid>
                                  </div>
                                ))}
                              </>
                            );
                          }}
                        </FieldArray>
                      </Grid>

                      <Grid container item justify="flex-end" xs={12} sm={12} md={12} lg={12}>
                        <Button type="submit" className={classes.mediumSaveBtn} id="entrol-quick-patient">
                          {getLabel({module:"registration", label:"submit"})}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </MuiPickersUtilsProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickReg;
