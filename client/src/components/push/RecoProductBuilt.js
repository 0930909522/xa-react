import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import NavLeftPush from "./share/NavLeftPush";
import PushTitle from "./share/PushTitle";
import TableBuilt2 from './share/TableBuilt2';

class RecoProductBuilt extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush />
                            <div className="main_right">
                                <h2>推播設定<span style={{ fontSize: '20px' }}>&nbsp;/ 特定頁面推播 / 推薦商品</span></h2>
                                <PushTitle one />
                                <TableBuilt2 />
                            </div>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
}

export default RecoProductBuilt;
