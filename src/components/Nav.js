import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux";
import {setAuthedUser, unsetAuthedUser} from "../actions/authedUser";

class Nav extends Component {
    handleLogOut = (e)=>{
        const {dispatch} = this.props
        dispatch(unsetAuthedUser())
    }
    render() {
        const { authedName} = this.props

        return (
            <nav className='nav'>
                {authedName ? <ul className={'nav-list'}>
                    <li className={'nav-option'}>
                        <NavLink to='/' exact={'true'} activeclassname='active'>
                            Home
                        </NavLink>
                    </li>
                    <li className={'nav-option'}>
                        <NavLink to='/add' activeclassname='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li className={'nav-option'}>
                        <NavLink to='/leaderboard' activeclassname='active'>
                            Leader Board
                        </NavLink>
                    </li>
                    <li className={'nav-name'}>
                        <div>Hello {authedName}</div>
                    </li>

                    <li className={'nav-logout'}>
                        <button onClick={this.handleLogOut}>Log out</button>
                    </li>
                </ul> : null}

            </nav>
        )
    }

}


function mapStateToProps({authedUser, users}) {
    const authedName = authedUser && users[authedUser] ? users[authedUser].name : null
    return {
        authedUser,
        authedName
    }
}

export default connect(mapStateToProps)(Nav)