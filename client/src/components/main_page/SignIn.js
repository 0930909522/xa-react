import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Navpt from '../share/Navpt';
import { login } from '../share/ajax';
import AlertMsg from '../share/AlertMsg';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertText: '',
            showAlertMsg: false,
            data: {
                un: '',
                uid: ''
            }
        }
    }
    componentDidMount() {
        let enter = document.querySelector('body');
        enter.addEventListener('keydown', (e) => {
            if (e.keyCode === 13 && this.state.data.un && this.state.data.uid) {
                this.submit();
            }
        })
    }
    inputData = (e, text) => {
        const newData = this.state.data;
        newData[text] = e.target.value;
        this.setState({ data: newData });
    }
    submit = () => {
        let postData = this.state.data;
        login(postData)
            .then((res) => {
                if (typeof res === 'string') {// 驗證錯誤
                    this.setState({ alertText: res, showAlertMsg: true });
                    setTimeout(() => {
                        this.setState({ alertText: '', showAlertMsg: false });
                    }, 4000)
                    return;
                }
                this.props.getPermission(res);
                localStorage.setItem('permission', JSON.stringify(res));
                if (res.level < 1) {
                    this.props.history.push('/memberCentre/billing/two');
                } else {
                    this.props.history.push('/basis');
                }
            })
            .catch(() => {
                this.setState({ alertText: '發生錯誤，請稍後再試', showAlertMsg: true });
                setTimeout(() => {
                    this.setState({ alertText: '', showAlertMsg: false });
                }, 4000)
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
                <div className="layout_main">
                    <Container className="main_analytic">
                        <div className="box login mx-auto" style={{ 'position': 'relative' }}>
                            {/* <button className="btn_noborder_r btn_like dec_none cancel_btn m-2 bg-secondary round text-white">&#10006;</button> */}
                            <h3 className="mb-3">智媒數據顧問</h3>
                            <p>歡迎使用智媒數據顧問服務，請您先註冊或登入以使用本服務，謝謝您</p>
                            <input placeholder="請輸入電子郵箱" type="email" name="email" className="input_1 my-3" onChange={(e) => this.inputData(e, 'un')} />
                            <input placeholder=" 請輸入密碼" type="password" name="pwd" className="input_1" onChange={(e) => this.inputData(e, 'uid')} />
                            <a href="XXX" className="my-1 d-block">忘記密碼？</a>
                            <button className="btn btn-outline-primary radius40 font_20 my-4 p-2 w-100" onClick={this.submit}>登入</button>
                            <div className="text-center">
                                <p className="d-block mb-2 text-dark">還沒有帳號？</p>
                                <Link to="/signup/register" className="btn btn-info radius40 px-5 py-2">我要註冊</Link>
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