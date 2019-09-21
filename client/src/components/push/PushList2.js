import React, { Component } from 'react';
import PushInput from './PushInput';
// import {FaTrashAlt} from 'react-icons/fa';
import Switch from './share/Switch';
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";

class PushList2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            open: false,
            editIndex: null,
            data: [
                {
                    name: '蝦皮',
                    state: false
                },
                {
                    name: '蝦皮',
                    state: true
                }
            ]
        }

    }
    componentDidMount() {
        let newType = this.props.type.split('/');
        newType = newType[newType.length - 2].replace('<', '').trim();
        switch (newType) {
            case '推薦商品':
                newType = 'commodity';
                break;

            case '推薦文章':
                newType = 'article';
                break;
            default:
                break;
        }
        this.setState({ type: newType });
    }
    render() {
        return (
            <>
                <div className={(this.state.open ? 'd-none ' : ' ') + 'box radius10'}>

                    <table className="pushTable w-100 text-center radius20" cellPadding="15">
                        <thead>
                            <tr>
                                <th></th>
                                <th>客戶平台</th>
                                <th>狀態</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((val, index) => {
                                return (
                                    <tr key={val.name}>
                                        <td><Switch /></td>
                                        <td>{val.name}</td>
                                        <td>{val.state === true ? '刊登中' : '已結束'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default PushList2;