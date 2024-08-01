import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    childBox: {
        width: '100%',
        margin: 'auto',
        display: 'flex',
        maxWidth: '760px',
        paddingTop: '65px',
        alignItems: 'center',
        paddingBottom: '55px',
        flexDirection: 'column',
        justifyContent: 'center',
        '@media (max-width: 520px)': {
            maxWidth: '300px',
            paddingTop: '30px',
            paddingBottom: '20px',
        },
    },
    result: {
        paddingBottom: '24px',
        '@media (max-width: 520px)': {
            paddingBottom: '12px',
        },
    },
    text: {
        paddingBottom: '40px',
        '@media (max-width: 520px)': {
            paddingBottom: '20px',
        },
    }
})