import React from 'react';
const PushTitle = props => {
    return (
        <div className="box radius10">
            <span className={props.one && 'selected_text'}>特定頁面推播</span>
            <span>&nbsp;｜&nbsp;</span>
            <span className={props.two && 'selected_text'}>設定黑名單</span>
            <span>&nbsp;｜&nbsp;</span>
            <span className={props.three && 'selected_text'}>安裝教學</span>
        </div>
    )
}
export default PushTitle;