import { makeStyles } from "@material-ui/core/styles";

export const AdminDashboardStyle = makeStyles((theme) => ({
    dashboardContainer: {
        marginRight: "1rem",
        marginLeft: "5.563rem",
        [theme.breakpoints.down("xs")]:{
            marginLeft:"1rem"
        },
    },
      donutChart: {
        width: "100%",
        // "& .canvasjs-chart-canvas": {
        //   width: "13.75rem !important",
        //   height: "12.5  !important",
        // },
        "& .canvasjs-chart-credit": {
          color: "#fff !important",
        },
      },
    
}));
