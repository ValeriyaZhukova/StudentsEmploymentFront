import React, { Component } from 'react';
import { Card, Row, Col } from 'antd'
import { Input } from 'antd';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import './vacancies.css'

class Vacancies extends Component{

    constructor(){
        super()
        this.state = {
            vacancies: [],
            companies: [],
            search: "",
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

    requestBack = (search) => {
        axios.get(`/api/search/vacancy/${search}`)
            .then(res => {
                this.setState({vacancies: res.data})
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    onChange = (e) => {
        this.setState({search: e.target.value})
        console.log(this.state.search)
        this.requestBack(e.target.value)
    }

    render(){
        const { Search } = Input;

        const {vacancies} = this.state;
        const vacancyList = vacancies.map(item =>(
            <Col span={8} key = {item.id} >
                <Card onClick={this.onClick(item.id)}
                      title={item.title} style={{ marginBottom: "16px", marginTop: "16px"}}>
                    <Col style={{height: "270px"}}>
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
                <div className={"sky-banner"}>
                    <Row style={{width: "80%"}} >
                        <Col span={24}>
                            <h1>Vacancies</h1>
                            <Search
                                placeholder="input search text"
                                enterButton="Search"
                                size="large"
                                value={this.state.search}
                                onChange={this.onChange}
                                type="text"
                            />
                        </Col>
                    </Row>
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

export default withRouter(Vacancies);
