import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import MemberCentreTitle from '../share/MemberCentreTitle';
import NavLeftMember from '../share/NavLeftMember';
import MemberCard from '../share/MemberCard';
import { FaRegCreditCard, FaAngleDown, FaCheck, FaAngleUp } from "react-icons/fa";


class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPayData: false,
            payState: 0,
            // showMoreCard: false,
            sent: false,
            type: null

        }
    }
    componentDidMount() {
        let newShowPayData = this.state.showPayData;
        if(this.props.match.params.type === 'three'){
            newShowPayData = true;
        }
        this.setState({ type: this.props.match.params.type, showPayData: newShowPayData})
    }
    componentDidUpdate(preProp) {
        if (preProp.match.params.type !== this.props.match.params.type) {
            let newShowPayData = this.state.showPayData;
            if(this.props.match.params.type === 'three' && this.state.showPayData !== true){
                newShowPayData = true;
            }
            this.setState({ type: this.props.match.params.type, showPayData: newShowPayData })
        }
    }
    choosePayState = (num) => {
        let newNum = num;
        if (num === this.state.payState) {
            newNum = 0;
        }
        this.setState({ payState: newNum });
    }
    togglePayData = () => {
        this.setState({ showPayData: !this.state.showPayData });
    }
    render() {
        return (
            <>
                <Header />
                <div className={(!this.state.showPayData && 'd-none ') + 'w-100 bg_gray'}>
                    <div className="box w-75 mx-auto bg-white my-5 radius10">
                        <h4 className="bg-warning py-3 pl-4 pr-2 text-white d-flex justify-content-between">
                            {(this.state.sent === false) ? <span>付款</span> : <span>OK</span>}
                            <button className="btn_noborder_r btn_like dec_none bg-secondary round text-white" onClick={this.togglePayData}>&#10006;</button>
                        </h4>
                        <div className={(this.state.sent === false) ? "p-5 scrollY h-65v m-1" : "d-none"}>
                            <h4 className="mb-5 p-4 btn_like bg-light radius10" onClick={() => this.choosePayState(1)}>
                                <span className="text-primary">匯款</span>
                                {this.state.payState === 1 ? <FaAngleUp className="float-right" /> : <FaAngleDown className="float-right" />}
                            </h4>
                            <div className={this.state.payState === 1 ? 'd-block' : 'd-none'}>
                                <hr />
                                <p>
                                    <strong className="font_20 d-block">匯款帳號</strong>
                                    <br />戶名：智媒科技股份有限公司
                                    <br />第一銀行 安和分行
                                    <br />銀行代碼：007
                                    <br />分行代碼：9804
                                    <br />帳號：09410129811
                                </p>
                                <label className="w-100 font_20">匯款日期<input className="d-block my-2 input_1" /></label>
                                <label className="w-100 font_20">匯款戶名<input className="d-block my-2 input_1" /></label>
                                <label className="w-100 font_20">匯款銀行代號<input className="d-block my-2 input_1" /></label>
                                <label className="w-100 font_20">匯款資訊(匯款金額+匯款帳號末五碼)<input className="d-block my-2 input_1" /></label>
                                <button className="d-block mx-auto mt-3 btn btn-outline-primary w-75 radius20 font_20">通知已付款</button>
                            </div>
                            <h4 className="my-5 p-4 btn_like bg-light radius10" onClick={() => this.choosePayState(2)}>
                                <span className="text-primary">開立即期支票</span>
                                {this.state.payState === 2 ? <FaAngleUp className="float-right" /> : <FaAngleDown className="float-right" />}
                            </h4>
                            <div className={this.state.payState === 2 ? 'd-block' : 'd-none'}>
                                <hr />
                                <p>
                                    <strong className="font_20 d-block">開立即期支票掛號寄送至：</strong>
                                    <br />台北市中正區忠孝東路一段85號5樓
                                    <br />收 件 人：王大明先生
                                </p>
                                <label className="w-100 font_20">支票帳號<input className="d-block my-2 input_1" /></label>
                                <label className="w-100 font_20">支票號碼<input className="d-block my-2 input_1" /></label>
                                <label className="w-100 font_20">支票金額<input className="d-block my-2 input_1" /></label>
                                <label className="w-100 font_20">郵寄單號<input className="d-block my-2 input_1" /></label>
                                <button className="d-block mx-auto mt-3 btn btn-outline-primary w-75 radius20 font_20">通知已付款</button>
                            </div>
                            {/* <h5 className="my-3 btn_like" onClick={() => this.choosePayState(3)}>線上轉帳付款{this.state.payState === 3 ? <FaAngleUp className="float-right" /> : <FaAngleDown className="float-right" />}</h5>
                            <div className={this.state.payState === 3 ? 'd-block' : 'd-none'}>
                                <hr className="dash_line" />
                                <div className="w-90 mx-auto">
                                    <div>
                                        <FaRegCreditCard />
                                        <span className="pl-5">696···· ···69699</span>
                                        <span className="pl-3"><input type="radio" name="card" /></span>
                                        <span className="float-right btn_like" onClick={() => this.setState({ showMoreCard: !this.state.showMoreCard })}>{this.state.showMoreCard ? <FaArrowCircleUp /> : <FaArrowCircleDown />}</span>
                                    </div>
                                    <div className={this.state.showMoreCard ? 'd-block' : 'd-none'}>
                                        <FaRegCreditCard />
                                        <span className="pl-5">696···· ···69699</span>
                                        <span className="pl-3"><input type="radio" name="card" /></span>
                                    </div>
                                    <div className={this.state.showMoreCard ? 'd-block' : 'd-none'}>
                                        <FaRegCreditCard />
                                        <span className="pl-5">696···· ···69699</span>
                                        <span className="pl-3"><input type="radio" name="card" /></span>
                                    </div>
                                </div>
                                <p>
                                    付款金額
                                <br />$ 8,000(月繳帳款)
                                <br />其他金額
                                <br />$&nbsp;<input type="text" className="solid_line w-10" />
                                    <br /><small>例如：10,000.00</small>
                                </p>
                                <button className="d-block mx-auto mt-3 btn btn-info">我要付款</button>
                                <hr className="dash_line" />
                            </div> */}
                        </div>
                        <div className={(this.state.sent === false) ? "d-none" : "p-5 m-1 text-center"}>
                            <div className="circle_sign my-4">
                                <FaCheck style={{ 'color': '#16C60C' }} />
                            </div>
                            <h4 className="text-primary">
                                感謝您 ~
                            <br />已經收到您通知已付款的訊息，<br />資料核對無誤後會儘速為您儲值，<br />謝謝！
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftMember three />
                            <div className="main_right">
                                <h2>會員中心<span style={{ fontSize: '20px' }}>&nbsp;/ 帳單與儲值</span></h2>
                                <MemberCentreTitle num={this.state.type} />
                                <div className="cards">
                                    <MemberCard title="您的餘額" buttonName="儲值已付款">
                                        <h1>$7,640.00</h1>
                                    </MemberCard>
                                    <MemberCard title="付款方式" buttonName="管理付款方式" handleClick={this.togglePayData}>
                                        <Row>
                                            <Col sm="4">
                                                <FaRegCreditCard className="img_fluid1 pl-2" />
                                            </Col>
                                            <Col sm="8">
                                                <p>696···· ···69699</p>
                                                <p>到期日：09/20</p>
                                            </Col>
                                        </Row>
                                    </MemberCard>
                                    <MemberCard title="服務與用量" buttonName="查看更多內容">
                                        <h6 className="my-2">會員資格：付費會員 - 月繳</h6>
                                        <h6 className="my-2">會員方案期限：2019年3月3日 ~ 2019年4月3日</h6>
                                    </MemberCard>
                                    <MemberCard title="交易明細" buttonName="查看更多內容">
                                        <div className="d-flex justify-content-between my-2">
                                            <span>2019年2月1日 -2019年2月28日</span>
                                            <span>$8,000</span>
                                        </div>
                                        <div className="d-flex justify-content-between my-2">
                                            <span>2019年1月1日 - 2019年1月31日</span>
                                            <span>$9,460</span>
                                        </div>
                                    </MemberCard>
                                    <MemberCard title="帳號設定" buttonName="管理設定">
                                        <h6 className="my-2">統一編號：27311180</h6>
                                        <h6 className="my-2">今周刊出版社股份有限公司</h6>
                                    </MemberCard>
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
export default Billing;