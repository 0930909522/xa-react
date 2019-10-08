import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Footer from '../Footer';
import Navpt from '../share/Navpt';
import {login} from '../share/ajax';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:{
                un:null,
                uid: null
            }
        }
    }
    inputData = (e, text) =>{
        const newData = this.state.data;
        newData[text] = e.target.value;
        this.setState({data: newData});
    }
    submit = () =>{
        let postData = this.state.data;
        login(postData).then((res)=>{
            this.props.getPermission(res);
            localStorage.setItem('permission',JSON.parse(res));
            if(res.level < 1){
                window.location.href = '/memberCentre/edit';
            }else{
                window.location.href = '/basis';
            }
        })
    }
    render() {
        return (
            <>
                <Navpt />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <div className="box p-5 w-75 mx-auto" style={{'position':'relative'}}>
                            <button className="btn_noborder_r btn_like dec_none cancel_btn m-2 bg-secondary round text-white">&#10006;</button>
                            <h3 className="mb-3">智媒推推</h3>
                            <input placeholder="請輸入電子郵箱" type="email" name="email" className="input_1 my-3" onChange={(e)=>this.inputData(e, 'un')} />
                            <input placeholder=" 請輸入密碼" type="password" name="pwd" className="input_1" onChange={(e)=>this.inputData(e, 'uid')} />
                            <a href="XXX" className="my-1 d-block">忘記密碼？</a>
                            <button className="btn btn-outline-primary radius20 font_20 my-4 p-2 w-100" onClick={this.submit}>登入</button>
                            <div className="text-center">
                                <p className="d-block mb-2 text-dark">還沒有帳號？</p>
                                <Link to="/signup/register" className="btn btn-info radius20 px-5 py-2">我要註冊</Link>
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