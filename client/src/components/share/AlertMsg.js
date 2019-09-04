import React, { Component } from 'react';

export default class AlertMsg extends Component {
    closeBtn = () =>{
        this.props.close();
    }
    render() {
        return (
            <div className={'alertMsg '+this.props.attr}>
                <div className="content">
                    <h5 className="text-right"><button className="close_btn" onClick={this.closeBtn}>&#10006;</button></h5>
                    <p>{this.props.text}</p>
                </div>
            </div>
        )
    }
}
