import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;

export default class NormalLoginForm extends Component {
  static state = {
    goHome: Boolean,
  }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor() {
    super();
    this.state = {
      goHome: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        let rem = values.remember ? '&remember=1' : '';
        let result = await fetch(`/api/login?username=${values.username}&password=${values.password}${rem}`);
        if (result.ok) {
          let res = await result.json();
          if (res.ret === 0) {
            if (res.token) {
              message.success('登录成功');
              this.props.cookies.set('token', res.token, { path: '/' });
              setTimeout(() => {
                this.setState({
                  goHome: true,
                })
              }, 200);
            } else {
              message.warning('登录异常,请询问管理员');
            }
          } else if (res.ret === 1) {
            this.props.form.setFields({
              username: {
                value: '',
                errors: [new Error(res.msg)]
              },
              password: {
                value: ''
              }
            });
          } else if (res.ret === 2) {
            this.props.form.setFields({
              password: {
                value: '',
                errors: [new Error(res.msg)]
              }
            });
          }
        } else {
          if (result.status === 500) {
            message.error('连接服务器失败');
          } else {
            message.error(result.statusText);
          }
        }
      }


    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const { goHome } = this.state;
    if (goHome) {
      return (
        <Redirect push to="/" />
      )
    }

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
        </FormItem>
        <FormItem style={{ 'display': 'flex', 'justify-content': 'space-between' }}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
            )}
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

