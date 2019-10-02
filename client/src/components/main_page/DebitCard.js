import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import MemberCentreTitle from '../share/MemberCentreTitle';
import NavLeftMember from '../share/NavLeftMember';
import { FaRegCreditCard, FaPlusCircle } from "react-icons/fa";

class DebitCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payState: 0,
            showMoreCard: false,
            sent: 1
        }
    }
    choosePayState = (num) => {
        let newNum = num;
        if (num === this.state.payState) {
            newNum = 0;
        }
        this.setState({ payState: newNum });
    }
    render() {
        return (
            <div>
                <Header cateIndex={4}/>
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftMember three />
                            <div className="main_right">
                                <h2>會員中心<span style={{ fontSize: '20px' }}>&nbsp;/ 帳單與儲值 / 管理付款方式</span></h2>
                                <MemberCentreTitle three />
                                <div className="cards">
                                    <div className="box card-item d-flex flex-column justify-content-between">
                                        <Row className="py-4">
                                            <Col sm={4} className="text-center">
                                                <FaRegCreditCard className="img_fluid1" />
                                            </Col>
                                            <Col sm={8}>
                                                <h6>696···· ··· 69699</h6>
                                                <h6>到期日：09/20</h6>
                                            </Col>
                                        </Row>
                                        <div className="d-flex justify-content-between mt-3">
                                            <select className="align-self-center">
                                                <option>主要</option>
                                            </select>
                                            <button className="btn btn-info">編輯</button>
                                        </div>
                                    </div>
                                    <div className="box card-item card-transpareny btn_like">
                                    <h5><FaRegCreditCard /><FaPlusCircle style={{'transform': 'translate(-8px, 5px)'}} />&nbsp;新增簽帳金融卡</h5>
                                    </div>

                                </div>
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
export default DebitCard;