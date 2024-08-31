import { makeStyles } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
    btnSuccess:{
        backgroundColor:"red"
    },
    divider:{
        margin:"0.5rem 1rem 1rem 0rem"
    },
    btnContainer:{
        backgroundColor:"#6e80c4",
        margin:"1rem",
        color:"#fff",
        "&:hover": {
            backgroundColor: "#6e80c4",
        },
    },
    btnOutline:{
        border: "1px solid #6e80c4",
        color:"#6e80c4",
        margin:"1rem"
    },
    mediumTitle:{
        margin:"0.5rem -1rem -1rem 1rem",
        fontWeight:"500",
        color:"#5C5C5C"
    },
    modelHeader: {
        // background: "#2659B6",
        color: "#fff",
       // borderBottom: "2px solid #000",
        "&:hover": {
        color: "#fff",
        },
    },
    mainContainerGrid:{
        display: "grid",
        gridGap: "10px",
        marginTop:"2rem",
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: "auto ",
        },
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: "auto auto",
        },
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: "auto auto auto auto ",
        },
        [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: "19% 19% 19% 19% 19%",
        },
    },

    gridSubContainer:{
        backgroundColor: "#F4F9FF",
        borderRadius:"0.5rem",
        padding: "0.5rem",
        gridColumnStart: 3,
        gridColumnEnd: 5,
        display: "grid",
        gridTemplateColumns: "auto auto",
        gridGap: "5px",
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: "auto ",
            gridColumnStart: 1,
            gridColumnEnd: 3,
        },
        
    },
    hijriDatePicker:{
        backgroundColor:"#fff",
        padding: "0.3rem",
        outline:"none",
        border:"none",
        borderBottom:"1px solid #000",
    },
    tabStyle:{
        color: '#2659B6',
    },
    errorTab:{
        background:"linear-gradient(to right, #ff416c, #ff4b2b)",
        color:"#fff"
    },

    summaryWhitContainer:{
        backgroundColor: "#FFF",
        padding: "0.3rem",
        borderRadius: "0.2rem",
    },
    mainButton:{
        backgroundColor: "#2659B6",
        color: "#fff",
        outline: "none",
        textDecoration: "none",
        "&:hover": {
            backgroundColor: "#2659B6",
            color: "#fff",
            },
    },
    outlineBtn:{
            color: "#2659B6",
            border: "1px solid #2659B6",
            outline: "none",
            marginRight: "0.9rem",
            "&:hover": {
                color: "#2659B6",
                },
    },
    conformationContentText:{
        color:"#000"
    },
    textType3:{
        fontSize: "12px",
      //  color:"#364457"
    },
    textType4:{
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "15px",
        color:"#364457"
    },
    textType5:{
        
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        color:"#8D95A2"
    },
    textType6:{
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        color:"#364457"
    },
    textType7:{
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        color:"#FF2E00"
    },
    dialogCloseBtn:{
        float: "right",
        marginTop: "0.5rem",
        cursor: "pointer",
    },
    dialogSaveBtn :{
        color: "#2659B6",
        border: "1px solid #2659B6",
        outline: "none",
        marginRight: "0.9rem",
    },
    tableListItemIcon: {
        margin: "10px 10px 10px 10px"
    },
    tableMainIcon:{
        color: "#383E47",
        width: "35px",
        height: "35px",
    },
    addNewDetailsIcon:{
        border: "1px solid #28a745",
        height: "2.3rem",
        width: "2.3rem",
        color: "#28a745",
        borderRadius: "0.5rem",
        marginLeft: "0.2rem",
        cursor: "pointer",
    },
    removeDetailsIcon:{
        border: "1px solid #CACFD2 ",
        height: "2.3rem",
        width: "2.3rem",
        color: "#CACFD2 ",
        borderRadius: "0.5rem",
        marginLeft: "1rem",
        cursor: "pointer",
    },
    registraionSubContainer:{
        backgroundColor: "#F9FCFF"
    }
}));

