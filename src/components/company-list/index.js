import React, { Component } from 'react';
import { Card, Row, Col } from 'antd'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import './vacancy-list.css'

class CompanyList extends Component{
    constructor(){
        super()
        this.state = {
            companies: [],
            count: 0
        }
    }

    onClick = (id) => {
        return () => {
            this.props.history.push(`/company/${id}`)
        }
    }

    componentDidMount()
    {
        axios.get('/api/company/')
            .then(res => {
                this.setState({companies: res.data});
                console.log("company res.data", res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }


    render(){
        const {companies} = this.state;
        const companyList = companies.map(item =>(
            <Col span={4} key = {item.id} >
                <Card onClick={this.onClick(item.id)} bordered={false}>
                    <img className={"recipe-img"} src={item.image} style={{width: "100%", marginBottom: "20px"}}/>
                </Card>
            </Col>

        ))

        return (
            <div style={{marginBottom: "80px"}}>
                <div style={{marginTop: "80px"}}>
                    <h1>
                        Companies
                    </h1>
                </div>
                {this.state.name}
                <Row gutter = {16} className={"recipe-list-row"} style={{display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    flexWrap: "wrap",
                    paddingLeft: "12%",
                    paddingRight: "12%",
                    marginLeft: "0!important",
                    marginRight: "0!important"
                }}>
                    {companyList}
                </Row>
            </div>

        )
    }
}

export default withRouter(CompanyList);

