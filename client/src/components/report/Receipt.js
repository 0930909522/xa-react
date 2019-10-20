import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftReport from '../share/NavLeftReport';
import { FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import PopMsg from '../share/PopMsg';
import { myPush, myPull, bill } from '../share/ajax';
import { htmlInstallTrack } from '../share/checkPermission';
import { Redirect } from 'react-router';

const thisLevel = 1; //設定本頁權限 1-4

class Receipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ['', '0'],     //推播或收益，為明細0 或月報表1
            // showPopMsg: false,      //是否顯示某篇
            // showPopMsgIndex: 0,     //顯示的某篇
            balance: {},    //推播、收益餘額
            pointer: 0  //查看哪月份
            // {      
            //     push0: 0,  //我的推播全
            //     push1: 0,   //我的推播月報表
            //     income0: 0,
            //     income1: 0

            // }
            ,
            date: [],   //日期列表
            weblist: [], //追蹤頁面列表
            data: [],    //列表資料
            page: [1, 1],    //目前總頁數，目前在第幾頁
            showLoadingBar: true   //讀取圖示
        }
    }
    componentDidMount = async () => {
        let id = [].concat(this.state.status);
        const TODAY = new Date();
        let dateList = [].concat(this.state.date);
        let newData = [].concat(this.state.data);
        let price = Object.assign({}, this.state.balance);
        let newPage = [...this.state.page];

        // 為收益或推播
        if (this.props.match.params.id === 'income') {
            id[0] = '收益';
        } else if (this.props.match.params.id === 'push') {
            id[0] = '推播';
        } else {
            id[0] = '';
        }

        // 初始化收益
        await bill()
        .then((res => {
            if (res[0].group === 'pull') {
                price.pull = res[0].balance;
                price.push = res[1].balance;
            }
        }))
        .catch((err)=>{
            console.log(err);
        })

        // 初始化日期
        for (let i = -1; i < 11; i++) {
            let past = new Date(TODAY.getFullYear(), TODAY.getMonth() - i);
            let year = past.getFullYear();
            let month = past.getMonth() === 0 ? 12 : past.getMonth();
            dateList.push(String(year + '/' + month));
        }

        this.setState({
            ...this.state,
            date: dateList,
            balance: price,
            status: id
        })

        //初始化資料
        for (let i = 0; i < dateList.length; i++) {
            if (id[0] === '收益') {
                await myPull(dateList[i].replace('/', '-'))
                .then(res => {
                    for (let j of res) {
                        let element = j;
                        element.date = dateList[i];
                        newData.push(element)
                    }

                })
                .catch(err=>{
                    console.log(err);
                })
            } else {
                await myPush(dateList[i].replace('/', '-'))
                .then(res => {
                    for (let j of res) {
                        let element = j;
                        element.date = dateList[i];
                        newData.push(element)
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            }
            //初始化頁數
            if (i === 0) {
                newPage[0] = Math.ceil(newData.length / 10);
            }
        }

        this.setState({
            ...this.state,
            data: newData,
            page: newPage,
            showLoadingBar: false
        })
    }
    componentDidUpdate(preProp) {
        if (preProp.match.params.id !== this.props.match.params.id) {
            // let id = [].concat(this.state.status);
            // if (this.props.match.params.id === 'income') {
            //     id[0] = '收益';
            // } else if (this.props.match.params.id === 'push') {
            //     id[0] = '推播';
            // } else {
            //     id[0] = '';
            // }
            // this.setState({ status: id });
            window.location.reload();
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
        if (this.state.status[0] === '收益') {
            download.setAttribute('href', 'data:text/csv;charset=utf-8,\uFEFF平台,點擊數,曝光數,收支,日期,\n' + encodeURIComponent(csvContent));
        } else {
            download.setAttribute('href', 'data:text/csv;charset=utf-8,\uFEFF平台,類型,點擊數,曝光數,收支,日期,\n' + encodeURIComponent(csvContent));
        }
        download.setAttribute('download', 'data.csv');
        download.setAttribute('target', '_blank');
        download.style.display = 'none';
        document.body.appendChild(download);
        download.click();
        document.body.removeChild(download);
    }
    updatePointer = (index) => { //更新目前查看的月份
        // let to = String(this.props.match.params.id + this.state.status[1]);
        // let newPointer = this.state.pointer;
        // newPointer[to] = ;

        // 更新頁面數、目前頁面
        let date = this.state.date[index];
        let length = 0;
        for (let i of this.state.data) {
            if (i.date === date) {
                length++;
            }
        }
        let newPage = [Math.ceil(length / 10), 1];
        this.setState({ pointer: index, page: newPage });
    }
    turnPage = (num) => {    //切換頁面
        let newPage = [...this.state.page];
        newPage[1] = num;
        this.setState({ page: newPage });
    }
    translate = (val) => {
        // 轉換為中文字
        switch (val) {
            case 'media':
                return '推薦文章';
            case 'ecommerce':
                return '推薦商品';
            case 'report':
                return '專題報導';
            case 'theme':
                return '主題活動';
            default:
                return '';
        }
    }

    render() {
        return (
            !this.props.permissionData.verified ?
                <Redirect to="/signup/signin" /> :
                <>
                    {/* <PopMsg
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
                                    // (this.state.data[this.state.showPopMsgIndex].other !== null) &&
                                    // this.state.data[this.state.showPopMsgIndex].other.map((val, index) => {
                                    //     return (
                                    //         <tr key={index}>
                                    //             <td>{val.date}</td>
                                    //             <td>{val.plaform}</td>
                                    //             <td>{val.type}</td>
                                    //             <td className="text-center">
                                    //                 <span
                                    //                     className="text_ellipsis d-block a_hover mx-auto"
                                    //                     style={{ 'maxWidth': '100px' }}
                                    //                     onClick={() => this.showMsg(index)}
                                    //                 >
                                    //                     {val.info}
                                    //                 </span>
                                    //             </td>
                                    //             <td>{val.click}</td>
                                    //             <td>{val.exposure}</td>
                                    //             <td>{val.income}</td>
                                    //             <td>{val.balance}</td>
                                    //         </tr>
                                    //     )
                                    // })
                                }
                            </tbody>
                        </table>
                    </PopMsg> */}
                    <Header cateIndex={3} />
                    <div className="layout_main">
                        <Container className="main_analytic">
                            <Row>
                                <NavLeftReport {...(this.state.status[0] === '推播' ? { one: true } : { two: true })} />
                                <div className="main_right">
                                    <h2><span className="btn_like">帳務報表  / {'我的' + this.state.status[0]}</span></h2>
                                    {this.props.permissionData.level < thisLevel ? htmlInstallTrack(this.props.permissionData.level, thisLevel) :
                                        <>
                                            <div className="box radius10">
                                                <span
                                                    className={(this.state.status[1] === '0' ? 'selected_text' : 'text-dark') + ' dec_none btn_like'}
                                                    onClick={() => this.setState({ status: [this.state.status[0], '0'] })}
                                                >推播明細
                                                </span>
                                                {/* <span
                                                    className={(this.state.status[1] === '1' ? 'selected_text' : 'text-dark') + ' dec_none btn_like'}
                                                    onClick={() => this.setState({ status: [this.state.status[0], '1'] })}
                                                >月報表
                                    </span> */}

                                            </div>
                                            <div className="box radius10">
                                                <Container className="p-3">
                                                    <Row>
                                                        <Col sm="9">
                                                            <span>{this.state.status[0]}餘額:&nbsp;&nbsp;
                                                <h4 className="d-inline-block">
                                                                    {this.state.status[0] === '推播' ? this.state.balance.push : this.state.balance.pull}
                                                                </h4>
                                                            </span>
                                                            {this.state.status[0] === '推播' && <Link to="/memberCentre/billing/four"><button className="btn btn-info ml-5" >推播儲值</button></Link>}
                                                        </Col>
                                                        <Col sm="3">
                                                            <button className="btn btn-outline-dark w-100" onClick={this.toCSV}><FaDownload />&nbsp;&nbsp;匯出明細</button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                                <hr className="dash_line" />
                                                <div className="srollX">
                                                    {this.state.date.map((val, index) => (
                                                        <h4
                                                            key={val}
                                                            className={((this.state.pointer === index) ? 'weight600 ' : '')
                                                                + 'd-inline-block m-4 btn_like'}
                                                            onClick={() => this.updatePointer(index)}
                                                        >{val}
                                                        </h4>
                                                    ))}
                                                </div>
                                                {/* <select className="my-4">
                                                    <option value="1">日期由舊到新</option>
                                                    <option value="-1">日期由新到舊</option>
                                                </select>
                                                <select className="my-4">
                                                    <option value="1">全部</option>
                                                    <option value="-1">今周刊</option>
                                                    <option value="-1">食力</option>
                                                </select> */}
                                                <table className="w-100 text-center pushTable_r even my-4" cellPadding="10">
                                                    <thead>
                                                        <tr className="bg_gray1">
                                                            {/* <th>日期</th> */}
                                                            <th>平台</th>
                                                            <th>類型</th>
                                                            {/* <th>說明</th> */}
                                                            <th>點擊數</th>
                                                            <th>曝光數</th>
                                                            <th>收支</th>
                                                            {/* <th>結餘</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.data.filter((val, index) => (
                                                            val.date === this.state.date[this.state.pointer]
                                                        )).filter((val, index) => (
                                                            index >= 10 * (this.state.page[1] - 1) &&
                                                            index < 10 * (this.state.page[1])
                                                        )).map((val, index) => {

                                                            return (
                                                                <tr key={index}>
                                                                    {/* <td>{val.date}</td> */}
                                                                    <td>{val.brand}</td>
                                                                    <td>{this.translate(val.type)}</td>
                                                                    {/* <td className="text-center">
                                                                        <span
                                                                            className="text_ellipsis d-block a_hover mx-auto"
                                                                            style={{ 'maxWidth': '100px' }}
                                                                            onClick={() => this.showMsg(index)}
                                                                        >
                                                                            {val.info}
                                                                        </span>
                                                                    </td> */}
                                                                    <td>{val.click}</td>
                                                                    <td>{val.explosure}</td>
                                                                    <td>{val.incomeExpenditure}</td>
                                                                    {/* <td>{val.balance}</td> */}
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                                {
                                                    this.state.showLoadingBar &&
                                                    <div className="loading-bar">
                                                        <div className="lds-dual-ring"></div>
                                                    </div>
                                                }
                                                <div className="mt-4 mb-2 text-center">
                                                    {/* <span className="mx-2 btn_like text-primary">1</span>
                                                    <span className="mx-2 btn_like">2</span>
                                                    <span className="mx-2 btn_like">3</span> */}
                                                    {
                                                        Array.from(Array(this.state.page[0]), (e, val) => (
                                                            <span
                                                                key={val}
                                                                className={"mx-2 btn_like " + (((val + 1) === this.state.page[1]) ? "text-primary" : "")}
                                                                onClick={() => this.turnPage(val + 1)}
                                                            >{val + 1}</span>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    }
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