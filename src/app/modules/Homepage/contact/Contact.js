import React from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { useStyles, Input } from '../dialog/style';
import Dialog from '../dialog/Dialog';

const Contact = ({ show, setIsModal }) => {
    const classes = useStyles();

    return (
        <Dialog show={show} setIsModal={setIsModal} >
            <div className={classes.content}>
                <Box component='h2' className={classes.title}>
                    <Typography className={classes.contactTitle}>Contact Us</Typography>
                </Box>
                <form className={classes.form} style={{ marginTop: '30px' }} noValidate autoComplete="off">
                    <Input
                        className={classes.input}
                        placeholder="EMAIL ADDRESS"
                    />
                    <Input
                        placeholder="MESSAGE"
                        className={classes.input}
                    />
                    <Button className={classes.button}>Send</Button>
                </form>
            </div>
        </Dialog>
    )
}

export default Contact