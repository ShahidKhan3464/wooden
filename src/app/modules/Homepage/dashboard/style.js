import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    parentBox: {
        paddingTop: '150px',
        paddingBottom: '74px',
        background: '#FFFFFF',
        '@media (max-width: 991px)': {
            paddingTop: '100px',
        },
        '@media (max-width: 520px)': {
            paddingTop: '30px',
            paddingBottom: '20px'
        },
    },
    dashboardText: {
        widht: '100%',
        margin: 'auto',
        display: 'block',
        maxWidth: '650px',
        paddingBottom: '32px',
        textTransform: 'capitalize',
        '@media (max-width: 991px)': {
            paddingBottom: '15px',
        }
    },
    imageBox: {
        width: '100%',
        height: '890px',
        maxWidth: '1355px',
        '@media (max-width: 991px)': {
            margin: 'auto',
            height: '600px',
            maxWidth: '1200px',
        },
        '@media (max-width: 520px)': {
            height: '200px',
            maxWidth: '300px'
        },
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    }
})