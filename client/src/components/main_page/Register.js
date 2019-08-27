import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../Footer';
import Navpt from '../share/Navpt';
import {register} from '../share/ajax';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkPwd: null,
            same: null,
            checkEmail: false,
            hasRead: false,
            data: {
                "nickname": null,
                "email": null,
                "pwd": null,
                "companyName": null,
                "companyType": null,
                "taxId": null
            }
        }
    }
    addData = (e, text) => {
        const value = e.target.value;
        const newData = this.state.data;
        newData[text] = value;
        this.setState({ data: newData });
        if(text === 'email'){
            this.checkEmail(e);
        }
        if(text === 'pwd'){
            this.checkPwd(e);
        }
    }
    doubleCheckPwd = e =>{
        let pwd = e.target.value;
        if(this.state.data.pwd !== pwd){
            this.setState({same: false})
        }else{
            this.setState({same: true})
        }
    }
    checkPwd = e =>{
        let lowerCase = /[a-z]/g.test(e.target.value);
        let UpperCase = /[A-Z]/g.test(e.target.value);
        if(lowerCase && UpperCase && e.target.value.length >= 8){
            this.setState({checkPwd : true});
        }else{
            this.setState({checkPwd : false});
        }
    }
    checkEmail = e =>{
        let boolean = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(e.target.value);
        if(boolean){
            this.setState({checkEmail: true})
        }else{
            this.setState({checkEmail: false})
        }
    }
    toggleRead = () =>{
        this.setState({hasRead: !this.state.hasRead});
    }
    submit = () => {
        for(let i in this.state.data){ //檢查必填
            if(this.state.data[i] === null || this.state.data[i] === ''){
                alert('欄位不可為空');
                return;
            }
        }
        //密碼不符合
        if(this.state.checkPwd !== true){
            alert('密碼格式不符');
            return;
        }
        //電子信箱不符合
        if(this.state.checkEmail !== true){
            alert('電子信箱格式不符');
            return;
        }
        //有再次輸入
        if(this.state.same !== true){
            alert('確認密碼欄位錯誤');
            return;
        }
        //統編格式不符
        let taxid = this.state.data.taxId;
        if(taxid.match(/[^0-9]/) !== null || taxid.length !== 8){
            alert('統編格式不符');
            return;
        }
        //有勾選
        if(this.state.hasRead !== true){
            alert('請同意使用條款');
            return;
        }
        register(this.state.data);
    }
    render() {
        return (
            <>
                <Navpt />
                <div className="layout_main bg-white d-inline-block text-center w-100">
                    <Container className="main_analytic w-50">
                        <h4 className="text-center">建立新帳號</h4>
                        <div className="box px-5">
                            <input name="nickname" id="nickname" type="text" className="input_1 mb-4" placeholder="暱稱" onChange={(e) => this.addData(e, 'nickname')} />
                            <input name="email" id="email" type="email" className="input_1 mb-4" placeholder="電子郵件信箱" onChange={(e) => this.addData(e, 'email')} />
                            <input name="pwd" id="pwd" type="password" className="input_1 mb-4" placeholder="密碼：8個以上包含半形英文數字" onChange={(e) => this.addData(e, 'pwd')} />
                            <input name="pwd2" id="pwd2" type="password" className="input_1 mb-4" placeholder="再次輸入密碼" onKeyUp={(e)=>this.doubleCheckPwd(e)} />
                            <input name="company" id="company" type="text" className="input_1 mb-4" placeholder="輸入公司名稱" onChange={(e) => this.addData(e, 'companyName')} />
                            <input name="serviceType" id="serviceType" type="text" className="input_1 mb-4" placeholder="統一編號" onChange={(e) => this.addData(e, 'taxId')} />
                            <input name="taxId" id="taxId" type="text" className="input_1" placeholder="服務類型（例：新媒體、電商）" onChange={(e) => this.addData(e, 'companyType')} />
                            {/* <input name="job" id="job" type="text" className="input_1" placeholder="公司職稱（例：PM、數據分析師、工程師）" /> */}
                            <p className={(this.state.same || this.state.same === null  ? 'd-none' : '') + ' text-danger text-left'}>*密碼不一致</p>
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