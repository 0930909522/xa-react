import React, { Component } from 'react';
import { setblacklist, modifyBoard } from '../share/ajax';
// import { Container, Row } from "react-bootstrap";
// import Header from "../Header";
// import NavLeftPush from "../share/NavLeftPush";
// import PushTitle from '../share/PushTitle';

class SetBlackList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modified: false
        }
        // this.clickAllBtn = null;
    }
    componentDidMount() {
        let newData = this.props.sendData.step1Data || [];
        const getData = this.props.sendData;
        if (getData.boardId === null) { //新增資料狀態
            newData.forEach(function (val, index, array) {
                array[index] = { choose: false, name: val }
            })
        } else { //修改資料狀態
            let bol = false;
            newData.forEach(function (val, index, array) {
                (getData.blacklist.find(element => element === val) !== undefined) ? bol = true : bol = false;
                array[index] = { choose: bol, name: val }
            })
            this.setState({ modified: true })
        }

        this.setState({ data: newData });
    }
    // toggleClickAll = e => {
    //     const newContent = [...this.state.data];
    //     newContent.forEach(function (val) {
    //         val.choose = e.target.checked;
    //     })
    //     this.setState({ data: newContent });
    // }
    toggleStatus = num => {
        const newData = this.state.data;
        newData[num].choose = !newData[num].choose;
        this.setState({ data: newData });
    }
    submit = () => {
        let postData = {
            token: null,
            owner: null,
            blacklist: [],
            acceptType: []
        };
        for (let i of this.state.data) {
            if (i.choose === true) {
                postData.blacklist.push(i.name);
            }
        }
        postData.acceptType = this.props.sendData.acceptType;
        postData.token = localStorage.getItem('token');
        postData.owner = localStorage.getItem('view');
        if (this.state.modified) {
            postData.boardId = this.props.sendData.boardId;
            modifyBoard(postData);
            window.location.reload();
        } else {
            setblacklist(postData)
                .then((res) => {
                    this.props.getResponseData('boardId', res);
                    this.props.changeStatus(3);
                })
        }
    }
    render() {
        // 不可全選
        let arr = this.state.data;
        let countBtn = arr.reduce((accumulator, currentValue) => {
            if (currentValue.choose === true) {
                return accumulator + 1;
            } else {
                return accumulator;
            }
        }, 0);
        (countBtn === arr.length) ? countBtn = true : countBtn = false;
        
        return (
            <>
                {/* <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush />
                            <div className="main_right">
                                <h2>推播安裝</h2>
                                <PushTitle two />
                                <h5 className="my-3">目前已投放在您網站上的客戶網站</h5> */}
                <div className="box">
                    <table className="pushTable_r w-100 text-center" cellPadding="15">
                        <thead>
                            <tr>
                                {/* <th><input type="checkbox" onClick={this.toggleClickAll} ref={(e) => this.clickAllBtn = e} /></th> */}
                                <th colSpan="2">網站名稱</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((val, index) => {
                                return (
                                    <tr key={index}>
                                        <td><input type="checkbox" checked={val.choose} onChange={() => this.toggleStatus(index)} /></td>
                                        <td>{val.name}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="text-center my-3" >
                    <button className="btn btn-secondary mx-1" onClick={this.submit} disabled={countBtn} >&nbsp;&nbsp;&nbsp;確認&nbsp;&nbsp;&nbsp;</button>
                    <button className="btn btn-secondary mx-1" onClick={() => this.props.changeStatus(0)}>&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;</button>
                </div>
                {/* </div>

                        </Row>
                    </Container>
                </div> */}
            </>
        )
    }

}
export default SetBlackList;