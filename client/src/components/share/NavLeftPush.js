import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { FaTools } from 'react-icons/fa';
import {IoIosSettings} from 'react-icons/io';
import Icon from './Icon';

class NavLeft extends Component {
  state = {}
  render() {
    return (
      <div className="layout_left">
        <Icon />
        <ul className="nav_left">
          {/* <li className={this.props.one && 'selected_text'}> <FaCode /> <Link to="/trackingCode/setting" className="dec_none btn_like">安裝追蹤碼</Link></li> */}
          <li className={this.props.two && 'selected_text'}> <IoIosSettings /> <Link to="/push" className="dec_none btn_like">推出去</Link></li>
          <li className={this.props.three && 'selected_text'}> <FaTools /> <Link to="/board" className="dec_none btn_like">放進來</Link></li>
        </ul>
      </div>
    );
  }
}

export default NavLeft;