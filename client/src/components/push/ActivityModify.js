import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import NavLeftPush from "./share/NavLeftPush";
import PushTitle from "./share/PushTitle";
import AdvertiseType from "./share/AdvertiseType";
import AdvertiseLink from './share/AdvertiseLink';
import AdvertiseNameDate from './share/AdvertiseNameDate';
import preview1 from '../../images/preview1.jpg';
import { FaPlusCircle } from "react-icons/fa";

class ActivityModify extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush />
                            <div className="main_right">
                                <h2>推播設定<span style={{ fontSize: '20px' }}>&nbsp;/ 特定頁面推播 / 主題活動</span></h2>
                                <PushTitle one />
                                <form className="push_activity">
                                    <AdvertiseType />
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
                                                    <h2 className="text-center">今周刊</h2>
                                                    <div className="cards">
                                                        <div className="box img_auto">
                                                            <img src={preview1} alt="1" />
                                                        </div>
                                                        <h6 className="hashtag"><span>行銷</span>&nbsp;<span>求職</span></h6>
                                                        <h5>畢業季來了！ 公司如何利用數位行銷招募進行校園徵才？</h5>
                                                        <h5>2019年第一場大型的校園徵才博覽會３月９日在台灣大學展開。我之前寫過一篇HR如何進行校園徵才的準備及佈署實務，講解過從報名到參加活動的細節。</h5>

                                                    </div>
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

export default ActivityModify;
