import React, { Component } from 'react'

export default class TextItem extends Component {
    render() {
        return (
            <tr>
                <td><input type="checkbox" onChange={this.props.handleTextClick} checked={this.props.isChecked} /></td>
                <td>{this.props.name}</td>
                <td className="text-right">
                    <button className="btn_noborder_r" onClick={this.props.handleTextEdit}>編輯</button>
                </td>
            </tr>
        )
    }
}
