import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";
// import Header from "../Header";
// import NavLeftPush from "../share/NavLeftPush";
// import SettingTitle from '../share/SettingTitle';
// import Footer from '../Footer';
import { tracking } from '../share/ajax';

class SetTrackingCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visited: null,
            guideNum: 0,
            data: {
                sn: '',
                dn: '',
                type: 'newmedia'
            }
        }
        this.guide = [<div><h2 className="my-5">歡迎使用智媒推推</h2><h4 className="my-5">智媒推推讓您更有效的流量提升，針對媒體與電商的需求設計，讓您更簡便的投放操作。</h4>
        </div>, <div><p>AAAAAAA</p></div>, <div><p>BBBBB</p></div>];
    }
    componentDidMount() {
        let status = localStorage.getItem('visited');
        if (status === '1') {
            // 第一次登入
            this.setState({ visited: 1 });
        } else {
            this.setState({ visited: 0 });
        }
    }
    closeGuide = () => {
        this.setState({ visited: 0 });
        localStorage.setItem('visited', '0');
    }
    handleChange = e => {
        this.setState({ guideNum: e.target.value })
    }
    addingData = (e, text) => {
        const newData = this.state.data;
        newData[text] = e.target.value;
        this.setState({ data: newData });
    }
    submit = () => {
        let postData = this.state.data;
        for (let i in postData) {
            if (postData[i] === '') {
                alert('欄位不可為空');
                return;
            }
        }
        postData.token = localStorage.getItem('token');
        tracking(postData).then(response => {
            if (response !== undefined) {
                console.log(response)
                localStorage.setItem('view', response.view);
                alert('資料傳送成功，前往新專案');
                this.cancel();
            }
        })
    }
    cancel = () => {
        const newData = this.state.data;
        for (let i in newData) {
            newData[i] = '';
            if (i === 'type') {
                newData[i] = 'newmedia';
            }
        }
        this.setState({ data: newData });
    }
    render() {
        return (
            <>
                {/* <div className={this.state.visited === 1 ? "w-100 bg_gray" : "w-100 bg_gray d-none"}>
                    <div className="box w-75 mx-auto p-5 bg-white my-5">
                        <div className="d-inline-block h-15em">
                            {this.guide[this.state.guideNum]}
                        </div>
                        <div className="d-flex flex-column">
                            <button className="align-self-start my-5 btn btn-info" onClick={this.closeGuide}>開始使用</button>
                            <div className="text-center">
                                <input name="choose" type="radio" className="mx-2" value="0" onChange={this.handleChange} defaultChecked />
                                <input name="choose" type="radio" className="mx-2" value="1" onChange={this.handleChange} />
                                <input name="choose" type="radio" className="mx-2" value="2" onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush one />
                            <div className="main_right">
                                <h2>安裝追蹤碼</h2>
                                <SettingTitle one />
                                <div className="mt-20"> */}
                {/* <div className="box mb-2 bg-white radius10">
                                        <h5 style={{ 'fontWeight': '600' }}>建立新的「追蹤 ID」</h5>
                                        <p>在您建立第一項資源時，我們也會同時建立一個預設資料檢視，用來收集追蹤程式碼的所有相關資料。如果您只想收集這個程式碼的一部分資料，可以建立第二個報表資料檢視，然後為這些資料建立並套用一或多個資料檢視篩選器。</p>
                                    </div> */}
                <div className="box mb-2 bg-white radius10">
                    <h5 style={{ 'fontWeight': '600' }}>追蹤方式</h5>
                    <p>這項資源需要通用 Analytics (分析) 才能運作。只要按一下 [取得追蹤 ID] 並導入通用 Analytics (分析) 追蹤程式碼片段，即可完成設定。</p>
                </div>
                <div className="box mb-2 bg-white radius10">
                    <h5 style={{ 'fontWeight': '600' }}>設定您的資源</h5>
                    <Row className="my-3">
                        <Col sm={2}>
                            <label htmlFor="webpageName" className=" border_left pl-2 font_20">網站名稱</label>
                        </Col>
                        <Col sm={10}>
                            <input type="text" id="webpageName" className="input_1" value={this.state.data.sn} onChange={(e) => this.addingData(e, 'sn')} />
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col sm={2}>
                            <label htmlFor="webpageURL" className=" border_left pl-2 font_20">網站網址</label>
                        </Col>
                        <Col sm={10}>
                            <input type="text" id="webpageURL" className="w-100 input_1" value={this.state.data.dn} onChange={(e) => this.addingData(e, 'dn')} />
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col sm={2}>
                            <label className=" border_left pl-2 font_20">產業類型</label>
                        </Col>
                        <Col sm={10}>
                            <select className="input_1" value={this.state.data.type} onChange={(e) => this.addingData(e, 'type')} >
                                <option value="newmedia">新媒體</option>
                                <option value="ecommerce">電商</option>
                                <option value="house">房地產</option>
                                <option value="finance">金融</option>
                                <option value="art_entertainment">藝術與娛樂</option>
                                <option value="others">其他</option>
                            </select>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-primary activity_btn radius20 w-100" onClick={this.submit}>新增</button>
                        <button className="btn btn-outline-primary activity_btn radius20 w-100" onClick={this.props.changeStatus}>取消</button>
                    </div>
                </div>
                {/* </div>
                            </div>
                        </Row>
                    </Container>
                </div>
                <Footer /> */}
            </>
        )
    }
}
export default SetTrackingCode;
