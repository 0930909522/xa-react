import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftPush from "../share/NavLeftPush";
import SettingTitle from '../share/SettingTitle';

class CheckSuccess extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush one />
                            <div className="main_right">
                                <h2>安裝追蹤碼</h2>
                                <SettingTitle four />
                                <div className="box radius10">
                                    <h4 className="py-4 px-2 ">確認追蹤程式碼運作正常</h4>
                                    <div className="box">
                                        <h5>若要確認追蹤程式碼運作正常，請造訪您的網站並確認該造訪已登錄在<a href="XX">即時報表</a>中。</h5>
                                        <h5>初次設定需要3個工作天，若在3個工作天後狀態依然顯示「尚無活動」，你的程式碼將可能無法正確安裝。你可以查看<a href="XX">常見問題</a>以瞭解安裝方式來解決問題。</h5>
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

export default CheckSuccess;
