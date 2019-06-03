import React, { Component } from 'react';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';

class Header extends Component {
  state = {}
  render() {
    return (
        <Navbar variant="dark"  className="main_header">
          <Container>
            <Navbar.Brand href="#home">
              <img src="./logo.jpg" /> Xnet Analytics <span>     </span>
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">回首頁</Nav.Link>
              <Nav.Link href="#features">數據分析</Nav.Link>
              <Nav.Link href="#pricing">安裝設定</Nav.Link>
              <Nav.Link href="#pricing">帳務報表</Nav.Link>
              <Nav.Link href="#pricing">功能購買</Nav.Link>
            </Nav>
            <FaBell />
            {/* <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-primary">Search</Button>
            </Form> */}
          </Container>
        </Navbar>
    );
  }
}

export default Header;