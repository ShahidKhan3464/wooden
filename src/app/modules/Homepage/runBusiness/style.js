import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    parentBox: {
        display: 'flex',
        paddingTop: '57px',
        alignItems: 'center',
        paddingBottom: '57px',
        background: '#353535',
        justifyContent: 'center',
        '@media (max-width: 1100px)': {
            paddingTop: '50px',
            paddingBottom: '50px',
        },
        '@media (max-width: 991px)': {
            paddingTop: '30px',
            paddingBottom: '30px',
        },
        '@media (max-width: 991px)': {
            paddingTop: '10px',
            paddingBottom: '10px',
        }
    },
    businessText: {
        fontSize: '44px',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        '@media (max-width: 1200px)': {
            fontSize: '40px'
        },
        '@media (max-width: 1100px)': {
            fontSize: '35px'
        },
        '@media (max-width: 940px)': {
            fontSize: '30px'
        },
        '@media (max-width: 800px)': {
            fontSize: '25px'
        },
        '@media (max-width: 660px)': {
            fontSize: '20px'
        },
        '@media (max-width: 520px)': {
            fontSize: '12px'
        },
    }
})