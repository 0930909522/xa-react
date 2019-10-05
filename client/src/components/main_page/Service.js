import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import MemberCentreTitle from '../share/MemberCentreTitle';
import NavLeftMember from '../share/NavLeftMember';
import Payment from '../share/Payment';

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showData: false,
            chosenProject: '',
            sent: false
        }
        this.title = [
            // '智媒推推系統',
            '頁面比對驗證功能',
            '基礎分析功能',
            '進階分析功能',
            '推播成效報告功能',
            '數據分析收費',
            '廣告推播付費功能',
            '廣告曝光收益'
        ]
        this.data0 = [
            // '自行安裝',
            '×',
            '1. 用戶分析\n2. 流量來源分析\n3. 客群分析\n4. 消費分析\n5. 價值分析(主力、上 升、衰退、遺珠、孱弱)',
            '×',
            '×',
            // '儲值面額 10,000 / 次\n儲值面額 15,000 / 次\n儲值面額 20,000 / 次',
            '×',
            '曝光數: 30元 / 百次\n點擊數: 25元 / 次',
            '曝光數: 6元 / 百次\n點擊數: 5元 / 次'
        ];
        this.data1 = [
            // '自行安裝',
            '×',
            '1. 用戶分析\n2. 流量來源分析\n3. 客群分析\n4. 消費分析\n5. 價值分析(主力、上 升、衰退、遺珠、孱弱)',
            '×',
            '×',
            '1萬 / 月\n2.8萬 / 季\n10萬 / 年',
            '曝光數: 30元 / 百次\n點擊數: 25元 / 次',
            '曝光數: 6元 / 百次\n點擊數: 5元 / 次'
        ];
        this.data2 = [
            // '全自動程式系統安裝',
            '確認內容頁\n商品頁\n導購頁\n結帳頁網址驗證',
            '1. 用戶分析\n2. 流量來源分析\n3. 客群分析\n4. 消費分析\n5. 價值分析(主力、上 升、衰退、遺珠、孱弱)',
            '1. 用戶互動分析\n2. 適配度分析\n3. 用戶畫像分析\n4. 微數據分析\n商品頁 \n導購頁\n結帳頁網址驗證',
            '推播調整建議',
            '3萬 / 月\n8萬 / 季\n30萬 / 年',
            '曝光數: 30元 / 百次\n點擊數: 25元 / 次',
            '曝光數: 12元 / 百次\n點擊數: 8元 / 次'];
        this.data3 = [
            // '全自動程式系統安裝',
            '確認內容頁\n商品頁\n導購頁\n結帳頁網址驗證',
            '1. 用戶分析\n2. 流量來源分析\n3. 客群分析\n4. 消費分析\n5. 價值分析(主力、上 升、衰退、遺珠、孱弱)',
            '1. 用戶互動分析\n2. 適配度分析\n3. 用戶畫像分析\n4. 微數據分析\n商品頁 \n導購頁\n結帳頁網址驗證',
            '1. 推播調整建議\n2. 推播成效報告',
            '8萬 / 月\n22萬 / 季\n85萬 / 年',
            '1. 無限智能配對推播曝光次數\n2. 保證點擊1,000次/月',
            '曝光數: 12元 / 百次\n點擊數: 8元 / 次'];
    }

    toggleShowData = () => {
        this.setState({ showData: !this.state.showData });
    }

    // 選擇方案
    chooseProject = (num) => {
        this.setState({ chosenProject: num })
    }

    // 填寫資料
    writeInfo = (e, type) => {

    }

    //送出資料
    submit = () => {
        this.setState({ sent: true })
    }

    render() {
        return (
            <>
                <Header />
                <div className={(!this.state.showData && 'd-none ') + 'w-100 bg_gray'}>
                    <div className="box w-75 mx-auto bg-white my-5 radius10">
                        <h4 className="bg-warning py-3 pl-4 pr-2 text-white d-flex justify-content-between">
                            更改你的會員方案
                            <button className="btn_noborder_r btn_like dec_none bg-secondary round text-white" onClick={this.toggleShowData}>&#10006;</button>
                        </h4>
                        <div className={this.state.chosenProject ? "d-none" : "p-3 mx-auto w-100 scrollY h-65v "}>
                            <Row>
                                <Col sm={6} className="d-flex justify-content-center align-items-center"><h2 className="text-center">資產分析</h2></Col>
                                <Col sm={6}>
                                    <div className="my-3">
                                        <button
                                            className="btn btn-outline-warning px-5 py-2"
                                            onClick={() => this.chooseProject(1)}
                                        >月繳
                                        </button>
                                        <span className="ml-3">8000 ~ 1.5萬 / 月</span>
                                    </div>
                                    <div className="my-3">
                                        <button
                                            className="btn btn-outline-warning px-5 py-2"
                                            onClick={() => this.chooseProject(1)}
                                        >年繳
                                        </button>
                                        <span className="ml-3">36萬 / 年</span>
                                    </div>
                                </Col>
                            </Row>
                            <hr className="dash_line" />
                            <Row>
                                <Col sm={6} className="d-flex justify-content-center align-items-center"><h2 className="text-center">用戶分析</h2></Col>
                                <Col sm={6}>
                                    <div className="my-3">
                                        <button
                                            className="btn btn-outline-warning px-5 py-2"
                                            onClick={() => this.chooseProject(1)}
                                        >年繳
                                        </button>
                                        <span className="ml-3">96萬 / 年</span>
                                    </div>
                                </Col>
                            </Row>
                            <hr className="dash_line" />
                            <Row>
                                <Col sm={6} className="d-flex justify-content-center align-items-center"><h2 className="text-center">網站健檢</h2></Col>
                                <Col sm={6}>
                                    <div className="my-3">
                                        <button
                                            className="btn btn-outline-warning px-5 py-2"
                                            onClick={() => this.chooseProject(1)}
                                        >年繳</button>
                                        <span className="ml-3">96萬 / 年</span>
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-center my-4">
                                <button className="btn btn-outline-primary w-75 p-2 font_20 radius20">我要更改方案，請聯絡我</button>
                            </div>
                        </div>
                        {
                            this.state.chosenProject &&
                            <Payment 
                            sent={this.state.sent}
                            sendMsg={this.submit}
                             />
                        }
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
                                            <button className="btn btn-info p-2 mr-3" onClick={this.toggleShowData}>更改方案</button>
                                        </Col>
                                    </Row>
                                </Container>
                                <table className="w-100 pushTable text-center mt-20 bg-white" cellPadding="5">
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td><b>免費會員</b></td>
                                            <td><b>網站健檢</b></td>
                                            <td><b>資產分析</b></td>
                                            <td><b>用戶分析</b></td>
                                        </tr>
                                        {this.title.map((val, index) =>
                                            <tr key={index}>
                                                <td>{val}</td>
                                                <td>
                                                    {this.data0[index].split('\n').map((text, index2) => (
                                                        <React.Fragment key={index2}>
                                                            {text}
                                                            <br />
                                                        </React.Fragment>))
                                                    }
                                                </td>
                                                <td>
                                                    {this.data1[index].split('\n').map((text, index2) => (
                                                        <React.Fragment key={index2}>
                                                            {text}
                                                            <br />
                                                        </React.Fragment>))
                                                    }
                                                </td>
                                                <td>
                                                    {this.data2[index].split('\n').map((text, index2) => (
                                                        <React.Fragment key={index2}>
                                                            {text}
                                                            <br />
                                                        </React.Fragment>))
                                                    }
                                                </td>
                                                <td>
                                                    {this.data3[index].split('\n').map((text, index2) => (
                                                        <React.Fragment key={index2}>
                                                            {text}
                                                            <br />
                                                        </React.Fragment>))
                                                    }
                                                </td>
                                            </tr>)}
                                    </tbody>
                                </table>
                                <p className="mt-20">※可依照客戶需求客製化數據分析，費用待議。</p>
                            </div>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </>
        )
    }
}
export default Service;