import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftMember from "../share/NavLeftMember";
import { FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import SetTrackingCode from "../install_setting/SetTrackingCode";
import TableElement from './TableElement';
import TableElementEdit from './TableElementEdit';
import { trackingList, modifyTracking } from '../share/ajax';

class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            data: [],
        }
    }
    componentDidMount() {
        let postData = {};
        postData.token = localStorage.getItem('token');
        trackingList(postData)
            .then(response => {
                let getData = response || [];
                if (getData.length === 0) {
                    this.changeStatus(1);
                }
                getData.forEach(function (val, index, array) {
                    array[index].edit = false;
                    // array[index].choose = false;
                })
                this.setState({ data: getData });
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
    changeStatus = num => {
        this.setState({ status: num })
        console.log(num)
    }
    editData = index => {
        const newData = this.state.data;
        newData[index].edit = !newData[index].edit;
        this.setState({ data: newData })
    }
    submitEdit = (index, data) => {
        const newData = this.state.data;
        newData[index].sn = data[0];
        newData[index].type = data[1];
        if(newData[index].verified === false){
            newData[index].dn = data[2];
        }
        this.setState({ data: newData });
        const postData = {...newData[index]};
        delete postData.choose;
        delete postData.verified;
        delete postData.edit;
        if(newData[index].verified === true){
            delete postData.dn;
        }else{
            postData.dn = data[2];
        }
        postData.token = localStorage.getItem('token');
        console.log(postData)
        modifyTracking(postData)
        .then(response=>{
            if(response.status === 4){
                alert('此專案已不存在');
                window.location.reload();
                return ;
            }
            this.editData(index);
        })
    }
    // deleteList = () => {
    //     const postData = {
    //         token: localStorage.getItem('token'),

    //     };
        

    // }

    render() {
        return (
            <>
                <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftMember four />
                            <div className="main_right">
                                <h2 className="btn_like" onClick={() => this.changeStatus(0)}>編輯網站資訊</h2>
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
                                                <th colSpan="4" className="align-items-center">
                                                    <h4>追蹤碼清單</h4>
                                                </th>
                                                <th>
                                                    <button className="btn_noborder text-primary" onClick={() => this.changeStatus(1)}><FaPlusCircle /></button>
                                                </th>
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
                                                    clickCheckbox={this.clickCheckbox}
                                                    editData={this.editData}
                                                />
                                                    :
                                                    <TableElementEdit
                                                        val={val}
                                                        index={index}
                                                        key={index}
                                                        clickCheckbox={this.clickCheckbox}
                                                        editData={this.editData}
                                                        submitData={this.submitEdit}
                                                    />
                                            ))}
                                            {(this.state.showBtn) && <tr><td colSpan="4"></td><td className="btn_like" onClick={this.deleteList}><FaTrashAlt /></td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                                {
                                    this.state.status === 1 &&
                                    <SetTrackingCode
                                        changeStatus={() => this.changeStatus(0)}
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