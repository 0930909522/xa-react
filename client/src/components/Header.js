import React, { Component } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaBell, FaUser } from 'react-icons/fa';
import { IoMdSwap } from 'react-icons/io';
import AlertMsg from './share/AlertMsg';
import { logout } from './share/ajax';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Header extends Component {
  state = {
    showAlertMsg: false,
    websites: [],
    viewIndex: []
  };
  componentDidMount() {
    const getWebsites = JSON.parse(localStorage.getItem('website')) || [];
    const currentView = localStorage.getItem('view') || "";
    // 設定websites
    this.setState({ 'websites': getWebsites });
    //設定viewIndex
    getWebsites.forEach((val, index) => {
      if (val.websiteId === currentView) {
        this.setState({ 'viewIndex': index });
      }
    });

  }
  logout = () => {
    // if (localStorage.getItem('name')) {
      this.setState({ showAlertMsg: true });
      localStorage.removeItem('name');
      localStorage.removeItem('view');
      localStorage.removeItem('visited');
      localStorage.removeItem('website');
      localStorage.removeItem('permission');

      logout();
      setTimeout(() => {
        this.setState({ showAlertMsg: false });
        // window.location.href = '/signup/signin';
      }, 4000);
    // } else {
    //   window.location.href = '/signup/signin';
    // }
  }
  switchWebsite = (index) => {
    localStorage.setItem('view', this.state.websites[index].websiteId);
    this.setState({ 'viewIndex': index });
    window.location.reload();
  }

  render() {
    const cIndex = this.props.cateIndex;
    return (
      <>
        <AlertMsg
          text="登出成功..."
          attr={this.state.showAlertMsg ? 'opacity1' : 'opacity0'}
          close={() => this.setState({ showAlertMsg: false })}
        />
        <Navbar variant="dark" className="main_header">
          <Container>
            <Navbar.Brand href="#home">
              <img src="/logo.jpg" alt="pt" /> Xnet Analytics <span>     </span>
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Link to="/" className="nav-link">回首頁</Link>
              <Link to="/" className={cIndex === 1 ? "nav-link active" : "nav-link"}>數據分析</Link>
              <Link to="/board" className={cIndex === 2 ? "nav-link active" : "nav-link"}>推播管理</Link>
              <Link to="/report/push" className={cIndex === 3 ? "nav-link active" : "nav-link"}>帳務報表</Link>
              <Link to="/memberCentre/billing/:type" className={cIndex === 4 ? "nav-link active" : "nav-link"}>會員專區</Link>
            </Nav>

            <div className="person_btn">
              <div className="btn_like"><IoMdSwap title="切換平台" className="header_svg" />
              </div>
              <div className="person_sign">
                <small>選擇分析平台</small>
                <ul className="project_list">
                  {
                    this.state.websites.map((val, index) => (
                      <li
                        key={index}
                        onClick={() => this.switchWebsite(index)}
                        id={this.state.viewIndex === index ? 'focus' : ''}
                      >{val.siteName}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className="person_btn">
              <div className="btn_like"><FaUser className="header_svg" />
              </div>
              <div className="person_sign">
                <ul className="project_list">
                  <li id="name">{`${localStorage.getItem('name') || '訪客'}，您好`}</li>
                  <li><Link to="/memberCentre/billing/two" className="nav-link">進入會員中心</Link></li>
                  {/* <li onClick={this.logout}>{localStorage.getItem('name') ? '登出' : '登入'}</li> */}
                  <li><Link onClick={this.logout} to="/signup/signin" className="nav-link">{localStorage.getItem('name') ? '登出' : '登入'}</Link></li>
                </ul>
              </div>
            </div>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;