import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import NavLeftPush from "./share/NavLeftPush";
import PushTitle from "./share/PushTitle";
import Switch from './share/Switch';
import { FaRegCalendar, FaRegNewspaper, FaHandPointUp, FaFireAlt, FaRegThumbsUp } from "react-icons/fa";

class Push extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="layout_main">
          <Container className="main_analytic">
            <Row>
              <NavLeftPush />
              <div className="main_right">
                <h2>推播設定</h2>
                <PushTitle one />
                <h4 className="my-3">全自動推播</h4>
                <div className="box">
                  <Row>
                    <Col md={3} className="d-flex justify-content-center align-self-end">
                      <Switch />
                    </Col>
                    <Col md={9}>您可以選擇全自動推播，系統將自動串連您的推播工具，追蹤用戶閱讀習慣，自動推播於點擊率最高的渠道。</Col>
                  </Row>
                </div>
                <h4 className="my-3">選擇推播類別</h4>
                <div className="box">
                  <table className="pushTable w-100 text-center" cellPadding="15">
                    <thead>
                      <tr>
                        <th>目標推播</th>
                        <th>商品推播</th>
                        <th>文章推播</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><FaRegCalendar />&nbsp;主題活動</td>
                        <td><FaHandPointUp />&nbsp;選擇電商平台</td>
                        <td><FaHandPointUp />&nbsp;選擇媒體平台</td>
                      </tr>
                      <tr>
                        <td><FaRegNewspaper />&nbsp;專題報導</td>
                        <td><FaRegThumbsUp />&nbsp;推薦商品</td>
                        <td><FaRegThumbsUp />&nbsp;推薦文章</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td><FaFireAlt />&nbsp;熱門商品</td>
                        <td><FaFireAlt />&nbsp;熱門文章</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
export default Push;
