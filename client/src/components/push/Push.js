import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from '../Footer';
import NavLeftPush from "../share/NavLeftPush";
import PushTitle from "./share/PushTitle";
import Switch from './share/Switch';
import PushList from './PushList';
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
    let newData = { ...this.state.data };
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
    await pushStatus()
      .then(res => {
        for (let i in res) {
          newData[i] = res[i];
        }
        this.setState({ data: newData });
      })

    //初始化是否可更改狀態
    await getPush(postData1)
      .then(res => {
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
      .catch(()=>{})
    await getPush(postData2)
      .then(res => {
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
      .catch(()=>{})
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
    this.setState({ openList1: false, title: '' });
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
                <NavLeftPush two close={this.closeList} />
                <div className="main_right">
                  <h2><span className="btn_like" onClick={this.closeList}>推播管理 / 推出去</span><span dangerouslySetInnerHTML={{ __html: this.state.title }}></span></h2>
                  {this.props.permissionData.level < thisLevel ? htmlInstallTrack(this.props.permissionData.level, thisLevel) :
                    document.querySelector('body').clientWidth < 768 ? <div className="box"> <p>本功能請使用電腦進行操作設定</p> </div>:
                    <>
                      <PushTitle one />
                      <div className={this.state.openList1 || this.state.openList2 ? 'd-none' : ''}>
                        <div className="box radius10">
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
                                <td>須先完成設定才可開啟</td>
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
                                <td>須先完成設定才可開啟</td>
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
