import React, { Component } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaBell, FaUser } from 'react-icons/fa';

class Header extends Component {
  state = {}
  render() {
    return (
      <>
        <Navbar variant="dark" className="main_header">
          <Container>
            <Navbar.Brand href="#home">
              <img src="/logo.jpg" alt="pt" /> Xnet Analytics <span>     </span>
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">回首頁</Nav.Link>
              <Nav.Link href="#features">數據分析</Nav.Link>
              <Nav.Link href="/board">安裝設定</Nav.Link>
              <Nav.Link href="#report">帳務報表</Nav.Link>
              <Nav.Link href="#buy">功能購買</Nav.Link>
            </Nav>
            <Nav.Link href=""><FaBell className="header_svg" /></Nav.Link>
            <div className="person_btn">
              <div ref={(e) => this.person_sign = e} className="btn_like"><FaUser className="header_svg" />
              </div>
              <ul className="person_sign">
                <li>AAAA</li>
                <li><Nav.Link href="/memberCentre/edit">進入會員中心</Nav.Link></li>
                <li>登出</li>
              </ul>
            </div>

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