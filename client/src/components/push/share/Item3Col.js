import React, { Component } from 'react';
import RoundCheckbox from './RoundCheckbox';
import Pt from '../../../images/menu.png';

export default class Item3Col extends Component {
    render() {
        return (
            <>
                <li className="box card-item-3">
                    <RoundCheckbox id={this.props.id} />
                    <span>{this.props.topic}</span>
                    <div className="text-center mt-2">
                        <img src={Pt} alt="page" />
                    </div>
                    <h6 className="mt-3">{this.props.content}</h6>
                </li>
            </>
        )
    }
}
