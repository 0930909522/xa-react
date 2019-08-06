import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import NavLeftPush from "./share/NavLeftPush";
import PushTitle from "./share/PushTitle";

class MediaPlaform extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush />
                            <div className="main_right">
                                <h2>推播設定<span style={{ fontSize: '20px' }}>&nbsp;/ 特定頁面推播 / 選擇媒體平台</span></h2>
                                <PushTitle one />
                                <div className="box">
                                    <table className="pushTable w-100 text-center" cellPadding="15">
                                        <thead>
                                            <tr>
                                                <th>平台名稱</th>
                                                <th>狀態</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>商業週刊</td>
                                                <td>關閉中</td>
                                            </tr>
                                            <tr>
                                                <td>ETtoday</td>
                                                <td>刊登中</td>
                                            </tr>
                                            <tr>
                                                <td>聯合報</td>
                                                <td>刊登中</td>
                                            </tr>
                                            <tr>
                                                <td>中央社</td>
                                                <td>刊登中</td>
                                            </tr>
                                            <tr>
                                                <td>蘋果日報</td>
                                                <td>刊登中</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
}
export default MediaPlaform;