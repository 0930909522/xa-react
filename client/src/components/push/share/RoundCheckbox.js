import React, { Component } from 'react'

export default class RoundCheckox extends Component {
    render() {
        return (
            <>
                <div className="round_checkox d-inline-block vertical_middle mr-4">
                    <input type="checkbox" id={this.props.id} />
                    <label htmlFor={this.props.id}></label>
                </div>
            </>
        )
    }
}
