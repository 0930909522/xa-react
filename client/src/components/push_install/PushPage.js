import React, { Component } from 'react';
import { pushpage } from '../share/ajax';
// import { Container, Row } from "react-bootstrap";
// import Header from "../Header";
// import Footer from '../Footer';
// import NavLeftPush from "../share/NavLeftPush";
// import PushTitle from '../share/PushTitle';

class PushPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [
                {
                    'title': '文章',
                    'choose': false
                },
                {
                    'title': '商品',
                    'choose': false
                }
            ],
            showBtn: false,
        };
    }
    componentDidMount() {
        const getData = this.props.sendData;
        if (getData.acceptType !== null) {
            const newData = this.state.content;
            getData.acceptType.forEach(val => {
                switch (val) {
                    case 'media':
                        newData[0].choose = true;
                        break;
                    case 'ecommerce':
                        newData[1].choose = true;
                        break;
                    default:
                        break;
                }
            })
            this.setState({content: newData, showBtn: true});
        }
    }

    toggleClickAll = e => {
        const newContent = [...this.state.content];
        newContent.forEach(function (val) {
            val.choose = e.target.checked;
        })
        this.setState({
            content: newContent,
            showBtn: e.target.checked
        });
    }
    clickCheckbox = index => {
        const newContent = [...this.state.content];
        let booleanBtn = false;
        newContent[index].choose = !newContent[index].choose;
        for (let i of newContent) {
            if (i.choose) {
                booleanBtn = true;
                break;
            }
        }
        this.setState({
            content: newContent,
            showBtn: booleanBtn
        });
    }
    submit = () => {
        let acceptType = '';
        if (this.state.content[0].choose) {
            acceptType+='m';
        }
        if (this.state.content[1].choose) {
            acceptType+='e';
        }
        if(acceptType === ''){
            //不可為空
            return;
        }
        pushpage(acceptType)
            .then(res => {
                this.props.getResponseData('acceptType', acceptType);
                this.props.getResponseData('step1Data', res);
                this.props.changeStatus(2);
            })

    }

    render() {
        return (
            <>
                {/* <Header />
                <div className={(!this.state.showData && 'd-none ') + 'w-100 bg_gray'}>
                    <div className="box w-75 mx-auto bg-white my-5 radius10">
                        <h4 className="bg-warning py-3 pl-4 pr-2 text-white d-flex justify-content-between">
                            以電子郵件寄送程式碼
                            <button className="float-right mr-2 btn_noborder_r text-white">X</button>
                        </h4>
                        <div className="p-3 mx-auto w-100 scrollY h-65v ">
                            <label className="w-100">收件人信箱
                                <input type="text" className="w-100 mt-2 pl-2" />
                            </label>
                            <div className="border_gray w-100">
                                <h5 className="p-2">1. 用戶名稱</h5>
                                <h5 className="bg-light py-4 px-2">今周刊智能數據分析</h5>
                                <h5 className="p-2">2. 安裝程式碼</h5>
                                <div className="border_gray w-90 mx-auto h-24em scrollY">
                                    <p>{this.state.shareCode}</p>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-secondary activity_btn">返回</button>
                                    <button className="btn btn-secondary activity_btn">傳送</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush three />
                            <div className="main_right">
                                <h2>推播安裝</h2>
                                <PushTitle one /> */}
                <div className="box radius10">
                    <table className="pushTable_r w-100" cellPadding="15">
                        <thead>
                            <tr>
                                <th colSpan="2"><input type="checkbox" onClick={this.toggleClickAll} />&nbsp;&nbsp;選取類型</th>
                            </tr>
                        </thead>
                        {this.state.content.map((val, index) => (
                            <tbody key={val.title}>
                                <tr>
                                    <td><input type="checkbox" checked={val.choose} onChange={() => this.clickCheckbox(index)} /></td>
                                    <td>{val.title}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
                <div className="text-center my-3">
                    <button className="btn btn-secondary mx-1" disabled={!this.state.showBtn} onClick={() => this.submit()}>&nbsp;&nbsp;&nbsp;確認&nbsp;&nbsp;&nbsp;</button>
                    <button className="btn btn-secondary mx-1" onClick={() => this.props.changeStatus(0)}>&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;</button>
                </div>
                {/* </div>

                        </Row>
                    </Container>
                </div>
                <Footer /> */}
            </>
        )
    }
}
export default PushPage;