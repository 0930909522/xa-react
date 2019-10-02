import React from 'react';
import {Link} from 'react-router-dom';

const MemberCentreTitle = props => {
    return (
        <div className="box radius10 px-5 d-flex justify-content-around">
            <span><Link to="/memberCentre/billing/two" className={(props.num === 'two' ? 'selected_text': 'text-dark') + " btn_like dec_none"}>總覽</Link></span>
            <span>&nbsp;｜&nbsp;</span>
            <span><Link to="/memberCentre/service" className={(props.one ? 'selected_text': 'text-dark') + " btn_like dec_none"}>數據服務與用量</Link></span>
            <span>&nbsp;｜&nbsp;</span>
            <span><Link to="/memberCentre/billing/three" className={(props.num === 'three' ? 'selected_text': 'text-dark') + " btn_like dec_none"}>數據服務儲值</Link></span>
            <span>&nbsp;｜&nbsp;</span>
            <span><Link to="/memberCentre/billing/four" className={(props.num === 'four' ? 'selected_text': 'text-dark') + " btn_like dec_none"}>推播服務儲值</Link></span>
        </div>
    )
}
export default MemberCentreTitle;