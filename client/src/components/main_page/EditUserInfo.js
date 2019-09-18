import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftMember from "../share/NavLeftMember";
import { getUserInfo, updateUserInfo } from '../share/ajax';
import EditUserInfoElement from './EditUserInfoElement';

class EditUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editData: false,
            data: {
                "name": "",
                "email": "",
                "companyName": "",
                "companyType": "",
                "taxId": ""
            },
            temporaryData: null
        };
        this.title = {
            "email":'電子郵件信箱',
            "name": '暱稱',
            "companyName": '公司名稱',
            "companyType": '服務類型', 
            "taxId":'統編'
        }
    }
    componentDidMount() {
        let postData = { token: localStorage.getItem('token') };
        getUserInfo(postData).then(response => {
            let newData = response;
            if(newData === undefined) return;
            delete newData.status;
            this.setState({ data: newData })
        })
    }
    changeBtn = () => {
        let haveInput = false;
        if (this.state.editData) {
            // 編輯模式中
            for (let i in this.state.data) {
                if (this.state.data[i] !== '') {
                    haveInput = true;
                }
            }
            if (!haveInput) {
                // 如果沒輸入
                this.setState({ data: this.state.temporaryData });
            } else {
                // 有輸入，送出資料
                let postData = { token: localStorage.getItem('token') };
                // updateUserInfo(postData).then(response)

            }
        } else {
            // 檢視模式
            this.setState({ temporaryData: this.state.data });
        }
        this.setState({ editData: !this.state.editData });
    }
    typeData = e => {
        let newData = this.state.data;
        if(e.target.id === 'eamil' || e.target.id === 'taxId'){
            return ;
        }
        newData[e.target.id] = e.target.value;
        this.setState({ data: newData });
    }
    render() {
        return (
            <>
                <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftMember one />
                            <div className="main_right">
                                <h2>會員中心<span style={{ fontSize: '20px' }}>&nbsp;/編輯使用者資訊</span></h2>
                                <div className="box radius10 mt-20">
                                    <h4 className="text-primary">個人檔案</h4>
                                    <hr />
                                    {Object.keys(this.state.data).map((key, index) =>
                                        <React.Fragment key={index}>
                                            <label>{this.title[key]}</label>
                                            <EditUserInfoElement
                                                name={this.state.data[key]}
                                                keyElement={key}
                                                editData={this.state.editData}
                                                inputWord={this.typeData}
                                                readOnly={(this.title[index] !== '電子郵件信箱' && this.title[index] !== '統編') ? false : true}
                                            />
                                        </React.Fragment>
                                    )}
                                    <button className="btn btn-outline-primary w-100 radius20 my-3 p-2 font_20" onClick={this.changeBtn}>{this.state.editData ? '儲存' : '變更'}</button>
                                    {this.state.editData && <button className="btn btn-outline-primary w-100 radius20 my-3 p-2 font_20" onClick={() => window.location.reload()}>取消</button>}
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
export default EditUserInfo;