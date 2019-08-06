import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
          <li> <FaCode /> <Link to="/portrait">安裝追蹤碼</Link></li>
          <li> <IoIosSettings /> <Link to="/asset_rise">推播設定</Link></li>
          <li> <FaTools /> <Link to="/asset_rise">推播安裝</Link></li>
        </ul>
      </div>
    );
  }
}

export default NavLeft;