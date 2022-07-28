import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

class LeaderBoard extends Component {

    render() {
        const {users} = this.props
        const leaderBoard = []

        for (const [id, user] of Object.entries(users)) {
            const answered = Object.keys(user.answers).length
            const created = user.questions.length
            const sum = answered + created
            const score = {
                id: user.id,
                name: user.name,
                avatarURL: user.avatarURL,
                answered,
                created,
                sum
            }

            leaderBoard.push(score)
        }

        leaderBoard.sort((a, b) => b.sum - a.sum)
        const slicedLeaderBoard = leaderBoard.slice(0, 3);
        return (
            <div className={'question'}>
                {slicedLeaderBoard.map((user, index) => (
                    <Fragment key={user.id}>
                        <div className={'question-header'}><b>Place {index + 1}</b></div>
                        <div className={'question-container'}>
                            <div className={'avatar-container'}>
                                <img className={'avatar-big'} src={user.avatarURL} alt=''/>
                            </div>
                            <div className={'question-content'}>
                                <h2>{user.name}</h2>
                                <div className={'result-container'}>
                                    <p className={'center'}>Answered questions: {user.answered}</p>
                                    <p className={'center'}>Created questions: {user.created}</p>
                                    <p className={'center'}>Score: {user.sum}</p>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                ))}

            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        users
    }
}

export default connect(mapStateToProps)(LeaderBoard)
