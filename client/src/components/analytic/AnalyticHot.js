import React, { Component } from 'react';
import axios from 'axios';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';

class AnalyticGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: "",
            isDetail: false,
            basic: "",
        }
    }
    componentDidMount() {
        this.getDataFromDb();
    }

    getDataFromDb = () => {
        // axios.get('/datas/analyticHot.json')
        axios.get('http://r.xnet.world/demo/hotPages.json')
            .then(response => {
                this.setState({
                    basic: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    render() {

        return (<>
            <Header />
            <div className="layout_main">
                <Container className="main_analytic">
                    <Row>
                        <NavLeft />
                        <div className="main_right">
                            <h2>熱門頁面</h2>
                            <div className="box hot">

                                <div className="detail">

                                    <select style={{marginBottom: "5px"}}>
                                        {this.state.basic ? this.state.basic.interval.map(
                                            (item, index) => <option key={index} value={index}>{item.name}</option>) : ""}
                                    </select>

                                    <ul>
                                        {this.state.basic ? this.state.basic.detail.map((item, i) =>
                                            <li key={i} className={i == 1 ? "artice" : ""}>
                                                <div className="head">
                                                    {item.name}
                                                </div>
                                                {item.list.map((one, j) =>
                                                    <div key={j} className="cont">
                                                        {one}
                                                    </div>
                                                )}

                                            </li>
                                        ) : <li />}

                                    </ul>
                                </div>

                            </div>
                        </div>
                    </Row>
                </Container>
            </div>
            <Footer />

        </>);
    }
}

export default AnalyticGroup;