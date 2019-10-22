import React, { Component } from 'react';

export default class AlertMsg extends Component {
    closeBtn = () =>{
        this.props.close();
    }
    action = () =>{
        this.props.action();
    }
    render() {
        return (
            <div className={'alertMsg '+this.props.attr}>
                <div className="content">
                    <div style={{margin: "30px 0 "}}>
                        <p>{this.props.text}</p>
                    </div>
                    <button onClick={this.action} className="btn btn-primary">確定</button>
                    <button onClick={this.closeBtn} className="btn">取消</button>
                </div>
            </div>
    
        )
    }
}