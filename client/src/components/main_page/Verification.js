import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../Footer';
import Navpt from '../share/Navpt';

class Verification extends Component {
    constructor(props){
        super(props);
        this.inputs = [];
    }

    inputNum = (i,e) => {
        if(e.keyCode === 13 && i < 5){
            this.inputs[i].focus();
        }
    }
    render() {
        return (
            <>
                <Navpt />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <h1 className="text-center">建立新帳號</h1>
                        <div className="box px-5">
                            <h5 className="text-center text-danger border_content border-danger py-5">尚未完成帳號的建立，請至信箱查看。</h5>
                            <div className="box_border w-75 my-4 mx-auto text-center">
                                <p>請輸入驗證碼</p>
                                {(function (rows, i, type) {
                                    while (++i <= 5) {
                                        let j = i;
                                        rows.push( <input key={i} type="text" maxLength="1" pattern="\d" name="psd" ref={(e)=>type.inputs[j-1] = e} className="vertify_col" onKeyDown={(e)=>type.inputNum(j,e)}  />)
                                    }
                                    return rows;
                                })([], 0, this)
                                }
                            </div>
                            <div className="text-center">
                                <span>
                                    已將「驗證碼」寄送至您登錄的電子郵件信箱。<br />請輸入郵件中的「驗證碼」並送出。<br />※「驗證碼」的有效期限為郵件寄出後的24小時內。
                                </span>
                                <button className="d-block text-white btn-big bg-danger mx-auto mt-5 mb-2 radius20">送出</button>
                                <a href="XXX" className="text-dark">重新送出「驗證碼」</a>
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