import React, { Component } from 'react';
import {Row, Col } from "react-bootstrap";

export default class AdvertiseNameDate extends Component {
    render() {
        return (
            <>
                <h4 className="my-3">新增廣告推播</h4>
                <Row className="mb-3">
                    <Col md={2}>
                        <label htmlFor="activity_name">活動名稱</label>
                    </Col>
                    <Col md={10}>
                        <input type="text"  className="w-100" id="activity_name" />
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <label htmlFor="activity_start">開始時間</label>
                    </Col>
                    <Col md={4}>
                        <input type="date" />
                        <input type="time" className="ml-1" />
                    </Col>
                    <Col md={6}>
                        <label htmlFor="activity_end">結束時間</label>
                        <div className="d-inline-block float-md-right">
                            <input type="date" />
                            <input type="time" className="ml-1" />
                        </div>
                    </Col>
                </Row>
            </>
        )
    }
}
