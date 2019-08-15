import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftMember from "../share/NavLeftMember";

class EditUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guideNum: 0,
            visited: null,
            editData: [true, true],
            data: {
                "nickname": "小明",
                "email": "a123@gmail.com",
                "company": "智媒",
                "serviceType": "新媒體",
                "job": "PM",
                "data": [{
                    "id": 1,
                    "name": "美環",
                    "email": "beautiful@gmail.com",
                    "permission": "分析員"
                }, {
                    "id": 2,
                    "name": "美環",
                    "email": "beautiful@gmail.com",
                    "permission": "分析員"
                }]
            },
            temporaryData: null

        };
        this.guide = [<div><h2 className="my-5">歡迎使用智媒推推</h2><h4 className="my-5">智媒推推讓您更有效的流量提升，針對媒體與電商的需求設計，讓您更簡便的投放操作。</h4>
        </div>, <div><p>AAAAAAA</p></div>, <div><p>BBBBB</p></div>];
    }
    handleChange = e => {
        this.setState({ guideNum: e.target.value })
    }
    componentDidMount() {
        if (localStorage.getItem('visited') !== '1') {
            this.setState({ visited: 0 });
        } else {
            this.setState({ visited: 1 });
        }
        localStorage.setItem('visited', '1');
    }
    changeBtn = i => {
        const newEditData = this.state.editData;
        if(newEditData[i] === false){
            this.setState({data: this.state.temporaryData, temporaryData: null});
        }
        newEditData[i] = !newEditData[i];
        this.setState({ editData: newEditData });
    }
    typeData = e =>{
        let newData = this.state.temporaryData;
        if(newData === null){
            newData = this.state.data;
        }
        newData[e.target.id] = e.target.value;
        this.setState({temporaryData: newData});
    }
    render() {
        return (
            <>
                <Header />
                <div className={this.state.visited === 0 ? "w-100 bg_gray" : "w-100 bg_gray d-none"}>
                    <div className="box w-75 mx-auto p-5 bg-white my-5">
                        <div className="d-inline-block h-15em">
                            {this.guide[this.state.guideNum]}
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
                                <div className=" mt-20">
                                    <h4 className="text-primary">個人檔案</h4>
                                    <hr />
                                    <label htmlFor="nickname">暱稱</label>
                                    <input name="nickname" id="nickname" type="text" className="input_1 mb-3" defaultValue={this.state.data.nickname} readOnly={this.state.editData[0]} onChange={this.typeData} />
                                    <label htmlFor="company">公司名稱</label>
                                    <input name="company" id="company" type="text" className="input_1 mb-3" defaultValue={this.state.data.company} readOnly={this.state.editData[0]}  onChange={this.typeData} />
                                    <label htmlFor="serviceType">服務類型</label>
                                    <input name="serviceType" id="serviceType" type="text" className="input_1 mb-3" defaultValue={this.state.data.serviceType} readOnly={this.state.editData[0]}  onChange={this.typeData} />
                                    <label htmlFor="job">公司職稱</label>
                                    <input name="job" id="job" type="text" className="input_1" defaultValue={this.state.data.job} readOnly={this.state.editData[0]}  onChange={this.typeData} />
                                    <button className="btn btn-outline-primary w-100 radius20 my-3 p-2 font_20" onClick={() => this.changeBtn(0)}>{this.state.editData[0] === true ? '變更' : '儲存'}</button>

                                    <h4 className="text-primary mt-5">電子郵件信箱</h4>
                                    <hr />
                                    <label htmlFor="email">電子郵件信箱</label>
                                    <input name="email" id="email" type="email" className="input_1" defaultValue={this.state.data.email} readOnly={this.state.editData[1]}  onChange={this.typeData} />
                                    <button className="btn btn-outline-primary w-100 radius20 my-3 p-2 font_20" onClick={() => this.changeBtn(1)}>{this.state.editData[0] === true ? '變更' : '儲存'}</button>
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