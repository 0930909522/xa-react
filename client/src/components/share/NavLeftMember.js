import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { FaLock, FaCreditCard } from 'react-icons/fa';
import {IoMdPerson} from 'react-icons/io';

class NavLeftMember extends Component {
  state = {}
  render() {
    return (
      <div className="layout_left">
        <div className="box_logo">
          <div className="logo" style={{backgroundImage: "url('/logo.png')"}}></div>
        </div>
        <h2><span style={{fontSize:"20px"}}>今周刊</span> 數據分析 </h2>
        <ul className="nav_left">
          <li className={(this.props.one)?'selected_text':'text-dark'}> <IoMdPerson /> <Link to="/memberCentre/edit" className="dec_none btn_like">編輯使用者資訊</Link></li>
          <li className={(this.props.two)?'selected_text':'text-dark'}> <FaLock /> <Link to="/memberCentre/loginAndSecure" className="dec_none btn_like">登入與帳號安全</Link></li>
          <li className={(this.props.three)?'selected_text':'text-dark'}> <FaCreditCard /> <Link to="/memberCentre/billing/two" className="dec_none btn_like">帳單與儲值</Link></li>
        </ul>
      </div>
    );
  }
}

export default NavLeftMember;