import React, { Component } from 'react';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class AnalyticPortrait extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fishNow: 6,
            fish: [
                { "id": "g1", "name": "海豚" },
                { "id": "g2", "name": "烏龜" },
                { "id": "g3", "name": "蝦子" },
                { "id": "g4", "name": "鮟鱇魚" },
                { "id": "g5", "name": "鮪魚" },
                { "id": "g6", "name": "鯊魚" },
                { "id": "g7", "name": "鯨魚" }
            ],
            newData: "",
            basic: "",
        }
    }

    render() {
        const percentage = 66;
        return (<>
            <Header />
            <div className="layout_main">
                <Container className="main_analytic">
                    <Row>
                        <NavLeft />
                        <div className="main_right">
                            <h2>用戶畫像</h2>
                            <div className="box">
                                <div className="icon_box">
                                    <div className={this.state.fish[this.state.fishNow].id + " icon"}  ></div>
                                    {this.state.fish[this.state.fishNow].name}
                                </div>
                                <div className="progress_round">
                                    <ul>
                                        <li>
                                            <CircularProgressbar value={percentage} text={`${percentage}%`} />
                                        </li>
                                        <li>
                                            <CircularProgressbar value={percentage} text={`${percentage}%`} />
                                        </li>
                                        <li>
                                            <CircularProgressbar value={percentage} text={`${percentage}%`} />
                                        </li>
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

export default AnalyticPortrait;