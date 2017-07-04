import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import Home from './pages/Home.js';
import Sign from './pages/SignIn.js';
import Member from './pages/Members.js';
import House from './pages/Houses.js';
import Order from './pages/Orders.js';

class Root extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path='/members' component={Member} />
                    <Route exact path='/orders' component={Order} />
                    <Route exact path='/houses' component={House} />
                    <Route exact path="/user/sign_in" component={Sign} />
                </div>
            </Router>
        );
    }
}

export default Root;
