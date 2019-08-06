import React, { Component } from 'react'

export default class Switch extends Component {
    render() {
        return (
            <>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label>
            </>
        )
    }
}
