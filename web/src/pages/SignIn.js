import React, { Component } from 'react'
import { instanceOf } from 'prop-types';

import { withCookies, Cookies } from 'react-cookie';

class Sign extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    render() {
        return (<div> signin </div>)
    }
}

export default withCookies(Sign);