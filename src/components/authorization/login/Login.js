import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import { Button, TextField, Grid, LinearProgress, Paper, Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { http_Request } from '../../../utils/HTTP_Request';
import { API_URL } from '../../../shared/API_URLS';
import { loginStyles } from './LoginStyle';
import { useStyles } from '../../../assets/styles/styles';
import { getLabel } from '../../../utils/localization';
import PasswordRest from '../PasswordRest';

// import { handleHospitalDeciderSelectHospital } from '../../../actions/hospitalDeciderAction';

const NewLogin = (props) => {
    /**
    |--------------------------------------------------
    | Redux integrations
    |--------------------------------------------------
    */
    const dispatch = useDispatch();

    //All the states
    const [inputValues, setInputValues] = useState({ userName: '', password: '' })
    const [loginSucess, setLoginSucess] = useState({ isLoginSucess: false, showProgressBar: false, emptyErrorMessage: '' });
    const [values, setValues] = useState({ showPassword: true, passwordType: 'password' })
    const [language, setLanguage] = useState({ isArabic: false });
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [tokenDetail, setTokenDetail] = useState({});
    const [isHospitalSelection, setIsHospitalSelection] = useState(false);
    
    //Style import's
    const classes = loginStyles();
    const commonStyle = useStyles();

    // const currentPermissions = cloneDeep(localStorage.getItem("permissions"));

    useEffect(() => {
        handleComponentOnMount();
    }, []);

    const handleComponentOnMount = () => {
        setLoginSucess({ ...loginSucess, isLoginSucess: localStorage.getItem("jwtToken") ? true : false });
        localStorage.setItem("language", "en");
    }

    //for identifying user name or password changed and call authenticate without duplicates
    const isFieldPressedEnterRef = React.useRef();
    const isLoginDataChangeRef = React.useRef();

    const handleUserName = (e) => {
        let user = document.getElementById('userName')
        console.log("useruser",user)
        setInputValues({ ...inputValues, userName: e.target.value });
        handleKeyboardEnterFunction(user);
        isLoginDataChangeRef.current = true;
    }

    const handlePassword = (e) => {
        let pass = document.getElementById('password');
        console.log(pass,"passpass")
        setInputValues({ ...inputValues, password: e.target.value });
        handleKeyboardEnterFunction(pass);
        isLoginDataChangeRef.current = true;
    }

    const handleLanguage = (e) => {
        localStorage.setItem("language", e.target.id);
        if (e.target.id === "arb") {
            setLanguage({ ...language, isArabic: true });
        } else {
            setLanguage({ ...language, isArabic: false });
        }
    }
    //Listener for the key press enter
    const listener = function (event) {
        if (event.keyCode === 13  && isLoginDataChangeRef.current) {
            event.preventDefault();
            document.getElementById('loginButton').click();
            isFieldPressedEnterRef.current = true;
            isLoginDataChangeRef.current = false;
        }
    }
    //function attaching the event listener
    const handleKeyboardEnterFunction = (e) => {
        if(isFieldPressedEnterRef.current){
            isFieldPressedEnterRef.current = false;
        }
        e.addEventListener('keyup', listener)
    }

    const submitForm = () => {
        alert("Clicked");
        console.log("token", localStorage.getItem("jwtToken"));
        if (inputValues.userName && inputValues.password && !localStorage.getItem("jwtToken")) {
            setLoginSucess({ ...loginSucess, showProgressBar: true, emptyErrorMessage: '' });
            http_Request({
                url: API_URL.Login,
                method: 'POST',
                bodyData: {
                    "username": inputValues.userName,
                    "password": inputValues.password,
                    "deviceType": "WEB"
                }
            }, function (response) {
                console.log(response.data,"response.dataresponse.data")
                setTokenDetail(response.data.jwtToken);
                const decodeTokenDetail = jwt_decode(response.data.jwtToken);
                localStorage.setItem("userDetail", JSON.stringify(decodeTokenDetail));
                
                // set passwordReset modal show/hide
                setIsResetPassword(decodeTokenDetail.tempPassword === 1 ? true :  false);
                
                if(!decodeTokenDetail.tempPassword){
                    localStorage.setItem("jwtToken", response.data.jwtToken);
                    const permissionArray = decodeTokenDetail.privilege;
                    // define object of permissions
                    var permissionObject = {};
                    var permissionList = permissionArray.map((singlePermission) => {
                        permissionObject[singlePermission.authority] = true;
                        return(singlePermission.authority);
                    });
                    
                    localStorage.setItem("permissions", JSON.stringify(permissionList));
                    localStorage.setItem("permissionObject", JSON.stringify(permissionObject));

                    let appLanguage = localStorage.getItem("language");
                    if(!(appLanguage?.toString && appLanguage.toString())){
                        localStorage.setItem("language", language.isArabic? "arb" : "en")
                    }

                    const loginUserHospitals = (Array.isArray(decodeTokenDetail?.hospitals) && decodeTokenDetail?.hospitals) || [];

                    // hospital decider based on Multiple Hospital allocation to user
                    // hospital admin (enum (personType : 6)) is allocated to only one hospital within system
                    // super admin (enum(personType : 6)) will not have a particular selection of a hospital
                    if(loginUserHospitals?.length>1 && (decodeTokenDetail?.personType !== 6)){
                        setIsHospitalSelection(true);
                    }else{
                        // auto-select first hospital when one hospital is allocated for login user
                        // dispatch(handleHospitalDeciderSelectHospital(loginUserHospitals?.[0]))
                    }
                }
                setTimeout(() => {
                    setLoginSucess({ ...loginSucess, isLoginSucess: true, showProgressBar: false });
                }, 1000);

            }, function (error) {
                console.log("error", error);
                setLoginSucess({ ...inputValues, emptyErrorMessage: getLabel({ module: "Login", label: "Invalid User Name or Password !" }), showProgressBar: false });
            });
        }
        else if (inputValues.userName && !localStorage.getItem("jwtToken")) {
            setLoginSucess({ ...inputValues, emptyErrorMessage: getLabel({ module: "auth", label: "pleaseEnterPassword" }), showProgressBar: false });
        } else if (inputValues.password && !localStorage.getItem("jwtToken")){
            setLoginSucess({ ...inputValues, emptyErrorMessage: getLabel({ module: "auth", label: "pleaseEnterUsername" }), showProgressBar: false });
        } else if (!inputValues.userName && !inputValues.password) {
            setLoginSucess({ ...inputValues, emptyErrorMessage: getLabel({ module: "auth", label: "pleaseEnterUsernameAndPassword" }), showProgressBar: false });
        } else if(localStorage.getItem("jwtToken")){
            setLoginSucess({ ...inputValues, emptyErrorMessage: "A User is Already LoggedIn. Please Logout that First", showProgressBar: false });
        }
    }
    //field change
    React.useEffect(()=>{
        if(isFieldPressedEnterRef.current){
            let pass = document.getElementById('password');
            pass.removeEventListener("keyup", listener)
        }
    },[isFieldPressedEnterRef.current])
    //unmount cleanup
    React.useEffect(()=>{
        return () =>{
            let pass = document.getElementById('password');
            if(pass){
                pass.removeEventListener("keyup", listener);
            }
        }
    },[])

    return (
        <>
            { 
                !isHospitalSelection &&!isResetPassword && loginSucess.isLoginSucess && !props.location.state && 
                <Redirect to={{pathname: "/infirma"}}/>
            }
            { 
                !isHospitalSelection &&!isResetPassword && loginSucess.isLoginSucess && props.location.state && props.location.state.prevUrl && (localStorage.getItem("prevPermissions") === localStorage.getItem("permissions")) && 
                <Redirect to={{pathname: props.location.state.prevUrl}}/>
            }
            { 
                !isHospitalSelection &&!isResetPassword && loginSucess.isLoginSucess && props.location.state && props.location.state.prevUrl && (localStorage.getItem("prevPermissions") !== localStorage.getItem("permissions")) && 
                <Redirect to={{pathname: "/infirma"}}/>
            }

            {/* password resetting module */}
            {
                !isHospitalSelection && isResetPassword &&
                <PasswordRest
                    isPasswordResetModal = { isResetPassword }
                    tokenDetail = { tokenDetail }
                />
            }

            {/* hospital decider module */}
            {
                isHospitalSelection && !isResetPassword && loginSucess?.isLoginSucess  && (
                    <Redirect to={{pathname: '/infirma/hospitalDecider'}} />
                )
            }
            <Grid container spacing={0} alignItems="center" alignContent="center" justify="center" className={classes.outerDiv} dir={language.isArabic ? 'rtl' : 'ltr'}>
                {
                    !isResetPassword &&
                    <Grid container justify="center" alignItems="center" item xs={12} >
                        <div className={language.isArabic ? classes.outerPaperLeftArabic : classes.outerPaperLeft}>
                            <Paper className={language.isArabic ? classes.paperLeftArabic : classes.paperLeft}>
                                <Grid container justify="center" item xs={12} spacing={0}>
                                    <Grid >
                                        <Grid  >
                                            <Grid >
                                                {/* {
                                                    language.isArabic ?
                                                        <label className={classes.selectLanguage2} id='en' onClick={handleLanguage}>English</label>
                                                        :
                                                        <label className={classes.selectLanguage1} id='arb' onClick={handleLanguage}>عربى</label>
                                                } */}
                                            </Grid>
                                            <Grid container justify="center">
                                                <label className={classes.word1}>{getLabel({ module: "Login", label: "Welcome to" })}</label>
                                            </Grid>
                                        </Grid>
                                        <Grid container justify="center" >
                                            <label className={classes.word2}>InnoHealth</label>
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="center" item xs={12} spacing={0} >
                                        <TextField id="userName"
                                            label={getLabel({ module: "Login", label: "Username" })}
                                            variant="outlined"
                                            size='small'
                                            value={inputValues.userName}
                                            className={classes.userName}
                                            type={values.passwordType}
                                            onChange={handleUserName}
                                        />
                                        <Grid container justify="center" item xs={12}>
                                            <TextField id="password"
                                                label={getLabel({ module: "Login", label: "Password" })}
                                                variant="outlined"
                                                size='small'
                                                value={inputValues.password}
                                                className={classes.password}
                                                type={values.passwordType}
                                                onChange={handlePassword}
                                            />
                                            {
                                                values.showPassword ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={language.isArabic ? classes.eyeIconArabic : classes.eyeIcon} viewBox="0 0 16 16" onClick={(e) => { setValues({ ...values, showPassword: !values.showPassword, passwordType: 'text' }); }}   >
                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                    </svg>

                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={language.isArabic ? classes.eyeIconArabic : classes.eyeIcon} viewBox="0 0 16 16" onClick={(e) => { setValues({ ...values, showPassword: !values.showPassword, passwordType: 'password' }); }} >
                                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z" />
                                                    </svg>
                                            }
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="center">
                                        <Grid container justify="center" item xs={12} spacing={0} >
                                            <Grid className={language.isArabic ? classes.rememberMeArabic : classes.rememberMe}>
                                                <Checkbox size="small" /> <label>{getLabel({ module: "Login", label: "Remember me" })}</label>
                                            </Grid>
                                            <Grid className={language.isArabic ? classes.forgotPassArabic : classes.forgotPass}>
                                                <label className={classes.forgetPassWordLabel}>{getLabel({ module: "Login", label: "Forgot Password ?" })}</label>
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            <Button
                                                variant="contained"
                                                id="loginButton"
                                                className={commonStyle.mediumPrimaryBtn}
                                                onClick={submitForm}
                                                disabled={loginSucess.showProgressBar}
                                            >
                                                {getLabel({ module: "Login", label: "Login" })}
                                            </Button>
                                            {
                                                loginSucess.showProgressBar &&
                                                <div className={classes.progressBar}>
                                                    <LinearProgress />
                                                </div>
                                            }

                                        </Grid>
                                    </Grid>
                                    {loginSucess.emptyErrorMessage &&
                                        <span className={classes.loginValidationMessage}>{loginSucess.emptyErrorMessage}</span>
                                    }
                                </Grid>
                            </Paper>
                        </div>
                        <div className={language.isArabic ? classes.outerPaperRightArabic : classes.outerPaperRight}>
                            <Paper className={language.isArabic ? classes.paperRightArabic : classes.paperRight}>
                                <Grid container justify='center' >
                                    <img src={require('../../../assets/images/hospital_loggin_logo.png')} alt='Login image' className={classes.loginImage} />
                                    <Grid container justify='center' >
                                        {/* <img src={require('../../../assets/images/hospital_loggin_logo.png')} alt='Login image' className={classes.loginImage} /> */}
                                        <img src={require('../../../assets/images/InnoHealth_Logo3.png')} alt='Infirma logo' className={classes.infirmaImage} />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div>
                    </Grid>
                }
            </Grid>
        </>
    )
}
export default NewLogin;