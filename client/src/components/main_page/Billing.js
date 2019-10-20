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
import { bill, getUserInfo, addValuePush, addValueMem } from '../share/ajax';
// import Payment from '../share/Payment';
import { Redirect } from 'react-router';

//本頁權限 0-4

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
                companyName: 'XXX',
                level: 'XXX',
                maxAge: 'XXXX-XX-XX'
            },             //帳號資料
            alertText: '', // *以上內容皆為必填
            deposit: Object.assign({}, initialData)
        }
    }
    componentDidMount() {
        let newShowPayData = this.state.status;
        let levelName = this.translate();

        //初始化金錢狀態
        bill().then(res => {
            this.setState({ bill: res });
        });
        // 初始化個資
        getUserInfo()
        .then(res => {
            this.setState({
                accountInfo: {
                    taxId: res.taxId,
                    companyName: res.companyName,
                    level: levelName,
                    maxAge: this.props.permissionData.maxAge
                    // 會員資格
                }
            })
        })
        .catch(err=>{
            console.log(err)
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
        //頁面顯示控管
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
        if (this.state.deposit.price) {
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
        if (!newData.hasOwnProperty(type)) { //避免增添新屬性
            return;
        }
        newData[type] = value;
        this.setState({ deposit: newData });
        if (this.state.alertText) { //若提示文字開啟則關閉
            this.setState({ alertText: '' });
        }
    }

    //數據增添、修改資料
    modifyPostData = (postData) => {
        let price = postData.price.replace(/\s/g, '').split('/');
        let interval = '';
        switch (price[1]) {
            case '年':
                interval = 'y';
                break;
            case '季':
                interval = 's';
                break;
            case '月':
                interval = 'm';
                break;
            default:
                break;
        }
        price = price[0].replace('萬', '')*10000;
        postData.level = this.props.permissionData.level;   // 添加level
        postData.price = price; //金錢
        postData.interval = interval;   // 繳款週期
        return postData;
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
        if (this.state.status === "10") {
            // 推播
            addValuePush(postData).then(res => {
                if (res === 1) {
                    //成功
                    this.setState({ sent: true });
                } else {
                    this.setState({ alertText: '*傳送失敗，請稍後再試' });
                }
            })
        } else if (this.state.status === "11") {
            //數據
            postData = this.modifyPostData(postData);   //修改postData
            addValueMem(postData).then(res => {
                if (res === 1) {
                    //成功
                    this.setState({ sent: true });
                } else {
                    this.setState({ alertText: '*傳送失敗，請稍後再試' });
                }
            })
        }
    }

    render() {
        const { bill } = this.state;
        return (
            !this.props.permissionData.verified ?
                <Redirect to="/signup/signin" /> :
                <>
                    <Header cateIndex={4} />
                    {/* 儲值頁面 */}
                    <PushBill
                        level={this.props.permissionData.level}
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
                                            <h6 className="my-2">會員資格：{this.state.accountInfo.level}</h6>
                                            <h6 className="my-2">會員方案期限：{this.state.accountInfo.maxAge}</h6>
                                        </MemberCard>
                                        <MemberCard
                                            title="數據服務儲值"
                                            buttonName="數據儲值"
                                            handleClick={() => this.props.history.push('/memberCentre/billing/three')}
                                        >
                                            <h6 className="my-2">儲值以延續會員資格</h6>
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
                                            <h6 className="my-2">公司名稱：{this.state.accountInfo.companyName}</h6>
                                            <h6 className="my-2">統一編號：{this.state.accountInfo.taxId}</h6>
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