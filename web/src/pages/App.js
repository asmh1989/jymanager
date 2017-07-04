import React, { PureComponent } from 'react';
import { instanceOf } from 'prop-types';

import { withCookies, Cookies } from 'react-cookie';
import { Redirect, Link } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import Footer from '../components/Footer.js';
import './App.css'

const { Header, Content } = Layout;

const MenuItem = Menu.Item;

class Home extends PureComponent {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  static state = {
    signout: Boolean,
  }

  constructor(props) {
    super(props)

    let token = props.cookies.get('token');

    this.state = {
      signout: false,
      token: token ? token : null
    }
    // console.log('get token: ', token);
  }

  Logout = () => {
    const { cookies } = this.props;
    cookies.remove('token', { path: '/' });
    this.setState({
      signout: true,
    })
  }

  accountMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <a target="_blank" >个人信息</a>
        </Menu.Item>
        <Menu.Divider style={{ padding: 10 }} />
        <Menu.Item>
          <a target="_blank" onClick={this.Logout}>注销</a>
        </Menu.Item>
      </Menu>
    );
  }

  componentDidMount() {
    const { token } = this.state;
    


  }

  render() {
    const { signout = false, token } = this.state;

    if (token && !signout) {
      const { children, location } = this.props;
      let activeMenuItem = location.pathname;
      // console.log('route path =', activeMenuItem);

      let index = activeMenuItem.substr(1).indexOf('/');
      if (index > 0) {
        activeMenuItem = activeMenuItem.substr(0, index + 1);
      }

      return (
        <div>
          <Layout>
            <Header className="Header">
              <Avatar style={{ backgroundColor: '#87d068', 'align-items': 'center' }} src='/LOGO.png' size='large' />

              <div className='HeaderRight'>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={[activeMenuItem]}
                  selectedKeys={[activeMenuItem]}
                  style={{ lineHeight: '64px', fontSize: 20 }}>
                  <MenuItem key='/'>
                    <Link to='/'>首页</Link>
                  </MenuItem>
                  <MenuItem key='/members'>
                    <Link to='/members'>用户</Link>
                  </MenuItem>
                  <MenuItem key='/orders'>
                    <Link to='/orders'>订单</Link>
                  </MenuItem>
                  <MenuItem key='/houses'>
                    <Link to='/houses'>房源</Link>
                  </MenuItem>
                </Menu>

              </div>
              <Dropdown overlay={this.accountMenu()} placement='bottomLeft'>
                <Avatar icon="user" />
              </Dropdown>
            </Header>
            <Content className="Content">
              {children}
            </Content>
            <Footer />
          </Layout>
        </div>
      );
    } else {
      return (
        <Redirect push to="/user/sign_in" />
      );
    }

  }
}

export default withCookies(Home);
