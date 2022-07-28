import React, {Component} from 'react'
import {connect} from 'react-redux'
import QuestionOverview from "./QuestionOverview";

class Dashboard extends Component {
    state = {
        displayMode: 'unanswered'
    }

    handleUnanswered = (e) => {
        this.setState({
            displayMode: 'unanswered'
        })
    }

    handleAnswered = (e) => {
        this.setState({
            displayMode: 'answered'
        })
    }


    render() {
        const {answeredQuestions, unansweredQuestions} = this.props
        const {displayMode} = this.state

        return (
            <div className={'dashboard-container'}>
                <div className={'dashboard-nav'}>
                    <button className={'nav-btn'} disabled={displayMode === 'unanswered'}
                            onClick={this.handleUnanswered}>Unanswered Questions
                    </button>
                    <button className={'nav-btn'} disabled={displayMode === 'answered'}
                            onClick={this.handleAnswered}>Answered Questions
                    </button>
                </div>
                <div className={'question-list-container'}>
                    {
                        displayMode === 'unanswered' ?
                            unansweredQuestions.map(question =>
                                <QuestionOverview key={question.id} status={'unanswered'} id={question.id}/>)
                            : answeredQuestions.map(question =>
                                <QuestionOverview key={question.id} status={'answered'} id={question.id}/>)
                    }
                </div>

            </div>
        )
    }
}

function mapStateToProps({authedUser, questions}) {
    const answeredQuestions = [];
    const unansweredQuestions = [];

    for (const [id, question] of Object.entries(questions)) {
        if (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) {
            answeredQuestions.push(question)
        } else {
            unansweredQuestions.push(question)
        }
    }

    return {
        authedUser,
        answeredQuestions,
        unansweredQuestions
    }
}

export default connect(mapStateToProps)(Dashboard)