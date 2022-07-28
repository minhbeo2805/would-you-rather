import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleGetLatestData} from '../actions/shared'
import Dashboard from './Dashboard'
import Question from "./Question";
import {LoadingBar} from "react-redux-loading";
import LeaderBoard from "./LeaderBoard";
import NewQuestion from "./NewQuestion";
import Nav from "./Nav";
import Result from "./Result";
import SignIn from "./SignIn";
import {setAuthedUser} from "../actions/authedUser";
import users from "../reducers/users";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleGetLatestData())
    }

    render() {
        const QuestionWrapper = (props) => {
            const {id} = useParams();
            return <Question id={id}/>
        }

        const ResultWrapper = (props) => {
            const {id} = useParams();
            return <Result id={id}/>
        }

        const {authedUser, users, questions} = this.props

        const isReady = Object.keys(users).length > 0 &&  Object.keys(questions).length > 0

        if(!authedUser){
            // console.log('coin carrd')
            return <SignIn />
        }
        return (
            <Router>
                <LoadingBar/>
                {isReady ?
                    <Fragment>
                        <div className={'container'}>
                            <Nav/>
                            <Routes>
                                <Route path='/signin' element={<SignIn/>}/>
                                <Fragment>
                                    <Route path='/' exact={'true'} element={<Dashboard/>}/>
                                    <Route path='/questions/:id' element={<QuestionWrapper/>}/>
                                    <Route path='/result/:id' element={<ResultWrapper/>}/>
                                    <Route path='/add' element={<NewQuestion/>}/>
                                    <Route path='/leaderboard' element={<LeaderBoard/>}/>
                                </Fragment> : null}

                            </Routes>
                        </div>
                    </Fragment>: null
                }
            </Router>
        )
    }
}

function mapStateToProps({users, authedUser, questions}) {
    return {users, authedUser, questions}
}


export default connect(mapStateToProps)(App)
