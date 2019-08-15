import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftMember from "../share/NavLeftMember";

class LoginAndSecure extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    componentDidMount() {
        const addPsd = this.state.data;
        addPsd.password = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';
        this.setState({ data: addPsd });
    }

    changeBtn = (i, e) => {
        const newEditData = this.state.editData;
        if (newEditData[i] === false) {
            this.setState({ data: this.state.temporaryData, temporaryData: null });
        }
        newEditData[i] = !newEditData[i];
        this.setState({ editData: newEditData });
    }
    typeData = e => {
        let newData = this.state.temporaryData;
        if (newData === null) {
            newData = this.state.data;
        }
        newData[e.target.id] = e.target.value;
        this.setState({ temporaryData: newData });
    }

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
                                <div className=" mt-20">
                                    <h4 className="text-primary">變更密碼</h4>
                                    <hr />
                                    <label htmlFor="password">密碼</label>
                                    <input name="password" id="password" type="password" className="input_1 mb-3" defaultValue={this.state.data.password} readOnly={this.state.editData[0]} onChange={this.typeData} />
                                    <button className="btn btn-outline-primary w-100 radius20 my-3 p-2 font_20" onClick={(e) => this.changeBtn(0, e)}>{this.state.editData[0] === true ? '變更' : '儲存'}</button>

                                    <h4 className="text-primary mt-5">邀請帳戶存取權</h4>
                                    <hr />
                                    <label htmlFor="email">電子郵件信箱</label>
                                    <input name="email" id="email" type="email" className="input_1 mb-3" defaultValue={this.state.data.email} readOnly={this.state.editData[1]} onChange={this.typeData} />
                                    <button className="btn btn-outline-primary w-100 radius20 my-3 p-2 font_20" onClick={(e) => this.changeBtn(1, e)}>{this.state.editData[0] === true ? '變更' : '儲存'}</button>
                                </div>
                                {/* <div className=" mt-20 bg-white">
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
                                </div> */}
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