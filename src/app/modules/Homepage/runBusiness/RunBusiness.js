import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { globalStyles } from '../style';
import { useStyles } from './style';

const RunBusiness = () => {
    const classes = useStyles()
    const globalClasses = globalStyles()

    return (
        <Box className={classes.parentBox}>
            <Typography
                component="h4"
                className={`${globalClasses.h4} ${classes.businessText}`}
            >
                Let US Change the way you run your business
            </Typography>
        </Box>
    )
}

export default RunBusiness