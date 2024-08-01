import React, { useState } from 'react';
import { useStyles } from './style';
import Contact from '../contact/Contact';
import heroImg from '../img/hero-img.png';
import { globalStyles, Button } from '../style';
import { Container, Grid, Box, Typography } from '@material-ui/core';

const Hero = () => {
    const classes = useStyles()
    const globalClasses = globalStyles()
    const [isModal, setIsModal] = useState(false)

    const handleModal = (e) => {
        setIsModal(true)
    }

    return (
        <React.Fragment>
            <Contact show={isModal} setIsModal={setIsModal} />
            <Container>
                <Box className={classes.parentBox}>
                    <Grid container>
                        <Grid item xs={12} md={6} lg={6}>
                            <Box className={classes.leftBox}>
                                <Box pb={2}>
                                    <Typography component='h4' className={globalClasses.h4}>Connecting</Typography>
                                </Box>
                                <Box pb={3} className={classes.text} component="h2">
                                    Owners
                                    <Typography className={classes.span} component='span'> to</Typography>
                                    Brokers
                                    <Typography className={classes.span} component='span'> to</Typography>
                                    Customers
                                </Box>
                                <Box pb={4}>
                                    <Typography
                                        component='p'
                                        className={globalClasses.para}
                                    >
                                        Designed for Owners and Brokers who need Scheduling, Searching, Lead Management, and Analytics for not 1 or 2, but 100's of Short Term Vacation Rental Properties!
                                    </Typography>
                                </Box>
                                <Button
                                    bg='#353535'
                                    font='Inter'
                                    color='#FFFFFF'
                                    textTransform='uppercase'
                                    onClick={(e) => handleModal(e)}
                                >
                                    Contact Us
                                </Button>
                                {/* <Button type='button' color='#FFFFFF' fontFamily='Inter' bgColor='#353535' width='191px' height='68px' fontSize='20px' clicked={(e) => handleModal(e)} radius='0px' text="CONTACT US" /> */}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Box className={classes.imageBox}>
                                <Box className={classes.img} alt="hero-img" src={heroImg} component="img" />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default Hero