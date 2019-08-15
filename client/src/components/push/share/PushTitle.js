import React, { Component } from 'react';

class PushTitle extends Component {
    render() {

        return (
            <>
                <div className="box radius10">
                    <span className={this.props.one&&'selected_text'}>特定頁面推播</span>
                    <span>&nbsp;｜&nbsp;</span>
                    <span className={this.props.one?'':'selected_text'}>設定黑名單</span>
                </div>
            </>
        )
    }
}
export default PushTitle;
