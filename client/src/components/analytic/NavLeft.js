import React, { Component } from 'react';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { IoIosPeople , IoMdContact, IoMdContacts} from 'react-icons/io';
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
          <li> <IoMdContact /> <Link to="/portrait">用戶畫像</Link></li>
          <li> <GoRuby /> <Link to="/asset_rise">資產價值</Link></li>
          <li> <GoDesktopDownload /> <Link to="/source">流量來源</Link></li>
          <li> <GoBookmark /> <Link to="/hot">熱門頁面</Link></li>
          <li> <IoMdContacts /> <Link to="/group">用戶分群</Link></li>
          <li> <FaHandshake /> <Link to="/interaction">互動指標</Link></li>
        </ul>
      </div>
    );
  }
}

export default NavLeft;