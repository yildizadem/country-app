import React from 'react';
import { NativeSelect, makeStyles } from '@material-ui/core';
import { Pagination as MuiPagination } from '@material-ui/lab';

function Pagination({ gotoPage, pageOptions, setPageSize, state: { pageIndex, pageSize } }) {
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <MuiPagination
                color="secondary"
                count={pageOptions.length}
                onChange={(e, value) => gotoPage(value - 1)}
                style={{ flexGrow: 1 }}
            />
            <NativeSelect
                className={classes.select}
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </NativeSelect>
            <span>Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong></span>
        </div>
    )
}

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3),
        flexWrap: 'wrap'
    },
    select: {
        marginRight: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            marginRight: 'auto'
        }
    }
}))

export default Pagination;
