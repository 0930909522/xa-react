import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Nav, Navbar, Form, FormControl, Button, OverlayTrigger } from 'react-bootstrap';
import BSTooltip from 'react-bootstrap/Tooltip';
import { FaBell } from 'react-icons/fa';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import asyncComponent from './AsyncComponent';
import { pieOption, barOption, lineOption, scatterOption, mapOption, radarOption, candlestickOption } from './optionConfig/options';
import { IoMdPeople, IoMdEye, IoMdKey, IoMdDocument } from "react-icons/io";
import { Redirect } from 'react-router'
import { htmlInstallTrack } from '../share/checkPermission';

import Loading from '../../images/loading.svg';
import icon01 from '../../images/icon01.png';
import icon02 from '../../images/icon02.png';
import icon03 from '../../images/icon03.png';
import icon04 from '../../images/icon04.png';

const PieReact = asyncComponent(() => import('./EchartsDemo/PieReact'));
const GaugeReact = asyncComponent(() => import('./EchartsDemo/GaugeReact'));

const thisLevel = 1; //設定本頁權限 1-4

class AnalyticBasis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "foodnext",
      realtime: "",
      verified: false
    }
  }

  // getDerivedStateFromProps = async() => {
  //   this.setState({
  //     verified: checkPermissionVerified()
  //   })
  // }
  
  componentDidMount() {
    this.getData('realtime');
    this.getData('ga');
  }
  openPopup = () => {
    this.setState(prev => ({ isDetail: !prev.isDetail }));
  }

  setGA = (ga) => {
    Object.keys(ga).map(item => {
      if (item !== "pageStayRate" && item !== "_id") {
        let total = 0;
        ga[item].map(unit => {
          total += unit.value;
        });
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '65%',
              center: ['50%', '60%'],
              data: ga[item],
            }
          ],
          total: total
        }
        this.setState({ [item]: option });
      }
      if (item === "pageStayRate") {
        this.setState({
          pageStayRate: {
            tooltip: {
              trigger: 'item',
              formatter: "{b} : {c} ({d}%)"
            },
            series: [
              {
                name: '访问来源',
                type: 'gauge',
                data: [{
                  name: "停留率",
                  value: ga[item]
                }],
              }
            ],
          }
        });
      }
    });
  }

  getData = (type) => {
      axios.get('https://node.aiday.org/sbir/basic/' + type, {
        params: {
          view: this.state.view,
        }
      })
      .then(response => {
        //console.log(response);
        type === "realtime" ?
          this.setState({ realtime: response.data }) :
          this.setGA(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { realtime, userType, userAgeBracket, pageviewCate, pageviewCity, pageviewHot, pageviewMedium, pageviewShare, pageviewSource, userBranding, userGender, userInterest, pageStayRate } = this.state;
    const { name, level, verified } = this.props.permissionData;
    return (
      verified !== true ?
      <Redirect to="/signup/signin" /> :
      <>
        <Header cateIndex={1} />
        <div className="layout_main">
          <Container className="main_analytic">
            <Row>
              <NavLeft />
              <div className="main_right">
                <h2>基礎數據分析</h2>
                { level < thisLevel ? htmlInstallTrack(level, thisLevel) : 
                <>
                  <div className="box">
                    <h3> 即時資訊 <span style={{ float: "right", marginTop: "10px" }}>即時數據最後更新時間：{realtime.timestamp} (十分鐘更新一次)</span></h3>
                    <Row>
                      
                      <div className="col-md-4 realtime">
                        <OverlayTrigger overlay={<BSTooltip>目前網站上的活躍人數!</BSTooltip>}>
                          <span className="d-inline-block">
                            <div className="icon"> <IoMdPeople style={{ fontSize: "60px" }} /></div>
                            {/* <div className="icon"> <img src={icon01} alt="" /></div> */}
                            <div className="active">即時活躍人數</div>
                            <div className="value">{this.state.realtime.activeUsers}</div>
                          </span>
                        </OverlayTrigger>
                      </div>
                      
                      <div className="col-md-4 realtime">
                        <OverlayTrigger overlay={<BSTooltip>近30分鐘內累積的瀏覽量</BSTooltip>}>
                          <span className="d-inline-block">
                            <div className="icon">
                              {/* <img src={icon02} alt="" /> */}
                              <IoMdEye style={{ fontSize: "60px" }} />
                            </div>
                            <div className="active">即時瀏覽量</div>
                            <div className="value">{this.state.realtime.activePageviews}</div>
                          </span>
                        </OverlayTrigger>
                      </div>

                      <div className="col-md-4 realtime">
                        <OverlayTrigger overlay={<BSTooltip>目前正在您網站上的擁有最多活躍使用者的頁面</BSTooltip>}>
                          <span className="d-block">
                            <div className="icon">
                              {/* <img src={icon04} alt="" /> */}
                              <IoMdDocument style={{ fontSize: "60px" }} />
                            </div>
                            <div className="active">即時熱門頁面</div>
                            <div className="value hot">
                              {this.state.realtime.hotPage ? this.state.realtime.hotPage.pageTitle : ""}
                              <span>(33次)</span>
                            </div>
                          </span>
                        </OverlayTrigger>
                      </div>
                    </Row>
                  </div>
                  <div className="box2">
                    <h3>新舊</h3>
                    <PieReact option={userType} />
                    <div className="info">
                      計算人次<span className="value">{userType ? userType.total : ''}</span>
                      <p>一周內可辨別新舊的訪客總數</p>
                    </div>
                  </div>
                  <div className="box2 right">
                    <h3>年齡</h3>
                    <PieReact option={userAgeBracket} />
                    <div className="info">
                      計算人次<span className="value">{userAgeBracket ? userAgeBracket.total : ''}</span>
                      <p>一周內可辨別年齡的訪客總數</p>
                    </div>
                  </div>
                  <div className="box2">
                    <h3>性別</h3>
                    <PieReact option={userGender} />
                    <div className="info">
                      計算人次<span className="value">{userGender ? userGender.total : ''}</span>
                      <p>一周內可辨別性別的訪客總數</p>
                    </div>
                  </div>
                  <div className="box2 right">
                    <h3>裝置</h3>
                    <PieReact option={userBranding} />
                    <div className="info">
                      計算人次<span className="value">{userBranding ? userBranding.total : ''}</span>
                      <p>一周內可辨別裝置的訪客總數</p>
                    </div>
                  </div>
                  <div className="box2">
                    <h3>區域</h3>
                    <PieReact option={pageviewCity} />
                    <div className="info">
                      計算瀏覽量<span className="value">{pageviewCity ? pageviewCity.total : ''}</span>
                      <p>一周內可辨別區域的瀏覽總數</p>
                    </div>
                  </div>
                  <div className="box2 right">
                    <h3>管道</h3>
                    <PieReact option={pageviewMedium} />
                    <div className="info">
                      計算瀏覽量<span className="value">{pageviewMedium ? pageviewMedium.total : ''}</span>
                      <p>一周內可辨別管道的瀏覽總數</p>
                    </div>
                  </div>
                  <div className="box2">
                    <h3>來源</h3>
                    <PieReact option={pageviewSource} />
                    <div className="info">
                      計算瀏覽量<span className="value">{pageviewSource ? pageviewSource.total : ''}</span>
                      <p>一周內可辨別來源的瀏覽總數</p>
                    </div>
                  </div>
                  <div className="box2 right">
                    <h3>停留率</h3>
                    <GaugeReact option={pageStayRate} />
                    <div className="info">
                      <p>一周內非單頁瀏覽的造訪總數</p>
                    </div>
                  </div>
                </>}



              </div>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
export default AnalyticBasis;