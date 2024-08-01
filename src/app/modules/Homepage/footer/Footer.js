import React, { useState } from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import visa from '../img/visa.svg'
import masterCard from '../img/masterCard.svg'
import paypal from '../img/paypal.svg'
import electron from '../img/electron.svg'
import maestro from '../img/maestro.svg'
import { globalStyles } from '../style';
import { useStyles } from './style';

const Footer = () => {
    const classes = useStyles();
    const globalClasses = globalStyles()
    const [selected, setSelected] = useState(0)
    const links = ['short term', 'long term', 'for sale']

    return (
        <Box className={classes.footerBox}>
            <Box className={classes.upperFooter}>
                <Typography component='h6' className={`${globalClasses.h6} ${classes.woodenText}`}>
                    WoodenDoor PM
                </Typography>
                <Box className={classes.links}>
                    {links.map((link, index) => (
                        <Typography
                            key={index}
                            variant='h4'
                            href='#home'
                            component='a'
                            onClick={() => setSelected(index)}
                            className={`${globalClasses.h4} ${selected === index ? classes.activeLink : classes.link}`}
                        >
                            {link}
                        </Typography>
                    ))}
                </Box>
            </Box>
            <Box className={classes.lowerFooter}>
                <Container>
                    <Box className={classes.lowerBottom}>
                        <Typography component='p' className={`${globalClasses.para} ${classes.copyright}`} >
                            Copyright © 2022 Woodendoor. All rights reserved.
                        </Typography>
                        <Box className={classes.creditCards}>
                            <Box className={classes.img} component='img' src={visa} alt='visa' />
                            <Box className={classes.img} component='img' src={masterCard} alt='masterCard' />
                            <Box className={classes.img} component='img' src={paypal} alt='paypal' />
                            <Box className={classes.img} component='img' src={electron} alt='electron' />
                            <Box className={classes.img} component='img' src={maestro} alt='maestro' />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box >
    )
}

export default Footer