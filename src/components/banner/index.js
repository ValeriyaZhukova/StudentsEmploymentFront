import React, { Component } from 'react';
import './banner.css';
import {Col, Row, Search} from "antd";

function Banner()
{
    return (
        <div className={"banner"}>
            <Row>
                <Col span={24}>
                    <h1>Students Employment</h1>
                    <h3>The easiest way the students get their job</h3>
                </Col>
            </Row>
        </div>
    )
}

export default Banner;
