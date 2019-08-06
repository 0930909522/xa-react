import React, { Component } from 'react';
import {Col } from "react-bootstrap";

export default class AdvertiseLink extends Component {
    render() {
        return (
            <>
                <Col md={12} className="mb-3">
                    <p><label htmlFor="link">輸入你想推播的連結</label></p>
                    <input id="link" className="w-100" type="text" />
                </Col>
                <Col md={12} className="mb-3">
                    <p><label htmlFor="title">標題 <span style={{ fontSize: '15px' }}>(字數限制為15字最佳)</span></label></p>
                    <input id="title" className="w-100" />
                </Col>
                <Col md={12} className="mb-3">
                    <p><label htmlFor="word">文字<span style={{ fontSize: '15px' }}>(字數限制為30字最佳)</span></label></p>
                    <textarea id="word" className="w-100">
                    </textarea>
                </Col>
            </>
        )
    }
}
