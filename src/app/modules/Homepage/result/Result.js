import React, { useState } from 'react';
import { useStyles } from './style';
import Contact from '../contact/Contact';
import { globalStyles, Button } from '../style';
import { Container, Box, Typography } from '@material-ui/core';

const Result = () => {
    const classes = useStyles();
    const globalClasses = globalStyles()
    const [isModal, setIsModal] = useState(false)

    const handleModal = (e) => {
        setIsModal(true)
    }

    return (
        <React.Fragment>
            <Contact show={isModal} setIsModal={setIsModal} />
            <Container>
                <Box className={classes.childBox}>
                    <Typography component='h6' className={`${globalClasses.h6} ${classes.result}`}>Results</Typography>
                    <Typography align='center' component='p' className={`${globalClasses.para} ${classes.text}`}>
                        Wooden Door prides itself on CUSTOMIZATION! We want to help you transform your pen and paper business processes into scalable data. We make what is easy for 1 or 2 Properties easy for the largest of Property Portfolios.
                    </Typography>
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
            </Container >
        </React.Fragment>

    )
}

export default Result;