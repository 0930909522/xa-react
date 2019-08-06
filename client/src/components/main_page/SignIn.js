import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../Footer';
import Navpt from '../share/Navpt';
// import { FaCheck } from 'react-icons/fa';

class SignIn extends Component {
    render() {
        console.log(this.props.match.url)
        return (
            <>
                <Navpt />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <h1 className="text-center">智媒推推</h1>
                        <div className="box p-5 w-75 mx-auto">
                            <input placeholder="請輸入電子郵箱" type="email" name="email" className="w-100 my-2 p-1" />
                            <input placeholder=" 請輸入密碼" type="password" name="psd" className="w-100 my-2 p-1" />
                            <Row className="my-4">
                                <Col sm={6}>
                                    <a href="XXX" className="text-dark">忘記密碼？</a>
                                </Col>
                                <Col sm={6} className="text-right">
                                    <button className="btn btn-secondary radius20 px-5 py-2">登入</button>
                                </Col>
                            </Row>
                            <div className="text-center mt-5">
                                <p className="d-block mt-5 mb-2 text-dark">還沒有帳號？</p>
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