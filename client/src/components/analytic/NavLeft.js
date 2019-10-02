import React, { Component } from 'react';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { IoIosHappy, IoIosOptions, IoMdContact, IoIosCode, IoIosTime, IoMdPie, IoIosCheckmarkCircle, IoMdContacts} from 'react-icons/io';
import { GoRuby , GoDesktopDownload, GoBookmark} from 'react-icons/go';
import { FaHandshake } from 'react-icons/fa';

class NavLeft extends Component {
  state = {}
  render() {
    return (
      <div className="layout_left">
        <div className="box_logo">
          <div className="logo" style={{backgroundImage: "url('./logo.png')"}}></div>
        </div>
        <h2><span style={{fontSize:"20px"}}>食力</span> 數據分析 </h2>
        <ul className="nav_left">
          {/* <li> <FaFileAlt /> <Link to="/general">訪客總覽</Link></li> */}
          <li> <IoMdPie /> <Link to="/basis">基礎分析</Link></li>
          <li> <GoDesktopDownload /> <Link to="/reports">流量報表</Link></li>
          {/* <li> <GoDesktopDownload /> <Link to="/source">流量來源</Link></li> */}
          <li> <IoIosCheckmarkCircle /> <Link to="/check">網站健檢</Link></li>
          <li> <GoBookmark /> <Link to="/hot">熱門頁面</Link></li>
          <li> <GoRuby /> <Link to="/asset_rise">資產價值</Link></li>
          <li> <IoMdContact /> <Link to="/portrait">用戶畫像</Link></li>
          <li> <IoIosCode /> <Link to="/trackingCode/modify">安裝追蹤碼</Link></li>
          {/* <li> <IoIosHappy /> <Link to="/interest">興趣分群</Link></li>
          <li> <IoIosOptions /> <Link to="/group">功能分群</Link></li>
          <li style={{color: "#aaa"}}> <FaHandshake /> <Link to="/interaction" style={{color: "#aaa"}}>互動分群</Link></li> */}
        </ul>
      </div>
    );
  }
}

export default NavLeft;