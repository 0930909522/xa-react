import React, { Component } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaBell, FaUser } from 'react-icons/fa';
import AlertMsg from './share/AlertMsg';
import { logout } from './share/ajax';

class Header extends Component {
  state = {
    showAlertMsg: false,
    websites: [],
    viewIndex: ''
  };
  componentDidMount() {
    const getWebsites = JSON.parse(localStorage.getItem('website'));
    const currentView = localStorage.getItem('view');
    // 設定websites
    this.setState({'websites': getWebsites});
    //設定viewIndex
    getWebsites.forEach((val, index) => {
      if (val.websiteId === currentView) {
        this.setState({'viewIndex': index});
      }
    });

  }
  logout = () => {
    if (localStorage.getItem('name')) {
      this.setState({ showAlertMsg: true });
      localStorage.removeItem('name');
      localStorage.removeItem('view');
      localStorage.removeItem('visited');
      localStorage.removeItem('website');

      logout();
      setTimeout(() => {
        this.setState({ showAlertMsg: false });
        window.location.href = '/signup/signin';
      }, 4000);
    } else {
      window.location.href = '/signup/signin';
    }
  }
  switchWebsite = (index) => {
    localStorage.setItem('view', this.state.websites[index].websiteId);
    this.setState({'viewIndex': index});
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
              <Nav.Link href="#home">回首頁</Nav.Link>
              <Nav.Link href="/" className={cIndex === 1 ? "active" : ""}>數據分析</Nav.Link>
              <Nav.Link href="/board" className={cIndex === 2 ? "active" : ""}>推播管理</Nav.Link>
              <Nav.Link href="/report/push" className={cIndex === 3 ? "active" : ""}>帳務報表</Nav.Link>
              <Nav.Link href="#buy" className={cIndex === 4 ? "active" : ""}>功能購買</Nav.Link>
            </Nav>
            <Nav.Link href=""><FaBell className="header_svg" /></Nav.Link>
            <div className="person_btn">
              <div ref={(e) => this.person_sign = e} className="btn_like"><FaUser className="header_svg" />
              </div>
              {/* <ul className="person_sign">
                <li>{localStorage.getItem('name') || '訪客'}</li>
                <li><Nav.Link href="/memberCentre/edit">進入會員中心</Nav.Link></li>
                <li><Nav.Link href="/memberCentre/website">編輯網站資訊</Nav.Link></li>
                <li className="btn_like" onClick={this.logout}>{localStorage.getItem('name') ? '登出' : '登入'}</li>
              </ul> */}
              <div className="person_sign">
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
                <ul className="project_list icon">
                  <li><Nav.Link href="/memberCentre/edit">進入會員中心</Nav.Link></li>
                </ul>
                <ul className="project_list icon">
                  <li onClick={this.logout}>{localStorage.getItem('name') ? '登出' : '登入'}</li>
                </ul>
              </div>
            </div>
            <Nav.Link>{localStorage.getItem('name') || '訪客'}</Nav.Link>
            {/* <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-primary">Search</Button>
            </Form> */}
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;