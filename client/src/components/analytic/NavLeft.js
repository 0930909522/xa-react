import React, { Component } from 'react';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { IoIosPeople , IoIosDocument, IoIosArchive} from 'react-icons/io';

class NavLeft extends Component {
  state = {}
  render() {
    return (
      <div className="layout_left">
        <div className="box_logo">
          <div className="logo"></div>
        </div>
        <h2><span style={{fontSize:"20px"}}>今周刊</span> 數據分析 </h2>
        <ul className="nav_left">
          <li> <IoIosDocument /> <Link to="/general">訪客總覽</Link></li>
          <li> <IoIosArchive /> <Link to="/source">流量來源</Link></li>
          <li> <IoIosPeople /> <Link to="/hot">熱門頁面</Link></li>
          <li> <IoIosPeople /> <Link to="/interaction">互動指標</Link></li>
          <li> <IoIosPeople /> <Link to="/asset_rise">資產價值</Link></li>
          <li> <IoIosPeople /> <Link to="/portrait">用戶畫像</Link></li>
          <li> <IoIosPeople /> <Link to="/group">用戶分群</Link></li>
        </ul>
      </div>
    );
  }
}

export default NavLeft;