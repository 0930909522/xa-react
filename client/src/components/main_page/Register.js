import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../Footer';
import Navpt from '../share/Navpt';
import { register } from '../share/ajax';
import AlertMsg from '../share/AlertMsg';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertText: '',
            showAlertMsg: false,
            checkPwd: '',
            same: null,
            checkEmail: false,
            hasRead: false,
            data: {
                "name": '',
                "email": '',
                "pwd": '',
                "companyName": '',
                "companyType": '',
                "taxId": ''
            }
        }
    }
    // 跳出訊息視窗
    popMsg = (val) => {
        this.setState({ alertText: val, showAlertMsg: true });
        setTimeout(() => {
            this.setState({ alertText: '', showAlertMsg: false });
        }, 4000);
    }

    addData = (e, text) => {
        const value = e.target.value;
        const newData = this.state.data;
        newData[text] = value;
        this.setState({ data: newData });
        if (text === 'email') {
            this.checkEmail(e);
        }
        if (text === 'pwd') {
            this.checkPwd(e);
        }
    }
    doubleCheckPwd = e => {
        let pwd = e.target.value;
        if (this.state.data.pwd !== pwd) {
            this.setState({ same: false })
        } else {
            this.setState({ same: true })
        }
    }
    checkPwd = e => {
        let lowerCase = /[a-z]/g.test(e.target.value);
        let number = /[0-9]/g.test(e.target.value);
        if (lowerCase && number && e.target.value.length >= 8) {
            this.setState({ checkPwd: true });
        } else {
            this.setState({ checkPwd: false });
        }
    }
    checkEmail = e => {
        let boolean = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(e.target.value);
        if (boolean) {
            this.setState({ checkEmail: true })
        } else {
            this.setState({ checkEmail: false })
        }
    }
    toggleRead = () => {
        this.setState({ hasRead: !this.state.hasRead });
    }
    submit = () => {
        for (let i in this.state.data) { //檢查必填
            if (this.state.data[i] === null || this.state.data[i] === '') {
                this.popMsg('欄位不可為空');
                return;
            }
        }
        //密碼不符合
        if (this.state.checkPwd !== true) {
            this.popMsg('密碼格式不符');
            return;
        }
        //電子信箱不符合
        if (this.state.checkEmail !== true) {
            this.popMsg('電子信箱格式不符');
            return;
        }
        //有再次輸入
        if (this.state.same !== true) {
            this.popMsg('確認密碼欄位錯誤');
            return;
        }
        //統編格式不符
        let taxid = this.state.data.taxId;
        if (taxid.match(/[^0-9]/) !== null || taxid.length !== 8) {
            this.popMsg('統編格式不符');
            return;
        }
        //有勾選
        if (this.state.hasRead !== true) {
            this.popMsg('請同意使用條款');
            return;
        }
        register(this.state.data).then(res=>{
            if(typeof res === 'string'){
                // 如果有錯誤訊息
                this.popMsg(res);
            }
        })
    }
    render() {
        return (
            <>
                <AlertMsg
                    text={this.state.alertText}
                    attr={this.state.showAlertMsg ? 'opacity1' : 'opacity0'}
                    close={() => this.setState({ showAlertMsg: false })}
                />
                <Navpt />
                <div className="layout_main bg-white d-inline-block text-center w-100">
                    <Container className="main_analytic w-50">
                        <h4 className="text-center">建立新帳號</h4>
                        <div className="box px-5">
                            <input name="name" id="name" type="text" className="input_1 mb-4" placeholder="暱稱" onChange={(e) => this.addData(e, 'name')} />
                            <input name="email" id="email" type="email" className="input_1 mb-4" placeholder="電子郵件信箱" onChange={(e) => this.addData(e, 'email')} />
                            <input name="pwd" id="pwd" type="password" className="input_1 mb-4" placeholder="密碼：8個以上包含半形英文數字" onChange={(e) => this.addData(e, 'pwd')} />
                            <div className="position-relative">
                                <p className={(this.state.same || this.state.same === null ? 'd-none' : '') + ' text-danger text-left position-absolute translateY'}>*密碼不一致</p>
                                <input name="pwd2" id="pwd2" type="password" className="input_1 mb-4" placeholder="再次輸入密碼" onKeyUp={(e) => this.doubleCheckPwd(e)} />
                            </div>
                            <input name="company" id="company" type="text" className="input_1 mb-4" placeholder="輸入公司名稱" onChange={(e) => this.addData(e, 'companyName')} />
                            <input name="serviceType" id="serviceType" type="text" className="input_1 mb-4" placeholder="統一編號" onChange={(e) => this.addData(e, 'taxId')} />
                            <input name="taxId" id="taxId" type="text" className="input_1" placeholder="服務類型（例：新媒體、電商）" onChange={(e) => this.addData(e, 'companyType')} />
                            <p className='text-danger text-left my-2'>*以上欄位皆為必填</p>
                            <label><input type="checkbox" className="vertical_middle mr-2 my-4 " onClick={this.toggleRead} />同意智媒推推的<a href="XX">使用條款</a>和<a href="XX">隱私權政策</a>。</label>
                            <button className="btn btn-outline-primary w-100 radius20 font_20" onClick={this.submit}>建立帳號</button>
                        </div>
                    </Container>
                </div>
                <Footer />
            </>
        )
    }
}
export default Register;