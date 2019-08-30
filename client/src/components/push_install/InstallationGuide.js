import React, { Component } from 'react';
import Smallalert from '../share/Smallalert';
// import { Container, Row } from "react-bootstrap";
// import Header from "../Header";
// import NavLeftPush from "../share/NavLeftPush";
// import PushTitle from '../share/PushTitle';

class InstallationGuide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            size: [200, 300]
        }
    }
    changeSize = (index, num) => {
        let newSize = this.state.size;
        newSize[index] = num;
        this.setState({ size: newSize });
    }
    copyId = () => {
        document.getElementById('copiedText').select();
        let copyState = false;
        if (document.execCommand('copy')) {
            copyState = 1;
        } else {
            copyState = 2;
        }
        this.setState({ showAlert: copyState });
        setTimeout(() => {
            this.setState({ showAlert: false });
        }, 4000);
    }
    render() {
        return (
            <>
                {/* <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush />
                            <div className="main_right">
                                <h2>推播安裝</h2>
                                <PushTitle three /> */}
                <div className="box">
                    <h2>3個步驟就能在網站上安裝廣告模組</h2>
                    <br />
                    <div className="text-center">
                        <label className="mx-2">寬度：<input defaultValue="200" type="text" onChange={(e) => this.changeSize(0, e.target.value)} /></label>
                        <label className="mx-2">高度：<input defaultValue="300" type="text" onChange={(e) => this.changeSize(1, e.target.value)} /></label>
                        <div className="iframe_border">
                            <iframe title="example" width={this.state.size[0]} height={this.state.size[1]} src="http://www.writephponline.com/" />
                        </div>
                        <div className="my-5">
                            {/* <h5 className="w-75 mx-auto bg-primary p-3 radius10 text-light"><small>我的 ID</small><p className="mt-2"><strong>{}</strong></p></h5> */}
                            <textarea value={`<div id="${this.props.sendData}" w="${this.state.size[0]}" h="${this.state.size[1]}" class="xnet_widget"></div>`} style={{ 'width': '500px' }} id="copiedText" className="p-3" readOnly></textarea>
                            <button className="d-block btn btn-info mx-auto" onClick={this.copyId}>點我複製 ID</button>
                            <Smallalert text="複製成功" attr={this.state.showAlert === 1 ? 'small_alert_success opacity1' : 'opacity0'} />
                            <Smallalert text="無法複製" attr={this.state.showAlert === 2 ? 'small_alert_danger opacity1' : 'opacity0'} />
                        </div>
                    </div>
                    <h5>步驟一：</h5>
                    <p>請到特定頁面推播選取您想要推播安裝的程式碼，並且複製程式碼，在您每個網頁上，於&lt;HEAD&gt;中當作第一個項目貼上。</p>
                    <h5>步驟二：</h5>
                    <p>通知我們您已在網站上安裝了模組的程式碼，我們將立即為您測試作業。<a href="XXX">聯絡我們</a></p>
                    <h5>步驟三：</h5>
                    <p>3個工作天內，您網站的相關資料就會開始顯示。</p>
                </div>
                <div className="text-center my-3" >
                    <button className="btn btn-secondary mx-1" onClick={() => window.location.reload()}>&nbsp;&nbsp;&nbsp;確認&nbsp;&nbsp;&nbsp;</button>
                    <button className="btn btn-secondary mx-1" onClick={() => this.props.changeStatus(0)}>&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;</button>
                </div>
                {/* </div>

                        </Row>
                    </Container>
                </div> */}
            </>
        )
    }
}
export default InstallationGuide;