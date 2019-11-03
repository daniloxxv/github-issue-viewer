import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {FaGithubAlt, FaPlus, FaSpinner} from 'react-icons/fa'

import api from '../../services/api'

import {Form, SubmitButton, List } from './styles'
import Container from '../../components/Container'
import Error from '../../components/Error'


export default class Main extends Component {
    state = {
        newRepo: '', 
        repositories: [{name: "facebook/react"}, {name: "angular/angular"},{name: "vuejs/vue"}],
        loading: false,
        displayErrorMessage: false
    }

    componentDidMount(){
        const repositories = localStorage.getItem('repositories')
        if (repositories){
            this.setState({repositories: JSON.parse(repositories)})
        }
    }

    componentDidUpdate(_,prevState){
        const {repositories} = this.state
        if (prevState.repositories !== repositories){
            localStorage.setItem('repositories', JSON.stringify(repositories))
        }
    }

    handleInputChange = e => {
        this.setState({newRepo: e.target.value})
    }

    handleSubmit = e => {

        e.preventDefault()
        
        this.setState({loading: true})
        const {newRepo, repositories} = this.state

        api.get(`repos/${newRepo}`)
        .then(response=>{
            const data = {  name: response.data.full_name }
    
            this.setState({
                repositories: [...repositories, data], 
                newRepo: '',
                loading: false,
                errorMessage: ''
            })
        })
        .catch(err =>{
            this.setState({
                loading: false,
                errorMessage: 'Invalid repository url. Make sure you follow the owner/repository_name format.'
            })
        })
    }

    handleDelete = index => {
        const { repositories } = this.state
        this.setState({
            repositories: [...repositories.slice(0,index), ...repositories.slice(index+1)]
        })
    }

    render(){
        const {newRepo, loading, repositories, errorMessage} = this.state

        return (
            <Container>
                <h1>
                    <FaGithubAlt/>
                    Repository issue viewer
                </h1>
                <Form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Add repository"
                        value = {newRepo}
                        onChange = {this.handleInputChange}
                    />

                    <SubmitButton loading={loading ? 1 : 0}>
                        {loading ? <FaSpinner color="FFF" size="14"/> : <FaPlus color="FFF" size="14"/>}
                    </SubmitButton>

                </Form>

                <Error message={errorMessage}/>
                
                <List>
                    {repositories.map((repository, i)=>(
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <span>
                            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>View the latest open issues</Link>
                            <button onClick={()=>this.handleDelete(i)}>Remove</button>
                            </span>
                        </li>

                    ))}
                </List>
            </Container>
        )
    }
}
