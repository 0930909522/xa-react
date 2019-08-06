import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftMember from "../share/NavLeftMember";

class EditUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guide: [<div>
                <h2 className="my-5">歡迎使用智媒推推</h2><h4 className="my-5">智媒推推讓您更有效的流量提升，針對媒體與電商的需求設計，讓您更簡便的投放操作。</h4>
            </div>, <div><p>AAAAAAA</p></div>],
            guideNum: 0,
            visited: null
        }
    }
    handleChange = e => {
        this.setState({ guideNum: e.target.value })
    }
    componentDidMount(){
        if(localStorage.getItem('visited') !== '1'){
            this.setState({visited: 0});
        }else{
            this.setState({visited: 1});
        }
        localStorage.setItem('visited', '1');
    }
    render() {
        return (
            <>
                <Header />
                <div className={this.state.visited === 0? "w-100 bg_gray": "w-100 bg_gray d-none"}>
                    <div className="box w-75 mx-auto p-5 bg-white my-5">
                        <div className="d-inline-block h-15em">
                            {this.state.guide[this.state.guideNum]}
                        </div>
                        <div className="d-flex flex-column">
                            <button className="align-self-start my-5 btn btn-info">開始使用</button>
                            <div className="text-center">
                                <input name="choose" type="radio" className="mx-2" value="0" onChange={this.handleChange} defaultChecked />
                                <input name="choose" type="radio" className="mx-2" value="1" onChange={this.handleChange} />
                                <input name="choose" type="radio" className="mx-2" value="2" onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftMember one />
                            <div className="main_right">
                                <h2>會員中心<span style={{ fontSize: '20px' }}>&nbsp;/編輯使用者資訊</span></h2>
                                <div className=" mt-20 bg-white">
                                    <div className="d-table w-100 dash_table">
                                        <div className="d-table-row bg-light">
                                            <div className="d-table-cell pl-3">
                                                <p>個人檔案</p>
                                            </div>
                                            <div className="d-table-cell text-right pr-3">
                                                <button className="btn btn-secondary radius20">更變</button>
                                            </div>
                                        </div>
                                        <div className="d-table-row">
                                            <div className="d-table-cell pl-3 dash">
                                                <p>暱稱</p>
                                            </div>
                                            <div className="d-table-cell pr-3 dash">
                                                <p>小丸子</p>
                                            </div>
                                        </div>
                                        <div className="d-table-row ">
                                            <div className="d-table-cell pl-3 dash">
                                                <p>公司名稱</p>
                                            </div>
                                            <div className="d-table-cell pr-3 dash">
                                                <p>今周文化事業(股)公司</p>
                                            </div>
                                        </div>
                                        <div className="d-table-row">
                                            <div className="d-table-cell pl-3 dash">
                                                <p>服務類型</p>
                                            </div>
                                            <div className="d-table-cell pr-3 dash">
                                                <p>雜誌、出版社</p>
                                            </div>
                                        </div>
                                        <div className="d-table-row">
                                            <div className="d-table-cell pl-3">
                                                <p>你在公司職稱</p>
                                            </div>
                                            <div className="d-table-cell pr-3">
                                                <p>PM</p>
                                            </div>
                                        </div>
                                        <div className="d-table-row bg-light">
                                            <div className="d-table-cell pl-3">
                                                <p>電子郵件信箱</p>
                                            </div>
                                            <div className="d-table-cell text-right pr-3">
                                                <button className="btn btn-secondary radius20">更變</button>
                                            </div>
                                        </div>
                                        <div className="d-table-row">
                                            <div className="d-table-cell pl-3">
                                                <p>電子郵件信箱</p>
                                            </div>
                                            <div className="d-table-cell pr-3">
                                                <p>yu•••@g••••</p>
                                            </div>
                                        </div>
                                    </div>

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
export default EditUserInfo;