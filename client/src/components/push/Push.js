import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftPush from "../share/NavLeftPush";
import PushTitle from "./share/PushTitle";
import Switch from './share/Switch';
import ActivityBuilt from './ActivityBuilt';
import { FaRegCalendar, FaRegNewspaper, FaHandPointUp, FaFireAlt, FaRegThumbsUp } from "react-icons/fa";

class Push extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openList: false,
      title: ''
    }
  }
  chooseType = type => {
    let newTitle = null;
    if (type === '主題活動' || type === '專題報導') {
      newTitle = '<span> / 特定推播</span>';
    }
    newTitle += '<strong className="font_20 btn_like"> / ' + type + '</strong>';
    this.setState({ title: newTitle, openList: true });
  }
  
  closeList = () => {
    this.setState({ openList: false });
  }
  render() {
    return (
      <>
        <Header />
        <div className="layout_main">
          <Container className="main_analytic">
            <Row>
              <NavLeftPush two />
              <div className="main_right">
                <h2><span className="btn_like" onClick={this.closeList}>推播設定</span><span dangerouslySetInnerHTML={{ __html: this.state.title }}></span></h2>
                <PushTitle one />
                <div className={this.state.openList === true ? 'd-none' : ''}>
                  <div className="box radius10">
                    <div className="mb-3">
                      <span className="vertical_middle d-inline-block font_20 weight600">全自動推播</span>
                      <span className="vertical_middle d-inline-block ml-3"><Switch /></span>
                    </div>
                    <p>您可以選擇全自動推播，系統將自動串連您的推播工具，追蹤用戶閱讀習慣，自動推播於點擊率最高的渠道。</p>
                  </div>

                  <div className="box radius10">
                    <h4 className="my-3">選擇推播類別</h4>
                    <table className="table_spec w-100 text-center" cellPadding="15">
                      <thead>
                        <tr>
                          <th>目標推播</th>
                          <th>商品推播</th>
                          <th>文章推播</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><button className="btn_outline w-75" onClick={() => this.chooseType('主題活動')}><FaRegCalendar />&nbsp;主題活動</button></td>
                          <td><button className="btn_outline w-75"><FaHandPointUp />&nbsp;選擇電商平台</button></td>
                          <td><button className="btn_outline w-75"><FaHandPointUp />&nbsp;選擇媒體平台</button></td>
                        </tr>
                        <tr>
                          <td><button className="btn_outline w-75" onClick={() => this.chooseType('專題報導')}><FaRegNewspaper />&nbsp;專題報導</button></td>
                          <td><button className="btn_outline w-75"><FaRegThumbsUp />&nbsp;推薦商品</button></td>
                          <td><button className="btn_outline w-75"><FaRegThumbsUp />&nbsp;推薦文章</button></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td><button className="btn_outline w-75"><FaFireAlt />&nbsp;熱門商品</button></td>
                          <td><button className="btn_outline w-75"><FaFireAlt />&nbsp;熱門文章</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <ActivityBuilt toOpenList={this.state.openList} />
              </div>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
export default Push;
