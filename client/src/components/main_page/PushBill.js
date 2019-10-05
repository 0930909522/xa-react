import React, { Component } from 'react';
import PopMsg from '../share/PopMsg';
import { Container, Row, Col } from "react-bootstrap";
import Payment from '../share/Payment';

class PushBill extends Component {
    render() {
        let titleWord;
        if(this.props.status === '10' && !this.props.paid){
            titleWord = '選擇推播儲值面額';
        }else if(this.props.status === '11' && !this.props.paid){
            titleWord = '選擇推播';
        }else{
            titleWord = '付款';
        }
        return (
            <PopMsg
                show={this.props.status}
                title={titleWord}
                close={this.props.close}
            >
                {/* 推播儲值 */}
                <Container className={!this.props.paid && this.props.status === '10' ? '' : 'd-none'}>
                    <Row className="p-5">
                        <Col sm={6}>
                            <h3 className="text-center">儲值面額</h3>
                        </Col>
                        <Col sm={6}>
                            <select className="px-4 py-2 radius10 no_outline">
                                <option>$5000</option>
                                <option>$10000</option>
                                <option>$15000</option>
                                <option>$20000</option>
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className="text-center">
                            <button
                                className="btn btn-info btn-lg mb-3"
                                onClick={this.props.handlePaid}
                            >確定並付款
                            </button>
                        </Col>
                    </Row>
                </Container>

                {/* 數據儲值 */}
                <Container className={!this.props.paid && this.props.status === '11' ? '' : 'd-none'}>
                    <Row className="p-5">
                        <Col sm={6}>
                            <h3 className="text-center">儲值面額</h3>
                        </Col>
                        <Col sm={6}>
                            <select className="px-4 py-2 radius10 no_outline">
                                <option>1萬 / 月</option>
                                <option>2.8萬 / 季</option>
                                <option>10萬 / 年</option>
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className="text-center">
                            <button
                                className="btn btn-info btn-lg mb-3"
                                onClick={this.props.handlePaid}
                            >確定並付款
                            </button>
                        </Col>
                    </Row>
                </Container>
                {
                    this.props.paid &&
                    <Payment
                        sent={this.props.sent}
                        sendMsg={this.props.submit}
                    />
                }
            </PopMsg>
        )
    }
}
export default PushBill;