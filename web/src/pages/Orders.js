import React, { Component } from 'react';
import App from './App.js'
import { Helmet } from "react-helmet";
import constant from '../constant.js';

class View extends Component {
    render() {
        return (
            <App {...this.props}> Orders
                <Helmet>
                    <title>订单{constant.title}</title>
                </Helmet>
            </App>
        );
    }
}

export default View