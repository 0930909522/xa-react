import React from 'react';
import {Link} from 'react-router-dom';

const MemberCentreTitle = props => {
    return (
        <div className="box radius10 px-5 d-flex justify-content-around">
            <span><Link to="/memberCentre/service" className={(props.one ? 'selected_text': 'text-dark') + " btn_like dec_none"}>服務與用量</Link></span>
            <span>&nbsp;｜&nbsp;</span>
            <span><Link to="/memberCentre/billing/two" className={(props.num === 'two' ? 'selected_text': 'text-dark') + " btn_like dec_none"}>交易明細</Link></span>
            <span>&nbsp;｜&nbsp;</span>
            <span><Link to="/memberCentre/billing/three" className={(props.num === 'three' ? 'selected_text': 'text-dark') + " btn_like dec_none"}>付款方式</Link></span>
            <span>&nbsp;｜&nbsp;</span>
            <span><Link to="/memberCentre/billing/four" className={(props.num === 'four' ? 'selected_text': 'text-dark') + " btn_like dec_none"}>帳號設定</Link></span>
        </div>
    )
}
export default MemberCentreTitle;