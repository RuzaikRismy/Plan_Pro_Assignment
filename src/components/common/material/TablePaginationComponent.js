import React, { useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';


/**
 * Calling way
 * 
 * <TablePaginationComponent
    totalNumberOfDataElements={totalNumberOfDataElements}
    totalNumberOfDataElementsPerPage={totalNumberOfDataElementsPerPage}
    handlePagination={this.handlePagination}
    pageNo={pageNo}
    />
*/


const TablePaginationComponent = (props) => {

    return (
        <Pagination
            count={Math.ceil(props.totalNumberOfDataElements / props.totalNumberOfDataElementsPerPage)}
            page={props.pageNo}
            color={props.color}
            onChange={(e, page) => { props.handlePagination(page) }}
            {...props}
        />
    )
};
export default TablePaginationComponent;
