import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    wrapBox: {
        display: 'flex',
        paddingTop: '23px',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    button: {
        width: '191px',
        height: '68px',
        background: '#353535',
        mixBlendMode: 'normal',
        backdropFilter: 'blur(4.18165px)',
        fontFamily: 'Denish',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '20px',
        lineHeight: '28px',
        textAlign: 'center',
        color: '#FFFFFF',
        borderRadius: '0px',
        textTransform: 'none',
        '&:hover': {
            background: '#4e4b4b',
        },
        '@media (max-width: 520px)': {
            width: '80px',
            height: '35px',
            fontSize: '16px'
        },
    },
    logo: {
        fontSize: '28px',
        color: '#353535',
        fontWeight: '600',
        lineHeight: '34px',
        fontStyle: 'normal',
        fontFamily: 'Inter',
        '&:hover': {
            color: '#353535'
        },
        '@media (max-width: 1200px)': {
            fontSize: '20px'
        },
    }
});