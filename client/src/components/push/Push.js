import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftPush from "../share/NavLeftPush";
import PushTitle from "./share/PushTitle";
import Switch from './share/Switch';
import PushList from './PushList';
// import PushList2 from './PushList2';
import { pushStatus, modifyPushStatus, getPush } from '../share/ajax';
// import { FaRegCalendar, FaRegNewspaper, FaRegThumbsUp } from "react-icons/fa";
import { htmlInstallTrack } from '../share/checkPermission';
import { Redirect } from 'react-router';

const thisLevel = 1; //設定本頁權限 1-4

class Push extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openList1: false,
      // openList2: false,
      hasData: [false, false], //專題報導和主題活動是否有檔案
      title: '',
      ajaxSleep: false,
      data: {
        "pushingReport": false,
        "pushingTheme": false,
        "pushingEcommerce": false,
        "pushingMedia": false
      }
    }
  }

  componentDidMount = async () => {
    let newHasData = [...this.state.hasData];
    let newData = {};
    // pushingReport、pushingTheme是否可改
    let postData1 = {
      view: localStorage.getItem('view'),
      type: 'report'
    }
    let postData2 = {
      view: localStorage.getItem('view'),
      type: 'theme'
    }

    //初始化狀態
    await pushStatus().then(res => {
      newData = res;
      this.setState({ data: res });
    })

    //初始化是否可更改狀態
    await getPush(postData1).then(res => {
      if (res == 0) {
        newHasData[0] = false;
        if (newData.pushingReport) {
          // 改為關閉
          this.change('pushingReport');
        }
      } else {
        newHasData[0] = true;
      }
    })
    await getPush(postData2).then(res => {
      if (res == 0) {
        newHasData[1] = false;
        if (newData.pushingTheme) {
          // 改為關閉
          this.change('pushingTheme');
        }
      } else {
        newHasData[1] = true;
      }
    })
    this.setState({ hasData: newHasData });
  }

  chooseType = type => {
    let newTitle = '';
    newTitle += '<strong className="font_20 btn_like"> / ' + type + '</strong>';
    // if(type === '主題活動' || type === '專題報導'){
    // this.setState({openList1: true})
    // }else{
    //   this.setState({openList2: true})
    // }
    this.setState({ title: newTitle, openList1: true });
  }

  closeList = () => {
    this.setState({ openList1: false, openList2: false, title: '' });
  }

  //推出去執行完成後回到列表
  toList = (param) => {
    this.setState({ openList1: false }, () => {
      this.chooseType(param);
    })
  }

  //修改狀態+條件控制
  recommendChange = (name) => {
    if (name === 'pushingReport' && !this.state.hasData[0]) {
      // 如果專題報導無內容
      return;
    }
    if (name === 'pushingTheme' && !this.state.hasData[1]) {
      // 如果主題活動無內容
      return;
    }
    if (this.state.ajaxSleep) {
      //如果在休息狀態
      return;
    }
    this.change(name);
  }

  //修改狀態
  change = (name) => {
    let nameStatus = this.state.data[name];
    let postData = {
      view: localStorage.getItem('view'),
      type: name.charAt(7).toLowerCase(),
      usable: !nameStatus
    }
    // console.log(postData)
    modifyPushStatus(postData).then(res => {
      if (res === 1) {
        // 成功
        const newData = this.state.data;
        newData[name] = !newData[name];
        this.setState({ data: newData, ajaxSleep: true });
        setTimeout(() => {
          this.setState({ ajaxSleep: false });
          // 休息三秒方可繼續調整
        }, 3000);
      }
    })
  }

  render() {
    return (
      !this.props.permissionData.verified ?
        <Redirect to="/signup/signin" /> :
        <>
          <Header cateIndex={2} />
          <div className="layout_main">
            <Container className="main_analytic">
              <Row>
                <NavLeftPush two />
                <div className="main_right">
                  <h2><span className="btn_like" onClick={this.closeList}>推出去</span><span dangerouslySetInnerHTML={{ __html: this.state.title }}></span></h2>
                  {this.props.permissionData.level < thisLevel ? htmlInstallTrack(this.props.permissionData.level, thisLevel) :
                    <>
                      <PushTitle one />
                      <div className={this.state.openList1 || this.state.openList2 ? 'd-none' : ''}>
                        {/* <div className="box radius10">
                    <div className="mb-3">
                      <span className="vertical_middle d-inline-block font_20 weight600">全自動推播</span>
                      <span className="vertical_middle d-inline-block ml-3"><Switch /></span>
                    </div>
                    <p>您可以選擇全自動推播，系統將自動串連您的推播工具，追蹤用戶閱讀習慣，自動推播於點擊率最高的渠道。</p>
                  </div> */}

                        <div className="box radius10">
                          {/* <h4 className="my-3">選擇推播類別</h4>
                    <div className="my-2">
                      <button className="btn_outline w-45 m-2">
                        <FaRegCalendar />&nbsp;主題活動
                    </button>
                      <Switch changeStatus={() => this.recommendChange('pushingTheme')} value={this.state.data.pushingTheme} />
                    </div>
                    <div className="my-2">
                      <button className="btn_outline w-45 m-2">
                        <FaRegNewspaper />&nbsp;專題報導
                      </button>
                      <Switch changeStatus={() => this.recommendChange('pushingReport')} value={this.state.data.pushingReport} />
                    </div>
                    <button className="btn_outline w-45 m-2" onClick={() => this.chooseType('推薦商品')}><FaRegThumbsUp />&nbsp;推薦商品</button>
                    <div className="my-2">
                      <Switch changeStatus={() => this.recommendChange('pushingEcommerce')} value={this.state.data.pushingEcommerce} />
                      &nbsp;推薦商品
                    </div>
                    <div className="my-2">
                      <Switch changeStatus={() => this.recommendChange('pushingMedia')} value={this.state.data.pushingMedia} />
                      &nbsp;推薦文章
                    </div>
                    <button className="btn_outline w-45 m-2" onClick={() => this.chooseType('推薦文章')}><FaRegThumbsUp />&nbsp;推薦文章</button> */}
                          <table className="pushTable_r w-100  text-center" cellPadding="15">
                            <thead>
                              <tr>
                                <th>服務名</th>
                                <th>類別</th>
                                <th>開啟推播</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <span
                                    className="btn_like text-primary"
                                    onClick={() => this.chooseType('專題報導')}
                                  >專題報導
                          </span>
                                </td>
                                <td>手動推播</td>
                                <td>
                                  <Switch
                                    changeStatus={() => this.recommendChange('pushingReport')}
                                    value={this.state.data.pushingReport}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span
                                    className="btn_like text-primary"
                                    onClick={() => this.chooseType('主題活動')}
                                  >主題活動
                            </span>
                                </td>
                                <td>手動推播</td>
                                <td>
                                  <Switch
                                    changeStatus={() => this.recommendChange('pushingTheme')}
                                    value={this.state.data.pushingTheme}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>推薦商品</td>
                                <td>自動推播</td>
                                <td>
                                  <Switch
                                    changeStatus={() => this.recommendChange('pushingEcommerce')}
                                    value={this.state.data.pushingEcommerce}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>推薦文章</td>
                                <td>自動推播</td>
                                <td>
                                  <Switch
                                    changeStatus={() => this.recommendChange('pushingMedia')}
                                    value={this.state.data.pushingMedia}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {this.state.openList1 && <PushList type={this.state.title} goback={this.toList} />}
                      {/* {this.state.openList2 && <PushList2 type={this.state.title} />} */}
                    </>
                  }
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
