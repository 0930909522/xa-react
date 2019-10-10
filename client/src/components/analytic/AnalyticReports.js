import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Nav, Navbar, Form, FormControl, Button, OverlayTrigger, Table } from 'react-bootstrap';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import { Redirect } from 'react-router'
import { IoMdDesktop, IoMdToday, IoIosCalculator, IoIosPhonePortrait, IoMdSearch, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { htmlInstallTrack } from '../share/checkPermission';
const thisLevel = 1; //設定本頁權限 1-4

class AnalyticBasis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "foodnext",
            isOpenItem01: true,
            isOpenItem02: true,
            isOpenItem03: true,
            isOpenItem04: true,
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get('https://node.aiday.org/sbir/basic/ga', {
            params: {
                view: this.state.view,
            }
        })
            .then(response => {
                this.setState({
                    pageviewHot: response.data.pageviewHot,
                    pageviewShare: response.data.pageviewShare,
                    userInterest: response.data.userInterest,
                    pageviewCate: response.data.pageviewCate
                });

            })
            .catch((err) => {
                console.log(err);
            });
    }


    openItem01() {
        this.setState(prev => ({ isOpenItem01: !prev.isOpenItem01 }));
    }
    openItem02() {
        this.setState(prev => ({ isOpenItem02: !prev.isOpenItem02 }));
    }
    openItem03() {
        this.setState(prev => ({ isOpenItem03: !prev.isOpenItem03 }));
    }
    openItem04() {
        this.setState(prev => ({ isOpenItem04: !prev.isOpenItem04 }));
    }

    render() {
        const { pageviewHot, pageviewCate, pageviewShare, userInterest, isOpenItem01, isOpenItem02, isOpenItem03, isOpenItem04 } = this.state;
        const { name, level, verified } = this.props.permissionData;
        return (
            verified !== true ?
            <Redirect to="/signup/signin" /> :
            <>
                <Header cateIndex={1} />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeft />
                            <div className="main_right">
                                <h2>流量報表</h2>
                                { level < thisLevel ? htmlInstallTrack(level, thisLevel) : 
                                <>
                                    <div className="box">
                                        <h3> 熱門頁面
                                            <span onClick={() => { this.openItem01() }} className="Collapse">
                                                {isOpenItem01 ? <span><IoIosArrowUp />收合</span> : <span><IoIosArrowDown />開啟</span>}
                                            </span>
                                        </h3>
                                        <p>一周內的頁面瀏覽總數</p>
                                        {isOpenItem01 ?
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th width="70%">標題</th>
                                                        <th width="15%">瀏覽量</th>
                                                        <th width="15%">彈跳率(%)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pageviewHot ? pageviewHot.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td>{item.pageTitle}</td>
                                                            <td>{item.pageviews}</td>
                                                            <td>{item.bounceRate}</td>
                                                        </tr>
                                                    }) : console.log()}
                                                </tbody>
                                            </Table> : <></>}
                                    </div>
                                    <div className="box">
                                        <h3> 分類流量
                                            <span onClick={() => { this.openItem02() }} className="Collapse">
                                                {isOpenItem01 ? <span><IoIosArrowUp />收合</span> : <span><IoIosArrowDown />開啟</span>}
                                            </span>
                                        </h3>
                                        <p>一周內的分類瀏覽總數</p>
                                        {isOpenItem02 ?
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th width="70%">分類名稱</th>
                                                        <th width="30%">瀏覽量</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pageviewCate ? pageviewCate.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td>{item.name}</td>
                                                            <td>{item.value}</td>
                                                        </tr>
                                                    }) : console.log()}

                                                </tbody>
                                            </Table> : <></>}
                                    </div>
                                    <div className="box">
                                        <h3> 客戶來源
                                            <span onClick={() => { this.openItem03() }} className="Collapse">
                                                {isOpenItem01 ? <span><IoIosArrowUp />收合</span> : <span><IoIosArrowDown />開啟</span>}
                                            </span>
                                        </h3>
                                        <p>一周內的頁面成功轉載總數</p>
                                        {isOpenItem03 ?
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th width="70%">標題</th>
                                                        <th width="30%">瀏覽量</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pageviewShare ? pageviewShare.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td>{item.name}</td>
                                                            <td>{item.value}</td>
                                                        </tr>
                                                    }) : console.log()}

                                                </tbody>
                                            </Table> : <></>}
                                    </div>
                                    <div className="box">
                                        <h3> 喜好分布
                                            <span onClick={() => { this.openItem04() }} className="Collapse">
                                                {isOpenItem01 ? <span><IoIosArrowUp />收合</span> : <span><IoIosArrowDown />開啟</span>}
                                            </span>
                                        </h3>
                                        <p>一周內的喜好訪客總數</p>
                                        {isOpenItem04 ?
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th width="70%">喜好</th>
                                                        <th width="30%">人次</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {userInterest ? userInterest.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td>{item.name}</td>
                                                            <td>{item.value}</td>
                                                        </tr>
                                                    }) : console.log()}

                                                </tbody>
                                            </Table> : <></>}
                                    </div>
                                </> }
                            </div>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </>
        );
    }
}
export default AnalyticBasis;