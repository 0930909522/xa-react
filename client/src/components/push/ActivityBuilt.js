import React, { Component } from 'react';
import PushInput from './PushInput';
// import {FaTrashAlt} from 'react-icons/fa';
// import Switch from './share/Switch';
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";

class ActivityBuilt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            editId: null,
            data: [{
                "id": "1",
                "advertiseType": 1,
                "activityName": "畢業季主題專欄",
                "start": ["2019-08-05", "14:57"],
                "end": ["2019-08-06", "06:57"],
                "url": "https://www.businesstoday.com.tw/article/category/",
                "title": "資金潮讓投資人「嗨」到高點　樂觀之餘台股要留意這4個重點",
                "content": "美股持續往歷史高點邁進...",
                "tag": "#111#222",
                "state": true,
                "img": "https://static.jsbin.com/images/dave.min.svg"
            }, {
                "id": "2",
                "advertiseType": 3,
                "activityName": "畢業",
                "start": ["2019-08-05", "14:57"],
                "end": ["2019-08-06", "06:57"],
                "url": "https://www.businesstoday.com.tw/article/category/",
                "title": "資金潮讓投資人「嗨」到高點　樂觀之餘台股要留意這4個重點",
                "content": "美股持續往歷史高點邁進...",
                "tag": "#111#222",
                "state": true,
                "img": "https://static.jsbin.com/images/dave.min.svg"
            }
            ]

        }
        this.openEdit = id => {
            this.setState({ open: !this.state.open, editId: id })
        }
    }
    render() {
        return (
            <div className={this.props.toOpenList === false ? 'd-none':''}>
                <div className={(this.state.open ? 'd-none ' : ' ') + 'box'}>
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
                            {this.state.data.map(val => {
                                return (
                                    <tr key={val.id}>
                                        {/* <td><Switch /></td> */}
                                        <td>{val.activityName}</td>
                                        <td>{val.end}</td>
                                        <td>{val.state === true ? '刊登中' : '已結束'}</td>
                                        <td><button className='btn_noborder_r' onClick={() => this.openEdit(val.id)}>編輯 <FaPencilAlt /></button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <PushInput
                    open={this.state.open}
                    handleOpen={this.openEdit}
                    data={this.state.data}
                    editId={this.state.editId}
                />
            </div>
        )
    }
}

export default ActivityBuilt;
