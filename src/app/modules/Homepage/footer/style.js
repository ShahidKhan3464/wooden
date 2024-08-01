import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    footerBox: {
        background: '#353535',
    },
    upperFooter: {
        gap: '56px',
        display: 'flex',
        paddingTop: '48px',
        alignItems: 'center',
        paddingBottom: '55px',
        flexDirection: 'column',
        justifyContent: 'center',
        '@media (max-width: 991px)': {
            gap: '30px'
        }
    },
    woodenText: {
        color: '#FFFFFF',
    },
    links: {
        width: '100%',
        display: 'flex',
        maxWidth: '750px',
        alignItems: 'center',
        justifyContent: 'space-between',
        '@media (max-width: 768px)': {
            gap: '20px',
            flexWrap: 'wrap',
            maxWidth: '300px',
            justifyContent: 'center',
        }
    },
    link: {
        textTransform: 'uppercase',
        color: 'rgba(255, 255, 255, 0.5)',
        "&:hover": {
            color: '#FFFFFF',
        },
        '@media (max-width: 520px)': {
            fontSize: '20px'
        }
    },
    activeLink: {
        color: '#FFFFFF',
        textTransform: 'uppercase',
        "&:hover": {
            color: '#FFFFFF',
        },
    },
    lowerFooter: {
        borderTop: '1px solid rgba(255, 255, 255, 0.7)'
    },
    lowerBottom: {
        display: 'flex',
        padding: '40px 0',
        alignItems: 'center',
        justifyContent: 'space-between',
        '@media (max-width: 768px)': {
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        '@media (max-width: 520px)': {
            padding: '20px 0'
        },
    },
    copyright: {
        textTransform: 'capitalize',
        color: 'rgba(255, 255, 255, 0.5)',
    },
    creditCards: {
        gap: '12px',
        display: 'flex'
    },
    img: {
        width: '50px',
        height: '30px',
        objectFit: 'contain'
    }
})