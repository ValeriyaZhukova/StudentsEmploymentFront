import React, { Component } from 'react'
import {Modal, Button, Form, Input, Select, Tooltip, AutoComplete} from 'antd'
import {loginUser, signupUser} from "../../store/actions/authActions";
import { connect } from "react-redux";
import Icon from "antd/lib/icon";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class SignUpModal extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.signupUser(values);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    render() {
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <Modal
                visible={this.props.openSignUp}
                title="Sign Up"
                onCancel={this.props.onClose}
                footer={null}
            >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item name="first_name">
                        <Input placeholder="First name"/>
                    </Form.Item>
                    <Form.Item name="last_name">
                        <Input placeholder="Last name"/>
                    </Form.Item>
                    <Form.Item name="email"  rules={[{ required: true }]}>
                        <Input placeholder="Email address"/>
                    </Form.Item>
                    <Form.Item name="password"  rules={[{ required: true}]}>
                        <Input type="password" placeholder="Password"/>
                    </Form.Item>
                    <Form.Item name="confirm"  rules={[{ required: true}]}>
                        <Input type="password" placeholder="Confirm Password"/>
                    </Form.Item>
                    <Form.Item name="phone_number">
                        <Input placeholder="Phone number"/>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

const wrappedSignupModal = (SignUpModal);
export default connect(null, {signupUser})(wrappedSignupModal);
