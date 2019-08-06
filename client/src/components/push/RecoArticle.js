import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import NavLeftPush from "./share/NavLeftPush";
import PushTitle from "./share/PushTitle";
import Item3Col from './share/Item3Col';

class RecoArticle extends Component {
    render() {
        return (
            <>
              <Header />
                <div className="w-100 bg_gray">
                    <div className="box w-75 mx-auto bg-white my-5">
                        <h5 className="bg-secondary p-2 text-white">
                            系統偵測到這些文章很熱門，是否要加強推播？
                                <span style={{ fontSize: '15px' }}>(請勾選想要推播的商品，儲存發佈)</span>
                            <button className="float-right mr-2 btn_noborder_r text-white">X</button>
                        </h5>
                        <div className="p-2">
                            <ul className="cards">
                                <Item3Col id="1" topic="ETtoday" content="商品名稱商品名稱商品名稱商品名稱" />
                                <Item3Col id="2" topic="ETtoday" content="商品名稱商品名稱商品名稱商品名稱" />
                                <Item3Col id="3" topic="ETtoday" content="商品名稱商品名稱商品名稱商品名稱" />
                                <Item3Col id="4" topic="ETtoday" content="商品名稱商品名稱商品名稱商品名稱" />
                                <Item3Col id="5" topic="商業週刊" content="商品名稱商品名稱商品名稱商品名稱" />
                                <Item3Col id="6" topic="商業週刊" content="商品名稱商品名稱商品名稱商品名稱" />
                                <Item3Col id="7" topic="聯合報" content="商品名稱商品名稱商品名稱商品名稱" />
                                <Item3Col id="8" topic="商業週刊" content="商品名稱商品名稱商品名稱商品名稱" />
                                <Item3Col id="9" topic="商業週刊" content="商品名稱商品名稱商品名稱商品名稱" />
                            </ul>
                            <div className="text-center my-3">
                                <button className="btn btn-secondary">發佈</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Container className="main_analytic">
                    <Row>
                        <NavLeftPush />
                        <div className="main_right">
                            <h2>推播設定<span style={{ fontSize: '20px' }}>&nbsp;/ 特定頁面推播 / 推播文章</span></h2>
                            <PushTitle one />
                        </div>
                    </Row>
                </Container>  
            </>
        )
    }
}
export default RecoArticle;