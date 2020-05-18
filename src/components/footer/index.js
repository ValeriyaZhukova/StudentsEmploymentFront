import React, { Component } from 'react';
import {Col, Row} from "antd";
import './footer.css'

const footerLogo = "../img/Logo.png";

function Footer() {
    return(
        <div className={"footer"}>
            <Row style={{display: "flex", alignItems: "center", left: "0", bottom: "0",backgroundColor: "#000", color: "white"}}>
                <Col span={6}>
                    <img style={{width: "80px"}} className={"logo"} src={footerLogo} alt={""}/>
                </Col>
                <Col span={12}  >
                    <h2 style={{color: "#ffffff", lineHeight: "40px", marginTop: "20px"}}>Students Employment - The easiest way students find their job</h2>
                    <p style={{color: "#ffffff", lineHeight: "20px", marginBottom: "20px"}}>
                        Contact us on {' '}
                        <a style={{color: "#ffffff", textDecoration: "underline"}}>studentsemployee@gmail.com</a>
                    </p>
                </Col>
            </Row>
        </div>
    )
}

export default Footer;