import React from 'react';
import { Dialog, Checkbox } from '@material-ui/core';
import CustomFormControl from "../../../../components/formControl";
import { makeStyles } from '@material-ui/core';
import increment from '../incre.svg'
import decrement from '../decre.svg'

export const useStyles = makeStyles({
    content: {
        padding: '40px 50px 20px'
    },

    list: {
        marginTop: '22px',
    },

    listTitle: {
        fontFamily: 'Manrope',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '130%',
        color: '#121212',
    },
    listItems: {
        gap: '20px',
        display: 'flex',
        marginTop: '12px',
        flexDirection: 'column'
    },

    listItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemText: {
        fontFamily: 'Manrope',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '16px',
        color: '#4A4A4A',
    },
    rightPart: {
        gap: '14px',
        display: 'flex',
        alignItems: 'center'
    },
    checkbox: {
        width: '20px',
        height: '20px',
        color: '#3B82F6',

        // '> span': {
        //     border: 'none',
        //     background: 'none !important',
        // }
    },
    control: {
        background: '#F3F3F3',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        gap : '7px'
    },
    btn: {
        border: 'none',
        // color: '#4A4A4A',
        // fontWeight: '700',
        background: 'transparent'
    },
    value: {
        borderRadius: '3px',
        fontFamily: 'Manrope',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '14px',
        lineHeight: '19px',
        color: '#4A4A4A',
        border: '1px solid #4A4A4A',
        width: '25px'
    },
    saveBtn: {
        width: '106px',
        height: '42px',
        border: 'none',
        display: 'flex',
        marginTop: '32px',
        margin: 'auto',
        borderRadius: '4px',
        alignItems: 'center',
        background: '#5C58A5',
        justifyContent: 'center',

        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: '600',
        lineHeight: '19px',
        fontStyle: 'normal',
        fontFamily: 'Manrope',
        letterSpacing: '0.02em'
    }

})

const SimpleDialog = (props) => {
    const classes = useStyles()
    const { onClose, selectedValue, open, bedRoomsName, incrBedTypeQuantity, decrBedTypeQuantity, selectBedType, handleSaveBedType } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleClick = () => {
        handleSaveBedType()
        onClose(selectedValue);
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <div className={classes.content}>
                <CustomFormControl
                    type="text"
                    control="input"
                    name="bedroomsLayout"
                    label="Bedrooms Name*"
                    placeholder=""
                />

                <div className={classes.list}>
                    <h6 className={classes.listTitle}>Beds</h6>
                    <div className={classes.listItems}>
                        {bedRoomsName.map(({ bedTypeID, title, checked, bedTypeQuantity }) => (
                            <div key={bedTypeID} className={classes.listItem}>
                                <p className={classes.itemText}>{title}</p>
                                <div className={classes.rightPart}>
                                    <Checkbox
                                        size="large"
                                        color="secondary"
                                        name='bedroomsLayout'
                                        checked={checked}
                                        className={classes.checkbox}
                                        onChange={(e) => selectBedType(e, bedTypeID)}
                                    />
                                    <div className={classes.control}>
                                        <button onClick={() => decrBedTypeQuantity(bedTypeID)} className={classes.btn}><img src={decrement} alt="decrement" /></button>
                                        <button className={classes.value}>{bedTypeQuantity}</button>
                                        <button onClick={() => incrBedTypeQuantity(bedTypeID)} className={classes.btn}><img src={increment} alt="increment" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={handleClick} className={classes.saveBtn}>Save</button>
            </div>
        </Dialog>
    );
}

export default SimpleDialog