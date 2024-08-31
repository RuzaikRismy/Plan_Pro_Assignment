import { makeStyles } from "@material-ui/styles";
import { sortedLastIndex } from "lodash";

export const PatientRiskFactorModalStyles = makeStyles((theme) => ({
  chiefComplaintModalWrapperClass: {
    "& .MuiDialog-paper": {
      borderRadius: 20,
    },
  },
  chiefComplaintModalHeaderClass: {
    color: theme.palette.brandPrimary.dark,
    backgroundColor: theme.palette.primary.tooLiter,
  },
  chiefComplaintModalContentClass: {
    // backgroundColor: theme.palette.primary.tooLiter,
    //borderBottom: `1px solid ${theme.palette.lightBlue.lighter}`,
    padding: "0 !important",
    overflow: "hidden",
    "& .MuiTypography-root": {
      marginBlock: 0,
    },
  },
  // bodyBorder: {
  //   borderTop: `1px solid ${theme.palette.lightBlue.lighter}`,
  // },
  mainContainerBillingApp: {
    margin: "0.5rem 1rem 0rem 5.8rem",
    flexGrow: 1,
    overflow: "hidden",
    overflowY: "scroll",
    padding: "0 0 3rem 0",
    [theme.breakpoints.down("xs")]: {
      margin: "0.5rem 1rem 0rem 1rem",
    },
    height: "calc(100vh - 5.625rem)",
  },
  borderBlueDev: {
    height: "3.2rem",
    backgroundColor: theme.palette.background.textField,
    border: `1px solid ${theme.palette.blue.tooLiter}`,
    borderRadius: "5px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(0.25),
    marginTop: "auto",
  },
  tableColumn: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.brandPrimary.contrastText,
  },
  redText: {
    color: theme.palette.reds.dark,
  },
  errorText: {
    color: theme.palette.reds.dark + "!important",
    fontSize: theme.typography.fontSize + "px",
    fontWeight: "500",
    marginTop: "1rem",
  },
  iconTable: {
    marginLeft: "0.4rem",
    cursor: "pointer",
  },
  iconTableNoMargin: {
    marginLeft: "0rem !important",
    cursor: "pointer",
  },
  darkRedChip: {
    padding: "0.175rem 0.625rem 0.125rem",
    fontSize: 13,
    color: theme.palette.tagColorsFont.main,
    lineHeight: 1.5,
    backgroundColor: theme.palette.tagColorsBg.main,
    borderRadius: 16,
    whiteSpace: "nowrap",
    width: "max-content",
    fontWeight: "500",
    height: "1.5rem",
    margin: "0 0.5rem"
  },
  blueChip: {
    padding: "0.175rem 0.625rem 0.125rem",
    fontSize: 13,
    color: theme.palette.blueChip.dark,
    lineHeight: 1.5,
    backgroundColor: theme.palette.blueChip.tooLiter,
    borderRadius: 16,
    whiteSpace: "nowrap",
    width: "max-content",
    fontWeight: "500",
    height: "1.5rem",
    margin: "0 0.5rem"
  },
  darkBlueChip: {
    color: theme.palette.blueChip.dark,
    background: theme.palette.blueChip.tooLiter,
    padding: "0.175rem 0.625rem 0.125rem",
    fontSize: theme.typography.fontSize13,
    lineHeight: 1.5,
    borderRadius: theme.spacing(2),
    whiteSpace: "nowrap",
    width: "max-content",
    fontWeight: theme.typography.fontWeight.weight4,
    textTransform: "capitalize",
    height: "1.5rem",
    margin: "0 0.5rem"
  },
  orangeChip: {
    padding: "0.175rem 0.625rem 0.125rem",
    fontSize: 13,
    color: theme.palette.orange.dark,
    lineHeight: 1.5,
    backgroundColor: theme.palette.orange.light,
    borderRadius: 16,
    whiteSpace: "nowrap",
    width: "max-content",
    fontWeight: "500",
    height: "1.5rem",
    margin: "0 0.5rem"
  },
  darkOrangeChip: {
    color: theme.palette.tagColorsFont.dark,
    background: theme.palette.tagColorsBg.dark,
    padding: "0.175rem 0.625rem 0.125rem",
    fontSize: theme.typography.fontSize13,
    lineHeight: 1.5,
    borderRadius: theme.spacing(2),
    whiteSpace: "nowrap",
    width: "max-content",
    fontWeight: theme.typography.fontWeight.weight4,
    textTransform: "capitalize",
    height: "1.5rem",
    margin: "0 0.5rem"
  },
  greenChip: {
    padding: "0.175rem 0.625rem 0.125rem",
    fontSize: theme.typography.fontSize13,
    color: theme.palette.darkGreen.dark,
    lineHeight: 1.5,
    backgroundColor: theme.palette.darkGreen.tooLiter,
    borderRadius: 16,
    whiteSpace: "nowrap",
    width: "max-content",
    fontWeight: theme.typography.fontWeight.weight4,
    height: "1.5rem",
    margin: "0 0.5rem"
  },
  darkGreenChip: {
    padding: "0.175rem 0.625rem 0.125rem",
    fontSize: theme.typography.fontSize13,
    color: theme.palette.darkGreen.tooLiter,
    lineHeight: 1.5,
    backgroundColor: theme.palette.darkGreen.dark,
    borderRadius: 16,
    whiteSpace: "nowrap",
    width: "max-content",
    fontWeight: theme.typography.fontWeight.weight4,
    height: "1.5rem",
    margin: "0 0.5rem"
  },
  searchSection: {
    height: "2.875rem",
  },
  disabledActionBtn: {
    cursor: "default",
  },
  patientListFilterWrapperFormControl: {
    margin: "0 0.5rem 0.5rem 0",
    flexGrow: 0.15,
    [theme.breakpoints.down(1329)]: {
      flexGrow: 1,
    },
    padding: "0.135rem 0.675rem"
  },
  autoCompleteFieldFilter: {
    marginTop: "0.5rem",
    minWidth: "14rem",
    "& .MuiOutlinedInput-notchedOutline": {
      border: `none`,
    },
  },
  primaryTitle: {
    fontWeight: `${theme.typography.fontWeight.weight5} !important`,
    fontSize: "1rem"
  },
  noUnderlineDatePicker: {
    width: theme.buttons.width.medium,
    "& div::after": {
      content: "none !important",
    },
    "& div::before": {
      content: "none !important",
    },
  },
  mainContainerHeader: {
    padding: `${theme.customSpacing.padding.padding2 + 1}px 0 0 0`,
  },
  assessmentSubContainer: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    borderRadius: theme.customSpacing.borderRadius.radius3,
    height: "100%",
    cursor: "pointer",
  },
  patientBannerAvatarGrid: {
    border: "solid " + theme.palette.primary.lighter,
    borderWidth: "0 1px 0 0",
  },
  patientBannerAvatar: {
    width: "inherit",
    objectFit: "contain"
  },
  patientSummaryBannerAvatar: {
    maxWidth: "2.875rem",
    margin: "0.5rem 0.125rem"
  },
  bannerAvatarMale: {
    background: theme.palette.genderColorMain.maleBg,
  },
  bannerAvatarFemale: {
    background: theme.palette.genderColorMain.femaleBg,
  },
  bannerAvatarUnknown: {
    background: theme.palette.genderColorMain.unknownBg,
  },
  patientBannerMRN: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.primary.contrastText,
    margin: "5px 0px",
  },
  patientBannerHeaderGrid: {
    lineHeight: "2.3rem",
  },
  bannerNameApp: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.genderColorMain.maleFont,
    marginRight: "1rem",
    textTransform: "capitalize",
  },
  bannerFemaleNameAppTypo: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: theme.typography.fontWeight.weight5,
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.genderColor.femaleColor,
    marginRight: "1rem",
    textTransform: "capitalize",
  },
  bannerMaleNameAppTypo: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: theme.typography.fontWeight.weight5,
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.genderColor.maleColor,
    marginRight: "1rem",
    textTransform: "capitalize",
  },
  bannerUnknownNameAppTypo: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: theme.typography.fontWeight.weight5,
    fontSize: theme.typography.h4.fontSize,
    color: theme.palette.genderColor.unknownGenderColor,
    marginRight: "1rem",
    textTransform: "capitalize",
  },
  summaryPatientDetailTypo: {
    fontSize: `${theme.typography.smallFontSize}px !important`,
  },
  summaryPatientDetailValueTypo: {
    fontSize: `${theme.typography.smallFontSize}px !important`,
    fontWeight: theme.typography.fontWeight.weight4,
    color: theme.palette.brandPrimary.dark
  },
  bannerGenderIcon: {
    margin: "0 1rem 0 0",
  },
  greyChipAppBook: {
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.smallFontSize,
    color: theme.palette.lightGrey.dark,
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(196, 196, 196, 0.3)",
    //  backgroundColor: theme.palette.reds.tooLiter,
    height: "1.6rem",
    padding: "0.3rem 1rem 0.3rem 1rem",
    borderRadius: "16px",
    width: "max-content",
  },
  appBookChipsTypo: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.smallFontSize,
  },
  patientBannerMainWrapper: {
    margin: "0 0.25rem 0 0",
  },
  bannerChipMarginClass: {
    margin: "0 1rem 0 0",
  },
  bannerPatientStatusGrid: {
    padding: "0.675rem 1.25rem 0.675rem 0.5rem",
  },
  bannerStatusIndicatorGrid: {
    padding: `0 0 0 ${theme.customSpacing.padding.padding2}px`,
  },
  bannerStatusIndicator: {
    padding: "0 0.75rem",
    fontSize: theme.typography.smallFontSize,
    borderRadius: "1rem",
    textAlign: "center",
    display: "flex",
    lineHeight: `${theme.typography.h3.fontSize}px`,
  },
  bannerPatientTypeNormal: {
    background: theme.palette.blueChip.light,
    color: theme.palette.brandPrimary.contrastText,
  },
  bannerPatientTypeVIP: {
    background: theme.palette.blueChip.main,
    color: theme.palette.brandPrimary.contrastText,
  },
  bannerPatientTypeVVIP: {
    background: theme.palette.otherColors.contrastText,
    color: theme.palette.brandPrimary.contrastText,
  },
  patientBannerDetailLabelTypo: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.fontSize,
    color: theme.palette.grey.light,
  },
  patientBannerDetailValueTypo: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.fontSize,
    color: theme.palette.brandPrimary.dark,
    margin: "0.5rem"
  },
  camelCasePatientBannerTypo: {
    textTransform: "capitalize",
  },
  informationTooltipIcon: {
    cursor: "pointer",
    margin: "0.125rem 1rem 0 0.125rem",
    width: theme.typography.fontSize,
    height: theme.typography.fontSize,
  },
  actionMarginClass: {
    cursor: "pointer",
    marginRight: "0.5rem",
  },
  preAssessmentFullWidthDivider: {
    width: "100%",
  },
  patientBannerMRNWrapper: {
    backgroundColor: theme.palette.brandPrimary.dark,
    width: "100%",
    minHeight: "3rem"
  },
  bannerInfoIcon: {
    paddingLeft: theme.customSpacing.padding.padding1,
    cursor: "pointer",
  },
  bannerInfoLightTooltip: {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.brandPrimary.dark,
  },
  complaintPatientDetailSubContainer: {
    padding: `0 ${theme.customSpacing.padding.padding2}px`,
  },
  patientAgeStatusIcon: {
    width: "1.25rem",
  },
  summaryPatientAgeStatusIcon: {
    width: "1rem",
  },
  favoriteComplaintOptionIcon: {
    color: theme.palette.goldenYellow.dark,
  },
  complaintOptionIcon: {
    color: theme.palette.lightGrey.light,
  },
  favoriteComplaintActionBtn: {
    padding: "0.25rem 0.5rem",
  },
  chiefComplaintContinueBtn: {
    margin: "0 !important",
  },
  appointmentsTableSelectedRow: {
    backgroundColor: theme.palette.lightBlue.dark + " !important",
  },
  preAssessmentSummaryContent: {
    padding: "1rem 0 0 0 !important",
    // backgroundColor: theme.palette.primary.tooLiter,
    // height: "46rem",
    // overflow: "hidden scroll"
  },
  preAssessmentDetailWrapper: {
    padding: "0.675rem 1.5rem",
    alignItems: "center",
  },
  preAssessmentSummaryAddBtn: {
    color: theme.palette.green.dark,
  },
  preAssessmentSummaryCategoryLabelTypo: {
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight.weight2 * 2,
    color: theme.palette.brandPrimary.dark,
  },
  preAssessmentSummaryLabelTypo: {
    fontSize: theme.typography.smallFontSize,
    color: theme.palette.primary.dark,
  },
  preAssessmentSummaryHOCTypo: {
    fontSize: theme.typography.smallFontSize,
    color: theme.palette.brandPrimary.dark,
  },
  preAssessmentCardWrapper: {
    width: "100%",
    // backgroundColor: theme.palette.primary.tooLiter,
  },
  preAssessmentTemplateSelect: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: theme.palette.background.textField,
    },
  },
  preAssessmentTemplateAddButton: {
    color: theme.palette.brandPrimary.dark,
  },
  preAssessmentDrawerTabs: {
    width: "fit-content",
    minWidth: "12rem",
    "& button": {
      padding: "0 1.5rem",
      marginBottom: "0.25rem",
      backgroundColor: theme.palette.blue.light,
      color: `${theme.palette.brandPrimary.contrastText} !important`,
      textTransform: "none !important",
      fontWeight: theme.typography.fontWeight.weight5,
      borderRadius: `${theme.customSpacing.borderRadius?.radius3}px 0 0 ${theme.customSpacing.borderRadius?.radius3}px`,
    },
    "& .MuiTab-wrapper": {
      display: "flex !important",
      justifyContent: "flex-start !important",
      textAlign: "start",
      alignItems: "flex-start !important",
    },
    "& .Mui-selected": {
      backgroundColor: theme.palette.brandPrimary.dark,
      color: `${theme.palette.brandPrimary.contrastText} !important`,
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .MuiTab-root": {
      maxWidth: "none !important",
    },
  },
  preAssessmentContainerWrapper: {
    border: "0.125rem solid " + theme.palette.lightBlue.dark,
    borderRadius: theme.customSpacing.borderRadius?.radius3,
    minWidth: 'fit-content'
  },
  complaintInputLabel: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.fontSize,
  },
  preAssessmentComplaintSelectWrapper: {
    height: "fit-content",
  },
  complaintDetailEditorWrapper: {
    border: "0.125rem solid " + theme.palette.border.lightash,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  preAssessmentSummaryWrapper: {
    padding: "0 !important",
  },
  preAssessmentSummaryCardWrapper: {
    width: "100%",
    height: "fit-content",
  },
  preAssessmentExaminationsCardWrapper: {
    width: "100%",
    // backgroundColor: theme.palette.primary.tooLiter,
  },
  preAssessmentExaminationTabBtn: {
    width: "fit-content",
    whiteSpace: "nowrap",
    height: "2.5rem",
    padding: theme.customSpacing.padding.padding2,
    fontSize: theme.typography.fontSize + "px !important",
    boxShadow: "none",
  },
  examinationPregnantDurationLabelTypo: {
    padding: "0 1rem",
    margin: "0 0 0.5rem 0",
  },
  chiefComplaintModalDetailWrapper: {
    padding: "1rem",
    width: "100% !important ",
  },
  pregnantDurationField: {
    padding: "0 !important",
  },
  preAssessmentRemarksTextArea: {
    width: "100%",
    border: "1px solid " + theme.palette.border.lightash,
    borderRadius: theme.customSpacing.borderRadius.radius3,
    padding: theme.customSpacing.padding.padding2,
    backgroundColor: theme.palette.background.textField,
  },
  preAssessmentAdmissionReasonTextArea: {
    width: "100%",
    border: "1px solid " + theme.palette.border.lightash,
    borderRadius: theme.customSpacing.borderRadius.radius3,
    padding: theme.customSpacing.padding.padding2,
    margin: "0.75rem 0",
    backgroundColor: theme.palette.background.textField,
  },
  examinationRadioLabelTypo: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.fontSize,
  },
  examinationFieldLabelTypo: {
    color: theme.palette.brandPrimary.dark,
    fontSize: theme.typography.fontSize,
  },
  otherSourceInformationInputField: {
    backgroundColor: theme.palette.background.textField,
  },
  generalExaminationScrollableWrapper: {
    height: "30rem",
    width: "100%",
    overflow: "hidden scroll",
  },
  timeLineItemWrapper: {
    "&:before, ::before": {
      content: "none",
    },
  },
  historyTimelineSeparator: {
    "& .MuiTimelineDot-root": {
      padding: `0.3rem`,
      backgroundColor: theme.palette.primary.dark,
      margin: "0 !important",
    },
    "& .MuiTimelineConnector-root": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  historyTimelineDotTypo: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.smallFontSize,
    fontWeight: theme.typography.fontWeight.weight6,
    margin: "0.06rem 0.125rem 0 0.06rem"
  },
  historyTimelineItemContent: {
    margin: "0rem 0 0.5rem 1rem",
  },
  nurseNotesTimelineItemContent: {
    margin: "0rem 0 0.5rem 1rem",
    padding: "0.5rem"
  },
  historyTimelineEditFieldWrapper: {
    padding: "0.375rem 0.375rem 0.375rem 1rem",
    border: "1px solid " + theme.palette.border.blue,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  historyTimelineHeaderWrapper: {
    padding: "0 1rem",
  },
  nurseNotesEditorWrapper: {
    padding: "1rem 1rem 0",
  },
  nurseNotesSaveBtnWrapper: {
    padding: "0.5rem",
  },
  allergyCheckFilerWrapper: {
    margin: "0 0.5rem 0.5rem 0",
    flexGrow: 1,
  },
  examinationTopRightActionWrapper: {
    width: "4rem",
  },
  preAssessmentAllergiesWrapper: {
    background: theme.palette.primary.tooLiter,
    width: "100%",
  },
  searchAllergiesFieldWrapper: {
    background: theme.palette.brandPrimary.contrastText,
    position: "relative",
    border: `1px solid ${theme.palette.primary.lighter}`,
    borderRadius: theme.shape.borderRadius,
    width: "100%",
  },
  searchFieldSearchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.brandPrimary.dark,
    zIndex: "1",
  },
  searchFieldSelectFormControl: {
    paddingLeft: "3.2rem",
    width: "100%",
    zIndex: "1",
  },
  allergiesTypeSelect: {
    "&:before, &:after, &.MuiInput-underline:hover:not(.Mui-disabled):before, &.MuiInput-underline.Mui-disabled:before":
    {
      border: "none",
    },
  },
  allergiesAutoCompleteField: {
    width: "100%",
    // height: "2rem",
    "& .MuiAutocomplete-endAdornment": {
      display: "none",
    },
    "& .MuiInputBase-input": {
      height: "2rem",
    },
    "& .MuiOutlinedInput-notchedOutline, :hover .MuiOutlinedInput-notchedOutline, .Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      border: "none",
      borderRadius: 0,
      borderLeft: `1px solid ${theme.palette.primary.lighter}`,
    },
  },
  noAllergiesCheckboxGroupWrapper: {
    "& .MuiFormGroup-root": {
      height: "100%",
    },
  },
  noAllergiesCheckboxWrapper: {
    height: "inherit",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.lighter}`,
    borderRadius: "3px",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  noAllergiesFormControlLabel: {
    margin: "0 !important",
    color: theme.palette.primary.dark,
  },
  textGrey: {
    color: theme.palette.grey.light,
    lineHeight: "0.875rem",
  },
  textGreen: {
    color: theme.palette.peacockBlue.dark,
  },
  textRed: {
    color: theme.palette.reds.dark,
  },
  textBlue: {
    color: theme.palette.brandPrimary.dark,
  },
  textPurple: {
    color: theme.palette.purple.dark,
  },
  allergyAccordion: {
    marginBottom: "30px",
    boxShadow: "0 0px 0px rgba(0,0,0,0)",
    border: "1px solid rgba(150, 195, 227, 0.3)",
    borderRadius: "5px !important",
    "&::before": {
      content: "none !important",
    },
  },
  allergyAccordionTitle: {
    backgroundColor: `${theme.palette.primary.liter} !important`,
    padding: `10px`,
  },
  allergySelectSmall: {
    padding: 10,
    backgroundColor: theme.palette.common.white,
    width: "8rem !important",
  },
  noPadding: {
    padding: "0 !important",
  },
  allergyReactionBlockWrapper: {
    display: "block !important",
  },
  allergyGridBorder: {
    borderColor: "rgba(150, 195, 227, 0.3)",
  },
  allergyReactionBlock: {
    padding: "0.8rem",
  },
  singleReactionBlock: {
    marginTop: "0.3rem",
    marginBottom: "0.3rem",
  },
  yellowLeftBorder: {
    position: "relative",
    paddingLeft: 35,
    "&:before": {
      content: "''",
      display: "inline-block",
      position: "absolute",
      left: 20,
      width: 4,
      height: "100%",
      backgroundColor: theme.palette.goldenYellow.dark,
      borderRadius: 5,
    },
  },
  greenLeftBorder: {
    position: "relative",
    paddingLeft: 35,
    "&:before": {
      content: "''",
      display: "inline-block",
      position: "absolute",
      left: 20,
      width: 4,
      height: "100%",
      backgroundColor: theme.palette.peacockBlue.dark,
      borderRadius: 5,
    },
  },
  redLeftBorder: {
    position: "relative",
    paddingLeft: 35,
    "&:before": {
      content: "''",
      display: "inline-block",
      position: "absolute",
      left: 20,
      width: 4,
      height: "100%",
      backgroundColor: theme.palette.reds.dark,
      borderRadius: 5,
    },
  },
  greyLeftBorder: {
    position: "relative",
    paddingLeft: 35,
    "&:before": {
      content: "''",
      display: "inline-block",
      position: "absolute",
      left: 20,
      width: 4,
      height: "100%",
      backgroundColor: theme.palette.grey.main,
      borderRadius: 5,
    },
  },
  allergiesSearchMainWrapper: {
    padding: "0.5rem",
  },
  allergiesFilterMainWrapper: {
    padding: "0.5rem",
  },
  allergyTypeGroupWrapper: {
    position: "sticky",
    top: "-0.5rem",
    background: theme.palette.brandPrimary.contrastText,
  },
  allergyTypeGroupTypo: {
    fontSize: theme.typography.smallFontSize,
    fontWeight: theme.typography.fontWeight.weight5,
    color: theme.palette.brandPrimary.dark,
    padding: "0.5rem",
  },
  allergyOptionsWrapper: {
    "& li": {
      width: "100%",
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight.weight3,
      color: theme.palette.brandPrimary.dark,
    },
  },
  stickyTableFirstColumnHeader: {
    position: "sticky",
    left: 0,
    zIndex: 1,
    backgroundColor: theme.palette.brandPrimary.contrastText
  },
  stickyTableFirstColumnContent: {
    position: "sticky",
    left: 0,
    zIndex: 1,
    backgroundColor: theme.palette.brandPrimary.contrastText
  },
  stickyTableSecondColumnHeader: {
    position: "sticky",
    left: "4.25rem",
    zIndex: 1,
    backgroundColor: theme.palette.brandPrimary.contrastText
  },
  stickyTableSecondColumnContent: {
    position: "sticky",
    left: "4.25rem",
    zIndex: 1,
    backgroundColor: theme.palette.brandPrimary.contrastText
  },
  stickyAppointmentTableActionHeader: {
    position: "sticky",
    right: 0,
    zIndex: 1,
    backgroundColor: theme.palette.brandPrimary.contrastText
  },
  stickyAppointmentTableActionContent: {
    position: "sticky",
    right: 0,
    zIndex: 1,
    backgroundColor: theme.palette.brandPrimary.contrastText
  },
  vitalsDateTypeToggleCalendar: {
    width: "1.25rem !important",
    height: "1.25rem !important",
  },
  vitalsDateTypeToggleBtn: {
    border: "0.125rem solid " + theme.palette.primary.lighter + " !important",
  },
  vitalsDateTypeToggleBtnTypo: {
    textTransform: "capitalize",
    color: theme.palette.brandPrimary.dark,
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.smallFontSize,
  },
  vitalsRangePickerField: {
    marginTop: "0",
    marginBottom: "0",
    minWidth: "max-content",
    "& .MuiOutlinedInput-notchedOutline": {
      border: `0.125rem solid ${theme.palette.primary.lighter} !important`,
    },
  },
  addNewPreAssessmentVitalBtn: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
    padding: "0.125rem"
  },
  vitalsActionWrapper: {
    height: "fit-content"
  },
  vitalsAddModalWrapper: {
    padding: "0 !important",
    overflow: "hidden"
  },
  addProblemInputLabelTypo: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  problemListStatusSelect: {
    width: "fit-content"
  },
  problemListFilterFormControl: {
    width: "fit-content",
    height: "fit-content",
    flexGrow: "inherit",
  },
  problemListFilterFormGroup: {
    width: "fit-content",
    padding: "0 0.5rem 0 0",
    flexDirection: "row !important"
  },
  problemListCheckFormControlLabel: {
    margin: "0 !important"
  },
  assessmentTabBtnTypo: {
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight.weight4
  },
  assessmentTypeTabBtn: {
    width: "fit-content",
    padding: "0.5rem"
  },
  assessmentTabBtnWrapper: {
    width: "100%",
    padding: "0.5rem"
  },
  preAssessmentIndicatorSliderWrapper: {

  },
  preAssessmentNoThumbSlider: {
    "& .MuiSlider-thumb ": {
      display: "none"
    }
  },
  assessmentDataTableWrapper: {
    padding: "1rem"
  },
  assessmentDataNotFoundTypo: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.reds.dark
  },
  assessmentRadioLabelTypo: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight.weight4
  },
  assessmentTotalNumTypo: {
    border: "1px solid" + theme.palette.border.lightash,
    borderRadius: theme.customSpacing.borderRadius.radius3,
    color: theme.palette.tagColorsFont.lighter,
    fontWeight: theme.typography.fontWeight.weight5,
    fontSize: theme.typography.smallFontSize,
    padding: "0.5rem",
    backgroundColor: theme.palette.genderColorMain.unknownBg
  },
  riskAssessmentRadioLabelTypo: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight.weight4
  },
  assessmentExaminationNameTypo: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.grey.light
  },
  assessmentExaminationSubTypeNameTypo: {
    fontSize: theme.typography.smallFontSize,
    color: theme.palette.grey.light,
    fontWeight: theme.typography.fontWeight.weight2
  },
  assessmentDateTypo: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.grey.light
  },
  assessmentTimeTypo: {
    fontSize: theme.typography.smallFontSize,
    color: theme.palette.grey.light,
    fontWeight: theme.typography.fontWeight.weight2
  },
  tableActionPointer: {
    cursor: "pointer"
  },
  historyDetailDateTypo: {
    color: theme.palette.grey.light,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight.weight4,
    padding: "0.5rem 0.5rem 0.5rem 0"

  },
  historyDetailTimeTypo: {
    color: theme.palette.grey.light,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight.weight4,
    padding: "0.5rem"
  },
  historyDetailPersonNameTypo: {
    color: theme.palette.grey.light,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight.weight5,
    padding: "0.5rem"
  },
  preAssessmentScheduledTime: {
    backgroundColor: "transparent !important"
  },
  problemListWrapper: {
    padding: theme.customSpacing.padding.padding2
  },
  problemListDetailsWrapper: {
    padding: theme.customSpacing.padding.padding2
  },
  problemListCardHeader: {
    backgroundColor: theme.palette.lightBlue.dark,
    color: theme.palette.brandPrimary.dark,
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.h6.fontSize,
    padding: "0 1rem",
    height: "3rem"
  },
  addProblemActionsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "1.125rem 0 0 0"
  },
  problemNANDACodeInfoIcon: {
    paddingLeft: theme.customSpacing.padding.padding1,
    cursor: "help"
  },
  nandaCodeDescriptionWrapper: {
    border: "none",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  nandaCodeDescriptionLabel: {
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  problemNANDACodeDescriptionChipTooltipText: {
    fontSize: theme.typography.fontSize,
  },
  nandaCodeDescriptionTableContent: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: "12rem",
  },
  vitalsTableHeaderTitleWrapper: {
    height: "5.125rem"
  },
  vitalsTableHeaderDetailWrapper: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "0.45rem"
  },
  vitalsTableCollectedDateTypo: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.brandPrimary.dark,
  },
  vitalsTableCollectedTimeTypo: {
    fontSize: theme.typography.fontSize13,
    color: theme.palette.brandPrimary.dark,
    fontWeight: theme.typography.fontWeight.weight4
  },
  vitalsTableCollectedByMaleTypo: {
    color: theme.palette.genderColor.maleColor,
    fontSize: theme.typography.smallFontSize
  },
  vitalsTableCollectedByFemaleTypo: {
    color: theme.palette.genderColor.femaleColor,
    fontSize: theme.typography.smallFontSize
  },
  vitalsTableCollectedByUnknownTypo: {
    color: theme.palette.genderColor.unknownGenderColor,
    fontSize: theme.typography.smallFontSize
  },
  preAssessmentVitalsTableWrapper: {
    overflow: "scroll",
    display: "flex",
    padding: "0 !important"
  },
  preAssessmentVitalsChartWrapper: {
    overflow: "scroll",
    display: "flex",
    padding: "0 !important",
  },
  preAssessmentVitalsTableValueWrapper: {
    padding: theme.customSpacing.padding.padding2 + "px !important",
    height: "3.75rem !important",
    alignItems: "center"
  },
  notSeenTag: {
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.smallFontSize,
    color: theme.palette.lightGrey.dark,
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.lightGrey.liter,
    //  backgroundColor: theme.palette.reds.tooLiter,
    height: "1.6rem",
    padding: "0.3rem 1rem 0.3rem 1rem",
    borderRadius: "16px",
    width: "max-content"
  },
  notSeenTypo: {
    color: theme.palette.lightGrey.dark,

  },
  vitalsTableHeaderColumnTitleWrapper: {
    minHeight: "5.125rem !important"
  },
  addVitalsCollectedDateWrapper: {
    margin: "1rem 0",
    padding: "0 0.25rem 0 6rem !important"
  },
  assessmentSummarySlider: {
    width: "90%",
  },
  summaryAssessmentSliderArrow: {
    backgroundColor: "transparent !important",
    top: "50% !important",
    '&::before': {
      content: "none !important"
    },
  },
  assessmentSummaryTag: {
    backgroundColor: theme.palette.tagColorsFont.lighter,
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeight.weight5,
    borderRadius: theme.customSpacing.borderRadius.radius3,
    padding: "0.125rem 0.125rem",
  },
  assessmentSummaryTagValue: {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.tagColorsFont.lighter,
    borderRadius: theme.customSpacing.borderRadius.radius3,
    padding: "0.25rem",

  },
  assessmentSummaryChipWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: `${theme.customSpacing.padding.padding1}px  0.125rem`,
    //tags
    "& .belowLowSeverityTag": {
      backgroundColor: theme.palette.tagColorsFont.contrastText,
      color: theme.palette.primary.contrastText,
    },
    "& .lowSeverityTag": {
      backgroundColor: theme.palette.tagColorsFont.tooLiter,
      color: theme.palette.primary.contrastText,
    },
    "& .normalSeverityTag": {
      backgroundColor: theme.palette.tagColorsFont.lighter,
      color: theme.palette.primary.contrastText,
    },
    "& .mediumSeverityTag": {
      backgroundColor: theme.palette.tagColorsFont.lighter,
      color: theme.palette.primary.contrastText,
    },
    "& .highSeverityTag": {
      backgroundColor: theme.palette.tagColorsFont.main,
      color: theme.palette.primary.contrastText,
    },
    "& .criticalSeverityTag": {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.primary.contrastText,
    },
    //values
    "& .belowLowSeverityValue": {
      color: theme.palette.tagColorsFont.contrastText,
      backgroundColor: theme.palette.primary.contrastText,
    },
    "& .lowSeverityValue": {
      color: theme.palette.tagColorsFont.tooLiter,
      backgroundColor: theme.palette.primary.contrastText,
    },
    "& .normalSeverityValue": {
      color: theme.palette.tagColorsFont.lighter,
      backgroundColor: theme.palette.primary.contrastText,
    },
    "& .mediumSeverityValue": {
      color: theme.palette.tagColorsFont.lighter,
      backgroundColor: theme.palette.primary.contrastText,
    },
    "& .highSeverityValue": {
      color: theme.palette.tagColorsFont.main,
      backgroundColor: theme.palette.primary.contrastText,
    },
    "& .criticalSeverityValue": {
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.primary.contrastText,
    }
  },
  assessmentSummaryChipTypo: {
    fontSize: theme.typography.smallFontSize10,
    fontWeight: theme.typography.fontWeight.weight5,
    padding: "0 0.25rem",
    textAlign: "center"
  },
  assessmentSummaryPagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.customSpacing.padding.padding2
  },
  assessmentSummarySliderWrapper: {
    padding: "0 0.25rem 0 1.25rem",
    overflow: "scroll"
  },
  problemListSummaryDetailCardWrapper: {
    padding: "0.75rem"
  },
  nurseNotesTitleTypo: {
    margin: "0.5rem 1rem",
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight.weight5,
    color: theme.palette.brandPrimary.dark
  },
  nurseNotesDetailWrapper: {

  },
  problemListPatientConditionLabel: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.fontSize
  },
  nurseNotesSummaryDetailCard: {
    margin: "1.25rem",
    width: "100%",
    "& .MuiCardContent-root": {
      padding: "0.5rem !important"
    }
  },
  problemListSummaryDetailCard: {
    margin: "0.5rem",
    width: "100%",
    "& .MuiCardContent-root": {
      padding: "0.5rem !important"
    }
  },
  notSeenActionIcon: {
    scale: 1.5
  },
  summaryVitalsTableWrapper: {
    overflow: "scroll",
    display: "flex",
    minWidth: "11vw",
    padding: "0 !important"
  },
  regularRhythmChip: {
    color: theme.palette.tagColorsFont.tooLighter,
    border: "1px solid " + theme.palette.tagColorsFont.tooLighter,
    background: "transparent",
    fontSize: theme.typography.fontSize,
    borderRadius: theme.customSpacing.borderRadius.radius3,
    height: "1.25rem",
    width: "1.25rem",
    "& .MuiChip-label": {
      paddingInline: 0 + " !important"
    }
  },
  irregularRhythmChip: {
    color: theme.palette.tagColorsFont.lighter,
    border: "1px solid " + theme.palette.tagColorsFont.lighter,
    background: "transparent",
    fontSize: theme.typography.fontSize,
    borderRadius: theme.customSpacing.borderRadius.radius3,
    height: "1.25rem",
    width: "1.25rem",
    "& .MuiChip-label": {
      paddingInline: 0 + " !important"
    }
  },
  dysrhythmiaRhythmChip: {
    color: theme.palette.tagColorsFont.main,
    border: "1px solid " + theme.palette.tagColorsFont.main,
    background: "transparent",
    fontSize: theme.typography.fontSize,
    borderRadius: theme.customSpacing.borderRadius.radius3,
    height: "1.25rem",
    width: "1.25rem",
    "& .MuiChip-label": {
      paddingInline: 0 + " !important"
    }
  },
  summaryProblemListProblemTypo: {
    fontSize: theme.typography.smallFontSize,
    fontWeight: theme.typography.fontWeight.weight5,
    color: theme.palette.primary.dark
  },
  problemTagWrapper: {
    height: "1.25rem !important",
    padding: "0.25rem !important",
    fontSize: `${theme.typography.smallFontSize} !important`
  },
  summaryCollectDateTypo: {
    fontSize: theme.typography.smallFontSize,
    color: theme.palette.brandPrimary.dark
  },
  summaryCollectTimeTypo: {
    fontSize: theme.typography.smallFontSize,
    color: theme.palette.brandPrimary.dark,
    fontWeight: theme.typography.fontWeight.weight4
  },
  summaryNANDACodeDescriptionTypo: {
    fontSize: theme.typography.smallFontSize,
    color: theme.palette.otherColors.main,
  },
  summaryProblemRemarkTypo: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.grey.light,
    margin: "0.25rem"
  },
  resolvedLabelTypo: {
    color: theme.palette.tagColorsFont.tooLighter,
    fontWeight: theme.typography.fontWeight.weight4
  },
  unresolvedLabelTypo: {
    color: theme.palette.tagColorsFont.main,
    fontWeight: theme.typography.fontWeight.weight4
  },
  allLabelTypo: {
    color: theme.palette.grey.liter,
    fontWeight: theme.typography.fontWeight.weight4
  },
  problemListTableWrapper: {
    height: "max-content"
  },
  summaryHistoryOfComplaintPreviewEditorWrapper: {
    // maxWidth: "13.5vw"
  },
  summaryHistoryDetailTypeTypo: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.smallFontSize
  },
  summaryHistoryDetailTypo: {
    color: theme.palette.lightGray.dark,
    fontSize: theme.typography.smallFontSize,
    marginInline: theme.customSpacing.padding.padding2
  },
  summaryHistoryDetailWrapper: {
    margin: `0.175rem 1.5rem`
  },
  allergyGreenTag: {
    border: "1px solid" + theme.palette.tagColorsFont.liter,
    color: theme.palette.tagColorsFont.liter,
    borderRadius: "1rem",
    height: "1.25rem",
    margin: "0.125rem"
  },
  allergyBlueTag: {
    border: "1px solid" + theme.palette.tagColorsFont.contrastText,
    color: theme.palette.tagColorsFont.contrastText,
    borderRadius: "1rem",
    height: "1.25rem",
    margin: "0.125rem"
  },
  allergyDarkBlueTag: {
    border: "1px solid" + theme.palette.tagColorsFont.contrastText,
    color: theme.palette.tagColorsFont.contrastText,
    borderRadius: "1rem",
    height: "1.25rem",
    margin: "0.125rem"
  },
  allergyRedTag: {
    border: "1px solid" + theme.palette.tagColorsFont.main,
    color: theme.palette.tagColorsFont.main,
    borderRadius: "1rem",
    height: "1.25rem",
    margin: "0.125rem"
  },
  allergyPurpleTag: {
    border: "1px solid" + theme.palette.tagColorsFont.light,
    color: theme.palette.tagColorsFont.light,
    borderRadius: "1rem",
    height: "1.25rem",
    margin: "0.125rem"
  },
  allergyYellowTag: {
    border: "1px solid" + theme.palette.tagColorsFont.lighter,
    color: theme.palette.tagColorsFont.lighter,
    borderRadius: "1rem",
    height: "1.25rem",
    margin: "0.125rem"
  },
  allergyOrangeTag: {
    border: "1px solid" + theme.palette.tagColorsFont.tooLighter,
    color: theme.palette.tagColorsFont.lighter,
    borderRadius: "1rem",
    height: "1.25rem",
    margin: "0.125rem"
  },
  allergyOtherTag: {
    border: "1px solid" + theme.palette.grey.main,
    color: theme.palette.lightGray.dark,
    borderRadius: "1rem",
    height: "1.25rem",
    margin: "0.125rem"
  },
  summaryAssessmentTypeTitleTypo: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.smallFontSize,
    margin: "0 1.25rem",
    fontWeight: theme.typography.fontWeight.weight4
  },
  summaryAllergyTag: {
    display: "flex !important",
    alignItems: "center",
    textAlign: "center",
    fontSize: theme.typography.smallFontSize
  },
  summaryAllergyTagWrapper: {
    padding: "0.125rem !important",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  complaintSaveToFavoriteBtn: {
    margin: "0.5rem"
  },
  historyTimelineHeaderTypo: {
    fontWeight: theme.typography.fontWeight.weight5,
    color: theme.palette.primary.dark,
    fontSize: theme.typography.fontSize
  },
  editorInputClass: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: theme.palette.background.textField
    }
  },
  summaryComplaintTypo: {
    fontSize: theme.typography.smallFontSize,
    color: theme.palette.grey.light
  },
  dateRangeInputFieldAppointments: {
    textAlignLast: 'center',
    margin: `0 0 !important`,
    backgroundColor: theme.palette.background.textField,
    borderRadius: '0.25rem',
    '& .MuiOutlinedInput-root': {
      border: `none`
    },

    '& .MuiSelect-outlined.MuiSelect-outlined': {
      color: theme.palette.brandPrimary.dark,
      fontSize: theme.typography.fontSize + 'px',
      fontWeight: theme.typography.fontWeight.weight4
    },

    '& .MuiInputBase-input': {
      color: theme.palette.brandPrimary.dark,
      fontSize: theme.typography.fontSize + 'px',
      fontWeight: theme.typography.fontWeight.weight4,
      cursor: 'pointer',
      minWidth: "12rem"
    }
  },
  preAssessmentVitalsTableValueTitleWrapper: {
    padding: theme.customSpacing.padding.padding2 + "px 0 0 1.25rem !important",
    height: "3.75rem !important",
    alignItems: "center"
  },
  vitalsTitleWrapper: {
    width: "4.75rem !important"
  },
  vitalsDataWrapper: {
    overflow: "scroll"
  },
  patientImageWrapper: {
    minHeight: "7rem"
  },
  preAssessmentBannerScoreSectionWrapper: {
    minHeight: "3rem"
  },
  patientBannerAvatarWrapper: {
    width: "7rem",
    height: "100%"
  },
  historyItemOldAndNewConnectorWrapper: {
    padding: "4rem 0 2rem 0",
    maxWidth: "2rem"
  },
  historyItemOldAndNewConnector: {
    border: "1px solid " + theme.palette.border.blue,
    borderWidth: "1px 0 1px 1px",
    borderRadius: `${theme.customSpacing.borderRadius.radius3}px 0 0 ${theme.customSpacing.borderRadius.radius3}px`,
    width: "100%",
    height: "100%"
  },
  preAssessmentOldHistoryCard: {
    backgroundColor: theme.palette.disabledColors.bgColor,
    border: "1px solid " + theme.palette.border.blue,
    borderRadius: theme.customSpacing.borderRadius.radius3
  },
  preAssessmentOldHistoryCardContent: {
    backgroundColor: theme.palette.disabledColors.bgColor
  },
  oldHistoryHeaderWrapper: {
    margin: "1rem 0 0 0"
  },
  historyItemCreatedMaleTypo: {
    color: theme.palette.genderColor.maleColor
  },
  historyItemCreatedFemaleTypo: {
    color: theme.palette.genderColor.femaleColor
  },
  historyDetailDivider: {
    margin: "0.25rem 0"
  },
  editedHistoryItemChip: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.tagColorsFont.tooLiter,
    fontSize: theme.typography.fontSize
  },
  innerTableCellChip: {
    display: 'initial',
  },
  arrivedBeforeAppointment: {
    color: theme.palette.darkGreen.dark,
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.fontSize,
    marginLeft: "0.8rem"
  },
  arrivedAfterAppointment: {
    color: theme.palette.reds.dark,
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.fontSize,
    marginLeft: "0.8rem"
  },
  popupSubHeaders: {
    fontSize: theme.typography.h6,
    fontWeight: 500,
    color: theme.palette.primary.dark,
  },
  remarkGreyChip: {
    color: theme.palette.grey.dark,
    background: theme.palette.lightGrays.liter,
    marginRight: "0.5rem",
  },
  remarkRedChip: {
    color: theme.palette.doughnutCharts.orange,
    background: theme.palette.doughnutCharts.orange + "26",
    marginRight: "0.5rem",
  },
  popupText: {
    fontSize: theme.typography.h6,
    color: theme.palette.grey.liter,
  },
  background: {
    background: theme.palette.primary.tooLiter,
  },

  '@keyframes blinker': {
    from: { opacity: 1 },
    to: { opacity: 0 }
  },

  allergiesContainer: {
    alignItems: "center",
    paddingLeft: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem"
  },
  customPopUpText: {
    fontSize: theme.typography.h6,
    color: theme.palette.tagColorsFont.main,
    animationName: '$blinker',
    animationDuration: '1000ms',
    // animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out'
  },
  popUpTextOtherAllergies: {
    fontSize: theme.typography.h6,
    color: theme.palette.tagColorsFont.main,
  },
  popupsubText: {
    fontSize: theme.typography.h6,
    color: theme.palette.reds.dark,
  },
  subjectivTab: {
    background: theme.palette.primary.contrastText,
  },
  avatarHeightWidth: {
    width: "4rem",
    height: "4rem",
    marginLeft: "1rem",
    marginBottom: "1rem"
  },
  modalHeaderStyle: {
    color: theme.palette.brandPrimary.dark,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight.weight4,
  },
  mrnDobBrandDark: {
    color: theme.palette.brandPrimary.dark,
  },
  mrnTopBar: {
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight.weight4,
  },
  dobTopBar: {
    fontSize: theme.typography.smallFontSize,
    fontWeight: theme.typography.fontWeight.weight4,
    marginLeft: "0.5rem",
  },
  dobTopBarIcon: {
    fontSize: theme.typography.smallFontSize,
    fontWeight: theme.typography.fontWeight.weight4,
    marginLeft: "1rem",
    height: "0.9rem",
  },
  chronicConditionsHeader: {
    color: theme.palette.brandPrimary.dark,
    marginLeft: "1rem",
    fontSize: theme.typography.smallFontSize,
  },
  chronicConditionsData: {
    color: theme.palette.grey.light,
    fontSize: theme.typography.smallFontSize,
  },
  allergiesHeader: {
    fontSize: theme.typography.smallFontSize,
    color: theme.palette.reds.dark,
    marginTop: "1rem",
  },
  specialRemarksGeneralHeader: {
    color: theme.palette.brandPrimary.dark,
    fontSize: theme.typography.smallFontSize,
    fontWeight: theme.typography.fontWeight.weight4,
  },
  notApplicableStyle: {
    fontSize: theme.typography.smallFontSize,
  },
  generalMessage: {
    color: theme.palette.tagColorsFont.dark,
    fontSize: theme.typography.smallFontSize,
    fontWeight: theme.typography.fontWeight.weight3,
  },
  emptyRiskFactorsText: {
    color: theme.palette.reds.dark,
    fontSize: "16px",
    margin: "1.5rem 1rem",
    fontWeight: "500",
    padding: "1rem",
  },
  drugAllergiesChipSevere: {
    borderColor: theme.palette.reds.dark,
    borderWidth: "2px",
    borderStyle: "solid",
    background: theme.palette.background.textField,
    color: theme.palette.reds.dark,
    animationName: '$blinker',
    animationDuration: '1000ms',
    // animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    background: theme.palette.background.textField,
    marginTop: "1rem",
    fontSize: theme.typography.smallFontSize10,
    fontWeight: theme.typography.fontWeight.weight5,
  },
  drugAllergiesChipModerate: {
    borderColor: theme.palette.tagColorsFont.liter,
    borderWidth: "2px",
    borderStyle: "solid",
    background: theme.palette.background.textField,
    color: theme.palette.reds.dark,
    background: theme.palette.background.textField,
    marginTop: "1rem",
    fontSize: theme.typography.smallFontSize10,
    fontWeight: theme.typography.fontWeight.weight5,
    animationName: '$blinker',
    animationDuration: '1000ms',
    // animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
  drugAllergiesChipMild: {
    borderColor: theme.palette.goldenYellow.dark,
    borderWidth: "2px",
    borderStyle: "solid",
    background: theme.palette.background.textField,
    color: theme.palette.reds.dark,
    background: theme.palette.background.textField,
    marginTop: "1rem",
    fontSize: theme.typography.smallFontSize10,
    fontWeight: theme.typography.fontWeight.weight5,
    animationName: '$blinker',
    animationDuration: '1000ms',
    // animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
  drugAllergiesChipNone: {
    borderColor: theme.palette.otherColors.liter,
    borderWidth: "2px",
    borderStyle: "solid",
    background: theme.palette.background.textField,
    color: theme.palette.reds.dark,
    background: theme.palette.background.textField,
    marginTop: "1rem",
    fontSize: theme.typography.smallFontSize10,
    fontWeight: theme.typography.fontWeight.weight5,
    animationName: '$blinker',
    animationDuration: '1000ms',
    // animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
  foodAllergiesChipSevere: {
    color: theme.palette.lightGreen.dark,
    borderColor: theme.palette.reds.dark,
    borderWidth: "2px",
    borderStyle: "solid",
    background: theme.palette.background.textField,
    background: theme.palette.background.textField,
    marginTop: "1rem",
    fontSize: theme.typography.smallFontSize10,
    fontWeight: theme.typography.fontWeight.weight5,
  },
  foodAllergiesChipModerate: {
    borderColor: theme.palette.tagColorsFont.liter,
    borderWidth: "2px",
    borderStyle: "solid",
    background: theme.palette.background.textField,
    color: theme.palette.lightGreen.dark,
    background: theme.palette.background.textField,
    marginTop: "1rem",
    fontSize: theme.typography.smallFontSize10,
    fontWeight: theme.typography.fontWeight.weight5,
  },
  foodAllergiesChipMild: {
    borderColor: theme.palette.goldenYellow.dark,
    borderWidth: "2px",
    borderStyle: "solid",
    background: theme.palette.background.textField,
    color: theme.palette.lightGreen.dark,
    background: theme.palette.background.textField,
    marginTop: "1rem",
    fontSize: theme.typography.smallFontSize10,
    fontWeight: theme.typography.fontWeight.weight5,
  },
  foodAllergiesChipNone: {
    borderColor: theme.palette.otherColors.liter,
    borderWidth: "2px",
    borderStyle: "solid",
    background: theme.palette.background.textField,
    color: theme.palette.lightGreen.dark,
    background: theme.palette.background.textField,
    marginTop: "1rem",
    fontSize: theme.typography.smallFontSize10,
    fontWeight: theme.typography.fontWeight.weight5,
  },
  otherAllergiesChipSevere: {
    color: theme.palette.goldenYellow.dark,
    borderColor: theme.palette.reds.dark,
    borderWidth: "2px",
    borderStyle: "solid",
    background: theme.palette.background.textField,
    background: theme.palette.background.textField,
    marginTop: "1rem",
    fontSize: theme.typography.smallFontSize10,
    fontWeight: theme.typography.fontWeight.weight5,
  },
  otherAllergiesChipModerate: {
    borderColor: theme.palette.tagColorsFont.liter,
    borderWidth: "2px",
    borderStyle: "solid",
    background: theme.palette.background.textField,
    color: theme.palette.goldenYellow.dark,
    background: theme.palette.background.textField,
    marginTop: "1rem",
    fontSize: theme.typography.smallFontSize10,
    fontWeight: theme.typography.fontWeight.weight5,
  },
  otherAllergiesChipMild: {
    borderColor: theme.palette.goldenYellow.dark,
    borderWidth: "2px",
    borderStyle: "solid",
    background: theme.palette.background.textField,
    color: theme.palette.goldenYellow.dark,
    background: theme.palette.background.textField,
    marginTop: "1rem",
    fontSize: theme.typography.smallFontSize10,
    fontWeight: theme.typography.fontWeight.weight5,
  },
  otherAllergiesChipNone: {
    borderColor: theme.palette.otherColors.liter,
    borderWidth: "2px",
    borderStyle: "solid",
    background: theme.palette.background.textField,
    color: theme.palette.goldenYellow.dark,
    background: theme.palette.background.textField,
    marginTop: "1rem",
    fontSize: theme.typography.smallFontSize10,
    fontWeight: theme.typography.fontWeight.weight5,
  },
  divider: {
    width: "100%",
    backgroundColor: theme.palette.lightBlue.light + " !important",
  },
  acknowledgeStyles: {
    paddingBottom: "1rem",
    paddingRight: "1.125rem",
  },
  generalMessagePadding: {
    paddingLeft: "1rem",
  },
  generalMessageMargin: {
    marginLeft: "1rem 0",
  },
  pageLoadSpinner: {
    position: 'fixed',
    zIndex: '9000',
    img: {
      width: '20%',
    },
    paddingRight: '5rem',
    top:"34%",
    left:"45%"
  },
  autoWidthClass: {
    width: "-webkit-fill-available !important",
    margin: "10px !important"
},
}));
