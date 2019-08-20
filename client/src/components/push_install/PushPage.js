import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftPush from "../share/NavLeftPush";
import PushTitle from '../share/PushTitle';

class PushPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [
                {
                    'title': '文章',
                    'content': "&lt;!--xnet_java_code--&gt;<br />&lt;script asyncsrc='https://www.xnettagmanager.com/gtag/js?id=XN-00001843-1'> &lt;/script&gt;<br />&lt;script>window.dataLayer =window.dataLayer || [];<br />function gtag()&#123;dataLayer.push(arguments);&#125;<br />gtag('js', new Date());<br />gtag('config', 'XN-00001843-1');<br />&lt;/script&gt;",
                    'choose': false,
                    'show': false
                },
                {
                    'title': '商品',
                    'content': "&lt;!--xnet_java_code--&gt;<br />&lt;script asyncsrc='https://www.xnettagmanager.com/gtag/js?id=XN-00001843-1'> &lt;/script&gt;<br />&lt;script>window.dataLayer =window.dataLayer || [];<br />function gtag()&#123;dataLayer.push(arguments);&#125;<br />gtag('js', new Date());<br />gtag('config', 'XN-00001843-1');<br />&lt;/script&gt;",
                    'choose': false,
                    'show': false
                }
            ],
            iframeSize: [{width:500, height:300},{width:500, height:300}],
            showBtn: false,
            showData: false,
            shareCode: "<!--xnet_java_code--><script async src=\"https://www.xnettagmanager.com/gtag/js?id=XN-00001843-1\"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());<!--xnet_java_code--><script async src=\"https://www.xnettagmanager.com/gtag/js?id=XN-00001843-1\"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());<!--xnet_java_code--><script async src=\"https://www.xnettagmanager.com/gtag/js?id=XN-00001843-1\"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());<!--xnet_java_code--><script async src=\"https://www.xnettagmanager.com/gtag/js?id=XN-00001843-1\"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());<!--xnet_java_code--><script async src=\"https://www.xnettagmanager.com/gtag/js?id=XN-00001843-1\"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());<!--xnet_java_code--><script async src=\"https://www.xnettagmanager.com/gtag/js?id=XN-00001843-1\"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());<!--xnet_java_code--><script async src=\"https://www.xnettagmanager.com/gtag/js?id=XN-00001843-1\"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());"
        };
        this.string = '讓其他商家，也能在您頁面的任一位置投放';
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
    toggleTr = (e, index) => {
        const newContent = [...this.state.content];
        newContent[index].show = !newContent[index].show;
        if (newContent[index].content !== null) {
            e.target.classList.toggle('text-info');
        }
        this.setState({ content: newContent });
    }
    setIframe = (e, index, name) =>{
        const value = e.target.value;
        const newIframeSize = this.state.iframeSize;
        newIframeSize[index][name] = value;
        this.setState({iframeSize: newIframeSize});
    }

    render() {
        return (
            <>
                <Header />
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
                                <PushTitle one />
                                <div className="box">
                                    <table className="pushTable_r w-100" cellPadding="15">
                                        <thead>
                                            <tr>
                                                <th colSpan="2"><input type="checkbox" onClick={this.toggleClickAll} />&nbsp;&nbsp;選擇安裝推播的類別</th>
                                            </tr>
                                        </thead>
                                        {this.state.content.map((val, index) => (
                                            <tbody key={val.title}>
                                                <tr>
                                                    <td><input type="checkbox" checked={val.choose} onChange={() => this.clickCheckbox(index)} /></td>
                                                    <td onClick={(e) => this.toggleTr(e, index)}>{val.title}<span className={(val.show && val.content !== null) ? 'table-triangle-down' : 'table-triangle-top'}></span></td>
                                                </tr>
                                                {(val.content !== null && val.show) && <tr>
                                                    <td colSpan="2">
                                                        {this.string}
                                                        <br />
                                                        <code dangerouslySetInnerHTML={{ __html: val.content }} />
                                                        <div className="mt-2 text-center">
                                                            <label className="mx-3">寬度&nbsp;<input type="number" onChange={(e)=>this.setIframe(e, index, 'width')} /></label>
                                                            <label className="mx-3">高度&nbsp;<input type="number" onChange={(e)=>this.setIframe(e, index, 'height')} /></label>
                                                            <div className="mt-2 d-flex justify-content-center">
                                                                {
                                                                    <iframe title="advertisement example" src="https://www.w3school.com.cn/html/html_iframe.asp" width={this.state.iframeSize[index].width} height={this.state.iframeSize[index].height} style={{'border': 'none'}} />
                                                                }
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>}
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                                {(this.state.showBtn) && (
                                    <div className="text-center my-3">
                                        <button className="btn btn-secondary">生成code並寄送電子郵件</button>
                                    </div>
                                )}
                            </div>

                        </Row>
                    </Container>
                </div>
                <Footer />
            </>
        )
    }
}
export default PushPage;