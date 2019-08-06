import React, { Component } from 'react';
import Switch from './Switch';
import { FaPlusCircle } from "react-icons/fa";

export default class TableBuilt extends Component {
    render() {
        return (
            <>
                <div className="box">
                    <div className="d-flex box w-100 justify-content-between">
                        <button className="btn_outline">移除</button>
                        <button className="btn_noborder"><FaPlusCircle /></button>
                    </div>
                    <table className="pushTable w-100 text-center" cellPadding="15">
                        <thead>
                            <tr>
                                <th><input type="checkbox" disabled /></th>
                                <th></th>
                                <th>廣告活動</th>
                                <th>結束時間</th>
                                <th>狀態</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>
                                    <Switch />
                                </td>
                                <td>畢業季主題</td>
                                <td>2019年9月20日</td>
                                <td>刊登中</td>
                                <td>編輯</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>
                                    <Switch />
                                </td>
                                <td>美食旅遊主題</td>
                                <td>2018年6月20日</td>
                                <td>已結束</td>
                                <td>編輯</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </>
        )
    }
}
