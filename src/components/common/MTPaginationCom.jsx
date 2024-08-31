import React from "react";
import Pagination from "@material-ui/lab/Pagination";

const MTPaginationCom = (props) => {
  const { pageNo, totalElements, pagination, handleChangePagination } = props;

  return (
    <Pagination
      color="primary"
      count={Math.ceil(totalElements / pagination.pageSize)}
      page={pageNo}
      onChange={handleChangePagination}
    />
  );
};

export default MTPaginationCom;
