import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class PushTitle extends Component {
    render() {

        return (
            <>
                <div className="box radius10">
                    <span><Link to="/push" className={(this.props.one?'selected_text':'text-dark') + ' dec_none btn_like'}>推播設定</Link></span>
                    <span>&nbsp;｜&nbsp;</span>
                    <span><Link to="/push/blacklist" className={(this.props.two?'selected_text':'text-dark') + ' dec_none btn_like'}>設定黑名單</Link></span>
                </div>
            </>
        )
    }
}
export default PushTitle;
