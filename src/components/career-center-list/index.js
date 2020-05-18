import React, { Component } from 'react';
import { Card, Row, Col } from 'antd'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class CareerCenterList extends Component{
    constructor(){
        super()
        this.state = {
            careerCenters: [],
            count: 0
        }
    }

    onClick = (id) => {
        return () => {
            this.props.history.push(`/career_center/${id}`)
        }
    }

    componentDidMount()
    {
        console.log("1")
        axios.get('/api/career_center/')
            .then(res => {
                this.setState({careerCenters: res.data});
                console.log("careerCenters res.data", res.data);
            })
            .catch(err => {
                console.log(err)
            })
        console.log("2")
    }


    render(){
        const {careerCenters} = this.state;
        const careerCenterList = careerCenters.map(item =>(
            <Col span={6} key = {item.id} >
                <Card onClick={this.onClick(item.id)} bordered={false}>
                    <img className={"recipe-img"} src={item.institution.image} style={{width: "100%", marginBottom: "20px"}}/>
                </Card>
            </Col>

        ))

        return (
            <div style={{marginBottom: "80px"}}>
                <div style={{marginTop: "0"}}>
                    <h1>
                        Career Centers
                    </h1>
                </div>
                {this.state.title}
                <Row gutter = {16} className={"recipe-list-row"} style={{display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    flexWrap: "wrap",
                    paddingLeft: "12%",
                    paddingRight: "12%",
                    marginLeft: "0!important",
                    marginRight: "0!important"
                }}>
                    {careerCenterList}
                </Row>
            </div>

        )
    }
}

export default withRouter(CareerCenterList);

