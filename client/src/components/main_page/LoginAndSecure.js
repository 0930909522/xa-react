import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftMember from "../share/NavLeftMember";

class LoginAndSecure extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftMember two />
                            <div className="main_right">
                                <h2>會員中心<span style={{ fontSize: '20px' }}>&nbsp;/登入與帳號安全</span></h2>
                                <div className=" mt-20 bg-white">
                                    <table className="w-100 dash_table">
                                        <tbody>
                                            <tr className="d-table-row bg-light">
                                                <td className="d-table-cell pl-3">
                                                    <span>變更密碼</span>
                                                </td>
                                                <td className="d-table-cell text-right pr-3" colSpan="3">
                                                    <button className="btn btn-secondary radius20">更變</button>
                                                </td>
                                            </tr>
                                            <tr className="d-table-row">
                                                <td className="d-table-cell pl-3">
                                                    <p>密碼</p>
                                                </td>
                                                <td className="d-table-cell pr-3">
                                                    <p>••••••••••••</p>
                                                </td>
                                            </tr>
                                            <tr className="d-table-row bg-light">
                                                <td className="d-table-cell pl-3">
                                                    <span>邀請帳戶存取權</span>
                                                </td>
                                                <td className="d-table-cell text-right pr-3" colSpan="3">
                                                    <button className="btn btn-secondary radius20">更變</button>
                                                </td>
                                            </tr>
                                            <tr className="d-table-row">
                                                <td className="d-table-cell pl-3 dash">
                                                    <p>暱稱</p>
                                                </td>
                                                <td className="d-table-cell pr-3 dash">
                                                    <p>使用者</p>
                                                </td>
                                                <td className="d-table-cell pr-3 dash">
                                                    <p>存取層級</p>
                                                </td>
                                                <td className="d-table-cell pr-3 dash">
                                                    <p>上次登入日期</p>
                                                </td>
                                            </tr>
                                            <tr className="d-table-row">
                                                <td className="d-table-cell pl-3 dash">
                                                    <p>小丸子(您)</p>
                                                </td>
                                                <td className="d-table-cell pr-3 dash">
                                                    <p>yumi@gmail.com</p>
                                                </td>
                                                <td className="d-table-cell pr-3 dash">
                                                    <p>管理員</p>
                                                </td>
                                                <td className="d-table-cell pr-3 dash">
                                                    <p>2019年03月24日</p>
                                                </td>
                                            </tr>
                                            <tr className="d-table-row">
                                                <td className="d-table-cell pl-3">
                                                    <p>美環</p>
                                                </td>
                                                <td className="d-table-cell pr-3">
                                                    <p>beautiful@gmail.com</p>
                                                </td>
                                                <td className="d-table-cell pr-3">
                                                    <p>分析員</p>
                                                </td>
                                                <td className="d-table-cell pr-3">
                                                    <p>2019年03月24日</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

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
export default LoginAndSecure;