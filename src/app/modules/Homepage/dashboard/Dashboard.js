import React from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import dashboardImg from '../img/dashboard-img.png'
import { globalStyles } from '../style';
import { useStyles } from './style';

const Dashboard = () => {
    const classes = useStyles();
    const globalClasses = globalStyles()

    return (
        <Box className={classes.parentBox}>
            <Container>
                <Typography align='center' component='h6' className={`${globalClasses.h6} ${classes.dashboardText}`}>
                    Custom Real-time metrics & analytics Dashboard
                </Typography>
                <Box className={classes.imageBox}>
                    <Box className={classes.img} alt="dashboard-img" src={dashboardImg} component="img" />
                </Box>
            </Container>
        </Box>
    )
}

export default Dashboard