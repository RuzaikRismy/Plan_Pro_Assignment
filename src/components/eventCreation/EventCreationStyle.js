import { makeStyles } from "@material-ui/core/styles";

export const EventCreationStyle = makeStyles((theme) => ({

    dashboardContainer: {
        marginRight: "2rem",
        marginLeft: "5.563rem",
        [theme.breakpoints.down("xs")]:{
            marginLeft:"1rem"
        },
    },
    groupCreationWordTypo:{
        fontFamily: "Roboto",
        color:"#000000",
        lineHeight:"25px",
        fontWeight: 500,
    },
    searchComponent: {
        "& .MuiOutlinedInput-root": {
          backgroundColor: theme.palette.background.textField,
          border: `0.063rem solid ${theme.palette.primary.lighter}`,
          borderRadius: "0.3rem",
          color: theme.palette.brandPrimary.dark + "!important",
          fontSize: theme.typography.fontSize,
          fontWeight: theme.typography.fontWeight.weight4,
          height: "2.6rem",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: `none`,
        },
      },
      paginationStyle: {
        '& .MuiPaginationItem-textPrimary.Mui-selected':{
            color:"#ffff",
            backgroundColor:"#000000",
            borderRadius:"50%"
        }
    },
    pointerClass:{
        cursor:  "pointer",
        width:"18px",
        height:"18px"
    },
    buttonsContainer:{
        marginTop:'2rem', 
        paddingRight:'1rem',
        marginBottom:'2rem'
    },
    clearButton: {
        width: theme.buttons.width.medium,
        backgroundColor: theme.palette.grey.contrastText,
        color: theme.palette.lightGrey.main,
        border: `1px solid ${theme.palette.lightGrey.main}`,
        height: theme.buttons.height.medium,
        marginRight: '1rem',
        textTransform: "none",
        outline: "none",
        textDecoration: "none",
        "&:hover": {
            backgroundColor: theme.palette.grey.contrastText,
        },
        "&:focus": {
            outline: "none !important",
        },
    },
    addNewButton: {
        width: theme.buttons.width.medium,
        backgroundColor: "#25B5BD",
        color: "#FFFFFF",
        height: theme.buttons.height.medium,
    //   marginRight: '1rem',
        textTransform: "none",
        outline: "none",
        textDecoration: "none",
        "&:hover": {
        backgroundColor: "#25B5BD",
        },
        "&:focus": {
        outline: "none !important",
        },
    },
    modalFieldsWordTypo:{
        fontFamily:"Roboto",
        fontWeight:400,
        fontSize:"15px"
    },
    creationModalDropdown: {
        "& .MuiOutlinedInput-root": {
          backgroundColor: theme.palette.background.textField,
        },
        width:""
      },
      addGuidePageDropdown: {
        width: "86% !important",
        "& .MuiOutlinedInput-root": {
          backgroundColor: theme.palette.background.textField,
        },
      },
      greenChip: {
        padding: "4px 15px 2px",
        fontSize: 13,
        color: theme.palette.green.dark,
        lineHeight: 1.5,
        backgroundColor:theme.palette.green.tooLiter,
        // border: `1px solid ${theme.palette.green.dark}`,
        borderRadius: 16,
        whiteSpace: "nowrap",
        width:"max-content",
        fontWeight:"500"
      },
      yellowChip: {
        padding: "2px 10px",
        fontSize: 13,
        color: theme.palette.goldenYellow.main,
        lineHeight: 1.5,
        backgroundColor: theme.palette.goldenYellow.liter,
        borderRadius: 16,
        whiteSpace: "nowrap",
        width:"max-content",
        fontWeight:"500"
      },
    blueChip: {
        padding: '2px 15px',
        fontSize: 13,
        color: theme.palette.blueChip.dark,
        lineHeight: 1.5,
        backgroundColor: theme.palette.blueChip.tooLiter,
        borderRadius: 16,
        whiteSpace: 'nowrap',
        width: 'max-content',
        fontWeight: theme.typography.fontWeight.weight4
      },
      orangeChip: {
        padding: "2px 10px",
        fontSize: 13,
        color: theme.palette.orange.dark,
        lineHeight: 1.5,
        backgroundColor: "#f77f002e",
        borderRadius: 16,
        whiteSpace: "nowrap",
        width: "max-content",
        fontWeight: "500",
        height: 'max-content'
      },
      darkRedChip: {
        padding: "4px 15px 2px",
        fontSize: 13,
        color: theme.palette.reds.dark,
        lineHeight: 1.5,
        backgroundColor: "rgba(244, 5, 5, 0.15)",
        borderRadius: 16,
        whiteSpace: "nowrap",
        width:"max-content",
        fontWeight:"500"
      },
      formInputField: {
        minWidth: "18rem",
        "& .MuiInputBase-formControl": {
            backgroundColor: theme.palette.primary.contrastText,
        },
        "& #cashPrice-helper-text, #payerPrice-helper-text, #maxDiscount-helper-text, #cashPriceWithDiscount-helper-text, #payerPriceWithDiscount-helper-text": {
            color: theme.palette.reds.dark,
            marginInline: 0,
            fontSize: theme.typography.fontSize
        },
        position: "relative"
    },
    outLineDarkGreenChip: {
        padding: "4px 15px 2px",
        fontSize: 13,
        color: "#298089",
        lineHeight: 1.5,
        border:"1px solid #298089",
        borderRadius: 16,
        whiteSpace: "nowrap",
        width:"max-content",
        fontWeight:"500"
      },
      
      outLineblueChip: {
        padding: '2px 15px',
        fontSize: 13,
        color: theme.palette.blueChip.dark,
        lineHeight: 1.5,
        border: `1px solid ${theme.palette.blueChip.dark}`,
        borderRadius: 16,
        whiteSpace: 'nowrap',
        width: 'max-content',
        fontWeight: theme.typography.fontWeight.weight4
      },
      outLineDarkYellowChip: {
        padding: "2px 10px",
        fontSize: 13,
        color: "#F1C40F",
        lineHeight: 1.5,
        // backgroundColor: "#f77f002e",
        border: "1px solid #F1C40F",
        borderRadius: 16,
        whiteSpace: "nowrap",
        width: "max-content",
        fontWeight: "500",
        height: 'max-content'
      },
}));