import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftPush from "../share/NavLeftPush";
import PushTitle from "./share/PushTitle";
import Switch from './share/Switch';
import PushList from './PushList';
import PushList2 from './PushList2';
import { FaRegCalendar, FaRegNewspaper, FaRegThumbsUp } from "react-icons/fa";

class Push extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openList1: false,
      openList2: false,
      title: ''
    }
  }
  chooseType = type => {
    let newTitle = '';
    newTitle += '<strong className="font_20 btn_like"> / ' + type + '</strong>';
    if(type === '主題活動' || type === '專題報導'){
      this.setState({openList1: true})
    }else{
      this.setState({openList2: true})
    }
    this.setState({ title: newTitle});
  }

  closeList = () => {
    this.setState({ openList1: false, openList2: false, title: '' });
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
                <h2><span className="btn_like" onClick={this.closeList}>推出去</span><span dangerouslySetInnerHTML={{ __html: this.state.title }}></span></h2>
                <PushTitle one />
                <div className={this.state.openList1 || this.state.openList2  ? 'd-none' : ''}>
                  <div className="box radius10">
                    <div className="mb-3">
                      <span className="vertical_middle d-inline-block font_20 weight600">全自動推播</span>
                      <span className="vertical_middle d-inline-block ml-3"><Switch /></span>
                    </div>
                    <p>您可以選擇全自動推播，系統將自動串連您的推播工具，追蹤用戶閱讀習慣，自動推播於點擊率最高的渠道。</p>
                  </div>

                  <div className="box radius10">
                    <h4 className="my-3">選擇推播類別</h4>
                    <div></div>
                    <button className="btn_outline w-45 m-2" onClick={() => this.chooseType('主題活動')}><FaRegCalendar />&nbsp;主題活動</button>
                    <button className="btn_outline w-45 m-2" onClick={() => this.chooseType('專題報導')}><FaRegNewspaper />&nbsp;專題報導</button>
                    <button className="btn_outline w-45 m-2" onClick={() => this.chooseType('推薦商品')}><FaRegThumbsUp />&nbsp;推薦商品</button>
                    <button className="btn_outline w-45 m-2" onClick={() => this.chooseType('推薦文章')}><FaRegThumbsUp />&nbsp;推薦文章</button>
                  </div>
                </div>
                {this.state.openList1 && <PushList type={this.state.title} />}
                {this.state.openList2 && <PushList2 type={this.state.title} />}
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
