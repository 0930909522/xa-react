import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import NavLeftPush from "../share/NavLeftPush";
import PushTitle from '../share/PushTitle';

class InstallationGuide extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush />
                            <div className="main_right">
                                <h2>推播安裝</h2>
                                <PushTitle three />
                                <div className="box">
                                    <h2>3個步驟就能在網站上安裝廣告模組</h2>
                                    <br/>
                                    <h5>步驟一：</h5>
                                    <p>請到特定頁面推播選取您想要推播安裝的程式碼，並且複製程式碼，在您每個網頁上，於&lt;HEAD&gt;中當作第一個項目貼上。</p>
                                    <h5>步驟二：</h5>
                                    <p>通知我們您已在網站上安裝了模組的程式碼，我們將立即為您測試作業。<a href="XXX">聯絡我們</a></p>
                                    <h5>步驟三：</h5>
                                    <p>3個工作天內，您網站的相關資料就會開始顯示。</p>
                                </div>
                            </div>

                        </Row>
                    </Container>
                </div>
            </>
        )
    }
}
export default InstallationGuide;