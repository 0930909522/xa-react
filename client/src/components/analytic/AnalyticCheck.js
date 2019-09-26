import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Nav, Navbar, Form, FormControl, Button, OverlayTrigger, Table } from 'react-bootstrap';
import BSTooltip from 'react-bootstrap/Tooltip';
import { FaBell } from 'react-icons/fa';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import asyncComponent from './AsyncComponent';
import { pieOption, barOption, lineOption, scatterOption, mapOption, radarOption, candlestickOption } from './optionConfig/options';
import { IoMdDesktop, IoMdToday, IoIosCalculator, IoIosPhonePortrait, IoMdSearch, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const PieReact = asyncComponent(() => import('./EchartsDemo/PieReact'));
const LineReact = asyncComponent(() => import('./EchartsDemo/LineReact'));
const GaugeReact = asyncComponent(() => import('./EchartsDemo/GaugeReact'));

class AnalyticCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenDesktop: true,
      isOpenMobile: true,
      isOpenTop: false,
      realtime: "",
      scoreSeo: "",
      scoreDesktop: "",
      scoreMobile: "",
      scoreAll: "",
      scoreDetailInfo: "",
      colorMap: "",
      htmlDetailTitle: "",
      interval: "",
    }
  }
  componentDidMount() {
    this.getData('foodnext', 'healthExam');
    this.getColor();
  }

  totalScore = (health, seo, mobile, flow, scale) => {
    let all, itself, f;
    let scaleNum = scale.split('-');
    let max = scaleNum[1] + 1;
    let min = scaleNum[0];
    flow.map(function (current) {
      if (current.name === 'itself') {
        all = current.data;
      };
      if (current.name === 'ALL') {
        itself = current.data;
      }
    })
    itself = itself.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    })
    all = all.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    })
    f = Math.round((itself - min) / (max - min) * 100) / 2;
    // itself - 規模下線/ 歸模兼具 * 100 )round / 2
    // f = (itself / 7 > all / 7) ? 100 : (itself / 7) / (all / 7) * 100;
    return Math.round(health + seo + mobile + f);
  }

  checkColor = (item) => {
    let result = this.state.colorMap.filter((item1) => {
      return item1.errors === item
    })
    return result[0] ? "text_" + result[0].color : "";

  }



  setHealth = (val) => {
    console.log(val);
    let option = {

      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: this.healthData(val.flowEvaluation, 1)
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.countDate(val._id)
      },
      yAxis: {
        type: 'value'
      },
      series: this.healthData(val.flowEvaluation, 2)
    }
    //console.log(this.countDate(val._id));

    let totalScore = this.totalScore(
      val.desktop.score / 6,
      val.SEO.score / 6,
      val.mobile.score / 6,
      val.flowEvaluation,
      val.scale
    )

    this.setState({
      totalScore: totalScore,
      scoreSeo: val.SEO,
      scoreDesktop: val.desktop,
      scoreMobile: val.mobile,
      scoreAll: val.mobile,
      scale: val.scale,
      interval: val._id,
      industry: val.industry,
      option: option,
    });
  }

  healthData = (val, type) => {
    let data = [];
    if (type === 1) {
      val.map(item => {
        item.name === "itself" ?
          data.push(item.name) :
          data.push(item.name + "(" + item.comparision + "個參考網站)")
      });
    }
    if (type === 2) {
      val.map(item => {
        let temp = {
          name: item.name === "itself" ? item.name : item.name + "(" + item.comparision + "個參考網站)",
          type: 'line',
          data: item.data
        };
        data.push(temp)
      });
    }
    //console.log("data", data)
    return data
  }

  //計算每周日期
  countDate = (duration) => {
    let firstDay = new Date(duration.split('~')[0]); //第一天的時間戳
    let allDays = [];
    let oneDay = 24 * 3600 * 1000;
    let nextWeek = firstDay * 1 + 7 * 24 * 3600 * 1000;
    for (let ms = firstDay * 1, last = nextWeek * 1; ms < last; ms += oneDay) {
      let cur = new Date(ms);
      allDays.push(cur.getFullYear() + '-' + ('0' + (cur.getMonth() + 1)).slice(-2) + '-' + ('0' + cur.getDate()).slice(-2));
    }
    return allDays;
  }

  getData = (view_project, type) => {
    let postData = JSON.stringify({ view_project: view_project });
    let postOption = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: postData
    };
    fetch('http://localhost/xa/' + type, postOption)
      // fetch('https://node.aiday.org/xa/' + type, postOption)
      .then(response => {
        return response.json();
      })
      .then(response => {
        type === "healthExam" ? this.setHealth(response) : console.log();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getColor = () => {
    fetch('http://localhost:3000/datas/tagColor.json')
      // fetch('https://node.aiday.org/xa/' + type, postOption)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ colorMap: response })
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  loadDetail = val => {
    this.setState({ detail: this.renderHTML(val) });
    this.openDetail();
  }
  openDetail() {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  }
  openDesktop() {
    this.setState(prev => ({ isOpenDesktop: !prev.isOpenDesktop }));
  }
  openMobile() {
    this.setState(prev => ({ isOpenMobile: !prev.isOpenMobile }));
  }
  openTop() {
    this.setState(prev => ({ isOpenTop: true }));
  }
  closeTop() {
    this.setState(prev => ({ isOpenTop: false }));
  }


  htmlDetail = () => {
    return <div className="mytable">
      <h3> {this.state.htmlDetailTitle} 評分詳情
        <span onClick={() => { this.closeTop() }} className="Collapse">
          <IoIosArrowUp />收合
        </span>
      </h3>

      {this.state.scoreDetailInfo[0].url ?
        <div style={{borderTop: "1px solid #dee2e6", paddingTop: "10px", textAlign: "center"}}>
          <p>
            <span style={{paddingRight: "15px"}}> 
            <span className="text_yellow">警告項目 {this.state.scoreSeo.warningCount} 個</span>
            </span>  
            <span className="text_red">錯誤項目 {this.state.scoreSeo.errorCount} 個</span> 
          </p>
        </div> : <></>}

      <Table>
        <thead>
          <tr>
            <th>項目</th>
            <th>表現</th>
          </tr>
        </thead>
        <tbody>
          {this.state.scoreDetailInfo ? this.state.scoreDetailInfo.map((item, index) => {
            return item.url ? <tr key={index}>
              <td>{item.title}</td>
              <td className="ss">{item.errors.map((item1, index1) => {
                // return <span key={index1} className="text_red">
                return <span key={index1} className={this.checkColor(item1)}>
                  {item1} <br />
                </span>
              })}</td>
            </tr> :
              <tr key={index}>
                <td>{item.item}</td>
                <td>{item.performance}</td>
              </tr>
          }) : <></>}
        </tbody>
      </Table>
    </div>
  }

  scoreDetail = (type) => {
    let title = "";
    let info = "";
    switch (type) {
      case 1:
        title = "電腦";
        info = this.state.scoreDesktop.targetTable;
        break;
      case 2:
        title = "手機";
        info = this.state.scoreMobile.targetTable;
        break;
      case 3:
        title = "SEO";
        info = this.state.scoreSeo.diagnosticsTable;
        console.log(this.state.scoreSeo);
        break;
    }
    this.setState({
      htmlDetailTitle: title,
      scoreDetailInfo: info
    });
    this.openTop();
  }

  render() {
    const { totalScore, option, scale, detail, isOpenDesktop, isOpenTop, isOpenMobile, isOpen, isOpen1, industry, scoreDesktop, scoreMobile, scoreSeo, realtime, userType, userAgeBracket, pageviewCate, pageviewCity, pageviewHot, pageviewMedium, pageviewShare, pageviewSource, userBranding, userGender, userInterest, pageStayRate } = this.state;
    return (
      <>
        <Header cateIndex={1} />
        <div className="layout_main">

          {isOpen ?
            <div className="popup">
              <div className="popupBox">
                <div className="close" onClick={() => this.openDetail()}> x </div>
                <div className="tableDetail">
                  {detail}
                </div>

              </div>
            </div>
            : <></>}

          <Container className="main_analytic">
            <Row>
              <NavLeft />

              <div className="main_right">
                <h2>網站評測</h2>
                <div className="box">
                  <h3>網站體驗評分</h3>
                  <Row>
                    <div className="col-md-6 check" style={{ marginTop: "30px" }}>
                      <OverlayTrigger overlay={<BSTooltip>以電腦、行動裝置、SEO與流量等分數進行整體評測</BSTooltip>}>
                        <span className="d-inline-block cont" style={{ border: 0 }}>
                          <div className="icon">
                            <IoIosCalculator style={{ fontSize: "28px" }} />
                            <div className="active">網站總評分</div>
                          </div>
                          <div className="value">{totalScore} <span>分</span></div>
                        </span>
                      </OverlayTrigger>
                      {/* <div className="more">
                        <span >詳情</span>
                      </div> */}
                    </div>

                    <div className="col-md-2 check small">
                      <OverlayTrigger overlay={<BSTooltip>使用者於電腦瀏覽網站的體驗分數</BSTooltip>}>
                        <span className="d-inline-block cont">
                          <div className="icon">
                            <IoMdDesktop style={{ fontSize: "24px" }} />
                            <div className="active">電腦</div>
                          </div>
                          <div className="value">{scoreDesktop.score}
                            {/* <span>分</span> */}
                          </div>
                        </span>
                      </OverlayTrigger>
                      <div className="more">
                        <span onClick={() => this.scoreDetail(1)}>詳情</span>
                      </div>
                    </div>

                    <div className="col-md-2 check small">
                      <OverlayTrigger overlay={<BSTooltip>使用者於行動裝置瀏覽網站的體驗分數</BSTooltip>}>
                        <span className="d-inline-block cont">
                          <div className="icon">
                            <IoIosPhonePortrait style={{ fontSize: "24px" }} />
                            <div className="active">行動裝置</div>
                          </div>
                          <div className="value">{scoreMobile.score}
                            {/* <span>分</span> */}
                          </div>
                        </span>
                      </OverlayTrigger>
                      <div className="more">
                        <span onClick={() => this.scoreDetail(2)}>詳情</span>
                      </div>
                    </div>

                    <div className="col-md-2 check small">
                      <OverlayTrigger overlay={<BSTooltip>使用者於行動裝置瀏覽網站的體驗分數</BSTooltip>}>
                        <span className="d-inline-block cont">
                          <div className="icon">
                            <IoMdSearch style={{ fontSize: "24px" }} />
                            <div className="active">SEO</div>
                          </div>
                          <div className="value">{scoreSeo.score}
                            {/* <span>分</span> */}
                          </div>
                        </span>
                      </OverlayTrigger>
                      <div className="more">
                        <span onClick={() => this.scoreDetail(3)}>詳情</span>
                      </div>
                    </div>

                  </Row>

                  <div>
                    {/* <hr /> */}
                    <br />
                    {isOpenTop ? scoreDesktop ? this.htmlDetail() : "" : <></>}
                  </div>

                </div>


                <div className="box">
                  <h3>流量評測 </h3>
                  <div className="center">
                    產業類別: {industry}
                  </div>
                  <LineReact option={option} />
                  <div className="info" style={{ margin: "10px 20px 0 75px" }}>
                    按每日工作階段數劃分之大小：<span className="value"> {scale}</span>
                    <p>所有使用者與網站的造訪總次數。不論使用者停留時間長短與造訪網頁的數量多寡，凡閒置滿30分鐘或超過午夜(24:00)，該次造訪即結束</p>
                  </div>
                </div>
                <div className="box">
                  <h3><IoMdDesktop /> 電腦版改進建議
                    <span onClick={() => { this.openDesktop() }} className="Collapse">
                      {isOpenDesktop ? <span><IoIosArrowUp />收合</span> : <span><IoIosArrowDown />開啟</span>}
                    </span>
                  </h3>
                  <div className="toplist">
                    <ul>
                      <li><span></span> 最佳化建議</li>
                      <li><span></span> 診斷書</li>
                    </ul>
                  </div>
                  {isOpenDesktop ?
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th width="30%">項目</th>
                          <th>表現</th>
                          <th width="45%">建議</th>
                          <th width="120">瞭解更多</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scoreDesktop ? scoreDesktop.diagnosticsTable.map((item, index) => {
                          return <tr key={index}>
                            <td>{item.item}</td>
                            <td>{item.text}</td>
                            <td>{item.description}</td>
                            <td>
                              {item.extraTable ?
                                <Button className="red" onClick={() => this.loadDetail(item.extraTable)}>瞭解更多</Button> : <></>
                              }
                            </td>
                          </tr>
                        }) : console.log()}

                        {scoreDesktop ? scoreDesktop.passTable.map((item, index) => {
                          return <tr key={index}>
                            <td>{item.item}</td>
                            <td>{item.text}</td>
                            <td>{item.description}</td>
                            <td>
                              {item.extraTable ?
                                <Button className="blue" onClick={() => this.loadDetail(item.extraTable)}>瞭解更多</Button> : <></>
                              }
                            </td>
                          </tr>
                        }) : console.log()}
                      </tbody>
                    </Table> : <></>}

                </div>

                <div className="box">
                  <h3><IoIosPhonePortrait /> 手機版改進建議
                    <span onClick={() => { this.openMobile() }} className="Collapse">
                      {isOpenMobile ? <span><IoIosArrowUp />收合</span> : <span><IoIosArrowDown />開啟</span>}
                    </span>
                  </h3>
                  <div className="toplist">
                    <ul>
                      <li><span></span> 最佳化建議</li>
                      <li><span></span> 診斷書</li>
                    </ul>
                  </div>
                  {isOpenMobile ?
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th width="30%">項目</th>
                          <th>表現</th>
                          <th width="45%">建議</th>
                          <th width="120">瞭解更多</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scoreMobile ? scoreMobile.diagnosticsTable.map((item, index) => {
                          return <tr key={index}>
                            <td>{item.item}</td>
                            <td>{item.text}</td>
                            <td>{item.description}</td>
                            <td>
                              {item.extraTable ?
                                <Button className="red" onClick={() => this.loadDetail(item.extraTable)}>瞭解更多</Button> : <></>
                              }
                            </td>
                          </tr>
                        }) : console.log()}

                        {scoreMobile ? scoreMobile.passTable.map((item, index) => {
                          return <tr key={index}>
                            <td>{item.item}</td>
                            <td>{item.text}</td>
                            <td>{item.description}</td>
                            <td>
                              {item.extraTable ?
                                <Button className="blue" onClick={() => this.loadDetail(item.extraTable)}>瞭解更多</Button> : <></>
                              }
                            </td>
                          </tr>
                        }) : console.log()}
                      </tbody>
                    </Table> : <></>}

                </div>

                <div className="box">
                  <h3><IoMdToday /> 改進建議書</h3>
                  <div style={{textAlign:"center"}}>
                    <button className="btn btn-success" onClick={ ()=>{
                      let dd = this.state.interval;
                      window.location.href="https://r.xnet.world/xa/foodnext/"+ dd +".xlsx"
                    }}> 下載報告</button>
                  </div>
                
                </div>

              </div>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
export default AnalyticCheck;