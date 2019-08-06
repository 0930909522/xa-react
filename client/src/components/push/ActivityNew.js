import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import NavLeftPush from "./share/NavLeftPush";
import PushTitle from "./share/PushTitle";
import AdvertiseType from "./share/AdvertiseType";
import AdvertiseLink from "./share/AdvertiseLink";
import AdvertiseNameDate from './share/AdvertiseNameDate';
import previw from '../../images/preview.png';
import { FaAngleRight } from "react-icons/fa";

class ActivityNew extends Component {
    constructor(props){
        super(props);
        this.state = {
            eleWidth: [0, 0],
        }
        this.getWidth = React.createRef();
    }
    componentDidMount(){
        const scrollWidths = [...this.state.eleWidth];
        scrollWidths[0] = this.getWidth.scrollWidth;
        this.setState({eleWidth: scrollWidths});
    }
    handleClick = e =>{
        e.preventDefault();
        const scrollWidths = [...this.state.eleWidth];
        scrollWidths[1] += 30;
        this.setState({eleWidth: scrollWidths});
        this.getWidth.scrollLeft += 30;
    }
    render() {
        return (
            <>
                <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush />
                            <div className="main_right">
                                <h2>推播設定<span style={{ fontSize: '20px' }}>&nbsp;/ 特定頁面推播 / 主題活動</span></h2>
                                <PushTitle one />
                                <form className="push_activity">
                                    <AdvertiseType />
                                    <div className="box">
                                        <AdvertiseNameDate />
                                        <Row className="mt-3">
                                            <Col md={11}>
                                                <div 
                                                    className="box srollX text-center" 
                                                    ref={(ele)=>{this.getWidth = ele;}}
                                                >
                                                    <ul>
                                                        <li>資金潮讓投資人「嗨」到高點　樂觀之餘台股要留意這4個重點</li>
                                                        <li>資金潮讓投資人「嗨」到高點　樂觀之餘台股要留意這4個重點</li>
                                                        <li>資金潮讓投資人「嗨」到高點　樂觀之餘台股要留意這4個重點</li>
                                                        <li>資金潮讓投資人「嗨」到高點　樂觀之餘台股要留意這4個重點</li>
                                                        <li>資金潮讓投資人「嗨」到高點　樂觀之餘台股要留意這4個重點</li>
                                                        <li>資金潮讓投資人「嗨」到高點　樂觀之餘台股要留意這4個重點</li>
                                                        <li>資金潮讓投資人「嗨」到高點　樂觀之餘台股要留意這4個重點</li>
                                                        <li>資金潮讓投資人「嗨」到高點　樂觀之餘台股要留意這4個重點</li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col md={1} className="mt-3 d-flex align-self-center">
                                                <button className="btn_noborder">
                                                <FaAngleRight
                                                    onClick={this.handleClick}
                                                />
                                                </button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6} className="mt-3">
                                                <AdvertiseLink />
                                            </Col>
                                            <Col md={6} className="text-center mt-3">
                                                <p>預覽</p>
                                                <div className="box_border text-left">
                                                    <p>今周刊教你聰明理財</p>
                                                    <div className="cards">
                                                        <div className="box card-item">
                                                            <img src={previw} alt="1" />
                                                            <h6>資金潮讓投資人「嗨」到高點　樂觀之餘台股要留意這4個重點</h6>
                                                        </div>
                                                        <div className="box card-item">
                                                            <img src={previw} alt="1" />
                                                            <h6>銀行定存領1％太吃虧了！ 4招投資術教你如何穩穩賺到錢</h6>
                                                        </div>
                                                        <div className="box card-item">
                                                            <img src={previw} alt="1" />
                                                            <h6>商業地產交易量飆高 建商競相出手搶地</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="text-center mt-3">
                                            <button className="btn btn-secondary activity_btn">確認</button>
                                            <button className="btn btn-light activity_btn">取消</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}
export default ActivityNew;