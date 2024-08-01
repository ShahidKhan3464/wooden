import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 400,
    },
}));

;

export default function SimpleTable(props) {
    const classes = useStyles();

    return (
        <div className="col-md-6">
            <Paper className={classes.root}>
                <h5 className={'m-5'}>{props.title}</h5>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {props.columns.map((object, i) => {
                                return <TableCell >{object}</TableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.rows.map((row) => {
                                return (
                                    <TableRow key={row}>
                                        {props.allowedColumns.map((key) => {
                                            return <TableCell>{row[key]}</TableCell>
                                        })}
                                    </TableRow>
                                )

                            })
                        }
                    </TableBody>
                </Table>
            </Paper>
        </div>

    );
}