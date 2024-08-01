import { makeStyles } from '@material-ui/core';
import styled from "styled-components";

export const globalStyles = makeStyles({
    para: {
        fontSize: '20px',
        color: '#353535',
        fontWeight: '400',
        lineHeight: '27px',
        fontStyle: 'normal',
        fontFamily: 'Avenir LT Std',
        '@media (max-width: 520px)': {
            fontSize: '16px',
        },
    },
    h4: {
        fontSize: '32px',
        color: '#353535',
        fontWeight: '700',
        lineHeight: '38px',
        fontStyle: 'normal',
        fontFamily: 'Denish',
        '@media (max-width: 520px)': {
            fontSize: '28px',
        },
    },
    h6: {
        color: '#353535',
        fontSize: '48px',
        fontWeight: '700',
        lineHeight: '66px',
        fontStyle: 'normal',
        fontFamily: 'Denish',
        '@media (max-width: 520px)': {
            fontSize: '27px',
            lineHeight: '40px',
        },
    }
})

export const Button = styled.button`
    width: 191px;
    height: 68px;
    font-size: 20px;
    line-height: 20px;
    font-style: normal;
    color: ${props => props.color};
    background: ${props => props.bg};
    backdrop-filter: blur(4.18165px);
    font-family: ${props => props.font};
    font-weight: ${props => props.weight ? props.weight : 400};
    text-transform: ${props => props.textTransform && props.textTransform};
`