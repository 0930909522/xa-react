import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { FaCode, FaTools } from 'react-icons/fa';
import {IoIosSettings} from 'react-icons/io';

class NavLeft extends Component {
  state = {}
  render() {
    return (
      <div className="layout_left">
        <div className="box_logo">
          <div className="logo" style={{backgroundImage: "url('/logo.png')"}}></div>
        </div>
        <h2><span style={{fontSize:"20px"}}>今周刊</span> 數據分析 </h2>
        <ul className="nav_left">
          <li className={this.props.one && 'selected_text'}> <FaCode /> <Link to="/trackingCode/setting" className="dec_none btn_like">安裝追蹤碼</Link></li>
          <li className={this.props.two && 'selected_text'}> <IoIosSettings /> <Link to="/push" className="dec_none btn_like">推播設定</Link></li>
          <li className={this.props.three && 'selected_text'}> <FaTools /> <Link to="/board" className="dec_none btn_like">佈告欄設定</Link></li>
        </ul>
      </div>
    );
  }
}

export default NavLeft;