import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {handleAnswerQuestion} from "../actions/questions";
import {Navigate} from "react-router-dom";

class Question extends Component {
    state = {
        answer: '',
        toResult: false,
    }

    isDisableSubmit = true;


    onValueChange = (event) => {
        this.setState({
            answer: event.target.value
        });
        this.isDisableSubmit = false
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch, questions, authedUser, qid} = this.props
        const question = questions[qid]
        const {answer} = this.state

        dispatch(handleAnswerQuestion(authedUser, qid, answer, question))
        this.setState({
            answer: '',
            toResult: true,
        });
    }

    render() {
        const {questions, users, authedUser, qid} = this.props

        const question = questions[qid]
        if(!question){
            return <Navigate to={'/404'}/>
        }

        const author = users[question.author]
        const {answer, toResult} = this.state
        const isOneChecked = question.optionOne.votes.includes(authedUser);
        const isTwoChecked = question.optionTwo.votes.includes(authedUser);

        if (isOneChecked || isTwoChecked) {
            return <Navigate to={'/result/' + qid}/>
        }

        if (toResult) {
            return <Navigate to={'/result/' + qid}/>
        }
        return (
            <div className={'question'}>
                <div className={'question-header'}>{author.name} asks:</div>
                <div className={'question-container'}>
                    <div className={'avatar-container'}>
                        <img className={'avatar-big'} src={author.avatarURL} alt=''/>
                    </div>
                    <div className={'question-content'}>
                        <form onSubmit={this.handleSubmit}>
                            <h2>Would You Rather ...</h2>
                            <Fragment>
                                <div>
                                    <input type="radio" name="choice" value='optionOne'
                                           onChange={this.onValueChange}/> {question.optionOne.text}
                                </div>
                                <div>
                                    <input type="radio" name="choice" value='optionTwo'
                                           onChange={this.onValueChange}/> {question.optionTwo.text}
                                </div>
                                <button
                                    className='btn'
                                    type='submit'
                                    disabled={answer === ''}>
                                    Submit
                                </button>
                            </Fragment>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, {id}) {
    return {
        authedUser,
        questions,
        users,
        qid: id
    }
}

export default connect(mapStateToProps)(Question)
