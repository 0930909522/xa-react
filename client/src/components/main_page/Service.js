import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import MemberCentreTitle from '../share/MemberCentreTitle';
import NavLeftMember from '../share/NavLeftMember';
// import Payment from '../share/Payment';
// import { addValueMem } from '../share/ajax';
import { Redirect } from 'react-router';
import JSON from '../share/memberAccount.json';

// 本頁權限 0-4

const initialData = {
    interval: '',
    level: '',
    mode: '',
    date: '',
    accountName: '',
    bankNo: '',
    price: '',
    lastFiveNum: ''
}

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountInfo: {
                level: 'XXX',
                maxAge: 'XXXX-XX-XX'
            },
            formData: {},   //欄位資料
            showData: false,
            alertText: '', //*以上內容皆為必填
            deposit: Object.assign({}, initialData),
            sent: false
        }
    }
    componentDidMount() {
        //初始化會員資料、欄位資料
        this.setState({
            ...this.state,
            accountInfo: {
                level: this.translate(),
                maxAge: this.props.permissionData.maxAge
            },
            formData: JSON
        })
    }

    toggleShowData = () => {
        this.setState({
            showData: !this.state.showData,
            alertText: '',
            deposit: Object.assign({}, initialData),
            sent: false
        })
    }

    // 轉換會員資格意義
    translate = () => {
        let data = '';
        switch (this.props.permissionData.level) {
            case 1:
                data = '免費會員'
                break;
            case 2:
                data = '網站健檢'
                break;
            case 3:
                data = '資產分析'
                break;
            case 4:
                data = '用戶分析'
                break;
            default:
                break;
        }
        return data;
    }
    // 選擇方案
    chooseProject = (project) => {
        let newData = this.state.deposit;
        newData.price = project[0];
        newData.interval = project[1];
        newData.level = project[2];
        this.setState({ deposit: newData });
    }

    // 填寫資料
    // writeInfo = (value, type) => {
    //     let newData = this.state.deposit;
    //     newData[type] = value;
    //     this.setState({ deposit: newData });
    //     if (this.state.alertText) {
    //         this.setState({ alertText: '' });
    //     }
    // }

    //送出資料
    // submit = () => {
    //     let postData = this.state.deposit;
    //     for (let i in postData) {
    //         if (!String(postData[i]).trim()) {
    //             // this.alertMsg('內容皆為必填');
    //             this.setState({ alertText: '*以上內容皆為必填' });
    //             return;
    //         }
    //     }
    //     addValueMem(postData).then(res => {
    //         if (res === 1) {
    //             //成功
    //             this.setState({ sent: true });
    //         } else {
    //             this.setState({ alertText: '*傳送失敗，請稍後再試' });
    //         }
    //     })
    // }


    render() {
        return (
            !this.props.permissionData.verified ?
                <Redirect to="/signup/signin" /> :
                <>
                    <Header />
                    <div className={(!this.state.showData && 'd-none ') + 'w-100 bg_gray'}>
                        <div className="box w-75 mx-auto bg-white my-5 radius10">
                            <h4 className="bg-warning py-3 pl-4 pr-2 text-white d-flex justify-content-between">
                                更改你的會員方案
                            <button className="btn_noborder_r btn_like dec_none bg-secondary round text-white" onClick={this.toggleShowData}>&#10006;</button>
                            </h4>
                            <div className={this.state.deposit.price ? "d-none" : "p-3 mx-auto w-100 scrollY h-65v "}>
                                <Row>
                                    <Col sm={6} className="d-flex justify-content-center align-items-center"><h2 className="text-center">網站健檢</h2></Col>
                                    <Col sm={6}>
                                        <div className="my-3">
                                            <button
                                                className="btn btn-outline-warning px-5 py-2"
                                            // onClick={() => this.chooseProject([8000, 'm', 3])}
                                            >月繳
                                        </button>
                                            <span className="ml-3">1萬 / 月</span>
                                        </div>
                                        <div className="my-3">
                                            <button
                                                className="btn btn-outline-warning px-5 py-2"
                                            >季繳
                                        </button>
                                            <span className="ml-3">2.8萬 / 季</span>
                                        </div>
                                        <div className="my-3">
                                            <button
                                                className="btn btn-outline-warning px-5 py-2"
                                            >年繳
                                        </button>
                                            <span className="ml-3">10萬 / 年</span>
                                        </div>
                                    </Col>
                                </Row>
                                <hr className="dash_line" />
                                <Row>
                                    <Col sm={6} className="d-flex justify-content-center align-items-center"><h2 className="text-center">資產分析</h2></Col>
                                    <Col sm={6}>
                                        <div className="my-3">
                                            <button
                                                className="btn btn-outline-warning px-5 py-2"
                                            // onClick={() => this.chooseProject([8000, 'm', 3])}
                                            >月繳
                                        </button>
                                            <span className="ml-3">3萬 / 月</span>
                                        </div>
                                        <div className="my-3">
                                            <button
                                                className="btn btn-outline-warning px-5 py-2"
                                            >季繳
                                        </button>
                                            <span className="ml-3">8萬 / 季</span>
                                        </div>
                                        <div className="my-3">
                                            <button
                                                className="btn btn-outline-warning px-5 py-2"
                                            >年繳
                                        </button>
                                            <span className="ml-3">30萬 / 年</span>
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
                                            // onClick={() => this.chooseProject([8000, 'm', 3])}
                                            >月繳
                                        </button>
                                            <span className="ml-3">8萬 / 月</span>
                                        </div>
                                        <div className="my-3">
                                            <button
                                                className="btn btn-outline-warning px-5 py-2"
                                            >季繳
                                        </button>
                                            <span className="ml-3">22萬 / 季</span>
                                        </div>
                                        <div className="my-3">
                                            <button
                                                className="btn btn-outline-warning px-5 py-2"
                                            >年繳
                                        </button>
                                            <span className="ml-3">85萬 / 年</span>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="text-center my-4">
                                    <button className="btn btn-outline-primary w-75 p-2 font_20 radius20">我要更改方案，請聯絡我</button>
                                </div>
                            </div>
                            {/* {
                                this.state.deposit.price &&
                                <Payment
                                    sent={this.state.sent}
                                    sendMsg={this.submit}
                                    getInput={this.writeInfo}
                                    alertText={this.state.alertText}
                                />
                            } */}
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
                                                <h5>您目前的方案：<span>{this.state.accountInfo.level}</span></h5>
                                                <h5>會員方案期限：<span>{this.state.accountInfo.maxAge}</span></h5>
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
                                            {this.state.formData.title &&
                                                this.state.formData.title.map((val, index) =>
                                                    <tr key={index}>
                                                        <td>{val}</td>
                                                        <td>
                                                            {this.state.formData.data0[index].split('\n').map((text, index2) => (
                                                                <React.Fragment key={index2}>
                                                                    {text}
                                                                    <br />
                                                                </React.Fragment>))
                                                            }
                                                        </td>
                                                        <td>
                                                            {this.state.formData.data1[index].split('\n').map((text, index2) => (
                                                                <React.Fragment key={index2}>
                                                                    {text}
                                                                    <br />
                                                                </React.Fragment>))
                                                            }
                                                        </td>
                                                        <td>
                                                            {this.state.formData.data2[index].split('\n').map((text, index2) => (
                                                                <React.Fragment key={index2}>
                                                                    {text}
                                                                    <br />
                                                                </React.Fragment>))
                                                            }
                                                        </td>
                                                        <td>
                                                            {this.state.formData.data3[index].split('\n').map((text, index2) => (
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