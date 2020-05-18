import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Menu, Input} from 'antd';
import './header.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUpModal from '../auth/signupModal';
import LogInModal from '../auth/loginModal';
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";
import axios from "axios";

const logo = "../img/Logo.png";

const {Search} = Input;

const { SubMenu } = Menu;

class Header extends Component
{
    render () {
        let menu = (
            <Menu mode={"horizontal"}>
                <Menu.Item key={1}><Link to={"/"}>Home</Link></Menu.Item>
                <Menu.Item key={2}><Link to="/vacancies/">Vacancies</Link></Menu.Item>
                <Menu.Item key={3}><Link to="/companies/">Companies</Link></Menu.Item>
                <Menu.Item key={4}><Link to="/career_centers/">Career Centers</Link></Menu.Item>
                <Menu.Item key={5} onClick={this.openSignUp}>Sign up</Menu.Item>
                <Menu.Item key={6} onClick={this.openLogIn}>Log in</Menu.Item>
            </Menu>
        )

        return (
            <header className={"header"}>
                <Row style={{display: "flex", alignItems: "center"}}>
                    <Col span={6}>
                        <img style={{width: "80px"}} className={"logo"} src={logo} alt={""}/>
                    </Col>
                    <Col span={10}>
                        {menu}
                    </Col>
                    <Col span={8}>
                        <Search
                            className={"search"}
                            placeholder="Find a recipe"
                            enterButton="Search"
                            onSearch={value => console.log(value)}
                        />
                    </Col>
                </Row>
            </header>
        )
    }
}


export default connect()(Header);
