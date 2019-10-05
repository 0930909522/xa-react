import React, { Component } from 'react'

export default class Switch extends Component {
    render() {
        return (
            <>
                <label className="switch">
                    <input type="checkbox"
                        checked={this.props.value}
                        onChange={this.props.changeStatus}
                    />
                    <span className="slider round"></span>
                </label>
            </>
        )
    }
}
