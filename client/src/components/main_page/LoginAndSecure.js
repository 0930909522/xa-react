import React, { useState } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftMember from "../share/NavLeftMember";
import AlertMsg from '../share/AlertMsg';
import { updatePsd } from '../share/ajax';
import { Redirect } from 'react-router';

//本頁權限 0-4

const LoginAndSecure = (props) => {
    const [psd, changePsd] = useState('');
    const [checkPsd, changeCheckPsd] = useState('');
    const [oldPsd, changeOldPsd] = useState('');
    const [editing, changeState] = useState(false);
    const [msg, changeMsg] = useState('');
    const [showMsg, showAlertMsg] = useState(false);


    const submit = async () => {
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
            await updatePsd(postData)
                .then(res => {
                    if (typeof res === 'string') {
                        // 如果有錯誤訊息
                        showMsgFun(res);
                    }
                    if (res.status === 1) {
                        showMsgFun('修改成功');
                        changeState(!editing);
                    } else {
                        showMsgFun('舊密碼輸入錯誤');
                    }
                })
                .catch(()=>{
                    showMsgFun('發生錯誤，請稍後再試');
                })
            return ;
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

    return (
        !props.permissionData.verified ?
            <Redirect to="/signup/signin" /> :
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
                                </div>
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