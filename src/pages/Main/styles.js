import styled, {keyframes, css} from 'styled-components'

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid #eee;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
    }
`

const rotate = keyframes`
    from {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(360deg)
    }
`

export const SubmitButton = styled.button.attrs(props=>({type: 'submit', disabled: props.loading}))`
    background: #7159c1;
    border: 0;
    padding: 0 15px;
    border-radius: 4px;
    margin: 0 20px;
    display: flex;
    justify-content: center;
    align-content: center;

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
    }

    svg {
        margin-left: 5px;
    }

    ${props => props.loading && css`        
        svg {
            animation: ${rotate} 2s linear infinite;
        }`
    }
`
export const List = styled.ul`
    list-style: none;
    margin-top: 10px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        & + li {
        border-top: 1px solid #eee;
    }

    a {
        color: #7159c1;
        text-decoration: none;
    }

    button {
        background-color: #7159c1;
        font-size: 14px;
        margin-left: 30px;
        color: #FFF;
        box-shadow: none;
        border: none;
        padding: 4px 8px;
        border-radius: 4px;

        
        &:hover{
            background-color: #FFF;
            color: #7159c1;
        }
    }
}
`

