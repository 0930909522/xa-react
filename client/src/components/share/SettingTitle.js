import React from 'react';

const SettingTitle = props => {
    return (
        <div className="box radius10 px-5 d-flex justify-content-around">
            <span className={props.one && 'selected_text'}>設定追蹤碼</span>
            <span>&nbsp;｜&nbsp;</span>
            <span className={props.two && 'selected_text'}>修改設定</span>
            <span>&nbsp;｜&nbsp;</span>
            <span className={props.three && 'selected_text'}>安裝追蹤碼</span>
            <span>&nbsp;｜&nbsp;</span>
            <span className={props.four && 'selected_text'}>測試安裝是否成功</span>
            <span>&nbsp;｜&nbsp;</span>
            <span className={props.five && 'selected_text'}>常見問題</span>
        </div>
    )
}
export default SettingTitle;
