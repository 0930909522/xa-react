import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftPush from "../share/NavLeftPush";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import PushPage from '../push_install/PushPage';
import SetBlackList from '../push_install/SetBlackList';
import InstallationGuide from '../push_install/InstallationGuide';
import { getBoard, deleteBoard } from '../share/ajax';
// import PushTitle from '../share/PushTitle';
import { FaArrowRight } from 'react-icons/fa';
import { htmlInstallTrack } from '../share/checkPermission';
import { Redirect } from 'react-router';
import AlertMsg from '../share/AlertMsg';

const thisLevel = 1; //設定本頁權限 1-4

const initialUserAddingData = {
    acceptType: [], //
    step1Data: [], //收到要放進step2的
    blacklist: [],
    boardId: ''
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            data: [],
            userAddingData: Object.assign({}, initialUserAddingData),
            showLoadingBar: true,   //讀取圖示
            alertText: '',
            showAlertMsg: false
        }
    }
    componentDidMount() {
        //載入以設定好的widget
        let postData = {};
        postData.view = localStorage.getItem('view');
        getBoard(postData)
            .then(response => {
                this.setState({ showLoadingBar: false });
                let getData = response;
                if(typeof response === 'string'){
                    this.popMsg(response);
                    return ;
                }
                if (getData.length === 0) {
                    // 如果沒有widget
                    this.changeStatus(1);
                    return;
                }
                getData.forEach(function (val, index, array) {
                    array[index].show = false;
                    array[index].choose = false;
                })
                this.setState({ data: getData });
            })
            .catch(err => {
                console.log(err);
                this.popMsg('讀取資料發生錯誤，請稍後再試');
            })
    }
    //全選
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
    //單選
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
    // 展開或隱藏
    toggleTr = (index) => {
        const newContent = [...this.state.data];
        newContent[index].show = !newContent[index].show;
        this.setState({ content: newContent });
    }
    //切換步驟用
    changeStatus = num => {
        if (num === 0) {
            this.setState({ status: num, userAddingData: Object.assign({}, initialUserAddingData) })
        } else {
            this.setState({ status: num })
        }
        console.log(num)
    }
    //儲存其他頁面的資料到此元件
    saveData = (text, data) => {
        const newData = this.state.userAddingData;
        newData[text] = data;
        this.setState({ userAddingData: newData });
    }
    // 直接進到安裝教學
    toPageThree = (index) => {
        let id = this.state.data[index].boardId;
        this.saveData('boardId', id);
        this.changeStatus(3);
    }
    //修改
    editData = (index) => {
        const newData = this.state.userAddingData;
        const sourceData = this.state.data[index];
        newData.acceptType = sourceData.acceptType;
        newData.blacklist = sourceData.blacklist;
        newData.boardId = sourceData.boardId;
        this.setState({ userAddingData: newData });
        this.changeStatus(1);
    }
    // 刪除
    deleteList = () => {
        let postData = { boardIdList: [] };
        // postData.token = localStorage.getItem('token');
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
    // 英翻中
    translate = (value) => {
        switch (value) {
            case 'm':
                value = '文章';
                break;
            case 'e':
                value = '商品';
                break;
            default:
                value = '';
                break;
        }
        return value;
    }
    popMsg = (value) => {
        this.setState({ showAlertMsg: true, alertText: value });
        setTimeout(() => {
            this.setState({ showAlertMsg: false });
        }, 5000);
    }

    render() {
        return (
            !this.props.permissionData.verified ?
                <Redirect to="/signup/signin" /> :
                <>
                    <Header cateIndex={2} />
                    <div className="layout_main">
                        <Container className="main_analytic">
                            <Row>
                                <NavLeftPush three />
                                <div className="main_right">
                                    <h2 onClick={() => this.changeStatus(0)}><span className="btn_like">推播管理 / 放進來</span></h2>
                                    {this.props.permissionData.level < thisLevel ? htmlInstallTrack(this.props.permissionData.level, thisLevel) :
                                        <>
                                            <AlertMsg
                                                text={this.state.alertText}
                                                attr={this.state.showAlertMsg ? 'opacity1' : 'opacity0'}
                                                close={() => this.setState({ showAlertMsg: false })}
                                            />
                                            <div className={this.state.status === 0 ? 'd-none' : ''}>
                                                <span className={this.state.status > 0 ? 'text-primary' : ''}>
                                                    選取黑名單項目
                                        <FaArrowRight className="vertical_base mx-2" />
                                                </span>
                                                <span className={this.state.status > 1 ? 'text-primary' : ''}>
                                                    設定黑名單
                                        <FaArrowRight className="vertical_base mx-2" />
                                                </span>
                                                <span className={this.state.status > 2 ? 'text-primary' : this.state.userAddingData.boardId === '' ? '' : 'text-secondary'}>安裝教學</span>
                                            </div>
                                            <div className={this.state.status === 0 ? 'box' : 'd-none'}>
                                                <table className="table_simple w-100" cellPadding="15">
                                                    <thead>
                                                        <tr>
                                                            <th className="d-flex justify-content-center">
                                                                <h4>清單</h4>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th className="d-flex justify-content-between align-items-center">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        onClick={this.toggleClickAll}
                                                                    />
                                                                    <span>&nbsp;全選</span>
                                                                </div>
                                                                <div>
                                                                    <span>詳情&nbsp;編輯</span>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.data.length > 0 &&
                                                            this.state.data.map((val, index) => (
                                                                <React.Fragment key={val.boardId}>
                                                                    <tr>
                                                                        <td className="d-flex justify-content-between align-items-center">
                                                                            <div>
                                                                                <input type="checkbox" checked={val.choose} onChange={() => this.clickCheckbox(index)} />
                                                                                <h5 className="d-inline-block vertical_middle ml-5" style={{ 'margin': '0' }}>{'清單 ' + (index + 1)}</h5>
                                                                            </div>
                                                                            <div>
                                                                                <FaSearch onClick={(e) => this.toggleTr(index)} className="btn_like mx-2" />
                                                                                <FaEdit onClick={(e) => this.editData(index)} className="btn_like mx-2" />
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    {
                                                                        (val.content !== null && val.show) && <tr className="nohover">
                                                                            <td colSpan="2">
                                                                                <strong>類別</strong>
                                                                                {
                                                                                    Array.from(val.acceptType).map((val, index) => (
                                                                                        <h6 key={index}>{this.translate(val)}</h6>
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
                                                                                <span
                                                                                    className="btn_like text-primary"
                                                                                    onClick={() => this.toPageThree(index)}
                                                                                >進入安裝教學</span>
                                                                            </td>
                                                                        </tr>
                                                                    }
                                                                </React.Fragment>
                                                            ))}
                                                        {(this.state.showBtn) && <tr><td className="text-right btn_like" onClick={this.deleteList}><FaTrashAlt /></td></tr>}
                                                    </tbody>
                                                </table>
                                                {
                                                    this.state.showLoadingBar &&
                                                    <div className="loading-bar">
                                                        <div className="lds-dual-ring"></div>
                                                    </div>
                                                }
                                                <div className="text-center">
                                                    <button
                                                        className="btn btn-primary text-white px-4 mt-2 weight600 font_20"
                                                        onClick={() => this.changeStatus(1)}
                                                    >+</button>
                                                </div>
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
export default Board;