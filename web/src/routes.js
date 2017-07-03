import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import Home from './pages/Home.js'
import Sign from './pages/SignIn.js'

class Root extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Home} />
                    <Route path='/user/sign_in' component={Sign} />
                </div>
            </Router>
        );
    }
}

export default Root;
