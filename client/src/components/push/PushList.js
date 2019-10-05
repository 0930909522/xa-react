import React, { Component } from 'react';
import PushInput from './PushInput';
// import {FaTrashAlt} from 'react-icons/fa';
import Switch from './share/Switch';
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
// import { type } from 'os';
import { getPush, modifyPush } from '../share/ajax';

class PushList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            open: false,
            editIndex: null,
            ajaxSleep: false,
            data: [{
                "adId": "",
                "title": "",
                "start": "",
                "end": "",
                "usable": true,
                "tag": [],
                "ads": [{
                    "description": "",
                    "img": "",
                    "title": "",
                    "url": ""
                }]
            }
            ]
        }
        this.currentTIme = new Date();
    }
    componentDidMount() {
        let newType = this.props.type.split('/');
        newType = newType[newType.length - 2].replace('<', '').trim();
        switch (newType) {
            case '主題活動':
                newType = 'theme';
                break;

            case '專題報導':
                newType = 'report';
                break;
            default:
                break;
        }
        this.setState({ type: newType });

        let postData = {
            view: localStorage.getItem('view'),
            // view: 'culturelaunch',
            type: newType
        }
        getPush(postData).then(res => {
            this.setState({ data: res });
        })
    }
    openEdit = index => {
        this.setState({ open: !this.state.open, editIndex: index })
    }
    closeEdit = index => {
        this.setState({ open: !this.state.open })
    }
    // 改變刊登狀態
    changeStatus = index => {
        if (Date.parse(this.state.data[index].end) >= new Date() && Date.parse(this.state.data[index].start) <= new Date() && !this.state.ajaxSleep) {
            // 如果尚未結束，且於刊登期間
            const postData = this.state.data;
            postData[index].usable = !postData[index].usable;
            modifyPush(postData[index]).then(res => {
                if (res === 1) {
                    this.setState({
                        data: postData,
                        ajaxSleep: true
                    })
                    setTimeout(() => {
                        this.setState({ ajaxSleep: false });
                        // 休息三秒方可繼續調整
                    }, 3000);
                }
            })
        }
    }
    render() {
        return (
            <>
                <div className={(this.state.open ? 'd-none ' : ' ') + 'box radius10'}>
                    <div className="text-right">
                        {/* <button className="btn_outline">移除</button> */}
                        <button className="btn_noborder text-primary" onClick={() => this.openEdit(null)}><FaPlusCircle /></button>
                        <hr />
                    </div>
                    <table className="pushTable w-100 text-center radius20" cellPadding="15">
                        <thead>
                            <tr>
                                <th></th>
                                <th>廣告活動</th>
                                <th>結束時間</th>
                                <th>狀態</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((val, index) => {
                                return (
                                    <tr key={index}>
                                        <td><Switch value={val.usable} changeStatus={() => this.changeStatus(index)} /></td>
                                        <td>{val.title}</td>
                                        <td>{val.end}</td>
                                        <td>{val.usable ? '刊登中' : Date.parse(val.start) > new Date() ? '未刊登' : '已結束'}</td>
                                        <td><button className='btn_noborder_r' onClick={() => this.openEdit(index)}>編輯 <FaPencilAlt /></button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {this.state.open &&
                    <PushInput
                        type={this.state.type}
                        handleOpen={this.closeEdit}
                        data={this.state.data[this.state.editIndex]}
                        goback={this.props.goback}
                    />
                }
            </>
        )
    }
}

export default PushList;
