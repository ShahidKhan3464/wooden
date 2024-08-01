import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function NestedGrid(props) {
    const classes = useStyles();

    function FormRow(prop) {
        return (
            <React.Fragment>
                {
                    prop.row.map((row)=>(
                            <Grid item xs={4}>
                                <Paper className={classes.paper}><span className={"font-weight-bold"}>{row.title}</span> : {row.data}</Paper>
                            </Grid>
                        )
                    )
                }
            </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                {
                    props.data.map((row)=>(
                        <Grid container item xs={12} spacing={3}>
                            <FormRow row={row} />
                        </Grid>
                        )
                    )
                }
            </Grid>
        </div>
    );
}
