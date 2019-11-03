import React from 'react'

import {Title } from './styles'

export default function Main(){
    let seconds = new Date().getSeconds()
    return <Title seconds={seconds}>Hello, Main
        <small>Just testing something</small>

    </Title>
}
