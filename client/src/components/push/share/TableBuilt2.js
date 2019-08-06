import React, { Component } from 'react';
import Switch from './Switch';

export default class TableBuilt2 extends Component {
    render() {
        return (
            <>
                <div className="box">
                    <div className="d-flex box w-100 justify-content-between">
                        <button className="btn_outline">移除</button>
                        <button className="btn_outline">查看更多熱門商品</button>
                    </div>
                    <table className="pushTable w-100 text-center" cellPadding="15">
                        <thead>
                            <tr>
                                <th><input type="checkbox" disabled /></th>
                                <th></th>
                                <th>廣告活動</th>
                                <th>客戶平台</th>
                                <th>結束時間</th>
                                <th>狀態</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>
                                    <Switch />
                                </td>
                                <td>別讓抗壓力害死你：寫給心累上班族</td>
                                <td>蝦皮</td>
                                <td>2019年9月20日</td>
                                <td>刊登中</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>
                                    <Switch />
                                </td>
                                <td>減醣飲食</td>
                                <td>UDN買東西</td>
                                <td>2018年6月20日</td>
                                <td>已結束</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
