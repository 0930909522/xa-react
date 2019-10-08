import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../Footer';
import Navpt from '../share/Navpt';
import { TiWarningOutline } from "react-icons/ti";

class Verification extends Component {
    constructor(props) {
        super(props);
        this.inputs = [];
        this.state = {
            herfSearch: 'Your Email'
        }
    }

    componentDidMount(){
        this.setState({ herfSearch: window.location.search ? window.location.search.split("?")[1] : ""  })
    }

    inputNum = (i, e) => {
        if (e.keyCode === 13 && i < 5) {
            this.inputs[i].focus();
        } else if (e.keyCode === 8 && i > 1) {
            if(this.inputs[i-1].value !== ''){
                this.inputs[i-1].focus();
            }else{
                this.inputs[i-2].focus();
            }
        }else if(e.target.value.length === 1 && i < 5){
            this.inputs[i].focus();
            console.log('a')
        }else{
            return ;
        }
    }
    render() {
        return (
            <>
                <Navpt />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <h1 className="text-center">啟用認證碼</h1>
                        <div className="box px-5">
                            <div className="w-75 mx-auto text-center">
                                <h5 className="text-danger"><TiWarningOutline style={{ 'fontSize': '40px' }} /> 尚未完成帳號的建立</h5>
                                <h5>Email - <span className="text-primary">{this.state.herfSearch}</span> - 尚未認證</h5>
                                <h6>已將「驗證碼」寄送至您登錄的電子郵件信箱。<br />請點選郵件中的「驗證碼」。<br /><br />※「驗證碼」的有效期限為郵件寄出後的24小時內。</h6>
                                {/* <div className="my-4 mx-auto">
                                    <h4>請輸入驗證碼</h4>
                                    {(function (rows, i, that) {
                                        while (++i <= 5) {
                                            let j = i;
                                            rows.push(<input key={i} type="text" maxLength="1" pattern="\d" name="psd" ref={(e) => that.inputs[j - 1] = e} className="vertify_col font_20" onKeyDown={(e) => that.inputNum(j, e)} />)
                                        }
                                        return rows;
                                    })([], 0, this)
                                    }
                                    <button className="btn btn-outline-primary d-block w-75 mt-5 mb-2 mx-auto radius20">送出</button>
                                    <a href="XXX" className="text-dark">重新送出「驗證碼」</a>
                                </div> */}
                            </div>
                        </div>
                    </Container>
                </div>
                <Footer />
            </>
        )
    }
}
export default Verification;