import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { FaLock, FaCreditCard, FaLaptop } from 'react-icons/fa';
import {IoMdPerson} from 'react-icons/io';
import Icon from './Icon';

class NavLeftMember extends Component {
  state = {}
  render() {
    return (
      <div className="layout_left">
        <Icon />
        <ul className="nav_left">
          <li className={(this.props.three)?'selected_text':'text-dark'}> <FaCreditCard /> <Link to="/memberCentre/billing/two" className="dec_none btn_like">帳單與儲值</Link></li>
          <li className={(this.props.one)?'selected_text':'text-dark'}> <IoMdPerson /> <Link to="/memberCentre/edit" className="dec_none btn_like">編輯使用者資訊</Link></li>
          <li className={(this.props.four)?'selected_text':'text-dark'}> <FaLaptop /> <Link to="/memberCentre/website" className="dec_none btn_like">編輯網站資訊</Link></li>
          <li className={(this.props.two)?'selected_text':'text-dark'}> <FaLock /> <Link to="/memberCentre/loginAndSecure" className="dec_none btn_like">登入與帳號安全</Link></li>
        </ul>
      </div>
    );
  }
}

export default NavLeftMember;