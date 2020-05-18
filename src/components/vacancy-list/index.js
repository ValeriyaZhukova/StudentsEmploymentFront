import React, { Component } from 'react';
import { Card, Row, Col } from 'antd'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import './vacancy-list.css'

class VacancyList extends Component{
    constructor(){
        super()
        this.state = {
            vacancies: [],
            companies: {},
            count: 0
        }
    }

    onClick = (id) => {
        return () => {
            this.props.history.push(`/vacancy/${id}`)
        }
    }

    componentDidMount()
    {
        axios.get('/api/vacancy/')
            .then(res => {
                this.setState({vacancies: res.data});

                console.log("vacancy res.data", res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }


    render(){
        const {vacancies} = this.state;
        const vacancyList = vacancies.map(item =>(
            <Col span={8} key = {item.id} >
                <Card onClick={this.onClick(item.id)}
                    title={item.title} style={{ marginBottom: "16px", marginTop: "16px"}}>
                    <Col>
                        <img className={"recipe-img"} src={item.company.image} style={{width: "80%", marginBottom: "20px"}}/>
                    </Col>
                    <Col>
                        <h2>{item.company.name}</h2>
                        <h3>{item.company.city.city}</h3>
                        <p>{item.salary} <span>&#8376;</span></p>
                    </Col>


                </Card>
            </Col>

        ))

        return (
            <div style={{marginBottom: "0"}}>
                <div style={{marginTop: "80px"}}>
                    <h1>
                        Vacancies
                    </h1>
                </div>
                {this.state.title}
                <Row gutter = {16} className={"recipe-list-row"} style={{display: "flex",
                    justifyContent: "left",
                    flexWrap: "wrap",
                    paddingLeft: "12%",
                    paddingRight: "12%",
                    marginLeft: "0!important",
                    marginRight: "0!important"
                }}>
                    {vacancyList}
                </Row>
            </div>

        )
    }
}

export default withRouter(VacancyList);

