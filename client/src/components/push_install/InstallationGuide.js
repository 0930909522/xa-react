import React, { Component } from 'react';
// import { Container, Row } from "react-bootstrap";
// import Header from "../Header";
// import NavLeftPush from "../share/NavLeftPush";
// import PushTitle from '../share/PushTitle';

class InstallationGuide extends Component {
    constructor(props){
        super(props);
        this.state = {
            size:[200, 300]
        }
    }
    changeSize = (index, num) =>{
        let newSize = this.state.size;
        newSize[index] = num;
        this.setState({size: newSize});
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
                        <label className="mx-2">寬度：<input type="text" onChange={(e)=>this.changeSize(0, e.target.value)} /></label>
                        <label className="mx-2">高度：<input type="text" onChange={(e)=>this.changeSize(1, e.target.value)} /></label>
                        <div id={this.props.sendData} w="350" h="620" className="xnet_widget iframe_border">
                            <iframe title="example" width={this.state.size[0]} height={this.state.size[1]} src="http://www.writephponline.com/" />
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