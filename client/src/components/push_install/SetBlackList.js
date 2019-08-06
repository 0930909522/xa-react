import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import NavLeftPush from "../share/NavLeftPush";
import PushTitle from '../share/PushTitle';

class SetBlackList extends Component {
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
                                <PushTitle two />
                                <h5 className="my-3">目前已投放在您網站上的客戶網站</h5>
                                <div className="box">
                                    <button className="btn btn-warning activity_btn">上架</button>
                                    <button className="btn btn-secondary activity_btn">下架</button>
                                    <table className="pushTable_r w-100 text-center" cellPadding="15">
                                        <thead>
                                            <tr>
                                                <th><input type="checkbox" /></th>
                                                <th>網站名稱</th>
                                                <th>網址</th>
                                                <th>狀態</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><input type="checkbox" /></td>
                                                <td>Pinkoi</td>
                                                <td>www.pinkoi.com</td>
                                                <td>刊登中</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" /></td>
                                                <td>Pchome</td>
                                                <td>shopping.pchome.com.tw</td>
                                                <td>關閉中</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" /></td>
                                                <td>蝦皮</td>
                                                <td>shopee.tw</td>
                                                <td>刊登中</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" /></td>
                                                <td>UDN 買東西</td>
                                                <td>shopping.udn.com</td>
                                                <td>刊登中</td>
                                            </tr>
                                            <tr>
                                                <td><input type="checkbox" /></td>
                                                <td>GOMAJI夠麻吉</td>
                                                <td>www.gomaji.com</td>
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
export default SetBlackList;