import React, { Component } from 'react';
import App from './App.js'
import { Helmet } from "react-helmet";
import constant from '../constant.js';
import { Layout, Menu, Icon, Breadcrumb, Affix, Spin } from 'antd';

import './Members.css'

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class View extends Component {

    update = (data) => {
        console.log('user update: ', data);
    }

    constructor() {
        super();
        this.state = {
            contentLoading: true,
            key: 1,
        }
    }

    componentDidMount() {
    }

    menuSelect = ({ key }) => {
        console.log(`menuselect : `, key);
        this.setState({
            key: Number.parseInt(key),
            contentLoading: true,
        });
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
            this.showAllMembers();
        } else if (key === 2) {
            this.addNewMember();
        } else if (key === 3) {
            this.importMembers();
        } else if (key === 4) {
            this.showStores();
        } else if (key === 5) {
            this.addNewStore();
        }
    }

    render() {
        const { key, contentLoading } = this.state;

        let _Breadcrumb = this.getBreadcrumb(key);

        let mainContent;
        if (contentLoading) {
            mainContent = <div className='Loading'>
                <Spin size="large" tip="加载中, 请稍候..."/>
            </div>
        } else {
            mainContent = this.getMainContent(key);
        }

        return (
            <App userChange={this.update} {...this.props}>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>

                        <Affix>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
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
                        </Affix>
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

export default View