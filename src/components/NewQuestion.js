import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAddQuestion} from "../actions/questions";
import {Navigate} from "react-router-dom";

class NewTweet extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
    }
    handleChangeOptionOne = (e) => {
        const optionOne = e.target.value

        this.setState(() => ({
            optionOne
        }))
    }
    handleChangeOptionTwo = (e) => {
        const optionTwo = e.target.value

        this.setState(() => ({
            optionTwo
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const {optionOne, optionTwo} = this.state
        const {dispatch, authedUser} = this.props

        dispatch(handleAddQuestion(optionOne, optionTwo, authedUser))

        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            toHome: true,
        }))
    }

    render() {
        const {optionOne, optionTwo, toHome} = this.state

        if (toHome === true) {
            return <Navigate to='/' />
        }

        return (
            <div>
                <h3 className='center'>Create New Question</h3>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <label>Complete the question:</label>
                    <h4 className='center'>Would you rather ...</h4>
                    <input
                        placeholder="Enter Option One Text Here"
                        value={optionOne}
                        onChange={this.handleChangeOptionOne}
                    />
                    <h4 className='center'>OR</h4>
                    <input
                        placeholder="Enter Option Two Text Here"
                        value={optionTwo}
                        onChange={this.handleChangeOptionTwo}
                    />

                    <button
                        className='btn'
                        type='submit'
                        disabled={optionOne === '' || optionTwo === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewTweet)