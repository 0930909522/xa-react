import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import MemberCentreTitle from '../share/MemberCentreTitle';
import NavLeftMember from '../share/NavLeftMember';

class Service extends Component {
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
                <Header />
                <div className="w-100 bg_gray">
                    <div className="box w-75 mx-auto bg-white my-5">
                        <h5 className="bg-secondary p-2 text-white">
                            更改你的會員方案
                            <button className="float-right mr-2 btn_noborder_r text-white">X</button>
                        </h5>
                        <div className="p-3 mx-auto w-75">
                            <Row>
                                <Col sm={6} className="d-flex justify-content-center align-items-center"><h2 className="text-center">付費會員</h2></Col>
                                <Col sm={6}>
                                    <div className="my-3"><button className="btn btn-outline-dark px-5 py-2" disabled>月繳</button><span className="ml-3 text-secondary">8000 ~ 1.5萬 / 月</span></div>
                                    <div className="my-3"><button className="btn btn-outline-dark px-5 py-2">季繳</button><span className="ml-3">5 ~ 6萬 / 季</span></div>
                                    <div className="my-3"><button className="btn btn-outline-dark px-5 py-2">年繳</button><span className="ml-3">25 ~ 30萬 / 年</span></div>
                                </Col>
                            </Row>
                            <hr className="dash_line" />
                            <Row>
                                <Col sm={6} className="d-flex justify-content-center align-items-center"><h2 className="text-center">VIP會員</h2></Col>
                                <Col sm={6}>
                                    <div className="my-3"><button className="btn btn-outline-dark px-5 py-2">季繳</button><span className="ml-3">5 ~ 6萬 / 季</span></div>
                                    <div className="my-3"><button className="btn btn-outline-dark px-5 py-2">年繳</button><span className="ml-3">25 ~ 30萬 / 年</span></div>
                                </Col>
                            </Row>
                            <div className="text-center my-4">
                                <button className="btn btn-info p-3">我要更改方案，請聯絡我</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftMember three />
                            <div className="main_right">
                                <h2>會員中心<span style={{ fontSize: '20px' }}>&nbsp;/ 帳單與儲值 /服務與用量</span></h2>
                                <MemberCentreTitle one />
                                <Container className="mt-20">
                                    <Row>
                                        <Col sm={7}>
                                            <h5>您目前的方案：<span>付費會員 - 月繳</span></h5>
                                            <h5>會員方案期限：<span>2019年3月3日 ~ 2019年4月3日</span></h5>
                                        </Col>
                                        <Col sm={5} className="d-flex justify-content-end align-items-end">
                                            <button className="btn btn-info p-2 mr-3">更改方案</button>
                                        </Col>
                                    </Row>
                                </Container>
                                <table className="w-100 pushTable text-center mt-20 bg-white" cellPadding="5">
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td>免費會員</td>
                                            <td>付費會員</td>
                                            <td>VIP會員</td>
                                        </tr>
                                        <tr>
                                            <td>智媒推推系統</td>
                                            <td>自行安裝</td>
                                            <td>全自動程式系統安裝</td>
                                            <td>全自動程式系統安裝</td>
                                        </tr>
                                        <tr>
                                            <td>頁面比對驗證功能</td>
                                            <td>&#10006;</td>
                                            <td>確認內容頁<br />商品頁<br />導購頁<br />結帳頁網址驗證</td>
                                            <td>確認內容頁<br />商品頁<br />導購頁<br />結帳頁網址驗證</td>
                                        </tr>
                                        <tr>
                                            <td>基礎分析功能</td>
                                            <td>1. 用戶分析<br />2. 流量來源分析<br />3. 客群分析<br />4. 消費分析<br />5. 價值分析(主力、上 升、衰退、遺珠、孱弱)</td>
                                            <td>1. 用戶分析<br />2. 流量來源分析<br />3. 客群分析<br />4. 消費分析<br />5. 價值分析(主力、上 升、衰退、遺珠、孱弱)</td>
                                            <td>1. 用戶分析<br />2. 流量來源分析<br />3. 客群分析<br />4. 消費分析<br />5. 價值分析(主力、上 升、衰退、遺珠、孱弱)</td>
                                        </tr>
                                        <tr>
                                            <td>進階分析功能</td>
                                            <td>&#10006;</td>
                                            <td>1. 用戶互動分析<br />2. 適配度分析<br />3. 用戶畫像分析<br />4. 微數據分析</td>
                                            <td>1. 用戶互動分析<br />2. 適配度分析<br />3. 用戶畫像分析<br />4. 微數據分析</td>
                                        </tr>
                                        <tr>
                                            <td>推播成效報告 功能</td>
                                            <td>&#10006;</td>
                                            <td>推播調整建議</td>
                                            <td>1. 推播調整建議<br />2. 推播成效報告</td>
                                        </tr>
                                        <tr>
                                            <td>智媒收費</td>
                                            <td>0元</td>
                                            <td>8000~1.5萬 / 月<br />5~6萬 / 季<br />25~30萬 / 年</td>
                                            <td>5~6萬 / 季<br />25~30萬 / 年</td>
                                        </tr>
                                        <tr>
                                            <td>廣告推播付費功能</td>
                                            <td>曝光數: 30元 / 百次<br />點擊數: 25元 / 次</td>
                                            <td>曝光數: 30元 / 百次<br />點擊數: 25元 / 次</td>
                                            <td>1. 無限智能配對推播曝光次數<br />2. 保證點擊1,000次/月</td>
                                        </tr>
                                        <tr>
                                            <td>廣告曝光收益</td>
                                            <td>曝光數: 12元 / 百次<br />點擊數: 8元 / 次</td>
                                            <td>曝光數: 6元 / 百次<br />點擊數: 5元 / 次</td>
                                            <td>曝光數: 6元 / 百次<br />點擊數: 5元 / 次</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="mt-20">※可依照客戶需求客製化數據分析，費用待議。</p>
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
export default Service;