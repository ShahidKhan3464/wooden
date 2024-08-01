import { makeStyles, withStyles, InputBase } from '@material-ui/core';

export const Input = withStyles((theme) => ({
    input: {
        borderBottom: '1.63578px solid #4E4E4E',
        '&:focus': {
            borderBottom: '1px solid #FFFFFF',
        },
        '&::placeholder': {
            color: '#FFFFFF',
            background: 'transparent'
        },
        "&:-webkit-autofill": {
            // background: 'transparent',
            WebkitTextFillColor: '#FFFFFF',
            WebkitBoxShadow: "0 0 0 1000px #242222 inset",
        }
    },
}))(InputBase);

export const useStyles = makeStyles((theme) => ({
    closeButton: {
        color: '#FFFFFF',
        position: 'absolute',
        top: '50px',
        right: '50px',
        // top: theme.spacing(5),
        // right: theme.spacing(5),
        width: theme.spacing(4),
        height: theme.spacing(4),
    },

    content: {
        width: '100%',
        color: 'white',
        padding: '60px',
        maxWidth: '780px',
        minHeight: '490px',
        border: '1.08342px solid #C6C6C6',
        background: 'rgba(37, 37, 37, 0.8)',
        '@media (max-width: 768px)': {
            maxWidth: '650px',
            padding: '40px',
            minHeight: '390px',
        },
        '@media (max-width: 520px)': {
            maxWidth: '300px',
            padding: '20px',
            minHeight: '290px',
        },

    },
    title: {
        fontFamily: 'Denish',
        fontStyle: 'normal',
        lineHeight: '60px',
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '400',
        color: 'rgba(255, 255, 255, 0.8)',
        letterSpacing: '0.05em',
        '@media (max-width: 520px)': {
            fontSize: '16px',
            lineHeight: '30px',
        },
    },
    contactTitle: {
        fontSize: '40px',
        color: '#FFFFFF',
        fontWeight: '700',
        fontFamily: 'Denish',
        '@media (max-width: 520px)': {
            fontSize: '30px'
        },
    },
    span: {
        fontFamily: 'Denish',
        color: '#FFFFFF',
        fontSize: '32px',
        fontWeight: '600',
        '@media (max-width: 520px)': {
            fontSize: '18px'
        },
    },
    form: {
        gap: '30px',
        display: 'flex',
        marginTop: '30px',
        padding: '0px 50px',
        flexDirection: 'column',
        justifyContent: 'center',
        '@media (max-width: 520px)': {
            gap: '20px',
            padding: '0 20px',
            marginTop: '15px'
        },
    },
    input: {
        fontFamily: 'Denish',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '16px',
        color: '#FFFFFF',
        lineHeight: '19px',
        letterSpacing: '0.05em',
        '@media (max-width: 520px)': {
            fontSize: '12px'
        },
    },
    // focused: {
    //     borderBottom: '2px solid #FFFFFF !important'
    // },
    // autoFill: {
    //     "&:-webkit-autofill": {
    //         WebkitBoxShadow: "0 0 0 1000px #242222 inset",
    //         background: 'transparent'
    //     }
    // },
    error: {
        color: 'white',
        fontWeight: 'normal',
        letterSpacing: '1px',
        fontSize: '13px',
    },
    checkbox: {
        color: '#FFFFFF',
        fontFamily: 'Denish'
    },
    button: {
        width: '250px',
        height: '70px',
        margin: 'auto',
        background: '#FFFFFF',
        mixBlendMode: 'normal',
        fontFamily: 'Denish',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '20px',
        color: '#222222',
        lineHeight: '140%',
        borderRadius: '0px',
        backdropFilter: 'blur(4.18165px)',
        textTransform: 'none',
        '&:hover': {
            background: '#e5e1e1',
        },
        '@media (max-width: 520px)': {
            width: '120px',
            height: '40px',
            fontSize: '17px'
        },
    }
}))