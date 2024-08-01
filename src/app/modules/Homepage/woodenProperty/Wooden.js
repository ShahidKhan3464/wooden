import React, { useState } from 'react';
import { useStyles } from './style';
import Contact from '../contact/Contact';
import { globalStyles, Button } from '../style';
import SwiperSlider from '../swiper/SwiperSlider';
import { Box, Container, Grid, Typography } from '@material-ui/core'

const Wooden = () => {
    const classes = useStyles()
    const globalClasses = globalStyles()
    const [isModal, setIsModal] = useState(false)

    const handleModal = (e) => {
        setIsModal(true)
    }

    return (
        <React.Fragment>
            <Contact show={isModal} setIsModal={setIsModal} />
            <Box className={classes.parentBox}>
                <Container>
                    <Grid container spacing={11}>
                        <Grid item xs={12} md={6} lg={6}>
                            <Box className={classes.leftBox}>
                                <Box pb={3} width='100%' maxWidth='515px' >
                                    <Typography className={globalClasses.h6} component="h6">WoodenDoor Property Management</Typography>
                                </Box>
                                <Box pb={4}>
                                    <Typography
                                        component='p'
                                        className={globalClasses.para}
                                    >
                                        We take Mom and Pops putting 1 or 2 Properties on Airbnb to the next level. With Wooden Door, Brokers can add 100's of Properties with full Availability Searches visible to both Brokers to Customers. We provide Agents with full Lead Management capabilities, and a wide array of Broker and Agent Property Performance Analytics.
                                    </Typography>
                                </Box>
                                <Button
                                    bg='#353535'
                                    font='Inter'
                                    color='#FFFFFF'
                                    textTransform='upppercase'
                                    onClick={(e) => handleModal(e)}
                                >
                                    CONTACT US
                                </Button>
                                {/* <Button type='button' color='#FFFFFF' fontFamily='Inter' bgColor='#353535' width='191px' height='68px' fontSize='20px' clicked={(e) => handleModal(e)} radius='0px' text="CONTACT US" /> */}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <SwiperSlider />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default Wooden