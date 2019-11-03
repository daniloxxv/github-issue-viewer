import styled from 'styled-components'

export const Title = styled.h1`
    color: #FFF;

    small {
        font-size: 12px;
        color: #333;
        display: ${props=>props.seconds%2 === 0 ? '' : 'none'};
    }
`