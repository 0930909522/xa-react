import React, { Component } from 'react';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { IoIosPeople } from 'react-icons/io';

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
          <li> <IoIosPeople /> <a href="#">訪客總覽</a></li>
          <li> <IoIosPeople /> <a href="#">流量來源</a></li>
          <li> <IoIosPeople /> <a href="#">熱門頁面</a></li>
          <li> <IoIosPeople /> <a href="#">互動指標</a></li>
          <li> <IoIosPeople /> <a href="#">用戶畫像</a></li>
          <li> <IoIosPeople /> <a href="#">用戶分群</a></li>
          <li> <IoIosPeople /> <a href="#">資產價值</a></li>
        </ul>
      </div>
    );
  }
}

export default NavLeft;