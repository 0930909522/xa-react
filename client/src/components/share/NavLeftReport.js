import React, { Component } from 'react';
import {Link } from 'react-router-dom';
// import { FaTools } from 'react-icons/fa';
import {FaNewspaper, FaRegMoneyBillAlt} from "react-icons/fa";
import Icon from './Icon';

class NavLeftReport extends Component {
  state = {}
  render() {
    return (
      <div className="layout_left">
        <Icon />
        <ul className="nav_left">
          <li className={this.props.one && 'selected_text'}> <FaNewspaper /> <Link to="/report/push" className="dec_none btn_like">我的推播</Link></li>
          <li className={this.props.two && 'selected_text'}> <FaRegMoneyBillAlt /> <Link to="/report/income" className="dec_none btn_like">我的收益</Link></li>
        </ul>
      </div>
    );
  }
}

export default NavLeftReport;