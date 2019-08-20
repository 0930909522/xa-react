import React from 'react';
import {Link} from 'react-router-dom';

const SettingTitle = props => {
    return (
        <div className="box radius10 px-5 d-flex justify-content-around">
            <span><Link to="/trackingCode/setting" className={(props.one ? 'selected_text' : 'text-dark') + ' btn_like dec_none'}>設定追蹤碼</Link></span>
            <span>&nbsp;｜&nbsp;</span>
            <span><Link to="/trackingCode/modify" className={(props.two ? 'selected_text' : 'text-dark') + ' btn_like dec_none'}>修改設定</Link></span>
            <span>&nbsp;｜&nbsp;</span>
            <span><Link to="/trackingCode/install" className={(props.three ? 'selected_text' : 'text-dark') + ' btn_like dec_none'}>安裝追蹤碼</Link></span>
            <span>&nbsp;｜&nbsp;</span>
            <span><Link to="/trackingCode/check" className={(props.four ? 'selected_text' : 'text-dark') + ' btn_like dec_none'}>測試安裝是否成功</Link></span>
            <span>&nbsp;｜&nbsp;</span>
            <span><Link to="" className={(props.five ? 'selected_text' : 'text-dark') + ' btn_like dec_none'}>常見問題</Link></span>
        </div>
    )
}
export default SettingTitle;
