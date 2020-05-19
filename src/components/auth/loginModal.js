import React, { Component } from 'react';
import { Menu, Modal, Button, Form, Input } from 'antd';
import axios from 'axios';
import { loginUser } from '../../store/actions/authActions';
import { connect } from 'react-redux'
import Icon from "@ant-design/icons/lib";

class LogInModal extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err)
            {
                this.props.loginUser(values);
            }
        });
    };

    render() {
        return (
            <Modal
                visible={this.props.openLogIn}
                title="Login"
                onCancel={this.props.onClose}
                footer={null}
            >
                <Form onSubmit={this.handleSubmit} className="login-form" >
                    <Form.Item name="email"  rules={[{ required: true }]}>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email address"
                        />
                    </Form.Item>
                    <Form.Item name="password"  rules={[{ required: true }]}>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Login
                        </Button>
                        <br/>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

const wrappedLoginModal = (LogInModal);
export default connect(null, {loginUser})(wrappedLoginModal);
