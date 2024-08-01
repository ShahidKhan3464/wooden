import React from 'react';
import { useStyles } from './style';
import { Button, CircularProgress } from '@material-ui/core';

const Index = (props) => {
    const classes = useStyles(props);

    return (
        <Button
            type={props.type}
            onClick={props.click}
            disabled={props.disabled}
            className={classes.button}
        >
            {props.disabled ? <CircularProgress size='1em' color="primary" /> : props.text}
        </Button>
    )
}

export default Index;