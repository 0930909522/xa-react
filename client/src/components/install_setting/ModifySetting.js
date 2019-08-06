import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import NavLeftPush from "../share/NavLeftPush";
import SettingTitle from '../share/SettingTitle';

class ModifySetting extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush />
                            <div className="main_right">
                                <h2>安裝追蹤碼</h2>
                                <SettingTitle two />
                                <div className="mt-20 bg-white">
                                    <h5 className="bg-light p-3">基本設定</h5>
                                    <div className="box mb-2">
                                        <Row className="my-3">
                                            <Col sm={2}>
                                                <span className="border_left pl-2">追蹤ID</span>
                                            </Col>
                                            <Col sm={10}>
                                                <span>XN-00001843-1</span>
                                            </Col>
                                        </Row>
                                        <Row className="my-3">
                                            <Col sm={2}>
                                                <label htmlFor="webpageName" className=" border_left pl-2">網站名稱</label>
                                            </Col>
                                            <Col sm={10}>
                                                <input type="text" id="webpageName" className="w-100" defaultValue="今周刊智能數據分析" />
                                            </Col>
                                        </Row>
                                        <Row className="my-3">
                                            <Col sm={2}>
                                                <label htmlFor="webpageURL" className=" border_left pl-2">預設網址</label>
                                            </Col>
                                            <Col sm={10}>
                                                <input type="text" id="webpageName" className="w-100" defaultValue="https：www.businesstoday.com.tw" disabled />
                                            </Col>
                                        </Row>
                                        <Row className="my-3">
                                            <Col sm={2}>
                                                <label className="vertical_middle border_left pl-2">產業類型</label>
                                            </Col>
                                            <Col sm={10}>
                                                <select className="w-100">
                                                    <option value="newMedia">新媒體</option>
                                                    <option value="Ecommerce">電商</option>
                                                    <option value="house">房地產</option>
                                                    <option value="finance">金融</option>
                                                    <option value="ArtorEntertainment">藝術與娛樂</option>
                                                    <option value="others">其他</option>
                                                </select>
                                            </Col>
                                        </Row>
                                        <div className="text-center">
                                            <button className="btn btn-secondary activity_btn">儲存</button>
                                            <button className="btn btn-secondary activity_btn">取消</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
}
export default ModifySetting;