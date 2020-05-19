import React, {Component} from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Row, Col, Typography, Card, Button} from "antd";
import {connect} from 'react-redux';

const {Title, Text} = Typography;

class CompanyDetails extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            company: {},
            city: []
        }
    }

    componentDidMount() {
        console.log(this.props.match.params);
        axios.get(`/api/company/${this.props.match.params.id}`)
            .then(res => {
                console.log("company-details res.data", res.data);
                this.setState({company: res.data});
                this.setState({city: res.data.city});
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        const {company} = this.state;
        const {city} = this.state;
        return (
            <div className={"Company"} style={{marginBottom: "300px"}}>
                <Row style={{margin: "160px 0 0", display: "flex", justifyContent: "center"}}>
                    <Col span={3} >
                        <div className={"concrete-recipe-img"}>
                            <img src={company.image} width={"100%"} height={"auto"}/>
                        </div>
                    </Col>
                    <Col span={15} style={{display: "flex", alignItems: "flex-start", flexDirection: "column", marginLeft: "40px"}}>
                        <Text style={{fontSize: "1.5rem"}}>{company.name}</Text>
                        <Text style={{fontSize: "1rem"}}>{company.address}</Text>
                        <Text style={{fontSize: "1rem"}}>{company.website}</Text>
                        <Text style={{fontSize: "1rem"}}>{city.city}</Text>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(CompanyDetails);