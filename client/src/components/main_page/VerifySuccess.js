import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../Footer';
import Navpt from '../share/Navpt';
import { FaCheck } from 'react-icons/fa';
import {Link} from "react-router-dom";

class VerifySuccess extends Component {
    render() {
        return (
            <>
                <Navpt />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <h1 className="text-center">成功建立帳號</h1>
                        <div className="box px-5">
                            <div className="box_border w-75 my-4 mx-auto text-center">
                                <div className="circle_sign my-4">
                                    <FaCheck style={{ 'color': '#16C60C' }} />
                                </div>
                                <p>已經成功建立智媒推推帳號<br />登入後就可以開始管理你的廣告服務</p>
                                <Link to ="/signup/signin"><button className="d-block text-white btn-big bg-danger mx-auto mt-5 mb-2 radius20">Go</button></Link>
                            </div>
                        </div>
                    </Container>
                </div>
                <Footer />
            </>
        )
    }
}
export default VerifySuccess;