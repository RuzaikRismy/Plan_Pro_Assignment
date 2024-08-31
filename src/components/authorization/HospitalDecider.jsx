import React, { useState, useEffect } from 'react';
import { Button, Card, CardActionArea, CardContent, Grid, Paper, SvgIcon, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
//styles
import { useStyles } from '../../assets/styles/styles';
import { HospitalDeciderStyle } from './HospitalDeciderStyles';
import { getLabel } from '../../utils/localization';
//icons and images
import { ReactComponent as HospitalsIcon } from '../../assets/images/icons/hospital.svg'
//redux actions
import { handleHospitalDeciderSelectHospital } from '../../actions/hospitalDeciderAction';

const HospitalSelectionCard = (props) => {
  const {
    commonClasses,
    hospitalDeciderClasses,
    selectedHospital,
    hospitalDetail,
    hospitalIndex,
    handleHospitalSelectionChange
  } = props;
  /**
  |--------------------------------------------------
  | Handle on click hospital
  |--------------------------------------------------
  */
  const handleOnClickHospital = (event) => {
    handleHospitalSelectionChange && handleHospitalSelectionChange(hospitalDetail)
  }

  
  const hospitalCardClasses = [
    hospitalDeciderClasses?.hospitalCardBlue,
    hospitalDeciderClasses?.hospitalCardGreen,
    hospitalDeciderClasses?.hospitalCardPurple,
    hospitalDeciderClasses?.hospitalCardYellow,
    hospitalDeciderClasses?.hospitalCardDarkBlue,
    hospitalDeciderClasses?.hospitalCardOrange,
  ]
  
  const hospitalNameTypoClasses = [
    hospitalDeciderClasses?.hospitalNameTypoBlue,
    hospitalDeciderClasses?.hospitalNameTypoGreen,
    hospitalDeciderClasses?.hospitalNameTypoPurple,
    hospitalDeciderClasses?.hospitalNameTypoYellow,
    hospitalDeciderClasses?.hospitalNameTypoDarkBlue,
    hospitalDeciderClasses?.hospitalNameTypoOrange,
  ]



  return (
    <Card id={'hospitalDetailCard-' + hospitalIndex} elevation={0}>
      <CardActionArea
        id={"hospitalDetailCardAction-" + hospitalIndex}
        className={classNames(
          hospitalDeciderClasses?.hospitalCardActionArea, 
          hospitalCardClasses?.[hospitalIndex%6], 
          (selectedHospital?.hospitalId === hospitalDetail?.hospitalId) && hospitalDeciderClasses?.selectedHospitalActionButtonCard          
        )}
        onClick={handleOnClickHospital}
      >
        <CardContent className={hospitalDeciderClasses?.hospitalSelectionCardContent}>
          <Grid container alignItems='center' justifyContent='flex-start' spacing={1}>
            <Grid item xs='auto'>
              <SvgIcon viewBox='0 0 25 25' component={HospitalsIcon} className={classNames(hospitalDeciderClasses?.hospitalIcon, (selectedHospital?.hospitalId === hospitalDetail?.hospitalId) && hospitalDeciderClasses?.selectedHospitalCardIcon )} />
            </Grid>
            <Grid item xs>
              <Grid container alignItems='center' justifyContent='flex-start'>
                <Grid item xs={12}>
                  <Typography
                    className={classNames(hospitalDeciderClasses?.hospitalNameTypo , hospitalNameTypoClasses?.[hospitalIndex%6], (selectedHospital?.hospitalId === hospitalDetail?.hospitalId) && hospitalDeciderClasses?.selectedHospitalNameTypo )}
                  >
                    {hospitalDetail?.hospitalName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classNames(hospitalDeciderClasses?.hospitalCodeTypo, (selectedHospital?.hospitalId === hospitalDetail?.hospitalId) && hospitalDeciderClasses?.selectedHospitalCodeTypo )}>
                    {hospitalDetail?.hospitalCode}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const HospitalDecider = (props) => {
  /**
  |--------------------------------------------------
  | Uses app theme
  |--------------------------------------------------
  */
  const commonClasses = useStyles();
  const hospitalDeciderClasses = HospitalDeciderStyle();
  /**
  |--------------------------------------------------
  | Uses router dom history
  |--------------------------------------------------
  */
  const history = useHistory();
  
  /**
  |--------------------------------------------------
  | Redux Integrations
  |--------------------------------------------------
  */
  const dispatch = useDispatch();
  //hospital decider data
  const hospitalDeciderData = useSelector((state) => state.hospitalDeciderReducer)

  const [hospitalsData, setHospitalsData] = useState({
    data: [],
    selectedHospital: null,
    isDataLoading: true
  })

  const [proceedToDashboard, setProceedToDashboard] = useState(false)
  /**
  |--------------------------------------------------
  | Handle Hospital selection change
  |--------------------------------------------------
  */
  const handleHospitalSelectionChange = (selectedHospital) => {
    handleSelectHospital(selectedHospital)
  }
  /**
  |--------------------------------------------------
  | Handle on click Proceed
  |--------------------------------------------------
  */
  const handleOnClickHospitalSelectionProceed = (event) => {
    setProceedToDashboard(true)
  }

  const handleSelectHospital = (hospitalData) => {
    if(hospitalData){
      dispatch(handleHospitalDeciderSelectHospital(hospitalData))
    }
  }
  /**
  |--------------------------------------------------
  | Logged In user's hospitals detail
  |--------------------------------------------------
  */
  const userDetail = localStorage.getItem('userDetail');
  /**
  |--------------------------------------------------
  | Effect on Hospital Decider selection
  |--------------------------------------------------
  */
  useEffect(()=>{
    setHospitalsData(prev=>({
      ...prev,
      selectedHospital: hospitalDeciderData?.selectedHospital || null
    }))
  },[hospitalDeciderData?.selectedHospital])
  /**
  |--------------------------------------------------
  | Effect on Mount
  |--------------------------------------------------
  */
  useEffect(()=>{
    let userHospitals = userDetail && JSON.parse(userDetail)?.hospitals;
    const userHospitalData = (Array.isArray(userHospitals) && userHospitals) || []
    if(userHospitalData && (hospitalsData?.data !== userHospitalData)){
      setHospitalsData(prev=>({
        ...prev, 
        data: userHospitalData, 
        isDataLoading: false
      }))
      let isSelectedHospitalAvailableForUser = userHospitalData.find(
        singleUserHospital => singleUserHospital?.hospitalId === hospitalDeciderData?.selectedHospital?.hospitalId
      )
      if(!isSelectedHospitalAvailableForUser){
        handleSelectHospital(userHospitalData?.[0])
      }
    }
  },[]);

  return (
    <Paper elevation={0} className={hospitalDeciderClasses?.mainWrapperContainer}>
      {
        proceedToDashboard && <Redirect to={{pathname: "/exotic"}}/>
      }
      { hospitalsData?.isDataLoading && (
          <Grid container className={hospitalDeciderClasses.pageLoadSpinner}>                    
              <img alt='loading..' src={require("../../assets/images/loadingsniperNew.gif")}></img>
          </Grid>)
      }
      <Grid item xs={12} className={hospitalDeciderClasses?.mainWrapperSubContainer}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container alignItems='center' justifyContent='flex-start' spacing={1}>
              <Grid item xs='auto'>
                <Typography className={hospitalDeciderClasses.deciderPageTitleTypo}>
                  {getLabel({ module: 'hospitalDecider', label: 'selectAHospital'})}
                </Typography>
              </Grid>
              <Grid item xs />
            </Grid>
          </Grid>
          <Grid item xs={12} className={hospitalDeciderClasses.hospitalCardMainWrapper}>
            <Grid container spacing={2} alignItems='center' justifyContent='flex-start'>
              {
                typeof hospitalsData?.data?.map === 'function' && hospitalsData.data.map(
                  (singleHospitalDetail, hospitalIndex) => {
                    return (
                      <Grid item xs='auto' key={hospitalIndex}>
                        <HospitalSelectionCard
                          commonClasses={commonClasses}
                          hospitalDeciderClasses={hospitalDeciderClasses}
                          selectedHospital={hospitalsData?.selectedHospital}
                          hospitalDetail={singleHospitalDetail}
                          hospitalIndex={hospitalIndex}
                          handleHospitalSelectionChange={handleHospitalSelectionChange}
                        />
                      </Grid>
                    )
                  }
                )
              }
            </Grid>
          </Grid>
          <Grid item xs={12} className={hospitalDeciderClasses?.deciderActionsWrapper}>
            <Grid container justifyContent='flex-end' alignItems='flex-end'>
              <Button
                className={classNames(commonClasses?.orangeMainBtn, hospitalDeciderClasses?.selectionProceedBtn)}
                id='hospitalSelectionProceedBtn'
                onClick={handleOnClickHospitalSelectionProceed}
              >
                {getLabel({ module: 'hospitalDecider', label: 'proceed'})}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default HospitalDecider