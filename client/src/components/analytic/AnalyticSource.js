import React, { Component } from 'react';
import axios from 'axios';
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
      intervalIsSet: false,
      newData: {
        // id: "device",
        // name: "裝置",
        // value: [
        //   { name: '手機', old: 380, new: 100 },
        //   { name: '平板', old: 114, new: 93 },
        //   { name: '電腦', old: 250, new: 300 },
        // ]
      },
      basic: "",
    }
  }

  componentDidMount() {
    this.getDataFromDb();
  }


  getDataFromDb = () => {
    axios.get('http://r.xnet.world/demo/flow_source.json')
      .then( response => {
        this.setState({
          basic: response.data,
          newData: response.data.type[0]
      });

    })
    .catch(function (error) {
      console.log(error);
    });

    // fetch('https://r.xnet.world/demo/flow_source.json')
    //   .then((data) => data.json())
    //   .then((res) => this.setState({ 
    //       basic: res.data,
    //       newData: res.data.type[0]
    //   }));

  };


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
          {user ? <ul className="type_col">
            {user.map( item => <li><span className="dot" style={{ backgroundColor: user[0].color }}></span> {item.name}</li>)}
          </ul> : <span/>}
          <select >
            {this.state.basic ? this.state.basic.interval.map(
              (item, index) => <option key={index} value={index}>{item.name}</option>) : ""}
          </select>
        </div>
        {
          this.state.basic ? <BarChart width={800} height={300} data={data}>
          <CartesianGrid stroke="#eee" />
          <Tooltip labelFormatter={(name) => '' + name} />
          <Bar type="monotone" dataKey="old" name={user[0].name} fill={user[0].color} />
          <Bar type="monotone" dataKey="new" name={user[1].name} fill={user[1].color} />
          <XAxis dataKey="name" stroke="#999" />
          <YAxis stroke="#999" />
        </BarChart> : <span />
        }
      </>
    );
    return (
      <>
        <Header cateIndex={1} />
        <div className="layout_main">
          <Container className="main_analytic">
            <Row>
              <NavLeft />
              <div className="main_right">
                <h2>流量來源</h2>
                <div className="box">
                  <div className="list">
                    <ul>
                      {this.state.basic ? this.state.basic.type.map((item, index) =>
                        index === this.state.listIndex ?
                          <li onClick={() => this.listClick(index)} className="act" key={index}>{item.name}</li> :
                          <li onClick={() => this.listClick(index)} key={index}>{item.name}</li>
                      ): ""}
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