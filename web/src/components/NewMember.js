import React, { Component } from 'react'
import { Form, Input, DatePicker, Select, Button, InputNumber, Radio, Upload, Icon } from 'antd';
import constant from '../constant.js';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class MemberForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    checkPhone = (rule, value, callback) => {
        if (value) {
            let req = /^1[0-9]{10}$/;
            if(!req.test(value)){
                callback('格式错误');
            } else {
                callback();
            }
        } else {
            callback();
        }
    }

    normFile = (e) => {
        // console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const config = {
            rules: [{ type: 'object', required: true, message: '请选择' }],
        };

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 4 },
                sm: { span: 3 },
                md: { span: 2 },
                lg: { span: 1.5 },
            },
        };

        const tailFormItemLayout = {
        wrapperCol: {
            xs: {
            span: 24,
            offset: 0,
            },
            sm: {
            span: 14,
            offset: 6,
            },
        },
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入姓名',
                        }],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="职位"
                >
                    {getFieldDecorator('job', {
                        rules: [{
                            required: true, message: '请输入职位',
                        }],
                        initialValue: 'job'
                    })(
                         <Select>
                             {
                                 constant.jobs.map(
                                     (value, index)=>                            
                                     <Option value={`job${index === 0 ? '': index}`} key={`${index}`}>{value}</Option>)
                             }
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="入职日期"
                >
                    {getFieldDecorator('date', config)(
                        <DatePicker />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="底薪"
                    hasFeedback
                >
                    {getFieldDecorator('basicmoney', {
                        rules: [{
                            required: true, message: '请输入底薪',
                        }],
                        initialValue: 1000
                    })(
                            <InputNumber  min={1000} max={100000} step='500'/>
                        )}
                    <span className="ant-form-text">元</span>

                </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="门店"
                    >
                        {getFieldDecorator('store')(
                            <Input />
                        )}
                    </FormItem>
                <FormItem
                    {...formItemLayout2}
                    label="录用途径"
                >
                    {getFieldDecorator('entryway', {
                        rules: [{
                            required: true, message: '请选择',
                        }],
                        initialValue: "way"
                    })(
                         <Select>
                             {
                                 constant.ways.map(
                                     (value, index)=>                            
                                     <Option value={`way${index === 0 ? '': index}`} key={`${index}`}>{value}</Option>)
                             }
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="介绍人"
                    hasFeedback
                >
                    {getFieldDecorator('introduceri', {
                        rules: [],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="师傅"
                    hasFeedback
                >
                    {getFieldDecorator('master', {
                        rules: [],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="身份证号"
                    hasFeedback
                >
                    {getFieldDecorator('idnumber', {
                        rules: [{
                            required: true, message: '请输入',
                        }],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="婚姻状况"
                >
                {getFieldDecorator('maritalstatus', {
                    rules:[{
                        required: true, message: '请选择',
                    }],
                    initialValue: "maritalstatus"

                })(
                    <RadioGroup>
                    {
                        constant.maritalstatus.map(
                             (value, index)=>                            
                        <Radio value={`maritalstatus${index === 0 ? '': index}`} key={`${index}`}>{value}</Radio>)
                    }
                    </RadioGroup>
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="性别"
                >
                {getFieldDecorator('gender', {
                    rules:[{
                        required: true, message: '请选择',
                    }],
                    initialValue: "gender"

                })(
                    <RadioGroup>
                    {
                        constant.gender.map(
                             (value, index)=>                            
                        <Radio value={`gender${index === 0 ? '': index}`} key={`${index}`}>{value}</Radio>)
                    }
                    </RadioGroup>
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号码"
                    hasFeedback
                >
                    {getFieldDecorator('phone', {
                        rules: [{
                            required: true, message: '请输入',
                        },{
                         validator: this.checkPhone,
                        }]
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="户籍地址"
                >
                    {getFieldDecorator('address', {
                        rules: []
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="现住址"
                >
                    {getFieldDecorator('addressnow', {
                        rules: []
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="学历"
                >
                    {getFieldDecorator('education', {
                        rules: []
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="毕业院校"
                >
                    {getFieldDecorator('school', {
                        rules: []
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="专业"
                >
                    {getFieldDecorator('specialty', {
                        rules: []
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="银行卡号"
                >
                    {getFieldDecorator('banknumber', {
                        rules: []
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="开户行"
                >
                    {getFieldDecorator('bankname', {
                        rules: []
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="身份证正反照"
                extra="两张,确保照片清晰"
                >
                {getFieldDecorator('idnumbericons', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                })(
                    <Upload name="logo" action="http://localhost:7008/api/upload" listType="picture" accept="image/*">
                        <Button>
                            <Icon type="upload" /> 上传
                        </Button>
                    </Upload>
                )}
                </FormItem>
    
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

class View extends Component {

    render() {
        const WrappedTimeRelatedForm = Form.create()(MemberForm);

        return (
            <WrappedTimeRelatedForm />
        )
    }
}


export default View;