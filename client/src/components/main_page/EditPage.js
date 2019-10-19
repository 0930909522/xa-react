import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftMember from "../share/NavLeftMember";
import { FaTrashAlt } from "react-icons/fa";
import SetTrackingCode from "../install_setting/SetTrackingCode";
import CheckTrackingCode from '../install_setting/CheckTrackingCode';
import TableElement from './TableElement';
import TableElementEdit from './TableElementEdit';
import { trackingList, modifyTracking } from '../share/ajax';
import AlertMsg from '../share/AlertMsg';
import { Redirect } from 'react-router';

//本頁權限 0-4

class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            showAlertMsg: false,
            alertText: '',
            dataOnCheckPage: {
                url: '',
                name: ''
            },
            data: [],
        }
    }
    componentDidMount() {
        trackingList()
            .then(response => {
                let getData = response;
                if (typeof getData === 'string') {
                    this.popMsg(getData);
                }
                if (getData.length === 0) {
                    this.popMsg('目前無專案，進入新增專案頁面');
                    setTimeout(() => {
                        this.changeStatus(1);
                    }, 5500);
                }

                getData.forEach(function (val, index, array) {
                    array[index].edit = false;
                    // array[index].choose = false;
                })
                this.setState({ data: getData });
            })
            .catch(() => {
                this.popMsg('載入發生錯誤，請稍後再試');
            })
    }

    // toggleClickAll = e => {
    //     const newContent = [...this.state.data];
    //     newContent.forEach(function (val) {
    //         val.choose = e.target.checked;
    //     })
    //     this.setState({
    //         content: newContent,
    //         showBtn: e.target.checked
    //     });
    // }
    // clickCheckbox = index => {
    //     const newContent = [...this.state.data];
    //     let booleanBtn = false;
    //     newContent[index].choose = !newContent[index].choose;
    //     for (let i of newContent) {
    //         if (i.choose) {
    //             booleanBtn = true;
    //             break;
    //         }
    //     }
    //     this.setState({
    //         content: newContent,
    //         showBtn: booleanBtn
    //     });
    // }
    changeStatus = num => { //切換頁面
        this.setState({ status: num })
        console.log(num)
    }
    editData = index => {   //切換編輯狀態
        const newData = this.state.data;
        newData[index].edit = !newData[index].edit;
        this.setState({ data: newData })
    }
    sendToCheckPage = (index) => {
        // 傳資料進驗證頁
        let project = this.state.data[index];
        let sendData = { url: project.domainName, name: project.siteName };
        this.setState({
            dataOnCheckPage: sendData,
            status: 2
        })

    }
    newDataToCheckPage = (data) => {
        //新增的追蹤碼儲存進此頁
        let { siteName, domainName } = data;
        let sendData = { url: domainName, name: siteName };
        this.setState({
            dataOnCheckPage: sendData,
        })

    }
    submitEdit = (index, data) => {
        const newData = this.state.data;
        newData[index].siteName = data[0];
        newData[index].type = data[1];
        if (newData[index].verified === false) {
            // 未認證，可修改網域
            newData[index].domainName = data[2];
        }
        this.setState({ data: newData });
        const postData = { ...newData[index] };
        delete postData.choose;
        delete postData.verified;
        delete postData.edit;
        if (newData[index].verified === true) {
            // 已認證，不送網域
            delete postData.domainName;
        } else {
            postData.domainName = data[2];
        }

        modifyTracking(postData)
            .then(response => {
                if (response.status === 4) {
                    this.popMsg('此專案已不存在');
                    setTimeout(() => {
                        window.location.reload();
                    }, 5500);
                    return;
                }
                if (typeof response === 'string') {
                    // 如果有錯誤訊息
                    this.popMsg(response);
                    return;
                }
                this.editData(index);
                
                // 更新專案列表
                let updateProjectList = JSON.parse(localStorage.getItem('website'));
                for(let i of updateProjectList){
                    if(i.websiteId === postData.websiteId){
                        i.siteName = postData.siteName;
                    }
                }
                localStorage.setItem('website', JSON.stringify(updateProjectList));
            })
            .catch(err => {
                this.popMsg('發生錯誤，請稍後再試');
            })

            // response.forEach((val, index) => {
            //     storeWebsite.push({
            //         siteName: val.siteName,
            //         websiteId: val.websiteId
            //     });
            // })
            // 
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
                    <AlertMsg
                        text={this.state.alertText}
                        attr={this.state.showAlertMsg ? 'opacity1' : 'opacity0'}
                        close={() => this.setState({ showAlertMsg: false })}
                    />
                    <Header />
                    <div className="layout_main">
                        <Container className="main_analytic">
                            <Row>
                                <NavLeftMember four />
                                <div className="main_right">
                                    <h2><span className="btn_like" onClick={() => this.changeStatus(0)}>編輯網站資訊</span></h2>
                                    {/* <div className={this.state.status === 0 ? 'd-none' : ''}>
                                    <span className={this.state.status > 0 ? 'text-primary' : ''}>選取黑名單項目</span>
                                    <span>&nbsp;｜&nbsp;</span>
                                    <span className={this.state.status > 1 ? 'text-primary' : ''}>設定黑名單</span>
                                    <span>&nbsp;｜&nbsp;</span>
                                    <span className={this.state.status > 2 ? 'text-primary' : this.state.userAddingData.boardId === null ? '' : 'text-secondary'}>安裝教學</span>
                                </div> */}
                                    <div className={this.state.status === 0 ? 'box' : 'd-none'}>
                                        <table className="text-center w-100 table_simple" cellPadding="15">
                                            <thead>
                                                <tr>
                                                    <th colSpan="5" className="align-items-center">
                                                        <h4>追蹤碼清單</h4>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>狀態</th>
                                                    <th>網站名稱</th>
                                                    <th>網站網址</th>
                                                    <th>產業類型</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* <tr>
                                                <td>
                                                    <input type="checkbox" className="table_checkbox" onClick={this.toggleClickAll} />
                                                </td>
                                                <td colSpan="3"></td>
                                            </tr> */}
                                                {this.state.data.map((val, index) => (
                                                    !val.edit ? <TableElement
                                                        val={val}
                                                        index={index}
                                                        key={index}
                                                        // clickCheckbox={this.clickCheckbox}
                                                        editData={this.editData}
                                                        toCheckPage={() => this.sendToCheckPage(index)}
                                                    />
                                                        :
                                                        <TableElementEdit
                                                            val={val}
                                                            index={index}
                                                            key={index}
                                                            // clickCheckbox={this.clickCheckbox}
                                                            editData={this.editData}
                                                            submitData={this.submitEdit}
                                                            toCheckPage={() => this.sendToCheckPage(index)}
                                                        />
                                                ))}
                                                {(this.state.showBtn) && <tr><td colSpan="4"></td><td className="btn_like" onClick={this.deleteList}><FaTrashAlt /></td></tr>}
                                            </tbody>
                                        </table>
                                        <div className="text-center">
                                            <button className="btn btn-primary text-white px-4 mt-2 weight600 font_20" onClick={() => this.changeStatus(1)}>&#43;</button>
                                        </div>
                                    </div>
                                    {
                                        this.state.status === 1 &&
                                        <SetTrackingCode
                                            changeStatus={this.changeStatus}
                                            toCheckPage={this.newDataToCheckPage}
                                        />
                                    }
                                    {
                                        this.state.status === 2 &&
                                        <CheckTrackingCode
                                            data={this.state.dataOnCheckPage}
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
export default EditPage;