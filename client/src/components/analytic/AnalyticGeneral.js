import React, { Component } from 'react';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';


class AnalyticGroup extends Component {
    state = {  }
    render() { 
        return ( <>
        <Header />
            <div className="layout_main">
                <Container className="main_analytic">
                    <Row>
                        <NavLeft />
                        <div className="main_right">
                            <h2>訪客總覽</h2>
                            <div className="box">

                                {/* 資料放這邊 */}

                            </div>
                        </div>
                    </Row>
                </Container>
            </div>
            <Footer />
        
        </> );
    }
}
 
export default AnalyticGroup;