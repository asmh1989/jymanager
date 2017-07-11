import React, { Component } from 'react';
import App from './App.js'
import { Helmet } from "react-helmet";
import constant from '../constant.js';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';

import './Members.css'
import NewMember from '../components/NewMember.js'
import { withCookies } from 'react-cookie';

const querystring = require('querystring');
const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const cookie_key = 'members_key';
const cookie_openkey = 'members_openkey';

const menuOpenKeys = {
    '1':'sub1',
    '2':'sub1',
    '3':'sub1',
    '4':'sub2',
    '5':'sub2', 
}

class View extends Component {

    update = (data) => {
        console.log('user update: ', data);
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    menuSelect = (e) => {
        console.log(`menuselect : `, e);
        let newKey = Number.parseInt(e.key, 10);
        const {history, location} = this.props;
        history.push(`${location.pathname}?menu=${menuOpenKeys[newKey]}&key=${newKey}`);
    }

    getBreadcrumb = (key) => {
        if (key === 1) {
            return (
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>显示</Breadcrumb.Item>
                </Breadcrumb>
            )
        } else if (key === 2) {
            return (
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>新增</Breadcrumb.Item>
                </Breadcrumb>
            )
        } else if (key === 3) {
            return (
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>导入</Breadcrumb.Item>
                </Breadcrumb>
            )
        } else if (key === 4) {
            return (
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>门店管理</Breadcrumb.Item>
                    <Breadcrumb.Item>显示</Breadcrumb.Item>
                </Breadcrumb>
            )
        } else if (key === 5) {
            return (
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>门店管理</Breadcrumb.Item>
                    <Breadcrumb.Item>新增</Breadcrumb.Item>
                </Breadcrumb>
            )
        }
    };

    getMainContent = (key) => {
        if (key === 1) {
            // this.showAllMembers();
        } else if (key === 2) {
            
            return (
                <NewMember />
            )
        } else if (key === 3) {
            // this.importMembers();
        } else if (key === 4) {
            // this.showStores();
        } else if (key === 5) {
            // this.addNewStore();
        }
    }

    render() {
        const {location} = this.props;
        let str = location.search;
        let key = 1;
        let openkey = menuOpenKeys[1];
        if(str && str.indexOf('menu') != -1 && str.indexOf('key') != -1){
            str = str.substring(1);
            const query = querystring.parse(str);
            key =  Number.parseInt(query.key, 10);;
            openkey = query.menu;
        }
        
        let _Breadcrumb = this.getBreadcrumb(key);

        let mainContent = this.getMainContent(key);

        return (
            <App userChange={this.update} {...this.props}>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>

                            <Menu
                                mode="inline"
                                defaultSelectedKeys={[`${key}`]}
                                defaultOpenKeys={[openkey]}
                                style={{ borderRight: 0 }}
                                onSelect={this.menuSelect}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="user" />用户管理</span>}>
                                    <Menu.Item key="1">显示</Menu.Item>
                                    <Menu.Item key="2">新增用户</Menu.Item>
                                    <Menu.Item key="3">导入</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="laptop" />门店管理</span>}>
                                    <Menu.Item key="4">显示</Menu.Item>
                                    <Menu.Item key="5">新增门店</Menu.Item>
                                </SubMenu>
                            </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px ' }}>
                        {_Breadcrumb}

                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 360 }}>
                            {mainContent}
                        </Content>
                    </Layout>
                </Layout>
                <Helmet>
                    <title>用户{constant.title}</title>
                </Helmet>
            </App>
        );
    }
}

export default withCookies(View)