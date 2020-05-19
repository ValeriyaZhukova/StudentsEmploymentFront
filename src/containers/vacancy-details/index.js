import React, {Component} from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Row, Col, Typography, Card, Button} from "antd";
import {connect} from 'react-redux';

const {Title, Text} = Typography;

class VacancyDetails extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            vacancy: {},
            company: []
        }
    }

    componentDidMount() {
        console.log(this.props.match.params);
        axios.get(`/api/vacancy/${this.props.match.params.id}`)
            .then(res => {
                console.log("vacancy-details res.data", res.data);
                this.setState({vacancy: res.data});
                this.setState({company: res.data.company});
                console.log("vacancy-details company: ", this.state.company)
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        const {vacancy} = this.state;
        const {company} = this.state;
        return (
            <div className={"Vacancy"} style={{marginBottom: "80px"}}>
                <Row style={{margin: "160px 0 0", display: "flex", justifyContent: "center"}}>
                    <Col span={3} >
                        <div className={"concrete-recipe-img"}>
                            <img src={company.image} width={"100%"} height={"auto"}/>
                        </div>
                    </Col>
                    <Col span={15} style={{display: "flex", alignItems: "flex-start", flexDirection: "column", marginLeft: "40px"}}>
                        <Title level={2}>{vacancy.title}</Title>
                        <Text style={{fontSize: "1.5rem"}}>{company.name}</Text>
                        <Text style={{fontSize: "1rem"}}>{company.address}</Text>
                        <Text style={{fontSize: "1rem"}}>{company.website}</Text>
                        <Text style={{fontSize: "1.5rem"}}>Salary: {vacancy.salary}  <span>&#8376;</span></Text>
                        <Text style={{fontSize: "1rem"}}>Contract type: {vacancy.contract_type}</Text>
                        <br/>
                        <Text style={{fontSize: "1rem", color: "#000",  textAlign: "justify"}}>{vacancy.description}</Text>
                        <br/>
                    </Col>
                </Row>
                <Row style={{margin: "20px 0", display: "flex", justifyContent: "center"}}>
                    <Col span={15} style={{display: "flex", alignItems: "flex-start", flexDirection: "column"}}>
                        <Text style={{fontSize: "1.2rem"}}>Duties:</Text>
                        <Text style={{fontSize: "1.2rem", color: "#000", textAlign: "justify"}}>{vacancy.duties}</Text>
                        <br/>
                        <Text style={{fontSize: "1.2rem"}}>Requirements:</Text>
                        <Text style={{fontSize: "1.2rem", color: "#000", textAlign: "justify"}}>{vacancy.requirements}</Text>
                        <br/>
                        <Text style={{fontSize: "1.2rem"}}>Conditions:</Text>
                        <Text style={{fontSize: "1.2rem", color: "#000", textAlign: "justify"}}>{vacancy.conditions}</Text>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(VacancyDetails);