import React, { Component } from 'react';
import { instanceOf } from 'prop-types';

import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from 'react-router'

class Home extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    componentWillMount() {
        const { cookies } = this.props;

        this.state = {
            token: cookies.get('token') || null
        };
    }

    render() {
        const { token } = this.state;
        if (token) {
            return (
                <div>
                    home
            </div>
            );
        } else {
            return (
                <Redirect to="/user/sign_in" />
            );
        }

    }
}

export default withCookies(Home);