import React, { Component } from 'react'

export default class TemporaryTextItem extends Component {
    render() {
        return (
            <div className="d-table-row">
                <div className="d-table-cell p-2">
                    <p>{this.props.value}</p>
                </div>
                <div className="d-table-cell p-2 text-right">
                    <button className="btn_noborder_r" onClick={this.props.handleClick}>X</button>
                </div>
            </div>
        )
    }
}
