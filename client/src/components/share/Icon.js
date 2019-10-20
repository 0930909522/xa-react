import React, { Component } from 'react';
import { getUserInfo } from '../share/ajax';

class Icon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usePlaform: true, //非帳戶報表、會員專區 (by 平台)則 true
            name: '',
        }
    }
    componentDidMount() {
        if (~window.location.pathname.indexOf('memberCentre') || ~window.location.pathname.indexOf('report')) { //帳戶報表 or 會員專區
            this.setState({ usePlaform: false }, () => {
                getUserInfo()
                    .then(res => {
                        return res.companyName;
                    })
                    .then(res => {
                        // by公司
                        this.setState({ name: res })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        } else {
            // by 平台
            this.setState({ name: localStorage.getItem('viewName') })
        }

    }
    componentDidUpdate(preProp, preState) {
        if (preState.usePlaform && (~window.location.pathname.indexOf('memberCentre') || ~window.location.pathname.indexOf('report'))) {
            // 轉到帳戶報表、會員專區
            this.setState({ usePlaform: false }, () => {
                getUserInfo()
                    .then(res => {
                        return res.companyName;
                    })
                    .then(res => {
                        // by公司
                        this.setState({ name: res })
                    })
                    .catch(() => {})
            })
        }
        if (!preState.usePlaform && !~window.location.pathname.indexOf('memberCentre') && !~window.location.pathname.indexOf('report')) {
            // 轉至非帳戶報表、會員專區
            this.setState({
                usePlaform: true,
                name: localStorage.getItem('viewName')
            })
        }
    }
    render() {
        return (
            <>
                <div className="box_logo">
                    <h1 className="logo bg-dark text-white member_icon">
                        {this.state.name.length > 0 && this.state.name.slice(0, 1)}
                    </h1>
                </div>
                <h2><span className="icon_name">{this.state.name}</span></h2>
            </>
        )
    }
}

export default Icon;
