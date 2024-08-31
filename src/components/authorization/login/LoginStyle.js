import { makeStyles } from "@material-ui/core/styles";

export const loginStyles = makeStyles((theme) => ({

    outerDiv: {
        backgroundColor: '#E1E7F3',
        height: '100vh', //Temporary
    },

    /**
     * 
     * Select Language
     * 
     */

    selectLanguage1: {
        right: '3rem',
        position: 'relative',
        cursor: 'pointer',
        textDecoration: 'underline',
        textUnderlinePosition: 'under',
        fontWeight: 'bold',
    },
    selectLanguage2: {
        position: 'relative',
        left: '100%',
        cursor: 'pointer',
        textDecoration: 'underline',
        textUnderlinePosition: 'under',
        fontWeight: 'bold',
    },

    /**
     * 
     * The welcome heading on the login page 
     * 
     */

    word1: {
        textAlign: 'center',
        font: 'normal normal medium 20px / 26px Roboto',
        letterSpacing: '0px',
        color: '#3d3d3d',
        opacity: '1',
    },
    word2: {
        textAlign: 'left',
        font: 'normal normal bold 35px / 46px Roboto',
        letterSpacing: '0px',
        color: '#3d3d3d',
        opacity: '1',
    },

    /**
     * 
     * Login Boxe's
     * 
     */

    paperLeft: {
        height: '25rem',
        width: '25rem',
        backgroundColor: 'white',
        padding: '1rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '20px 0px 79px 20px',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            borderRadius: '20px 20px 20px 20px',
            width: '23rem',
            height: '23rem',
        },
    },
    outerPaperLeft: {
        height: '25rem',
        width: '25rem',
        backgroundColor: '#0F4674',
        borderRadius: '20px 0px 0px 20px',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            borderRadius: '20px 20px 20px 20px',
            width: '23rem',
            height: '23rem',
        },
    },
    paperLeftArabic: {
        height: '25rem',
        width: '25rem',
        backgroundColor: 'white',
        padding: '1rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '0px 20px 20px 79px',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            borderRadius: '20px 20px 20px 20px',
        },
    },
    outerPaperLeftArabic: {
        height: '25rem',
        width: '25rem',
        backgroundColor: '#0F4674',
        borderRadius: '0px 20px 20px 0px',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            borderRadius: '20px 20px 20px 20px',
        },
    },
    paperRight: {
        height: '25rem',
        width: '25rem',
        backgroundColor: '#0F4674',
        padding: '1rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '79px 20px 20px 0px',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
    },
    outerPaperRight: {
        height: '25rem',
        width: '25rem',
        backgroundColor: 'white',
        borderRadius: '0px 20px 20px 0px',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
    },
    paperRightArabic: {
        height: '25rem',
        width: '25rem',
        backgroundColor: '#0F4674',
        padding: '1rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '20px 79px 0px 20px',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
    },
    outerPaperRightArabic: {
        height: '25rem',
        width: '25rem',
        backgroundColor: 'white',
        borderRadius: '20px 0px 0px 20px',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
    },
    firstBox: {
        height: '25rem',
        width: '25rem',
        border: '1px solid black',
    },
    secondBox: {
        height: '25rem',
        width: '25rem',
        border: '1px solid black',
    },

    /**
     * 
     * Input components section
     * 
     */


    userName: {
        width: '70%',
    },
    password: {
        width: '70%',
        position: 'relative',
        left: '2%',
    },
    passwordArabic: {
        width: '70%',
        position: 'relative',
        right: '2%',
    },

    /**
     * 
     * Show / Hide password eye icon
     * 
     */

    eyeIcon: {
        position: 'relative',
        top: '12px',
        right: '1rem',
        cursor: 'pointer',
    },
    eyeIconArabic: {
        position: 'relative',
        top: '12px',
        left: '1rem',
        cursor: 'pointer',
    },

    /**
     * 
     * Remember me & forgot password section
     * 
     */

    rememberMe: {
        position: 'relative',
        bottom: '26%',
        fontSize: '12px',
        right: '6%',
    },
    rememberMeArabic: {
        position: 'relative',
        bottom: '26%',
        fontSize: '12px',
        left: '9%',
    },
    forgetPassWordLabel: {
        fontSize: '14px',
        color: '#2659B6',
    },
    forgotPass: {
        position: 'relative',
        bottom: '16%',
        left: '3%',
    },
    forgotPassArabic: {
        position: 'relative',
        bottom: '16%',
        right: '7%',
    },

    /**
     * 
     * Validation message on login error
     * 
     */

    loginValidationMessage: {
        fontFamily: "roboto",
        fontSize: '16px',
        color: 'red',
    },

    /**
     * 
     * Display style of the progress bar 
     * after login button is clicked 
     * 
     */

    progressBar: {
        padding: '0% 5%',
        position: 'relative',
        bottom: '18%',
    },


    infirmaImage: {
        height: '9%',
        position: 'relative',
        top: '-1rem',
    },
    loginImage: {
        position: 'relative',
        height:"290px",
        top: '8%',
    }
}));
