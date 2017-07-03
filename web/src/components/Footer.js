import React, { Component } from 'react'

import { Layout, Card, Form } from 'antd';


const { Header, Footer, Content } = Layout;

const style = {
    'text-align': 'center',
};

class View extends Component {

    render() {
        return (
            <Footer style={style}>版权所有</Footer>
        )
    }
}


export default View;