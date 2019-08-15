import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import NavLeftPush from "../share/NavLeftPush";
import SettingTitle from '../share/SettingTitle';
import Footer from '../Footer';

class SetTrackingCode extends Component {
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
                                <SettingTitle one />
                                <div className="mt-20">
                                    <div className="box mb-2 bg-white radius10">
                                        <h5 style={{ 'fontWeight': '600' }}>建立新的「追蹤 ID」</h5>
                                        <p>在您建立第一項資源時，我們也會同時建立一個預設資料檢視，用來收集追蹤程式碼的所有相關資料。如果您只想收集這個程式碼的一部分資料，可以建立第二個報表資料檢視，然後為這些資料建立並套用一或多個資料檢視篩選器。</p>
                                    </div>
                                    <div className="box mb-2 bg-white radius10">
                                        <h5 style={{ 'fontWeight': '600' }}>追蹤方式</h5>
                                        <p>這項資源需要通用 Analytics (分析) 才能運作。只要按一下 [取得追蹤 ID] 並導入通用 Analytics (分析) 追蹤程式碼片段，即可完成設定。</p>
                                    </div>
                                    <div className="box mb-2 bg-white radius10">
                                        <h5 style={{ 'fontWeight': '600' }}>設定您的資源</h5>
                                        <Row className="my-3">
                                            <Col sm={2}>
                                                <label htmlFor="webpageName" className=" border_left pl-2 font_20">網站名稱</label>
                                            </Col>
                                            <Col sm={10}>
                                                <input type="text" id="webpageName" className="input_1" />
                                            </Col>
                                        </Row>
                                        <Row className="my-3">
                                            <Col sm={2}>
                                                <label htmlFor="webpageURL" className=" border_left pl-2 font_20">網站網址</label>
                                            </Col>
                                            <Col sm={10}>
                                                <Row>
                                                    <Col sm={2}>
                                                        <select className="input_1 h-100">
                                                            <option value="http:">http:</option>
                                                            <option value="https:">https:</option>
                                                        </select>
                                                    </Col>
                                                    <Col sm={10}>
                                                        <input type="text" id="webpageURL" className="w-100 input_1" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className="my-3">
                                            <Col sm={2}>
                                                <label className=" border_left pl-2 font_20">產業類型</label>
                                            </Col>
                                            <Col sm={10}>
                                                <select className="input_1">
                                                    <option value="newMedia">新媒體</option>
                                                    <option value="Ecommerce">電商</option>
                                                    <option value="house">房地產</option>
                                                    <option value="finance">金融</option>
                                                    <option value="ArtorEntertainment">藝術與娛樂</option>
                                                    <option value="others">其他</option>
                                                </select>
                                            </Col>
                                        </Row>
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-outline-primary activity_btn radius20 w-100">取得追蹤ID</button>
                                            <button className="btn btn-outline-primary activity_btn radius20 w-100">取消</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </>
        )
    }
}
export default SetTrackingCode;
