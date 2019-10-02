import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftReport from '../share/NavLeftReport';
import { FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PopMsg from '../share/PopMsg';


class Receipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            showPopMsg: false,
            showPopMsgIndex: 0,
            date: ['2019/08', '2019/07', '2019/06', '2019/05', '2019/04', '2019/03', '2019/02', '2019/01'],
            data: [
                {
                    date: '2019年8月1日',
                    plaform: '',
                    type: '',
                    info: '儲值匯款',
                    click: '',
                    exposure: '',
                    income: '10000',
                    balance: '10000',
                    other: null
                },
                {
                    date: '2019年8月1日',
                    plaform: '',
                    type: '',
                    info: '儲值匯款',
                    click: '',
                    exposure: '',
                    income: '10000',
                    balance: '10000',
                    other: null
                },
                {
                    date: '2019年8月1日',
                    plaform: '',
                    type: '',
                    info: '儲值匯款',
                    click: '',
                    exposure: '',
                    income: '10000',
                    balance: '10000',
                    other: null
                },
                {
                    date: '2019年8月2日',
                    plaform: '商業周刊',
                    type: '推薦文章',
                    info: '模範生嗆韓國瑜韓國瑜韓國瑜韓國瑜',
                    click: '19',
                    exposure: '227',
                    income: '570',
                    balance: '9430',
                    other: [{
                        date: '2019年8月2日',
                        plaform: '商業周刊',
                        type: '推薦文章',
                        info: '模範生嗆韓國瑜韓國瑜韓國瑜韓國瑜',
                        click: '19',
                        exposure: '227',
                        income: '570',
                        balance: '9430'
                    }, {
                        date: '2019年8月2日',
                        plaform: '商業周刊',
                        type: '推薦文章',
                        info: '模範生嗆韓國瑜韓國瑜韓國瑜韓國瑜',
                        click: '19',
                        exposure: '227',
                        income: '570',
                        balance: '9430'
                    }]
                }
            ]
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        if (id === 'income') {
            id = '收益';
        } else if (id === 'push') {
            id = '推播';
        } else {
            id = '';
        }
        this.setState({ status: id });
    }
    componentDidUpdate(preProp) {
        if (preProp.match.params.id !== this.props.match.params.id) {
            let id = this.props.match.params.id;
            if (id === 'income') {
                id = '收益';
            } else if (id === 'push') {
                id = '推播';
            } else {
                id = '';
            }
            this.setState({ status: id });
        }
    }
    showMsg = (index) => {
        this.setState({ showPopMsg: true, showPopMsgIndex: index });
    }
    toCSV = () => {
        let content = this.state.data;
        let csvContent = content.map(val => {
            let element = [];
            for (let i in val) {
                if (i !== 'other') element.push(val[i]);
            }
            return element;
        }).join("\n");
        let download = document.createElement('a');
        download.setAttribute('href', 'data:text/csv;charset=utf-8,\uFEFF日期,平台,類型,說明,點擊數,曝光數,收支,結餘\n' + encodeURIComponent(csvContent));
        download.setAttribute('download', 'data.csv');
        download.setAttribute('target', '_blank');
        download.style.display = 'none';
        document.body.appendChild(download);
        download.click();
        document.body.removeChild(download);
    }
    render() {
        return (
            <>
                <PopMsg
                    show={this.state.showPopMsg}
                    title=""
                    close={() => this.setState({ showPopMsg: false })}
                >
                    <table className="w-100 my-2 text-center pushTable_r even" cellPadding="10">
                        <thead>
                            <tr className="bg_gray1">
                                <th>日期</th>
                                <th>平台</th>
                                <th>類型</th>
                                <th>說明</th>
                                <th>點擊數</th>
                                <th>曝光數</th>
                                <th>收支</th>
                                <th>結餘</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (this.state.data[this.state.showPopMsgIndex].other !== null) &&
                                this.state.data[this.state.showPopMsgIndex].other.map((val, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{val.date}</td>
                                            <td>{val.plaform}</td>
                                            <td>{val.type}</td>
                                            <td className="text-center">
                                                <span
                                                    className="text_ellipsis d-block a_hover mx-auto"
                                                    style={{ 'maxWidth': '100px' }}
                                                    onClick={() => this.showMsg(index)}
                                                >
                                                    {val.info}
                                                </span>
                                            </td>
                                            <td>{val.click}</td>
                                            <td>{val.exposure}</td>
                                            <td>{val.income}</td>
                                            <td>{val.balance}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </PopMsg>
                <Header cateIndex={3} />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftReport {...(this.state.status === '推播' ? { one: true } : { two: true })} />
                            <div className="main_right">
                                <h2><span className="btn_like">帳務報表  / {'我的' + this.state.status}</span></h2>
                                <div className="box radius10">
                                    <span><Link to="/push" className={(this.props.one ? 'selected_text' : 'text-dark') + ' dec_none btn_like'}>推播明細</Link></span>
                                    <span>&nbsp;｜&nbsp;</span>
                                    <span><Link to="/" className={(this.props.one ? 'selected_text' : 'text-dark') + ' dec_none btn_like'}>月報表</Link></span>

                                </div>
                                <div className="box radius10">
                                    <Container className="p-3">
                                        <Row>
                                            <Col sm="9">
                                                <span>{this.state.status}餘額:&nbsp;&nbsp;<h4 className="d-inline-block">2,960</h4></span>
                                                {this.state.status === '推播' && <button className="btn btn-info ml-5" onClick={()=>window.location.href="/memberCentre/billing/two"}>推播儲值</button>}
                                            </Col>
                                            <Col sm="3">
                                                <button className="btn btn-outline-dark w-100" onClick={this.toCSV}><FaDownload />&nbsp;&nbsp;匯出明細</button>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <hr className="dash_line" />
                                    <div className="srollX">
                                        {this.state.date.map(val => <h4 key={val} className="d-inline-block m-4 btn_like">{val}</h4>)}
                                    </div>
                                    <select className="my-4">
                                        <option value="1">日期由舊到新</option>
                                        <option value="-1">日期由新到舊</option>
                                    </select>
                                    <select className="my-4">
                                        <option value="1">全部</option>
                                        <option value="-1">今周刊</option>
                                        <option value="-1">食力</option>
                                    </select>
                                    <table className="w-100 text-center pushTable_r even" cellPadding="10">
                                        <thead>
                                            <tr className="bg_gray1">
                                                <th>日期</th>
                                                <th>平台</th>
                                                <th>類型</th>
                                                <th>說明</th>
                                                <th>點擊數</th>
                                                <th>曝光數</th>
                                                <th>收支</th>
                                                <th>結餘</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.data.map((val, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{val.date}</td>
                                                        <td>{val.plaform}</td>
                                                        <td>{val.type}</td>
                                                        <td className="text-center">
                                                            <span
                                                                className="text_ellipsis d-block a_hover mx-auto"
                                                                style={{ 'maxWidth': '100px' }}
                                                                onClick={() => this.showMsg(index)}
                                                            >
                                                                {val.info}
                                                            </span>
                                                        </td>
                                                        <td>{val.click}</td>
                                                        <td>{val.exposure}</td>
                                                        <td>{val.income}</td>
                                                        <td>{val.balance}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    <div className="mt-4 mb-2 text-center">
                                        <span className="mx-2 btn_like text-primary">1</span>
                                        <span className="mx-2 btn_like">2</span>
                                        <span className="mx-2 btn_like">3</span>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </>
        )
    }
}
export default Receipt;