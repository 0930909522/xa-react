import React, { useState } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftMember from "../share/NavLeftMember";
import AlertMsg from '../share/AlertMsg';
import {updatePsd} from '../share/ajax';

const LoginAndSecure = () => {
    const [psd, changePsd] = useState('');
    const [checkPsd, changeCheckPsd] = useState('');
    const [oldPsd, changeOldPsd] = useState('');
    const [editing, changeState] = useState(false);
    const [msg, changeMsg] = useState('');
    const [showMsg, showAlertMsg] = useState(false);


    const submit = () => {
        if (editing === true) {
            if (psd.search(/\d/) === -1 || psd.length < 8 || psd.search(/[a-z]/) === -1) {
                showMsgFun('密碼格式不符');
                return;
            }
            if (psd !== checkPsd) {
                showMsgFun('密碼驗證不一致');
                return;
            }
            const postData = {
                old: oldPsd,
                new: psd
            }
            // 傳送密碼
            updatePsd(postData)
            .then(res=>{
                if(res === 1){
                    showMsgFun('修改成功');
                }else{
                    showMsgFun('舊密碼輸入錯誤');
                    return;
                }
            })
        }
        changeState(!editing);
    }
    function showMsgFun(text) {
        showAlertMsg(true);
        changeMsg(text);
        setTimeout(() => {
            showAlertMsg(false);
        }, 3000);
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         editingData: false,
    //         temporaryData: "",
    //         data: ""

    //     };
    // }

    // componentDidMount() {
    //     const addPsd = this.state.data;
    //     addPsd.password = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';
    //     this.setState({ data: addPsd });
    // }

    // changeBtn = (i, e) => {
    //     const newEditData = this.state.editData;
    //     if (newEditData[i] === false) {
    //         this.setState({ data: this.state.temporaryData, temporaryData: null });
    //     }
    //     newEditData[i] = !newEditData[i];
    //     this.setState({ editData: newEditData });
    // }
    // typeData = e => {
    //     let newData = this.state.temporaryData;
    //     if (newData === null) {
    //         newData = this.state.data;
    //     }
    //     newData[e.target.id] = e.target.value;
    //     this.setState({ temporaryData: newData });
    // }

    // render() {
    return (
        <>
            <AlertMsg
                text={msg}
                attr={showMsg ? 'opacity1' : 'opacity0'}
                close={() => showAlertMsg(false)}
            />
            <Header />
            <div className="layout_main">
                <Container className="main_analytic">
                    <Row>
                        <NavLeftMember two />
                        <div className="main_right">
                            <h2>會員中心<span style={{ fontSize: '20px' }}>&nbsp;/登入與帳號安全</span></h2>
                            <div className=" box radius10 mt-20">
                                <h4 className="text-primary">變更密碼</h4>
                                <hr />
                                <label htmlFor="password">密碼</label>
                                {editing ?
                                    <>
                                        <label htmlFor="oldpassword">請輸入舊密碼</label>
                                        <input
                                            name="oldpassword"
                                            type="password"
                                            className="input_1 mb-3"
                                            defaultValue=""
                                            placeholder="密碼：8個以上包含半形英文數字"
                                            onChange={(e) => changeOldPsd(e.target.value)}
                                        />
                                        <label htmlFor="password">請輸入新密碼</label>
                                        <input
                                            name="password"
                                            type="password"
                                            className="input_1 mb-3"
                                            defaultValue=""
                                            placeholder="密碼：8個以上包含半形英文數字"
                                            onChange={(e) => changePsd(e.target.value)}
                                        />
                                        <input
                                            name="password"
                                            type="password"
                                            className="input_1 mb-3"
                                            defaultValue=""
                                            placeholder="再次輸入密碼"
                                            onChange={(e) => changeCheckPsd(e.target.value)}
                                        />
                                        {(psd !== checkPsd && checkPsd) && <p className="text-danger">*密碼不一致</p>}
                                    </>
                                    :
                                    <h5>{'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}</h5>
                                }
                                <button
                                    className="btn btn-outline-primary w-100 radius20 my-3 p-2 font_20"
                                    onClick={submit}
                                >{editing ? '儲存' : '變更'}</button>

                                {/* <h4 className="text-primary mt-5">邀請帳戶存取權</h4>
                                    <hr />
                                    <label htmlFor="email">電子郵件信箱</label>
                                    <input name="email" id="email" type="email" className="input_1 mb-3" defaultValue={this.state.data.email} readOnly={this.state.editData[1]} onChange={this.typeData} />
                                    <button className="btn btn-outline-primary w-100 radius20 my-3 p-2 font_20" onClick={(e) => this.changeBtn(1, e)}>{this.state.editData[0] === true ? '變更' : '儲存'}</button> */}
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
    // }
}
export default LoginAndSecure;