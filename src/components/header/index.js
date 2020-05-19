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

const { SubMenu } = Menu;

class Header extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            openLogIn: false,
            openSignUp: false,
            user: {}
        }
    }

    openLogIn = () => {
        this.setState({openLogIn: true})
    }

    openSignUp = () => {
        this.setState({openSignUp: true})
    }

    closeSignUp = () => {
        this.setState({openSignUp: false})
    }

    closeLogIn = () => {
        this.setState({openLogIn: false})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated)
        {
            this.setState({openLogIn: false, openSignUp: false, user: nextProps});
            console.log("nextProps", nextProps)
        }
    }

    componentDidMount() {
        console.log("header props", this.props.auth.user.id)
        axios.get(`/api/user/${this.props.auth.user.id}`)
            .then(res => {
                console.log("header res data", res.data);
                this.setState({user: res.data});
                console.log("header state", this.state);
            })
            .catch(err => {
                console.log(err);
            })
    }


    render () {
        const isAuth = this.props.auth.isAuthenticated;
        const {id} = this.props.auth.user;
        console.log("user", {id});
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
        if (isAuth)
        {
            menu = (
                <Menu mode={"horizontal"}>
                    <Menu.Item key={1}><Link to={"/"}>Home</Link></Menu.Item>
                    <Menu.Item key={2}><Link to="/vacancies/">Vacancies</Link></Menu.Item>
                    <Menu.Item key={3}><Link to="/companies/">Companies</Link></Menu.Item>
                    <Menu.Item key={4}><Link to="/career_centers/">Career Centers</Link></Menu.Item>
                    <SubMenu
                        title={
                            <span className="submenu-title-wrapper">
                            Profile
                        </span>
                        }
                    >
                        <Menu.Item key="setting:7"><Link to={`/profile/${id}`}>My account</Link></Menu.Item>
                        <Menu.Item key="setting:8" onClick={this.props.logoutUser}>Log out</Menu.Item>
                    </SubMenu>
                </Menu>
            )
        }

        return (
            <header className={"header"}>
                <Row style={{display: "flex", alignItems: "center"}}>
                    <Col span={6}>
                        <img style={{width: "80px"}} className={"logo"} src={logo} alt={""}/>
                    </Col>
                    <Col span={14}>
                        {menu}
                    </Col>
                </Row>
                <SignUpModal openSignUp={this.state.openSignUp} onClose={this.closeSignUp}/>
                <LogInModal openLogIn={this.state.openLogIn} onClose={this.closeLogIn}/>
            </header>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(Header);
