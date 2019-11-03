import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {FaSpinner} from 'react-icons/fa'

import api from '../../services/api'
import { Loading, Owner, IssueList} from './styles'
import Container from '../../components/Container'



export default class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string
            })
        }).isRequired,
    }

    state = {
        repository: {},
        issues: [],
        loading: true
    }

    async componentDidMount(){
        const {match} = this.props
        const repoName = decodeURIComponent(match.params.repository)

        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'open',
                    per_page: 5
                }
            })
        ])

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false
        })

    }

    render(){
        const {repository, issues, loading} = this.state
        if (loading){
            return (<Loading> <span>Loading repository data...</span><FaSpinner/> </Loading>)
        }

        return (
            <Container> 
                <Owner>
                    <Link to="/">Return to main page</Link>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>
                <IssueList>
                    {issues.map(issue=>(
                        <li key={`${issue.id}`}>
                            <img src={issue.user.avatar_url} alt={issue.user.login}/>
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label=>(
                                       <small key={`${label.id}`}>{label.name}</small> 
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}

                </IssueList>
            </Container>
        )
    }

}   