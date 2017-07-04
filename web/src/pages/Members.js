import React, { Component } from 'react';
import App from './App.js'
import { Helmet } from "react-helmet";
import constant from '../constant.js';

class View extends Component {
    render() {
        return (
            <App {...this.props}> Members
                <Helmet>
                    <title>用户{constant.title}</title>
                </Helmet>
            </App>
        );
    }
}

export default View