import React, { Component } from 'react';
import App from './App.js'

class View extends Component {
    render() {
        return (
            <App {...this.props}> Homes
            </App>
        );
    }
}

export default View