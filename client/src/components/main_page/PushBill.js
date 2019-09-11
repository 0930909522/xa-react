import React, { Component } from 'react';
import PopMsg from '../share/PopMsg';
import { Container, Row, Col } from "react-bootstrap";

class PushBill extends Component {
    render() {
        return (
            <PopMsg
                    show={this.props.showPushPay}
                    title="選擇推播儲值面額"
                    close={this.props.close}
                >
                    <Container>
                        <Row className="p-5">
                            <Col sm={6}>
                                <h3 className="text-center">儲值面額</h3>
                            </Col>
                            <Col sm={6}>
                                <button className="btn btn-outline-primary w-50">10,000</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} className="text-center">
                            <button className="btn btn-info btn-lg mb-3">確定並付款</button>
                            </Col>
                        </Row>
                    </Container>
                </PopMsg>
        )
    }
}
export default PushBill;