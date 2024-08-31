import { makeStyles } from "@material-ui/core/styles";


export const HospitalDeciderStyle = makeStyles((theme) => ({
  mainWrapperContainer: {
    marginRight: "1rem",
    marginLeft: "5.563rem",
    borderRadius: theme.customSpacing.borderRadius.radius3,
    [theme.breakpoints.down("xs")]: {
      marginLeft: "1rem"
    },
    position: 'relative'
  },
  mainWrapperSubContainer: {
    display: 'flex',
    minHeight: '65vh',
  },
  hospitalCardActionArea: {
    minWidth: '50ch',
    minHeight: '15ch'
  },
  deciderPageTitleTypo: {
    fontSize: '1.375rem',
    fontWeight: theme.typography.fontWeight.weight4,
    color: theme.palette.brandPrimary.dark,
    margin: '1.75rem 2rem' 
  },
  hospitalCardMainWrapper: {
    margin: '2rem'
  },
  hospitalIcon: {
    width: '5ch',
    height: '5ch'
  },
  hospitalCardBlue:{
    backgroundColor: theme.palette.tagColorsBg.contrastText,
    boxShadow: 'inset 0 0 0.075rem 0.075rem ' + theme.palette.blue.light,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  hospitalCardYellow:{
    backgroundColor: theme.palette.tagColorsBg.lighter,
    boxShadow: 'inset 0 0 0.075rem 0.075rem ' + theme.palette.tagColorsFont?.lighter,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  hospitalCardGreen:{
    backgroundColor: theme.palette.tagColorsBg.tooLighter,
    boxShadow: 'inset 0 0 0.075rem 0.075rem ' + theme.palette.lightGreen.dark,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  hospitalCardOrange:{
    backgroundColor: theme.palette.tagColorsBg.dark,
    boxShadow: 'inset 0 0 0.075rem 0.075rem ' + theme.palette.reds?.main,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  hospitalCardPurple:{
    backgroundColor: theme.palette.tagColorsBg.light,
    boxShadow: 'inset 0 0 0.075rem 0.075rem ' + theme.palette.doughnutCharts.purple,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  hospitalCardDarkBlue:{
    backgroundColor: theme.palette.blueChip.tooLiter,
    boxShadow: 'inset 0 0 0.075rem 0.075rem ' + theme.palette.blueChip.dark,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  hospitalNameTypo: {
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: '1.75rem'
  },
  hospitalCodeTypo: {
    color: theme.palette.lightGray.main,
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.fontSize
  },
  hospitalNameTypoBlue: {
    color: theme.palette.blue.light
  },
  hospitalNameTypoYellow: {
    color: theme.palette.tagColorsFont?.lighter
  },
  hospitalNameTypoGreen: {
    color: theme.palette.lightGreen.dark
  },
  hospitalNameTypoOrange: {
    color: theme.palette.reds?.main
  },
  hospitalNameTypoPurple: {
    color: theme.palette.doughnutCharts.purple
  },
  hospitalNameTypoDarkBlue:{
    color: theme.palette.blueChip.dark,
  },
  selectedHospitalActionButtonCard: {
    backgroundColor: theme.palette.otherColors.contrastText,
    color: theme.palette.primary.contrastText,
    boxShadow: 'none'
  },
  hospitalSelectionCardContent: {
    borderRadius: theme.customSpacing.borderRadius.radius3
  },
  selectionProceedBtn: {
    margin: '2rem'
  },
  pageLoadSpinner: {
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    height:'100%',
    zIndex:'9000',
    img: {
        width:'20%',
    }
  },
  deciderActionsWrapper: {
    display: 'flex'
  },
  selectedHospitalCardIcon: {
    '& path': {
      fill: theme.palette.primary.contrastText + ' !important'
    }
  },
  selectedHospitalNameTypo: {
    color: theme.palette.primary.contrastText + ' !important'
  },
  selectedHospitalCodeTypo: {
    color: theme.palette.otherColors.light + ' !important'
  },
}));
