import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import Detail from './AnalyticAssetDetail';
import { PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend, CartesianGrid, XAxis, YAxis, BarChart, Bar, } from 'recharts';

class AnalyticAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetail: false,
      assetId: "rise",
      categoryId: "c1",
      listIndex: 0,
      intervalIsSet: false,
      newData: "",
      basic: "",
    }
  }

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    // axios.get('/datas/analyticAsset.json')
    axios.get('http://r.xnet.world/demo/analyticAsset.json')
      .then(response => {
        this.setState({
          basic: response.data,
          newData: response.data.type[0]
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  listClick(i) {
    this.setState({
      newData: this.state.basic.type[i],
      listIndex: i
    });
  }

  openPopup = () => {
    this.setState(prev => ({ isDetail: !prev.isDetail }));
  }

  render() {
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    const proportion = this.state.newData.proportion;
    const lineChart = this.state.newData.lineChart;
    const renderProportion = (
      <>
        <div className="chart_ids">
          {proportion ? <ul className="type_raw">
            {proportion.map((item, i) => <li key={i}><span className="dot" style={{ backgroundColor: item.color }}></span> {item.name}</li>)}
          </ul> : <span />}

          <select >
            {this.state.basic ? this.state.basic.interval.map(
              (item, index) => <option key={index} value={index}>{item.name}</option>) : ""}
          </select>
        </div>
        {
          this.state.basic ? <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
              data={proportion}
              // cx={150}
              // cy={150}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {
                proportion.map((item, i) => <Cell onClick={() => this.setState({ categoryId: item.id })} key={i} fill={item.color} />)
              }
            </Pie>
          </PieChart> : <span />
        }
      </>
    );
    const renderLineChart = (
      <>
        {proportion ?
          <LineChart width={800} height={400} data={lineChart}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {/* <Line type="monotone" dataKey="c1" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
            {proportion.map((item, i) => <Line key={i} type="monotone" dataKey={item.id} stroke={item.color} name={item.name} />)}
          </LineChart> : <span />}
      </>
    );


    return (
      <>
        <Header />
        <div className="layout_main">
          <Container className="main_analytic">
            <Row>
              <NavLeft />

              {this.state.isDetail ?
                <Detail
                  openPopup={this.openPopup}
                  assetId={this.state.assetId}
                  categoryId={this.state.categoryId}
                /> : <span />}
              <div className="main_right">
                <h2>資產價值</h2>
                <div className="box">
                  <div className="list">
                    <ul>
                      {this.state.basic ? this.state.basic.type.map((item, index) =>
                        index === this.state.listIndex ?
                          <li onClick={() => this.listClick(index)} className="act" key={index}>{item.name}</li> :
                          <li onClick={() => this.listClick(index)} key={index}>{item.name}</li>
                      ) : ""}
                    </ul>
                  </div>
                </div>
                <div className="box">
                  <h3>分類占比</h3>
                  <div className="chart_box">
                    <div className="chart" onClick={() => this.openPopup()}>
                      {renderProportion}
                    </div>
                  </div>
                </div>

                <div className="box">
                  <h3>{this.state.newData.name} 流量統計</h3>
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
export default AnalyticAsset;