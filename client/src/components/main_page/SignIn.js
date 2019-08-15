import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../Footer';
import Navpt from '../share/Navpt';

class SignIn extends Component {
    render() {
        console.log(this.props.match.url)
        return (
            <>
                <Navpt />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <div className="box p-5 w-75 mx-auto" style={{'position':'relative'}}>
                            <button className="btn_noborder_r btn_like dec_none cancel_btn m-2 bg-secondary round text-white">&#10006;</button>
                            <h3 className="mb-3">智媒推推</h3>
                            <input placeholder="請輸入電子郵箱" type="email" name="email" className="input_1 my-3" />
                            <input placeholder=" 請輸入密碼" type="password" name="psd" className="input_1" />
                            <a href="javascript:void(0)" className="my-1 d-block">忘記密碼？</a>
                            <button className="btn btn-outline-primary radius20 font_20 my-4 p-2 w-100">登入</button>
                            <div className="text-center">
                                <p className="d-block mb-2 text-dark">還沒有帳號？</p>
                                <button className="btn btn-info radius20 px-5 py-2">我要註冊</button>
                            </div>
                        </div>
                    </Container>
                </div>
                <Footer />
            </>
        )
    }
}
export default SignIn;