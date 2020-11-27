import React from 'react';
import { useQuery } from '@apollo/client';
import {
    LinearProgress, Toolbar, Divider, Paper, useTheme
} from '@material-ui/core';
import Table from './Table';

function GraphTable({ queryAll, entityName, columns, hideOnMainTable = [], title = '', details = false }) {
    const { loading, error, data } = useQuery(queryAll);
    const theme = useTheme();

    return (
        loading || error
            ? <LinearProgress />
            : (
                <Paper variant="outlined" style={{ margin: theme.spacing(3) }}>
                    <Toolbar>
                        <h3>{title}</h3>
                    </Toolbar>
                    <Divider />
                    <Table columns={columns} data={data[entityName]} hideOnMainTable={hideOnMainTable} />
                </Paper>
            )
    )
}

export default GraphTable;
