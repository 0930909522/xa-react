import React, { Component } from 'react';
import PushInput from './PushInput';
// import {FaTrashAlt} from 'react-icons/fa';
// import Switch from './share/Switch';
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
// import { type } from 'os';
import { getPush } from '../share/ajax';

class PushList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'report',
            open: false,
            editIndex: null,
            data: [{
                "adId": "",
                "title": "",
                // "advertiseType": 1,
                "start": "",
                "end": "",
                "usable": true,
                "tag": [],
                "ads": [{
                    "description": "",
                    "img": "",
                    "title": "",
                    "url": ""
                    // "id": "1",
                    // "name": "畢業季",
                    // "url": "https://www.businesstoday.com.tw/article/category/",
                    // "title": "資金潮讓投資人「嗨」到高點　樂觀之餘台股要留意這4個重點",
                    // "content": "美股持續往歷史高點邁進...",
                    // "tag": "#111#222",
                    // "img": "https://static.jsbin.com/images/dave.min.svg"
                }]
            }
            ]
        }
        this.currentTIme = new Date();
    }
    componentDidMount() {
        // let newType = this.props.type.split('/');
        // newType = newType[newType.length - 2].replace('<', '').trim();
        // switch (newType) {
        //     case '主題活動':
        //         newType = 'theme';
        //         break;

        //     case '專題報導':
        let newType = 'report';
        //         break;
        //     default:
        //         break;
        // }
        // this.setState({ type: newType });

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
                                {/* <th></th> */}
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
                                        {/* <td><Switch /></td> */}
                                        <td>{val.title}</td>
                                        <td>{val.endTime}</td>
                                        <td>{val.state ? '刊登中' : Date.parse(val.startTime) > new Date() ? '未刊登' : '已結束'}</td>
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
                    />
                }
            </>
        )
    }
}

export default PushList;
