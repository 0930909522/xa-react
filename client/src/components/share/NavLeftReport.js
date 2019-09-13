import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { FaTools } from 'react-icons/fa';
import {FaNewspaper, FaRegMoneyBillAlt} from "react-icons/fa";

class NavLeftReport extends Component {
  state = {}
  render() {
    return (
      <div className="layout_left">
        <div className="box_logo">
          <div className="logo" style={{backgroundImage: "url('/logo.png')"}}></div>
        </div>
        <h2><span style={{fontSize:"20px"}}>今周刊</span> 數據分析 </h2>
        <ul className="nav_left">
          <li className={this.props.one && 'selected_text'}> <FaNewspaper /> <Link to="/report/push" className="dec_none btn_like">我的推播</Link></li>
          <li className={this.props.two && 'selected_text'}> <FaRegMoneyBillAlt /> <Link to="/report/income" className="dec_none btn_like">我的收益</Link></li>
        </ul>
      </div>
    );
  }
}

export default NavLeftReport;