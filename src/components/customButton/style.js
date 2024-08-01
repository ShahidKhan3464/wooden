import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
    button: {
        height: '44px',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '16px',
        borderRadius: '4px',
        fontStyle: 'normal',
        textTransform: 'none',
        width: props => props.width ? props.width : '178px',
        color: props => props.color ? props.color : '#FFFFFF',
        fontFamily: props => props.font ? props.font : 'Manrope',
        background: props => props.bgColor ? props.bgColor : '#555BB3',
        border: props => props.border ? props.border : '2px solid #555BB3',
        '&:hover': {
            background: props => props.bgColor ? props.bgColor : '#555BB3'
        },
        // '@media (max-width: 520px)': {
        //     width: '130px !important',
        //     height: '40px !important',
        //     fontSize: '16px !important',
        // },
    },
})