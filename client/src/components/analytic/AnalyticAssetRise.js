import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import { PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend, CartesianGrid, XAxis, YAxis, BarChart, Bar, } from 'recharts';

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
    axios.get('/datas/analyticAssetRise.json')
      .then( response => {
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
  render() {

    const dataNew = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
    {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
const x  = cx + radius * Math.cos(-midAngle * RADIAN);
const y = cy  + radius * Math.sin(-midAngle * RADIAN);

return (
<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
{`${(percent * 100).toFixed(0)}%`}
</text>
);
};





    // this.setState({newData: "dd"})
    const data = this.state.newData.value;
    const { user } = this.state.basic;
    const renderLineChart = (
      <>
        <div className="chart_ids">
        { user ? <ul className="type_col">
            <li><span className="dot" style={{ backgroundColor: user[0].color }}></span> 舊客戶</li>
            <li><span className="dot" style={{ backgroundColor: user[1].color }}></span> 新客戶</li>
          </ul> : "" }
          
          <select >
            {this.state.basic ? this.state.basic.interval.map(
              (item, index) => <option key={index} value={index}>{item.name}</option>) : ""}
          </select>
        </div>
        {
          this.state.basic ? <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
          <Pie
            data={dataNew} 
            cx={300} 
            cy={200} 
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80} 
            fill="#8884d8"
          >
            {
              data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
        </PieChart> : <span />
        }
      </>
    );



    


    return (
      <>
        <Header />
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
                  <h3>分類占比</h3>
                  <div className="chart_box">
                    <div className="chart">
                      {renderLineChart}
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
export default AnalyticSource;