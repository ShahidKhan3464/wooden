import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    parentBox: {
        padding: '115px 29px',
        '@media (max-width: 520px)': {
            padding: '60px 15px'
        },
    },
    leftBox: {
        width: '100%',
        height: '428px',
        maxWidth: '500px',
        '@media (max-width: 991px)': {
            margin: 'auto'
        },
        '@media (max-width: 520px)': {
            height: '400px',
            maxWidth: '300px'
        },
    },
    text: {
        fontFamily: 'Denish',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '56px',
        lineHeight: '126%',
        color: '#353535',
        letterSpacing: '1.5px',
        textTransform: 'capitalize',
        '@media (max-width: 520px)': {
            fontSize: '32px',
            lineHeight: '30px',
        },
    },
    span: {
        fontFamily: 'Denish',
        padding: '0 5px',
        fontSize: '30px',
        display: 'inline-block',
        '@media (max-width: 520px)': {
            fontSize: '20px',
            padding: '0 10px',
        },
    },
    imageBox: {
        width: '100%',
        height: '380px',
        maxWidth: '660px',
        '@media (max-width: 1280px)': {
            margin: 'auto'
        },
        '@media (max-width: 520px)': {
            height: '160px',
            maxWidth: '300px',
        },
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    }
});