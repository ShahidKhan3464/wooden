import React, { useState } from 'react';
import { Button } from '../style';
import Login from '../login/Login';
import { useStyles } from './style';
import { Container, Box, Typography } from '@material-ui/core';

const Header = () => {
    const classes = useStyles();
    const [isModal, setIsModal] = useState(false)

    const handleModal = (e) => {
        setIsModal(true)
    }

    return (
        <React.Fragment>
            <Login isModal={isModal} setIsModal={setIsModal} />
            <Container>
                <Box className={classes.wrapBox}>
                    <Typography
                        component='a'
                        className={classes.logo}
                    >
                        Wooden Door
                    </Typography>
                    <Button
                        bg='#353535'
                        weight='700'
                        font='Denish'
                        color='#FFFFFF'
                        onClick={(e) => handleModal(e)}
                    >
                        Login
                    </Button>
                </Box>
            </Container>
        </React.Fragment>

    );
}

export default Header;