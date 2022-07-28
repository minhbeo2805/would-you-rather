import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Navigate} from "react-router-dom";

class Result extends Component {

    render() {
        const {questions, users, authedUser, qid} = this.props

        const question = questions[qid]
        if(!question){
            return <Navigate to={'/404'}/>
        }

        const author = users[question.author]

        const optionOneVoteCount = question.optionOne.votes.length
        const optionTwoVoteCount = question.optionTwo.votes.length
        const sumVote = optionOneVoteCount + optionTwoVoteCount

        const optionOnePercent = ((100 * optionOneVoteCount) / sumVote).toFixed(2);
        const optionTwoPercent = 100 - Number(optionOnePercent)
        const isOneChecked = question.optionOne.votes.includes(authedUser);
        const isTwoChecked = question.optionTwo.votes.includes(authedUser);

        if (!isOneChecked && !isTwoChecked) {
            return <Navigate to={'/questions/' + qid}/>
        }

        return (
            <div className={'question'}>
                <div className={'question-header'}><b>Asked by {author.name}</b></div>
                <div className={'question-container'}>
                    <div className={'avatar-container'}>
                        <img className={'avatar-big'} src={author.avatarURL} alt=''/>
                    </div>
                    <div className={'question-content'}>
                        <h2>Result: </h2>
                        <Fragment>
                            <div className={'result-container'}>
                                <div>{question.optionOne.text} {isOneChecked ? '( Your choice)' : null}</div>
                                <p className={'center'}>{optionOnePercent}%</p>
                                <p className={'center'}>{optionOneVoteCount} out of {sumVote}</p>
                            </div>

                            <div className={'result-container'}>
                                <div>{question.optionTwo.text} {!isOneChecked ? '( Your choice)' : null}</div>
                                <p className={'center'}>{optionTwoPercent}%</p>
                                <p className={'center'}>{optionTwoVoteCount} out of {sumVote}</p>
                            </div>
                        </Fragment>
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

export default connect(mapStateToProps)(Result)
