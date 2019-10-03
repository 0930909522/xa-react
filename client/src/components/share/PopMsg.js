import React, { Component } from 'react';

class PopMsg extends Component {
    render() {
        return (
            <div className={(!this.props.show ? 'd-none ': '') + 'w-100 bg_gray'}>
                <div className="box w-75 mx-auto bg-white my-5 radius10" style={{'paddingTop': '0'}}>
                    <h4 className="bg-warning py-3 px-4 text-white d-flex justify-content-between" style={{'margin': '0 -15px 10px'}}>
                        <span>{this.props.title}</span>
                        <button className="btn_noborder_r btn_like dec_none bg-secondary round text-white" onClick={this.props.close}>&#10006;</button>
                    </h4>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
{/* <PopMsg
    show={this.state.showPayData}
    title={(this.state.sent === false) ? '付款' : 'OK'}
    close={() => this.toggleClose('showPayData')}
></PopMsg> */}
export default PopMsg;