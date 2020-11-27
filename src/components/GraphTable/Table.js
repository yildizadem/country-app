import React, { useState, useEffect } from 'react';
import {
    Table as MuiTable, TableBody, TableCell, TableHead, TableRow, makeStyles,
    Dialog, DialogActions, DialogTitle, DialogContent, Button, Divider, Typography
} from '@material-ui/core';
import { useTable, usePagination } from 'react-table';
import Pagination from './Pagination';

function Table({ data, columns, hideOnMainTable }) {
    const classes = useStyle();
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        ...paginationOptions
    } = useTable({
        columns,
        data,
        initialState: {
            pageSize: 10,
            pageIndex: 0,
            hiddenColumns: hideOnMainTable
        }
    }, usePagination);
    const [detailIsOpen, setDetailIsOpen] = useState(false);
    const [detailData, setDetailData] = useState(null);

    useEffect(() => (detailData && setDetailIsOpen(true)), [detailData])

    return (
        <React.Fragment>
            <MuiTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        console.log(row);
                        return (
                            <TableRow
                                onClick={() => setDetailData(row)}
                                hover={true}
                                {...row.getRowProps()}
                                className={classes.row}
                            >
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </MuiTable>
            <Pagination
                {...paginationOptions}
            />
            <Dialog
                open={detailIsOpen}
                onClose={() => setDetailIsOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Detail</DialogTitle>
                <DialogContent>
                    <Divider />
                    {detailData && detailData.allCells.map(cell => (
                        <div className={classes.detailItem}>
                            <h3>
                                {cell.column.Header} :
                            </h3>
                            <Typography variant="body2">
                                {cell.render('Cell')}
                            </Typography>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDetailIsOpen(false)} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}



const useStyle = makeStyles(theme => {
    return {
        row: {
            '&:hover': {
                transition: '300ms',
                cursor: 'pointer'
            }
        },
        detailItem: {

        }
    }
})

export default Table;
