import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Navigate} from "react-router-dom";

class QuestionOverview extends Component {
    state = {
        answer: '',
        navigate: false,
    }

    handleViewPoll = (e) => {
        e.preventDefault()
        this.setState({
            answer: '',
            navigate: true,
        })
    }

    render() {
        const {question, author, authedUser, status, id} = this.props
        const isOneChecked = question.optionOne.votes.includes(authedUser);

        const {navigate} = this.state
        if (navigate) {
            return <Navigate to={status === 'unanswered' ? ('/questions/' + id) : ('/result/' + id)}/>
        }
        return (
            <div className={'question'}>
                <div className={'question-header'}>{author.name} asks:</div>
                <div className={'question-container'}>
                    <div className={'avatar-container'}>
                        <img className={'avatar-big'} src={author.avatarURL} alt=''/>
                    </div>
                    <div className={'question-content'}>
                        <h2>Would You Rather ...</h2>
                        {isOneChecked ? <Fragment>
                            <div>{question.optionOne.text}</div>
                            <button
                                className='btn'
                                type='button'
                                onClick={this.handleViewPoll}>
                                View poll
                            </button>
                        </Fragment> : <Fragment>
                            <div>{question.optionTwo.text}</div>
                            <button
                                className='btn'
                                type='button'
                                onClick={this.handleViewPoll}>
                                View poll
                            </button>
                        </Fragment>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, {id, status}) {
    const question = questions[id]
    const author = users[question.author]
    return {
        authedUser,
        question,
        author,
        id, status
    }
}

export default connect(mapStateToProps)(QuestionOverview)
