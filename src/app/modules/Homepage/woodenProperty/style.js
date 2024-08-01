import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    parentBox: {
        paddingTop: '150px',
        background: '#FFFFFF',
        paddingBottom: '150px',
        '@media (max-width: 520px)': {
            paddingTop: '30px',
            paddingBottom: '30px',
        },
    },
    leftBox: {
        width: '100%',
        maxWidth: '542px',
        '@media (max-width: 991px)': {
            margin: 'auto',
            marginBottom: '20px'
        },
    },
    imageBox: {
        height: '454px',
        '@media (max-width: 991px)': {
            marginTop: '40px',
        },
        '@media (max-width: 520px)': {
            height: '250px',
            marginTop: '10px',
        },
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
})