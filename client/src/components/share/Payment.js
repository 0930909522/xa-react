import React, { Component } from 'react';
import { FaAngleDown, FaCheck, FaAngleUp } from "react-icons/fa";

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: null,
            payState: 0, // 哪個方案已打開
        }
    }
    componentDidMount() {
        // 設定日期
        const Today = new Date();
        const newToday = { year: null, month: null, date: null };
        newToday.year = Today.getFullYear();
        newToday.month = ('0' + (Today.getMonth() + 1).toString()).slice(-2);
        newToday.date = ('0' + Today.getDate().toString()).slice(-2);
        this.setState({
            today: newToday.year + '-' + newToday.month + '-' + newToday.date
        })
    }

    //選擇打開哪個繳費方案
    choosePayState = (num) => {
        let newNum = num;
        if (num === this.state.payState) {
            newNum = 0;
        }
        this.setState({ payState: newNum });
        // 送至postData
        if (num === 1) {
            this.props.getInput('匯款', 'mode')
        } else if (num === 2) {
            this.props.getInput('支票', 'mode')
        }
    }
    render() {
        return (
            //     < Payment
            // sent = { this.state.sent }
            // sendMsg = { this.submit }
            // getInput = {this.XXX}
            // alertText = {this.XXX}
            //     />
            <>
                <div className={this.props.sent ? "d-none" : "p-5 scrollY h-65v m-1"}>
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
                        <label className="w-100 font_20">匯款日期
                            <input
                                className="d-block my-2 input_1"
                                type="date"
                                min={this.state.today}
                                onChange={(e) => this.props.getInput(e.target.value, 'date')}
                            />
                        </label>
                        <label className="w-100 font_20">匯款戶名
                            <input
                                className="d-block my-2 input_1"
                                onChange={(e) => this.props.getInput(e.target.value, 'accountName')}
                            />
                        </label>
                        <label className="w-100 font_20">匯款銀行代號
                            <input
                                className="d-block my-2 input_1"
                                onChange={(e) => this.props.getInput(e.target.value, 'bankNo')}
                            />
                        </label>
                        <label className="w-100 font_20">匯款帳號末五碼
                            <input
                                className="d-block my-2 input_1"
                                maxLength="5"
                                onChange={(e) => this.props.getInput(e.target.value, 'lastFiveNum')}
                            />
                        </label>
                        {this.props.alertText &&
                            <h5 className="text-danger">{this.props.alertText}</h5>
                        }
                        <button
                            className="d-block mx-auto mt-3 btn btn-outline-primary w-75 radius20 font_20"
                            onClick={this.props.sendMsg}
                        >通知已付款
                        </button>
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
                        <label className="w-100 font_20">支票帳號
                            <input
                                className="d-block my-2 input_1"
                                onChange={(e) => this.props.getInput(e.target.value, 'accountName')}
                            />
                        </label>
                        <label className="w-100 font_20">支票號碼
                            <input
                                className="d-block my-2 input_1"
                                onChange={(e) => this.props.getInput(e.target.value, 'lastFiveNum')}
                            />
                        </label>
                        {/* <label className="w-100 font_20">支票金額<input className="d-block my-2 input_1" /></label> */}
                        <label className="w-100 font_20">郵寄單號
                            <input
                                className="d-block my-2 input_1"
                                onChange={(e) => this.props.getInput(e.target.value, 'bankNo')}
                            />
                        </label>
                        {this.props.alertText &&
                            <h5 className="text-danger">{this.props.alertText}</h5>
                        }
                        <button
                            className="d-block mx-auto mt-3 btn btn-outline-primary w-75 radius20 font_20"
                            onClick={this.props.sendMsg}
                        >通知已付款
                        </button>
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
                <div className={this.props.sent ? "p-5 m-1 text-center" : "d-none"}>
                    <div className="circle_sign my-4">
                        <FaCheck style={{ 'color': '#16C60C' }} />
                    </div>
                    <h4 className="text-primary">
                        感謝您 ~
                            <br />已經收到您通知已付款的訊息，<br />資料核對無誤後會儘速為您儲值，<br />謝謝！
                            </h4>
                </div>
            </>
        )
    }
}
export default Payment;