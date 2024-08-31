import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RowComponent from './RowComponent';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import './CommonStyle.scss';
import { Radio } from 'rsuite';

export default function TableComponent(props) {

    const [currentPage, setcurrentPage] = useState(props.pageNo);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (props.apiHandlePagination) {
            setRows(props.rows);
        } else {
            let filteredRow = props.rows.slice((currentPage - 1) * props.pageDataCount, (currentPage - 1) * props.pageDataCount + props.pageDataCount)
            setRows(filteredRow)
        }
    }, [currentPage]);

    return (
        <Grid className="p-2 mb-5">
            <TableContainer component={Paper}>
                <Table className={props.tableclass} aria-label="customized table">
                    <TableHead className={props.tableHeaderClass}>
                        <TableRow>
                            {
                                props.columns.map((column, columnIndex) => (
                                    <TableCell align={column.columnlign} key={columnIndex} className={column.columnClass} lg={column.width.lg} md={column.width.md} lg={column.width.sm} lg={column.width.xs}>{column.name}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows &&
                            rows.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    <RowComponent
                                        rowData={row}
                                        columns={props.columns}
                                        rowDataIndex={rowIndex}
                                        key={rowIndex}
                                        tableRowIndex={rowIndex}
                                        uniqueField={props.uniqueField}
                                        onClickAction={props.onClickHandler}
                                    />
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>

            <Grid className="material-ui-pagination">
                <Pagination count={Math.ceil(props.datatotalCount / props.pageDataCount)} variant="outlined" shape="rounded" className="mui-table-pagination" page={currentPage} onChange={(e, page) => { setcurrentPage(page); props.apiHandlePagination && props.handlePagination(page) }} />
            </Grid>

        </Grid>

    );
}