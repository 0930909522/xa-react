import React, { Component } from 'react';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import { LineChart, Line, Tooltip, Legend, CartesianGrid, XAxis, YAxis, BarChart, Bar, } from 'recharts';

class AnalyticSource extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listIndex: 0,
      newData: {
        id: "device",
        name: "裝置",
        value: [
          { name: '手機', old: 380, new: 100 },
          { name: '平板', old: 114, new: 93 },
          { name: '電腦', old: 250, new: 300 },
        ]
      },
      basic: {
        user: [
          { name: '舊客戶', color: '#3299bb' },
          { name: '新客戶', color: '#15e5f8' },
        ],
        interval: [
          {
            name: "本日",
            start: "",
            end: "",
          },
          {
            name: "本週",
            start: "",
            end: "",
          },
          {
            name: "本月",
            start: "",
            end: "",
          }
        ],
        type: [
          {
            id: "device",
            name: "裝置",
            value: [
              { name: '手機', old: 380, new: 100 },
              { name: '平板', old: 114, new: 93 },
              { name: '電腦', old: 250, new: 300 },
            ]
          },
          {
            id: "browser",
            name: "瀏覽器",
            value: [
              { name: 'Chrome', old: 380, new: 100 },
              { name: 'Firefox', old: 114, new: 93 },
              { name: 'Safira', old: 250, new: 300 },
              { name: 'iphone', old: 250, new: 300 },
            ],
          },
          {
            id: "website",
            name: "網站",
            value: [
              { name: 'Google', url: "www.google.com", old: 380, new: 100 },
              { name: 'Facebook', url: "www.facebook.com", old: 114, new: 93 },
              { name: 'Livingsport', url: "livingsport.tw", old: 250, new: 300 },
            ],
          },
          {
            id: "area",
            name: "地區",
            value: [
              { name: '台北', value: 'taipei', old: 380, new: 100 },
              { name: '新竹', value: 'taipei', old: 114, new: 93 },
              { name: '桃園', value: 'taipei', old: 250, new: 300 },
              { name: '花蓮', value: 'taipei', old: 250, new: 300 },
              { name: '高雄', value: 'taipei', old: 100, new: 24 },
              { name: '屏東', value: 'taipei', old: 50, new: 150 },
            ],
          },
        ]
      },
    }
  }

  listClick(i) {
    this.setState({
      newData: this.state.basic.type[i],
      listIndex: i
    });

  }
  render() {
    // this.setState({newData: "dd"})
    const data = this.state.newData.value;
    const { user } = this.state.basic;
    const renderLineChart = (
      <>
        <div className="chart_ids">
          <ul className="type_col">
            <li><span className="dot" style={{ backgroundColor: user[0].color }}></span> 舊客戶</li>
            <li><span className="dot" style={{ backgroundColor: user[1].color }}></span> 新客戶</li>
          </ul>
          <select >
            {this.state.basic.interval.map(
              (item, index) => <option key={index} value={index}>{item.name}</option>)}
          </select>
        </div>
        <BarChart width={650} height={300} data={data}>
          <CartesianGrid stroke="#eee" />
          <Tooltip labelFormatter={(name) => '' + name} />
          <Bar type="monotone" dataKey="old" name={user[0].name} fill={user[0].color} />
          <Bar type="monotone" dataKey="new" name={user[1].name} fill={user[1].color} />
          <XAxis dataKey="name" stroke="#999" />
          <YAxis stroke="#999" />
        </BarChart>
      </>
    );
    return (
      <>
        <Header />
        <div class="layout_main">
          <Container className="main_analytic">
            <Row>
              <NavLeft />
              <div className="main_right">
                <h2>流量來源</h2>
                <div className="box">
                  <div className="list">
                    <ul>
                      {this.state.basic.type.map((item, index) =>
                        index === this.state.listIndex ?
                          <li onClick={() => this.listClick(index)} className="act" key={index}>{item.name}</li> :
                          <li onClick={() => this.listClick(index)} key={index}>{item.name}</li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="box">
                  <h3>{this.state.newData.name} <span>新舊客戶流量比</span></h3>
                  <div className="chart_box">
                    <div className="chart">
                      {renderLineChart}
                    </div>
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
export default AnalyticSource;