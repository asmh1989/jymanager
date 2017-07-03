import React, { Component } from 'react'
import { instanceOf } from 'prop-types';

import { withCookies, Cookies } from 'react-cookie';
import { Layout, Card, Form } from 'antd';
import './SignIn.css'
import Login from '../components/NormalLoginForm.js';
import Footer from '../components/Footer.js';
import {Helmet} from "react-helmet";
import constant from '../constant.js';

const { Header, Content } = Layout;

class Sign extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    render() {

        const WrappedNormalLoginForm = Form.create()(Login);

        return (
        <div>
            <Layout>
                <Header className="Header">帐号</Header>
                <Content className="Content">
                    <Card className="Card" title="登录">
                        <WrappedNormalLoginForm />
                    </Card>
                </Content>
                <Footer />
            </Layout>
            <Helmet>
                <meta charSet="utf-8" />
                <title>登录{constant.title}</title>
            </Helmet>
        </div>)
    }
}

export default withCookies(Sign);