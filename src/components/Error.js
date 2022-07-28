import React, {Component} from 'react'
import {connect} from "react-redux";
import { NavLink} from "react-router-dom";

class Error extends Component {
    state = {
        toHome: false,
    }

    render() {

        return (
            <div className={'container'}>
                <h1>404</h1>
                <h3>Oops, seem like the page you are looking for is not exist</h3>
                <NavLink to='/' exact={'true'} activeclassname='active'>
                    Back to Home
                </NavLink>
            </div>
        )
    }
}

export default connect()(Error)
