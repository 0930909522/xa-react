import React, { Component } from 'react';
import TemporaryTextItem from './TemporaryTextItem';
import TemporaryTextAdd from './TemporaryTextAdd';

export default class TemporaryTextBar extends Component {
    render() {
        return (
            <>
                <div className="d-table my-2 w-100 min_h_12em">
                    <div className="d-table-row w-100 ">
                        <TemporaryTextAdd
                            handleClick={this.props.handleClick}
                            handleChange={this.props.handleChange}
                            number={this.props.number}
                            inputRef={this.props.inputRef}
                        />
                        <div className="d-table-cell border_gray w-50 p-2">
                            <div className="d-flex justify-content-between align-content-center">
                                <span>{(this.props.temporaryTextLength === 0) ? '未建立任何清單' : '已選擇' + this.props.temporaryTextLength  + '項'}</span>
                                <button className="text-info btn_noborder_r" onClick={this.props.clearTemporaryText}>全部清除</button>
                            </div>
                            <hr />
                            <div className="d-table w-100 ">
                                {this.props.temporaryText.map((value, index) => (
                                    <TemporaryTextItem key={value} value={value} handleClick={() => this.props.deleteTemporaryText(index)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-3">
                    <button className="btn btn-secondary activity_btn" onClick={this.props.saveTemporaryText}>儲存</button>
                    <button className="btn btn-light activity_btn" onClick={this.props.hideTemporaryTextBar}>取消</button>
                </div>
            </>
        )
    }
}
