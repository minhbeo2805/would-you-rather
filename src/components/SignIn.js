import React, {Component} from 'react'
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {setAuthedUser} from "../actions/authedUser";

class SignIn extends Component {
    state = {
        toHome: false,
        authedUser: 'N/A'
    }

    handleChange = (event) => {
        this.setState({authedUser: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.authedUser !== 'N/A'){
            const {dispatch} = this.props
            dispatch(setAuthedUser(this.state.authedUser))
            this.setState({
                toHome: true,
                authedUser: ''
            });
        }else{
            alert('Please choose an user')
        }
    }

    render() {
        const {userList} = this.props
        const {toHome} = this.state
        if(toHome){
            return <Navigate to='/' />
        }

        return (
            <div className={'container'}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Please choose user:
                        <select onChange={this.handleChange}>
                            <option value="N/A">N/A</option>
                            {
                                userList.map((user,index)=><option key={user.id} value={user.id}>{user.name}</option>)
                            }
                        </select>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    const userList = []
    for (const [id, user] of Object.entries(users)) {
        const data = {
            id: user.id,
            name: user.name
        }

        userList.push(data)
    }
    return {
        userList
    }
}

export default connect(mapStateToProps)(SignIn)
