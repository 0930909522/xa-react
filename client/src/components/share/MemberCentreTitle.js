import React from 'react';

const MemberCentreTitle = props => {
    return (
        <div className="box">
            <span className={props.one && 'selected_text'}>服務與用量</span>
            <span>&nbsp;｜&nbsp;</span>
            <span className={props.two && 'selected_text'}>交易明細</span>
            <span>&nbsp;｜&nbsp;</span>
            <span className={props.three && 'selected_text'}>付款方式</span>
            <span>&nbsp;｜&nbsp;</span>
            <span className={props.four && 'selected_text'}>帳號設定</span>
        </div>
    )
}
export default MemberCentreTitle;