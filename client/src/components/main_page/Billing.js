import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import MemberCentreTitle from '../share/MemberCentreTitle';
import NavLeftMember from '../share/NavLeftMember';
import MemberCard from '../share/MemberCard';
// import PopMsg from '../share/PopMsg';
import PushBill from './PushBill';
import AlertMsg from '../share/AlertMsg';
import { FaRegCreditCard } from "react-icons/fa";
import { bill, getUserInfo,addValuePush } from '../share/ajax';
// import Payment from '../share/Payment';

const initialData = {
    date: '',
    accountName: '',
    bankNo: '',
    price: '',
    lastFiveNum: ''
}

class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlertMsg: false,
            status: '',     // 數據、推播儲值狀態，''是關閉，'10'推播，'11'是數據，'12'是一般訊息
            paid: false,    // 已選擇方案
            sent: false,    // 已送出資料
            type: null,
            bill: [],        // 推播花費與支出
            accountInfo: {
                taxId: 'XXXXXXX',
                companyName: 'XXX'
            },             //帳號資料
            alertText: '', // *以上內容皆為必填
            deposit: Object.assign({}, initialData)
        }
    }
    componentDidMount() {
        let newShowPayData = this.state.status;

        //初始化金錢狀態
        bill().then(res => {
            this.setState({ bill: res });
        });
        // 初始化個資
        getUserInfo().then(res => {
            this.setState({
                accountInfo: {
                    taxId: res.taxId,
                    companyName: res.companyName
                }
            })
        })

        //頁面控管和儲值狀態
        if (this.props.match.params.type === 'welcome') {
            this.setState({ showAlertMsg: true });
        }
        if (this.props.match.params.type === 'three') {
            newShowPayData = '11';
        } else if (this.props.match.params.type === 'four') {
            newShowPayData = '10';
        }
        this.setState({ type: this.props.match.params.type, status: newShowPayData })
    }

    componentDidUpdate(preProp) {
        //頁面控管
        if (preProp.match.params.type !== this.props.match.params.type) {
            let newShowPayData = this.state.showPayData;
            if (this.props.match.params.type === 'three') {
                newShowPayData = '11';
            } else if (this.props.match.params.type === 'four') {
                newShowPayData = '10';
            }
            this.setState({ type: this.props.match.params.type, status: newShowPayData })
        }
    }

    close = () => {
        this.props.history.push('/memberCentre/billing/two');
        // 清除資料
        this.setState({ 
            status: '',
            paid: false,
            sent: false,
            alertText: '',
            deposit: Object.assign({}, initialData)
        });
    }

    // 付費方案已選妥，開始填表
    toSend = () => {
        if(this.state.deposit.price){
            this.setState({ paid: true });
        }
    }

    //推播收入跳轉控制
    pullBenefitHref = () => {
        if (localStorage.getItem('website') == 0) {
            return this.props.history.push('/memberCentre/website');
        } else {
            return this.props.history.push('/report/push');
        }
    }

    // 填寫資料
    writeInfo = (value, type) => {
        let newData = this.state.deposit;
        if(!newData.hasOwnProperty(type)){ //避免增添新屬性
            return ;
        }
        newData[type] = value;
        this.setState({ deposit: newData });
        if (this.state.alertText) { //若提示文字開啟則關閉
            this.setState({ alertText: '' });
        }
    }

    //送出資料
    submit = () => {
        let postData = this.state.deposit;
        for (let i in postData) {
            if (!String(postData[i]).trim()) {
                this.setState({ alertText: '*以上內容皆為必填' });
                return;
            }
        }
        console.log(postData)
        addValuePush(postData).then(res => {
            if (res === 1) {
                //成功
                this.setState({ sent: true });
            } else {
                this.setState({ alertText: '*傳送失敗，請稍後再試' });
            }
        })
    }

    render() {
        const { bill } = this.state;
        return (
            <>
                <Header cateIndex={4} />
                {/* 儲值頁面 */}
                <PushBill
                    getInput={this.writeInfo}
                    alertText={this.state.alertText}
                    status={this.state.status}
                    paid={this.state.paid}
                    close={() => this.close()}
                    handlePaid={this.toSend}
                    sent={this.state.sent}
                    submit={this.submit}
                />
                {/* 註冊成功提醒 */}
                <AlertMsg
                    text="註冊成功，感謝您"
                    attr={this.state.showAlertMsg ? 'opacity1' : 'opacity0'}
                    close={() => this.setState({ showAlertMsg: false })}
                />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftMember three />
                            <div className="main_right">
                                <h2>會員中心<span style={{ fontSize: '20px' }}>&nbsp;/ 帳單與儲值</span></h2>
                                <MemberCentreTitle num={this.state.type} />
                                <div className="cards">
                                    {/* <MemberCard title="您的餘額" buttonName="儲值已付款">
                                        <h1>$7,640.00</h1>
                                    </MemberCard> */}
                                    <MemberCard
                                        title="數據服務與用量"
                                        buttonName="查看更多內容"
                                        //handleClick={() => browserHistory.push('/memberCentre/service')}
                                        handleClick={() => this.props.history.push('/memberCentre/service')}
                                    >
                                        <h6 className="my-2">會員資格：付費會員 - 月繳</h6>
                                        <h6 className="my-2">會員方案期限：2019年3月3日 ~ 2019年4月3日</h6>
                                    </MemberCard>
                                    <MemberCard
                                        title="數據服務儲值"
                                        buttonName="數據儲值"
                                        handleClick={() => this.props.history.push('/memberCentre/billing/three')}
                                    >
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
                                    <MemberCard
                                        title="您的推播餘額"
                                        buttonName="推播儲值"
                                        handleClick={() => this.props.history.push('/memberCentre/billing/four')}
                                    >
                                        <p>儲值後開始推廣您的網站</p>
                                        <h1>${bill[1] ? bill[1].balance : ""}</h1>
                                        {/* push */}
                                    </MemberCard>
                                    <MemberCard
                                        title="您的推播收入"
                                        buttonName="安裝追蹤碼"
                                        handleClick={this.pullBenefitHref}
                                    >
                                        <p>在您的網站安裝推推立即可開始收錢</p>
                                        <h1>${bill[0] ? bill[0].balance : ""}</h1>
                                        {/* pull */}
                                    </MemberCard>

                                    {/* <MemberCard title="交易明細" buttonName="查看更多內容">
                                        <div className="d-flex justify-content-between my-2">
                                            <span>2019年2月1日 -2019年2月28日</span>
                                            <span>$8,000</span>
                                        </div>
                                        <div className="d-flex justify-content-between my-2">
                                            <span>2019年1月1日 - 2019年1月31日</span>
                                            <span>$9,460</span>
                                        </div>
                                    </MemberCard>*/}
                                    <MemberCard title="帳號設定" buttonName="管理設定" handleClick={() => window.location = '/memberCentre/edit'}>
                                        <h6 className="my-2">統一編號：{this.state.accountInfo.taxId}</h6>
                                        <h6 className="my-2">{this.state.accountInfo.companyName}</h6>
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