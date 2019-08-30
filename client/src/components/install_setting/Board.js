import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftPush from "../share/NavLeftPush";
import { FaEdit, FaTrashAlt, FaPlusCircle, FaSearch } from "react-icons/fa";
import PushPage from '../push_install/PushPage';
import SetBlackList from '../push_install/SetBlackList';
import InstallationGuide from '../push_install/InstallationGuide';
import { getBoard, deleteBoard } from '../share/ajax';
// import PushTitle from '../share/PushTitle';

const initialUserAddingData = {
    acceptType: null,
    step1Data: null, //收到要放進step2的
    blacklist: null,
    boardId: null
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            data: [],
            userAddingData: Object.assign({}, initialUserAddingData)
        }
    }
    componentDidMount() {
        let postData = {};
        postData.token = localStorage.getItem('token');
        postData.owner = localStorage.getItem('view');
        getBoard(postData) //載入資訊
            .then(response => {
                let getData = response || [];
                if (getData.length === 0) {
                    this.changeStatus(1);
                }
                getData.forEach(function (val, index, array) {
                    array[index].show = false;
                    array[index].choose = false;
                })
                this.setState({ data: getData });
                console.log(getData)
            })
        this.setState({ userAddingData: Object.assign({}, initialUserAddingData) }); //初始化

    }
    toggleClickAll = e => {
        const newContent = [...this.state.data];
        newContent.forEach(function (val) {
            val.choose = e.target.checked;
        })
        this.setState({
            content: newContent,
            showBtn: e.target.checked
        });
    }
    clickCheckbox = index => {
        const newContent = [...this.state.data];
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
    toggleTr = (index) => {
        const newContent = [...this.state.data];
        newContent[index].show = !newContent[index].show;
        this.setState({ content: newContent });
    }
    changeStatus = num => {

        if (num === 0) {
            this.setState({ status: num, userAddingData: Object.assign({}, initialUserAddingData) })
        } else {
            this.setState({ status: num })
        }
        console.log(num)
    }
    saveData = (text, data) => {
        const newData = this.state.userAddingData;
        newData[text] = data;
        this.setState({ userAddingData: newData });
    }
    editData = (index) => {
        const newData = this.state.userAddingData;
        const sourceData = this.state.data[index];
        newData.acceptType = sourceData.acceptType;
        newData.blacklist = sourceData.blacklist;
        newData.boardId = sourceData.boardId;
        this.setState({ userAddingData: newData });
        this.changeStatus(1);
    }
    deleteList = () => {
        let postData = { token: null, boardIdList: [] };
        postData.token = localStorage.getItem('token');
        this.state.data.forEach((val) => {
            if (val.choose) {
                postData.boardIdList.push(val.boardId);
            }
        })
        deleteBoard(postData)
            .then(response => {
                window.location.reload();
            })
    }

    render() {
        return (
            <>
                <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush three />
                            <div className="main_right">
                                <h2 onClick={() => this.changeStatus(0)}><span className="btn_like">佈告欄</span></h2>
                                <div className={this.state.status === 0 ? 'd-none' : ''}>
                                    <span className={this.state.status > 0 ? 'text-primary' : ''}>選取黑名單項目</span>
                                    <span>&nbsp;｜&nbsp;</span>
                                    <span className={this.state.status > 1 ? 'text-primary' : ''}>設定黑名單</span>
                                    <span>&nbsp;｜&nbsp;</span>
                                    <span className={this.state.status > 2 ? 'text-primary' : this.state.userAddingData.boardId === null ? '' : 'text-secondary'}>安裝教學</span>
                                </div>
                                <div className={this.state.status === 0 ? 'box' : 'd-none'}>
                                    <table className="pushTable_r w-100" cellPadding="15">
                                        <thead>
                                            <tr>
                                                <th className="d-flex justify-content-between align-items-center">
                                                    <input type="checkbox" onClick={this.toggleClickAll} />&nbsp;&nbsp;佈告欄清單
                                                    <button className="btn_noborder text-primary" onClick={() => this.changeStatus(1)}><FaPlusCircle /></button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.data.map((val, index) => (
                                                <React.Fragment key={val.boardId}>
                                                    <tr>
                                                        <td className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <input type="checkbox" checked={val.choose} onChange={() => this.clickCheckbox(index)} />
                                                                <h5 className="d-inline-block vertical_middle ml-5" style={{ 'margin': '0' }}>{'佈告欄 ' + (index + 1)}</h5>
                                                            </div>
                                                            <div>
                                                                <FaSearch onClick={(e) => this.toggleTr(index)} className="btn_like mx-2" />
                                                                <FaEdit onClick={(e) => this.editData(index)} className="btn_like mx-2" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    {
                                                        (val.content !== null && val.show) && <tr>
                                                            <td colSpan="2">
                                                                <strong>佈告欄類別</strong>
                                                                {
                                                                    val.acceptType.map((val, index) => (
                                                                        <h6 key={index}>{val}</h6>
                                                                    ))
                                                                }
                                                                <br />
                                                                <strong>黑名單</strong>
                                                                {
                                                                    (val.blacklist.length === 0) ? (
                                                                        <p>無黑名單</p>
                                                                    )
                                                                        :
                                                                        val.blacklist.map((val, index) => (
                                                                            <h6 key={index}>{val}</h6>
                                                                        ))
                                                                }
                                                            </td>
                                                        </tr>
                                                    }
                                                </React.Fragment>
                                            ))}
                                            {(this.state.showBtn) && <tr><td className="text-right btn_like" onClick={this.deleteList}><FaTrashAlt /></td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                                {(this.state.status === 1) &&
                                    <PushPage
                                        changeStatus={this.changeStatus}
                                        getResponseData={this.saveData}
                                        sendData={this.state.userAddingData}
                                    />
                                }
                                {(this.state.status === 2) &&
                                    <SetBlackList
                                        changeStatus={this.changeStatus}
                                        getResponseData={this.saveData}
                                        sendData={this.state.userAddingData}
                                    />
                                }
                                {(this.state.status === 3) &&
                                    <InstallationGuide
                                        changeStatus={this.changeStatus}
                                        sendData={this.state.userAddingData.boardId}
                                    />
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
export default Board;