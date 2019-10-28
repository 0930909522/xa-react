import React, { Component } from 'react';
import { Container, Navbar} from 'react-bootstrap';

export default class Navpt extends Component {
    render() {
        return (
            <Navbar variant="dark" className="main_header">
                <Container>
                    <Navbar.Brand>
                        <img src="/logo.jpg" className="top_logo" alt="pt" /> Xnet Analytics
                        </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}
