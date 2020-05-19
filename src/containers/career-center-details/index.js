import React, {Component} from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Row, Col, Typography, Card, Button} from "antd";
import {connect} from 'react-redux';

const {Title, Text} = Typography;

class CareerCenterDetails extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            careerCenter: {},
            institution: []
        }
    }

    componentDidMount() {
        console.log(this.props.match.params);
        axios.get(`/api/career_center/${this.props.match.params.id}`)
            .then(res => {
                console.log("career res.data", res.data);
                this.setState({careerCenter: res.data});
                this.setState({institution: res.data.institution});
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        const {career_center} = this.state;
        const {institution} = this.state;
        return (
            <div className={"Company"} style={{marginBottom: "400px"}}>
                <Row style={{margin: "160px 0 0", display: "flex", justifyContent: "center"}}>
                    <Col span={3} >
                        <div className={"concrete-recipe-img"}>
                            <img src={institution.image} width={"100%"} height={"auto"}/>
                        </div>
                    </Col>
                    <Col span={15} style={{display: "flex", alignItems: "flex-start", flexDirection: "column", marginLeft: "40px"}}>
                        <Text style={{fontSize: "1.5rem"}}>{institution.name}</Text>
                        <Text style={{fontSize: "1rem"}}>{institution.address}</Text>
                        <Text style={{fontSize: "1rem"}}>{institution.website}</Text>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(CareerCenterDetails);