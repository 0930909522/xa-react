import React from 'react';
import {Link} from 'react-router-dom';

const PushTitle = props => {
    return (
        <div className="box radius10">
            <span><Link to="/pushInstall" className={(props.one ? 'selected_text' : 'text-dark') + ' btn_like dec_none'}>特定頁面推播</Link></span>
            <span>&nbsp;｜&nbsp;</span>
            <span><Link to="/pushInstall/blacklist" className={(props.two ? 'selected_text' : 'text-dark') + ' btn_like dec_none'}>設定黑名單</Link></span>
            <span>&nbsp;｜&nbsp;</span>
            <span><Link to="/pushInstall/installationGuide" className={(props.three ? 'selected_text' : 'text-dark') + ' btn_like dec_none'}>安裝教學</Link></span>
        </div>
    )
}
export default PushTitle;