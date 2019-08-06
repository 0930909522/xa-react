import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../Footer';
import Navpt from '../share/Navpt';

class Register extends Component {
    render() {
        return (
            <>
                <Navpt />
                <div className="layout_main" style={{'fontSize': '20px'}}>
                    <Container className="main_analytic">
                        <h1 className="text-center">建立新帳號</h1>
                        <div className="box px-5">
                            <Row className="my-4">
                                <Col sm={4}><label htmlFor="nickname" className=" border_left pl-2">暱稱</label></Col>
                                <Col sm={8}><input name="nickname" id="nickname" type="text" className="w-90 px-2" /></Col>
                            </Row>
                            <Row className="my-4">
                                <Col sm={4}><label htmlFor="email" className=" border_left pl-2">電子郵件信箱</label></Col>
                                <Col sm={8}><input name="email" id="email" type="email" className="w-90 px-2" /></Col>
                            </Row>
                            <Row className="my-4">
                                <Col sm={4}><label htmlFor="psd" className=" border_left pl-2">密碼</label></Col>
                                <Col sm={8}><input name="psd" id="psd" type="password" className="w-90 px-2" placeholder="8個以上包含半形英文數字" /></Col>
                            </Row>
                            <Row className="my-4">
                                <Col sm={4}><label htmlFor="psd2" className=" border_left pl-2">再次輸入密碼</label></Col>
                                <Col sm={8}><input name="psd2" id="psd2" type="password" className="w-90 px-2" placeholder="8個以上包含半形英文數字" /></Col>
                            </Row>
                            <Row className="my-4">
                                <Col sm={4}><label htmlFor="company" className=" border_left pl-2">公司名稱</label></Col>
                                <Col sm={8}><input name="company" id="company" type="text" className="w-90 px-2" /></Col>
                            </Row>
                            <Row className="my-4">
                                <Col sm={4}><label htmlFor="type" className=" border_left pl-2">服務類型</label></Col>
                                <Col sm={8}><input name="serviceType" id="type" type="text" className="w-90 px-2" placeholder="例：新媒體、電商" /></Col>
                            </Row>
                            <Row className="my-4">
                                <Col sm={4}><label htmlFor="job" className=" border_left pl-2">你在公司職稱</label></Col>
                                <Col sm={8}><input name="job" id="job" type="text" className="w-90 px-2" placeholder="例：PM、數據分析師、工程師" /></Col>
                            </Row>
                            <div className="text-center my-5">
                                <label><input type="checkbox" className="vertical_middle mr-2" />同意智媒推推的<a href="XX">使用條款</a>和<a href="XX">隱私權政策</a>。</label>
                                <button className="btn btn-secondary d-block mx-auto my-5 w-25">建立帳號</button>
                            </div>
                        </div>
                    </Container>
                </div>
                <Footer />
            </>
        )
    }
}
export default Register;