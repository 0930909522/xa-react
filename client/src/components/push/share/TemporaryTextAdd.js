import React, { Component } from 'react'

export default class TemporaryTextAdd extends Component {
    render() {
        return (
            <div className="d-table-cell border_gray w-50 p-2 position-relative">
                <div className="d-flex flex-column justify-content-between align-items-baseline">
                    <textarea
                        rows="5"
                        className="d-block w-100 pl-2 vertical_top"
                        placeholder="逐行輸入或貼上黑名單網址清單"
                        onChange={this.props.handleChange}
                        ref={this.props.inputRef}
                    ></textarea>
                    <br/>
                    <button
                        className="btn_noborder_r mb-1"
                        onClick={this.props.handleClick}
                    >
                        {(this.props.number > 0) && '新增' + this.props.number + '個黑名單網址'}
                    </button>
                </div>
            </div>
        )
    }
}
