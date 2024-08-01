import React from 'react'
import { Box, FormControl, InputLabel, Select, Typography } from '@material-ui/core';
import { useStyles } from '../../app/modules/Property/pages/style'

const SelectInput = ({ label, placeholder, data, value, onChange }) => {
    const classes = useStyles()

    return (
        <Box>
            <Typography component='h6' className={classes.label}>{label}*</Typography>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor={placeholder} className={classes.placeholder}>{placeholder}</InputLabel>
                <Select
                    native
                    value={value}
                    onChange={onChange}
                    className={classes.root}
                    inputProps={{ id: { placeholder }, name: { placeholder } }}
                >
                    <option aria-label="None" value="" />
                    {data.map((item) => <option key={item.itemId} value={item.itemId}>{item.itemName}</option>)}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectInput;