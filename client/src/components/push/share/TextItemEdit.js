import React, { Component } from 'react'

export default class TextItemEdit extends Component {
    render() {
        return (
            <tr>
                <td><input type="checkbox" onChange={this.props.handleTextClick} checked={this.props.isChecked} /></td>
                <td><input type="text" defaultValue={this.props.name} className="w-100" onChange={this.props.handleTextEdit} /></td>
                <td className="text-right">
                    <button className="btn_noborder_r" onClick={this.props.updateTextEdit}>完成</button>
                </td>
            </tr>
        )
    }
}
