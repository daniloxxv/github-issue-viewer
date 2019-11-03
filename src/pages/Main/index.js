import React, {Component} from 'react'

import {FaGithubAlt, FaPlus} from 'react-icons/fa'

import {Container, Form, SubmitButton} from './styles'

export default class Main extends Component(){
    return <Container>
        <h1>
            <FaGithubAlt/>
            Repositories
        </h1>
        <Form onSubmit={()=>{}}>
            <input 
                type="text"
                placeholder="Add repository"
            />

            <SubmitButton disabled>
                <FaPlus color="FFF" size="14"/>
            </SubmitButton>

        </Form>
    </Container>
}
