import React from 'react';
import { Dialog, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from './style';

const CustomDialog = ({ children, show, setIsModal }) => {
    const classes = useStyles();

    return (
        <Dialog
            fullScreen
            open={show}
            onClose={() => setIsModal(false)}
            PaperProps={{
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(0, 0, 0, 0.8)',
                },
            }}
        >
            <DialogTitle id="customized-dialog-title">
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => setIsModal(false)}>
                    <CloseIcon style={{ width: '2em', height: '2em' }} />
                </IconButton>
            </DialogTitle>
            {children}
        </Dialog>
    );
}

export default CustomDialog;