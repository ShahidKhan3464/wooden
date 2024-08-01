import { Box, Container, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from './style';

const Property = () => {
    const classes = useStyles()

    return (
        <Box className={classes.parentBox}>
            <Container>
                <Typography align='center' variant='h6' component='h6'>Properties</Typography>
                <Box>

                </Box>
            </Container>
        </Box>
    )
}

export default Property