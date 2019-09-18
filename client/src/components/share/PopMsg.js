import React, { Component } from 'react';

class PopMsg extends Component {
    render() {
        return (
            <div className={(!this.props.show && 'd-none ') + 'w-100 bg_gray'}>
                <div className="box w-75 mx-auto bg-white my-5 radius10">
                    <h4 className="bg-warning py-3 pl-4 pr-2 text-white d-flex justify-content-between">
                        <span>{this.props.title}</span>
                        <button className="btn_noborder_r btn_like dec_none bg-secondary round text-white" onClick={this.props.close}>&#10006;</button>
                    </h4>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default PopMsg;