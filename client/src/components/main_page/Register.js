import React, { Component } from 'react';
import { Container} from 'react-bootstrap';
import Footer from '../Footer';
import Navpt from '../share/Navpt';

class Register extends Component {
    render() {
        return (
            <>
                <Navpt />
                <div className="layout_main bg-white d-inline-block text-center w-100">
                    <Container className="main_analytic w-50">
                        <h4 className="text-center">建立新帳號</h4>
                        <div className="box px-5">
                                <input name="nickname" id="nickname" type="text" className="input_1 mb-5" placeholder="暱稱" />
                                <input name="email" id="email" type="email" className="input_1 mb-5" placeholder="電子郵件信箱" />
                                <input name="psd" id="psd" type="password" className="input_1 mb-5" placeholder="密碼：8個以上包含半形英文數字" />
                                <input name="psd2" id="psd2" type="password" className="input_1 mb-5" placeholder="再次輸入密碼" />
                                <input name="company" id="company" type="text" className="input_1 mb-5" placeholder="輸入公司名稱" />
                                <input name="serviceType" id="type" type="text" className="input_1 mb-5" placeholder="服務類型（例：新媒體、電商）" />
                                <input name="job" id="job" type="text" className="input_1" placeholder="公司職稱（例：PM、數據分析師、工程師）" />
                                <label><input type="checkbox" className="vertical_middle mr-2 my-5 " />同意智媒推推的<a href="XX">使用條款</a>和<a href="XX">隱私權政策</a>。</label>
                                <button className="btn btn-outline-primary w-100 radius20 font_20">建立帳號</button>
                        </div>
                    </Container>
                </div>
                <Footer />
            </>
        )
    }
}
export default Register;