import React from 'react'
import { Box, FormControl, TextField, Typography } from '@material-ui/core';
import { useStyles } from '../../app/modules/Property/pages/style'

const Number = ({ label, value, onChange }) => {
    const classes = useStyles()

    return (
        <Box>
            <Typography component='h6' className={classes.label}>{label}*</Typography>
            <FormControl variant="filled" className={classes.formControl}>
                <TextField
                    type="number"
                    value={value}
                    variant="filled"
                    onChange={onChange}
                    placeholder={value}
                    className={classes.root}
                />
            </FormControl>
        </Box>
    )
}

export default Number