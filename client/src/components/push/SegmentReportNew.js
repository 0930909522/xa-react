import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import NavLeftPush from "./share/NavLeftPush";
import PushTitle from "./share/PushTitle";
import AdvertiseType2 from "./share//AdvertiseType2";
import AdvertiseLink from './share/AdvertiseLink';
import AdvertiseNameDate from './share/AdvertiseNameDate';
import preview2 from '../../images/preview2.jpg';
import { FaPlusCircle } from "react-icons/fa";

class SegmentReportNew extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush />
                            <div className="main_right">
                                <h2>推播設定<span style={{ fontSize: '20px' }}>&nbsp;/ 特定頁面推播 / 專題報導</span></h2>
                                <PushTitle one />
                                <form className="push_activity">
                                    <AdvertiseType2 />
                                    <div className="box">
                                        <AdvertiseNameDate />
                                        <Row className="mt-3">
                                            <Col md={11}>
                                                <div
                                                    className="box srollX text-center"
                                                    ref={(ele) => { this.getWidth = ele; }}
                                                >
                                                    <ul>
                                                        <li>畢業季來了！ 公司如何利用數位行銷招募進行校園徵才？</li>
                                                        <li><FaPlusCircle className="avg_center" /></li>
                                                        <li><FaPlusCircle className="avg_center" /></li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col md={1} className="mt-3 d-flex align-self-center">
                                                {/* <button className="btn_noborder">
                                                    <FaAngleRight
                                                        onClick={this.handleClick}
                                                    />
                                                </button> */}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6} className="mt-3">
                                                <AdvertiseLink />
                                                <Col md={12} className="mb-3">
                                                    <p><label htmlFor="hashtag">標籤<span style={{ fontSize: '15px' }}>(最多只會出現兩個)</span></label></p>
                                                    <input id="hashtag" className="w-100" />
                                                </Col>
                                            </Col>
                                            <Col md={6} className="mt-3">
                                                <p className="text-center">預覽</p>
                                                <div className="box_border">
                                                    <Row>
                                                        <Col md={5} className="img_auto">
                                                            <img src={preview2} alt="preview" />
                                                            <p className="text-center">今周刊</p>
                                                        </Col>
                                                        <Col md={7}>
                                                            <h5>非懂不可年金改革2.0</h5>
                                                            <p>你一定聽過「Web2.0」，它就像是WWW的升級版，特色就是讓使用者成為共同開發者，善用眾人智慧，產生前所未有的力量。</p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="text-center mt-3">
                                            <button className="btn btn-secondary activity_btn">確認</button>
                                            <button className="btn btn-light activity_btn">取消</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
}

export default SegmentReportNew;
