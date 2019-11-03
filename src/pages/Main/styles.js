import styled from 'styled-components'

export const Title = styled.h1`
    font-size: 24px;
    color: #7159c1;
    font-family: Arial, Helvetica, sans-serif;

    small {
        font-size: 12px;
        color: #333;
        display: ${props=>props.seconds%2 === 0 ? '' : 'none'};
    }
`