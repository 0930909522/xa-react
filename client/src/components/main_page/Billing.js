import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import MemberCentreTitle from '../share/MemberCentreTitle';
import NavLeftMember from '../share/NavLeftMember';
import MemberCard from '../share/MemberCard';
// import PopMsg from '../share/PopMsg';
import PushBill from './PushBill';
import { FaRegCreditCard } from "react-icons/fa";
// import Payment from '../share/Payment';
import { withRouter } from 'react-router-dom'


class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',     // 數據、推播儲值狀態，''是關閉，'10'推播，'11'是數據
            paid: false,    //已選擇方案
            sent: false,    // 已送出資料
            type: null

        }
    }
    componentDidMount() {
        let newShowPayData = this.state.status;
        if (this.props.match.params.type === 'three') {
            newShowPayData = '11';
        } else if (this.props.match.params.type === 'four') {
            newShowPayData = '10';
        }
        this.setState({ type: this.props.match.params.type, status: newShowPayData })
    }

    componentDidUpdate(preProp) {
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
        this.setState({ status: '' });
        this.props.history.push('/memberCentre/billing/two')
    }

    // 推播餘額已選妥，開始填表
    toSend = () => {
        this.setState({ paid: true });
    }

    //送出
    submit = () => {
        this.setState({ sent: true });
        // 要將狀態復原
    }
    render() {
        return (
            <>
                <Header cateIndex={4} />
                <PushBill
                    status={this.state.status}
                    paid={this.state.paid}
                    close={() => this.close()}
                    handlePaid={this.toSend}
                    sent={this.state.sent}
                    submit={this.submit}
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
                                        // handleClick={() => browserHistory.push('/memberCentre/service')}
                                    >
                                        <h6 className="my-2">會員資格：付費會員 - 月繳</h6>
                                        <h6 className="my-2">會員方案期限：2019年3月3日 ~ 2019年4月3日</h6>
                                    </MemberCard>
                                    <MemberCard
                                        title="數據服務儲值"
                                        buttonName="數據儲值"
                                        handleClick={() =>this.props.history.push('/memberCentre/billing/three')}
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
                                        <h1>$0</h1>
                                    </MemberCard>
                                    <MemberCard title="您的推播收入" buttonName="安裝追蹤碼">
                                        <p>在您的網站安裝推推立即可開始收錢</p>
                                        <h1>$0</h1>
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