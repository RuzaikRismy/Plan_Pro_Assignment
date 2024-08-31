import React, { forwardRef } from "react";
import { Button, TablePagination } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import PrintIcon from "@material-ui/icons/Print";
import Refresh from "@material-ui/icons/RefreshOutlined";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
//class imports
import { getLabel } from "../../utils/localization";
//icon and image imports
import ColFilter from "../../assets/images/icons/col-filter.svg";
import Trash from "../../assets/images/icons/trash.svg";
import editIcon from "../../assets/images/icons/edit.svg";
import ArrowForwardTwoToneIcon from "@material-ui/icons/ArrowForwardTwoTone";
import ViewDetails from "../../assets/images/ViewDetails.svg";
import printDetails from "../../assets/images/summary/print.svg";
import disabledPrintDetails from "../../assets/images/icons/printer_disabled.svg";
import rightArrow from "../../assets/images/rightArrow.svg";
import rightDisabledArrow from "../../assets/images/rightDisabledArrow.svg";
import play from '../../assets/images/icons/play.svg';
import pause from '../../assets/images/icons/pause.svg';
import CheckGreenRound from "../../assets/images/icons/CheckGreenRound.svg"

export const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <img
      src={Trash}
      {...props}
      ref={ref}
      alt="table-delete-icons"
      id={"table-delete-icons"}
    />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <img
      src={editIcon}
      {...props}
      ref={ref}
      alt="table-edit-icons"
      id={"table-edit-icons"}
    />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),

  PrintIcon: forwardRef((props, ref) => (
    <PrintIcon {...props} ref={ref} style={{ color: "#FF5A3B" }} />
  )),
  PriorityHighIcon: forwardRef((props, ref) => (
    <PriorityHighIcon {...props} ref={ref} style={{ color: "#63A7D6" }} />
  )),
  ArrowForwardTwoToneIcon: forwardRef((props, ref) => (
    <ArrowForwardTwoToneIcon
      {...props}
      ref={ref}
      style={{ color: "#93329E" }}
    />
  )),
  ViewColumn: forwardRef((props, ref) => (
    <Button
      variant="outlined "
      style={{
        border: "1px solid #003761",
        textTransform: "capitalize",
        width: "150px",
        height: "35px",
      }}
    >
      <img
        src={ColFilter}
        style={{ paddingRight: "10px" }}
        {...props}
        ref={ref}
        alt="table-view-column"
      />
        {getLabel({module:"common", label:"columns"})}
    </Button>
  )),

  Refresh: forwardRef((props, ref) => (
    <Refresh {...props} ref={ref} id={"refresh-table-icon"} />
  )),

  viewDetails: forwardRef((props, ref) => (
    <img
      src={ViewDetails}
      {...props}
      ref={ref}
      alt="table-view-details"
      id={"view-table-icon"}
    />
  )),
  printDetails: forwardRef((props, ref) => (
    <img
      src={printDetails}
      {...props}
      ref={ref}
      alt="table-print-details"
      id={"print-table-icon"}
    />
  )),
  disabledPrintDetails: forwardRef((props, ref) => (
    <img
      src={disabledPrintDetails}
      {...props}
      ref={ref}
      alt="table-disabled-print-details"
      id={"disabled-print-table-icon"}
    />
  )),
  rightArrow: forwardRef((props, ref) => (
    <img
      src={rightArrow}
      {...props}
      ref={ref}
      alt="table-right-arrow"
      id={"right-arrow-table-icon"}
    />
  )),

  rightDisabledArrow: forwardRef((props, ref) => (
    <img
      src={rightDisabledArrow}
      {...props}
      ref={ref}
      alt="table-right-disable-arrow"
      id={"right-disable-arrow-table-icon"}
    />
  )),


  play: forwardRef((props, ref) => (
    <img
      src={play}
      {...props}
      ref={ref}
      alt="table-play"
      id={"play-table-icon"}
    />
  )),

  pause: forwardRef((props, ref) => (
    <img
      src={pause}
      {...props}
      ref={ref}
      alt="table-pause"
      id={"pause-table-icon"}
    />
  )),
  
  checkOutlined: forwardRef((props, ref) => (
    <img
      src={CheckGreenRound}
      {...props}
      ref={ref}
      al={"table-check"}
      id={"check-table-icon"}
    />
  )),
};

export const TableAssets = () => {
  const theme = useTheme();
  return {
    pageSize: 5,
    actionsColumnIndex: -1,
    headerStyle: {
      fontSize: theme.typography.fontSize,
      color: theme.palette.brandPrimary.dark,
    },
    sorting: true,
    rowStyle: {
      padding: "3rem",
      height: "3rem",
      fontSize: theme.typography.fontSize,
      color: theme.palette.grey.light,
      backgroundColor: theme.palette.background.textField,
    },

    cellStyle: {
      backgroundColor: theme.palette.background.textField,
    },
    columnsButton: true,
    loadingType: "overlay",
    paginationType: "stepped",
    search: false,
  };
};

export const CustomTableAssets = () => {
  const theme = useTheme();
  return {
    showTitle: false,
    paging: false,
    draggable: false,
    toolbar: false,
    actionsColumnIndex: -1,
    headerStyle: {
      fontSize: theme.typography.fontSize,
      color: theme.palette.brandPrimary.dark,
    },
    sorting: false,
    rowStyle: {
      padding: "3rem",
      height: "3rem",
      fontSize: theme.typography.fontSize,
      color: theme.palette.grey.light,
      backgroundColor: theme.palette.background.textField,
    },
    cellStyle: {
      backgroundColor: theme.palette.background.textField,
    },
    columnsButton: false,
    loadingType: "overlay",
    paginationType: "stepped",
    search: false,
  };
};

export const CustomTableAssetsBillingDetails = () => {
  const theme = useTheme();
  return {
    showTitle: false,
    paging: false,
    draggable: false,
    toolbar: false,
    pageSize: 5,
    actionsColumnIndex: -1,
    headerStyle: {
      fontSize: theme.typography.fontSize,
      color: theme.palette.brandPrimary.dark,
      backgroundColor: "#F9FAFC",
    },
    sorting: false,
    selection: false,
    rowStyle: {
      padding: "3rem",
      height: "3rem",
      fontSize: "14px",
      color: "#5E5E5E",
      backgroundColor: "#F9FAFC",
    },
    columnsButton: false,
    loadingType: "overlay",
    paginationType: "stepped",
    search: false,
  };
};

export const GeneralTableAssets = () => {
  const theme = useTheme();
  return {
    showTitle: false,
    paging: true,
    draggable: false,
    toolbar: false,
    actionsColumnIndex: -1,
    headerStyle: {
      fontSize: theme.typography.fontSize,
      color: theme.palette.brandPrimary.dark,
    },
    sorting: false,
    rowStyle: {
      padding: "3rem",
      height: "3rem",
      fontSize: "14px",
      color: "#5E5E5E",
      backgroundColor: theme.palette.background.textField,
    },
    cellStyle: {
      backgroundColor: theme.palette.background.textField,
    },
    columnsButton: false,
    loadingType: "overlay",
    paginationType: "stepped",
    search: false,
  };
};

export const tableLocalization = {
  body: {
    emptyDataSourceMessage: getLabel({module:"common", label:"noRecordsToDisplay"})
  },
  toolbar: {
    showColumnsTitle: "",
  },
  header: {
    actions: getLabel({module:"common", label:"action"}),
  },
  pagination:{
    labelRowsSelect: getLabel({module: "common", label:"rows"})
  },
};

export const CustomPageSizeTableAssets = (pageSize) => {
  const theme = useTheme();
  return {
    pageSize: pageSize,
    toolbar: false,
    actionsColumnIndex: -1,
    headerStyle: {
      fontSize: theme.typography.fontSize,
      color: theme.palette.brandPrimary.dark,
    },
    sorting: true,
    columnsButton: false,
    loadingType: "overlay",
    paginationType: "stepped",
    search: false,
  };
}

export const CustomPageSizeAndSelectedRowTableAssets = (pageSize, selectedRow, blueBgColor= false) => {
  const theme = useTheme();
  return {
    pageSize: pageSize,
    toolbar: false,
    actionsColumnIndex: -1,
    headerStyle: {
      fontSize: theme.typography.fontSize,
      color: theme.palette.brandPrimary.dark,
    },
    sorting: true,
    columnsButton: false,
    loadingType: "overlay",
    paginationType: "stepped",
    search: false,
    rowStyle: rowData => ({
      backgroundColor: (selectedRow === rowData.tableData.id) ?  blueBgColor? '#E2F8FF' : '#EEE' : '#FFF'
    })
  };
}

export const CustomPagination = (props) => {
  const {
    ActionsComponent,
    onChangePage,
    onChangeRowsPerPage,
    ...tablePaginationProps
  } = props;

  return (
    <TablePagination
      {...tablePaginationProps}
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
      ActionsComponent={(actionComponentProps) => {
        const { onPageChange, ...actionsComponentProps } = actionComponentProps;
        return (
          <ActionsComponent
            {...actionsComponentProps}
            onChangePage={onPageChange}
          />
        );
      }}
    />
  );
}