import React from 'react'

import {ErrorContainer, Message} from './styles'

export default function Error({message}){
    return (
        <ErrorContainer>
            <Message>{message}</Message>
        </ErrorContainer>
    )
}