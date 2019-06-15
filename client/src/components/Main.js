import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import NavLeft from './analytic/NavLeft'
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';


class Main extends Component {
    state = {}
    render() {
        return (
            <>
                <Header />
                {/* <div className="xs">
                    <MainAnalytic />
                </div> */}

                    <Container className="main_analytic">
                        <Row>
                            <NavLeft />
                            {/* <h2>主畫面</h2> */}
                        </Row>
                    </Container>

                <Footer />
            </>
        );
    }
}

export default Main;