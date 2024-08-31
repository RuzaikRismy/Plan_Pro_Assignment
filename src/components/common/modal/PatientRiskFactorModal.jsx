import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Divider, Avatar, Button, Chip } from "@material-ui/core";
import classNames from "classnames";
import moment from "moment";
import { useTheme } from "@material-ui/core/styles";

import { PatientRiskFactorModalStyles } from "./PatientRiskFactorModalStyles";
import { getLabel } from "../../../utils/localization";
import { API_URL } from "../../../shared/API_URLS";
import { http_Request } from "../../../utils/HTTP_Request";
import { useStyles } from "../../../assets/styles/styles";
import CommonModal from "../material/CommonModal";
import AddImageCapture from "../../registration/patientRegistrationComponent/modals/ImageCapture";

import PatientMale from "../../../assets/images/genderAvatar/male-avatar-bg-less.svg";
import PatientFemale from "../../../assets/images/genderAvatar/female avatar-bg-less.svg";
import UnknownAvatar from "../../../assets/images/genderAvatar/unknown-avatar.svg";
import Adult from "../../../assets/images/icons/ageCategory/adult.svg";
import Child from "../../../assets/images/icons/ageCategory/child.svg";
import Infant from "../../../assets/images/icons/ageCategory/infant.svg";
import NewBorn from "../../../assets/images/icons/ageCategory/newBorn.svg";
import Teen from "../../../assets/images/icons/ageCategory/teen.svg";
import Toddler from "../../../assets/images/icons/ageCategory/toddler.svg";
import Senior from "../../../assets/images/icons/ageCategory/senior.svg";
import Birthday from "../../../assets/images/icons/birthday.svg";

//patient status
const PatientStatus = (props) => {
    const { patientDetails, nursePreAssessmentClasses } = props;

    //get status from the patient details
    const getState = (patientAge) => {
        let ageInYears =
            patientAge?.indexOf && patientAge.indexOf("Y") > 0 ? parseInt(patientAge.split("Y")[0]) : 0;
        let state = "";
        if (ageInYears === 0) {
            state = "NewBorn";
        } else if (ageInYears === 1) {
            state = "Infant";
        } else if (ageInYears > 1 && ageInYears < 5) {
            state = "Toddler";
        } else if (ageInYears >= 5 && ageInYears < 13) {
            state = "Child";
        } else if (ageInYears >= 13 && ageInYears < 20) {
            state = "Teen";
        } else if (ageInYears >= 20 && ageInYears < 61) {
            state = "Adult";
        } else {
            state = "Senior";
        }
        return state;
    };
    //get status icon
    const getPatientStatus = (patientDetails) => {
        let image = null;
        let STATE = getState(patientDetails?.age);
        if (STATE === "Child") {
            image = Child;
        } else if (STATE === "NewBorn") {
            image = NewBorn;
        } else if (STATE === "Infant") {
            image = Infant;
        } else if (STATE === "Toddler") {
            image = Toddler;
        } else if (STATE === "Teen") {
            image = Teen;
        } else if (STATE === "Adult") {
            image = Adult;
        } else if (STATE === "Senior") {
            image = Senior;
        }

        return (
            <img
                alt={STATE}
                src={image}
                className={nursePreAssessmentClasses?.patientAgeStatusIcon}
                style={{
                    marginTop: "1rem"
                }}
            />
        );
    };

    return getPatientStatus(patientDetails);
};

const PatientRiskFactorModal = (props) => {
    const {
        acknowledgedAction,
        isModalOpen,
        modalCloseAction,
        modalHeader,
        startIcon,
        patientDetails,
        setBaseImg,
        acknowledgeUserRoleRiskFactor, //[ DOCTOR, PHARMACIST, NURSE ]
        acknowledgeStaffType //[ Doctor, Nurse ]
    } = props;

    /**
    |--------------------------------------------------
    | Redux integrations
    |--------------------------------------------------
    */
    const dispatch = useDispatch();

    const patientRiskFactorPopupAcknowledgement = useSelector(
        (state) => state.patientRiskFactorPopupAcknowledgementReducer
    );

    //uses app theme and component classes
    const PatientRiskFactorModalClasses = PatientRiskFactorModalStyles();
    const classes = useStyles();

    //states
    const [riskFactors, setRiskFactors] = React.useState({});
    const [isLoadSpinner, setIsLoadSpinner] = React.useState(true);
    const [riskFactorClinicalData, setRiskFactorClinicalData] = React.useState(null);
    const [isEmptyRiskFactors, setIsEmptyRiskFactors] = React.useState(true);
    //show the image
    const [imageName, setImageName] = React.useState(UnknownAvatar);
    // capture open close state
    const [imageCaptureOpen, setCaptureOpen] = React.useState(false);

    /**
    |--------------------------------------------------
    | Effect on patient detail
    |--------------------------------------------------
    */
    React.useEffect(() => {
        if (isModalOpen) {
            if (patientDetails) {
                let bodyData = {
                    patientId: patientDetails?.patientId,
                    // encounterId: patientDetails?.encounterId,
                    status: "ACTIVE"
                }
                http_Request(
                    {
                        url: API_URL.ehr.subject.patientRiskFactors,
                        method: "POST",
                        bodyData
                    },
                    function successCallback(response) {
                        if ((response?.status === 200 || response.status === 201) || response?.data) {

                            let riskFactorResponse = {};
                            let allergyData = (Array.isArray(response?.data?.allergies) && response?.data?.allergies) || [];
                            let diagnosisData = (Array.isArray(response?.data?.diagnosis) && response?.data?.diagnosis) || [];

                            let allergies = {
                                drugAllergies: [],
                                foodAllergies: [],
                                otherAllergies: []
                            }

                            let chronicConditions = [];
                            //allergy data
                            allergyData?.forEach && allergyData.forEach(
                                singleAllergy => {
                                    singleAllergy?.allergyReactions?.forEach && singleAllergy.allergyReactions.forEach(
                                        singleAllergyReaction => {
                                            if (singleAllergyReaction?.code === "SEVERE") {
                                                singleAllergy.highestReactionSeverity = "SEVERE"
                                            } else if (singleAllergyReaction?.code === "MILD") {
                                                singleAllergy.highestReactionSeverity = "MILD"
                                            } else if (singleAllergyReaction?.code === "MODERATE") {
                                                singleAllergy.highestReactionSeverity = "MODERATE"
                                            } else {
                                                singleAllergy.highestReactionSeverity = "NONE"
                                            }
                                        }
                                    )
                                    if (
                                        singleAllergy?.allergyType === "Drug allergy" &&
                                        singleAllergy?.status === "ACTIVE"
                                    ) {
                                        allergies.drugAllergies.push(singleAllergy);
                                    } else if (
                                        singleAllergy?.allergyType === "Food allergy" &&
                                        singleAllergy?.status === "ACTIVE"
                                    ) {
                                        allergies.foodAllergies.push(singleAllergy);
                                    } else if (singleAllergy?.status === "ACTIVE") {
                                        allergies.otherAllergies.push(singleAllergy);
                                    }

                                }
                            )
                            //diagnosis
                            diagnosisData?.forEach && diagnosisData.forEach(function (diagnosis) {
                                if (diagnosis?.diagnosisCondition === "CHRONIC") {
                                    chronicConditions.push({
                                        biologicalSystemId: 1,
                                        diagnosisId: diagnosis.diagnosisId,
                                        terminology: diagnosis.diagnosisEn,
                                    });
                                }
                            });

                            riskFactorResponse.allergies = allergies;
                            riskFactorResponse.patientId = patientDetails?.patientId;
                            riskFactorResponse.observedAt = moment().format(
                                "YYYY-MM-DD HH:mm:ss"
                            );
                            riskFactorResponse.chronicConditions = chronicConditions;
                            handleEmptyResponse(riskFactorResponse, response?.data);
                        }

                    },
                    function errorCallback(error) {
                        console.log("error", error);
                    }
                );
            }
        }
    }, [patientDetails, isModalOpen]);

    /**
    |--------------------------------------------------
    | Handling Empty Response
    |--------------------------------------------------
    */
    const handleEmptyResponse = (riskFactorResponse, requestClinicalData) => {
        let isEmpty = true;
        Object.entries(riskFactorResponse.allergies).forEach(([key, value]) => {
            let activeAllergies = value.filter(
                (item) => item?.status === "ACTIVE"
            );
            if (activeAllergies.length > 0) {
                isEmpty = false;
            }
        });
        if (riskFactorResponse.chronicConditions?.length > 0) {
            isEmpty = false;
        }
        setIsEmptyRiskFactors(isEmpty);
        setRiskFactors(riskFactorResponse);
        setIsLoadSpinner(false);
        setRiskFactorClinicalData(requestClinicalData)
    };

    /**
    |--------------------------------------------------
    | Create Acknowledgement
    |--------------------------------------------------
    */
    const createAcknowledgement = () => {
        let RiskFactorObj = {
            patientId: riskFactors?.patientId,
            encounterId: patientDetails?.encounterId,
            acknowledgeUserRole:acknowledgeUserRoleRiskFactor,
            ehrId: patientDetails?.ehrId,
            patientClinicalData: [{
                allergies: (riskFactorClinicalData?.allergies?.map && riskFactorClinicalData.allergies.map(
                    singleAllergy => {
                        return {
                            //allergyId: singleAllergy?.id && singleAllergy.id, // backend api requested for integer which is not available for mapping.
                            allergyName: singleAllergy?.allergyName,
                            icdSnowmedCode: singleAllergy?.allergyCode,
                            //reactions :   // backend api mention on string and cannot map an array to string 
                        }
                    }
                )) || [],
                diagnosis: (riskFactorClinicalData?.diagnosis?.map && riskFactorClinicalData.diagnosis.map(
                    singleDiagnosis => {
                        return {
                            diagnosisId: singleDiagnosis?.id,
                            snomedCode: singleDiagnosis?.diagnosisCode,
                            terminology: singleDiagnosis?.diagnosisEn
                        }
                    }
                )) || []
            }],
            staffType: acknowledgeStaffType,  
            source: "OPD",
        };

        http_Request(
            {
                url: API_URL.ehr.subject.createAcknowledgement,
                method: "POST",
                bodyData: RiskFactorObj,
            },
            function successCallback(responce) {
                if (acknowledgeUserRoleRiskFactor==="PHARMACIST"){
                    acknowledgedAction(patientDetails);      
                }else{
                    acknowledgedAction();
                }
            },
            function errorCallback(error) {
                console.log("error", error);
            }
        );


    };

    /**
    |--------------------------------------------------
    | Get Patient's image
    |--------------------------------------------------
    */
    const getPatientImage = () => {
        const requestBody = {
            url: API_URL.patient.registration.GET_PATIENT_IMAGE.replace("{patientId}", patientDetails?.patientId),
            method: "GET"
        }
        const otherDetails = {
            responseType: "blob",
        }
        const successCallback = (response) => {
            if (response?.status === 200 || response?.status === 201) {
                const imageContent = response?.data;
                const previewFile = new Blob([imageContent], { type: "image/*" });
                const imageURL = imageContent && URL.createObjectURL(previewFile);
                setImageName(imageURL);
            }
        }
        const errorCallback = (error) => {
            console.log("error", error);
            setImageName(patientDetails?.gender === "Male" ? PatientMale : patientDetails?.gender === "Female" ? PatientFemale : UnknownAvatar)
        }

        http_Request(requestBody, successCallback, errorCallback, otherDetails)
    }

    /**
    |--------------------------------------------------
    | Effect on image path change
    |--------------------------------------------------
    */
    React.useEffect(() => {
        if (patientDetails?.patientId) {
            getPatientImage()
        }
    }, [patientDetails?.patientId]);

    /**
    |--------------------------------------------------
    | Effect on image path change in pharmacy dashboard
    |--------------------------------------------------
    */
    React.useEffect(() => {
        if (patientDetails?.patientId || patientDetails?.patientProfileId) {
            getPatientImage()
        }
    }, [patientDetails?.patientId, patientDetails?.patientProfileId]);

    return (
        <div>
            <CommonModal
                isModalOpen={isModalOpen}
                modalCloseAction={() => {
                    modalCloseAction && modalCloseAction();
                }}
                modalHeader={modalHeader}
                startIcon={startIcon}
                modalWidth="sm"
                modalWrapperClass={PatientRiskFactorModalClasses?.chiefComplaintModalWrapperClass}
                modalHeaderClass={PatientRiskFactorModalClasses?.chiefComplaintModalHeaderClass}
                modalContentClass={PatientRiskFactorModalClasses?.chiefComplaintModalContentClass}
            >
                <Grid container item md="12" className={PatientRiskFactorModalClasses.background} >
                    <Grid item md="2">
                        <AddImageCapture
                            classes={classes}
                            imageCaptureOpen={imageCaptureOpen}
                            setImageName={setImageName}
                            setBaseImg={setBaseImg}
                        />
                        <Grid >
                            <div>
                                <img
                                    src={imageName}
                                    alt="No image"
                                    className={PatientRiskFactorModalClasses.avatarHeightWidth}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item md="10">
                        <Grid container item  >
                            <Typography style={{ marginTop: "1rem" }} className={patientDetails?.gender === "Female"
                                ? PatientRiskFactorModalClasses.bannerFemaleNameAppTypo
                                : patientDetails?.gender === "Male"
                                    ? PatientRiskFactorModalClasses.bannerMaleNameAppTypo
                                    : patientDetails?.gender === "Unknown"
                                        ? PatientRiskFactorModalClasses.bannerUnknownNameAppTypo
                                        : PatientRiskFactorModalClasses.bannerNameApp}
                            >
                                {patientDetails &&
                                    patientDetails.patientName}
                            </Typography>
                            <>
                                <PatientStatus
                                    className={PatientRiskFactorModalClasses.patientStatus}
                                    patientDetails={patientDetails}
                                    PatientRiskFactorModalClasses={PatientRiskFactorModalClasses}
                                    style={{
                                        marginTop: "1rem",
                                    }}
                                />
                            </>
                        </Grid>
                        <Grid container item>
                            <Typography
                                className={classNames(
                                    PatientRiskFactorModalClasses.mrnDobBrandDark,
                                    PatientRiskFactorModalClasses.mrnTopBar,
                                )}
                            >
                                {patientDetails?.mrn}
                            </Typography>
                            <Typography
                                className={classNames(
                                    PatientRiskFactorModalClasses.mrnDobBrandDark,
                                    PatientRiskFactorModalClasses.dobTopBarIcon,
                                )}
                            > | </Typography>
                            <img
                                className={classNames(
                                    PatientRiskFactorModalClasses.mrnDobBrandDark,
                                    PatientRiskFactorModalClasses.dobTopBarIcon,
                                )}
                                src={Birthday}
                                alt="Birthday Image" />
                            <Typography
                                className={classNames(
                                    PatientRiskFactorModalClasses.mrnDobBrandDark,
                                    PatientRiskFactorModalClasses.dobTopBar,
                                )}
                            >{patientDetails?.age}</Typography>

                        </Grid>
                    </Grid>
                    <Divider className={PatientRiskFactorModalClasses.divider} />
                    {isLoadSpinner ? (
                        <Grid
                            container
                            style={{ justifyContent: "center", alignItems: "center" }}
                        >
                            <img
                                src={require("../../../assets/images/loadingsniperNew.gif")}
                            ></img>
                        </Grid>
                    ) : isEmptyRiskFactors && !isLoadSpinner ? (
                        <Grid>
                            <Typography
                                className={PatientRiskFactorModalClasses.emptyRiskFactorsText}
                                component="div"
                            >
                                {getLabel({ module: "ehr", label: "noRiskFactorsAvailable" })}
                            </Typography>
                        </Grid>
                    ) : (
                        <>
                            <Grid item md="12">
                                <Grid container item
                                    style={{
                                        marginTop: "1rem",
                                    }}
                                >
                                    <Typography
                                        className={classNames(
                                            PatientRiskFactorModalClasses.popupSubHeaders,
                                            PatientRiskFactorModalClasses.chronicConditionsHeader,
                                        )}
                                        component="div"
                                    >
                                        {getLabel({ module: "ehr", label: "chronicConditions" })}</Typography>

                                </Grid>
                                <Grid
                                    style={{
                                        margin: "0.5rem 0",
                                        marginLeft: "1rem",
                                    }}>
                                    {Object.keys(riskFactors).length !== 0 &&
                                        riskFactors.chronicConditions.length > 0 ? (
                                        riskFactors.chronicConditions.map((condition) => (
                                            <Grid style={{ margin: "0.5rem 0" }}>
                                                <Typography
                                                    className={classNames(
                                                        PatientRiskFactorModalClasses.popupText,
                                                        PatientRiskFactorModalClasses.chronicConditionsData,
                                                    )}
                                                    component="div"
                                                >
                                                    {condition.terminology}
                                                </Typography>
                                            </Grid>
                                        ))
                                    ) : (
                                        <Grid style={{ margin: "0.5rem 0" }}>
                                            <Typography
                                                className={classNames(
                                                    PatientRiskFactorModalClasses.popupText,
                                                    PatientRiskFactorModalClasses.chronicConditionsData,
                                                )}
                                                component="div"
                                            >
                                                {getLabel({ module: "ehr", label: "notApplicable" })}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                            <Divider className={PatientRiskFactorModalClasses.divider} />
                            <Grid container md="12" className={classNames(PatientRiskFactorModalClasses.allergiesContainer)}>
                                <Grid item md="2">
                                    <Typography
                                        className={classNames(
                                            PatientRiskFactorModalClasses.popupSubHeaders,
                                            PatientRiskFactorModalClasses.allergiesHeader,
                                        )}
                                        component="div"
                                    >
                                        {getLabel({ module: "ehr", label: "allergies" })}
                                    </Typography>
                                </Grid>
                                <Grid item md="10">
                                    <Grid
                                        container
                                        spacing={1}
                                    >
                                        {Object.keys(riskFactors).length !== 0 &&
                                            typeof riskFactors?.allergies === "object" &&
                                            Object.keys(riskFactors.allergies).map((key, i) => {
                                                return riskFactors.allergies[key]?.length > 0 &&
                                                    Array.isArray(riskFactors.allergies[key]) &&
                                                    riskFactors.allergies[key].filter(
                                                        (allergy) => allergy.status === "ACTIVE"
                                                    ).length > 0 && (
                                                        riskFactors.allergies[key].map(
                                                            (allergy, index) =>
                                                                allergy.status === "ACTIVE" && (
                                                                    <Grid
                                                                        item
                                                                        xs="auto"
                                                                    >
                                                                        <Chip
                                                                            label={allergy.allergyName}
                                                                            className={classNames(
                                                                                key === "drugAllergies"
                                                                                    ? allergy?.highestReactionSeverity === "SEVERE"
                                                                                        ? PatientRiskFactorModalClasses.drugAllergiesChipSevere : allergy?.highestReactionSeverity === "MODERATE"
                                                                                            ? PatientRiskFactorModalClasses.drugAllergiesChipModerate : allergy?.highestReactionSeverity === "MILD"
                                                                                                ? PatientRiskFactorModalClasses.drugAllergiesChipMild : PatientRiskFactorModalClasses.drugAllergiesChipNone
                                                                                    : key === "foodAllergies"
                                                                                        ? allergy?.highestReactionSeverity === "SEVERE"
                                                                                            ? PatientRiskFactorModalClasses.foodAllergiesChipSevere : allergy?.highestReactionSeverity === "MODERATE"
                                                                                                ? PatientRiskFactorModalClasses.foodAllergiesChipModerate : allergy?.highestReactionSeverity === "MILD"
                                                                                                    ? PatientRiskFactorModalClasses.foodAllergiesChipMild : PatientRiskFactorModalClasses.foodAllergiesChipNone
                                                                                        : allergy?.highestReactionSeverity === "SEVERE"
                                                                                            ? PatientRiskFactorModalClasses.otherAllergiesChipSevere : allergy?.highestReactionSeverity === "MODERATE"
                                                                                                ? PatientRiskFactorModalClasses.otherAllergiesChipModerate : allergy?.highestReactionSeverity === "MILD"
                                                                                                    ? PatientRiskFactorModalClasses.otherAllergiesChipMild : PatientRiskFactorModalClasses.otherAllergiesChipNone
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                )
                                                        )
                                                    )
                                            })}

                                        {
                                            riskFactorClinicalData?.allergies?.filter && !riskFactorClinicalData.allergies.filter(
                                                singleAllergy => singleAllergy.status === "ACTIVE"
                                            )?.length && ((
                                                <Typography
                                                    className={PatientRiskFactorModalClasses.popupText}
                                                >
                                                    {getLabel({ module: "ehr", label: "notApplicable" })}
                                                </Typography>
                                            ))
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider className={PatientRiskFactorModalClasses.divider} />
                            <Grid item md="12" style={{ paddingLeft: "1rem", paddingBottom: "1rem" }}>
                                <Grid style={{ paddingTop: "1rem" }} container>
                                    <Grid md="4">
                                        <Typography
                                            className={classNames(
                                                PatientRiskFactorModalClasses.popupSubHeaders,
                                                PatientRiskFactorModalClasses.specialRemarksGeneralHeader,
                                            )}
                                        >
                                            {getLabel({ module: "ehr", label: "specialRemarks" })}
                                        </Typography>
                                    </Grid>
                                    <Grid md="8">
                                        <Grid container style={{ marginLeft: "1rem " }}>
                                            <Typography
                                                className={classNames(
                                                    PatientRiskFactorModalClasses.popupText,
                                                    PatientRiskFactorModalClasses.notApplicableStyle,
                                                )}
                                            >
                                                {getLabel({ module: "ehr", label: "notApplicable" })}
                                            </Typography>
                                            {/* <Chip
                                            label="ADR"
                                            size="medium"
                                            className={PatientRiskFactorModalClasses.remarkRedChip}
                                        />
                                        <Chip
                                            label="Infected"
                                            size="medium"
                                            className={PatientRiskFactorModalClasses.remarkRedChip}
                                        />
                                        <Chip
                                            label="Legal"
                                            size="medium"
                                            className={PatientRiskFactorModalClasses.remarkGreyChip}
                                        /> */}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider className={PatientRiskFactorModalClasses.divider} />
                            <Grid item md="12" className={PatientRiskFactorModalClasses.generalMessagePadding}>
                                <Grid style={{ paddingTop: "1rem" }} container>
                                    <Grid md="4">
                                        <Typography
                                            className={classNames(
                                                PatientRiskFactorModalClasses.popupSubHeaders,
                                                PatientRiskFactorModalClasses.specialRemarksGeneralHeader,
                                            )}
                                        >
                                            {getLabel({ module: "ehr", label: "generalMessage" })}
                                        </Typography>
                                    </Grid>
                                    <Grid md="8">
                                        <Grid container className={PatientRiskFactorModalClasses.generalMessageMargin}>
                                            {riskFactorClinicalData?.generalMessage ? (
                                                <Grid>
                                                    <Typography
                                                        className={classNames(
                                                            PatientRiskFactorModalClasses.popupText,
                                                            PatientRiskFactorModalClasses.generalMessage,
                                                        )}
                                                        component="div"
                                                    >
                                                        {riskFactorClinicalData?.generalMessage}
                                                    </Typography>
                                                </Grid>
                                            ) : (
                                                <Grid >
                                                    <Typography
                                                        className={classNames(
                                                            PatientRiskFactorModalClasses.popupText,
                                                            PatientRiskFactorModalClasses.notApplicableStyle,
                                                        )}
                                                        component="div"
                                                    >
                                                        {getLabel({ module: "ehr", label: "notApplicable" })}
                                                    </Typography>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    )}
                    <Grid container justify="flex-end" className={PatientRiskFactorModalClasses.acknowledgeStyles}>
                        <Button
                            className={classes.mediumSecondaryBtn}
                            onClick={createAcknowledgement}
                        >
                            {getLabel({ module: "ehr", label: "acknowledge" })}
                        </Button>
                    </Grid>
                </Grid>

            </CommonModal>
        </div>
    )
}
export default PatientRiskFactorModal
