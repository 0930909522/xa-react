import React, { Component } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend, CartesianGrid, XAxis, YAxis, BarChart, Bar, } from 'recharts';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';

class AnalyticAssetDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listIndex: 0,
            thisNO: 1,
            newData: "",
            basic: ""
        }
    }

    componentDidMount() {
        this.getDataFromDb();
    }

    getDataFromDb = () => {
        var assetId = this.props.assetId;
        var categoryId = this.props.categoryId;
        console.log("assetId", assetId);
        console.log("categoryId", categoryId);

        // axios.get('/datas/analyticAssetDetail.json')
        axios.get('http://r.xnet.world/demo/analyticAssetDetail/'+ assetId +'/'+ categoryId +'.json')
            .then(response => {
                this.setState({
                    basic: response.data,
                    newData: response.data.content[0]
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
        const { content } = this.state.basic;
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
        const pieChart = this.state.newData.source ? this.state.newData.source.pieChart : null;
        const lineChart = this.state.newData.source ? this.state.newData.source.lineChart : null;
        const renderPieChart = (
          <>
            <div className="chart_ids">
              {pieChart ? <ul className="type_raw">
                {pieChart.map((item, i) => <li key={i}><span className="dot" style={{ backgroundColor: item.color }}></span> {item.name}</li>)}
              </ul> : <span />} 

              {console.log("gg", lineChart)}            
            </div>
            {
              this.state.basic ? <PieChart width={300} height={200} onMouseEnter={this.onPieEnter}>
                <Pie
                  data={pieChart}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  { pieChart.map((item, i) => <Cell key={i} fill={item.color} />) }
                </Pie>
              </PieChart> : <span />
            }
          </>
        );
        const renderLineChart = (
            <>
              { pieChart ?
                  <LineChart width={400} height={300} data={lineChart}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    {/* <Line type="monotone" dataKey="c1" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                    { pieChart.map( (item, i) => <Line key={i} type="monotone" dataKey={item.id} stroke={item.color} name={item.name}/> )}
                  </LineChart> : <span />}
            </>
          );

        return (<>
            <div className="popup">
                <div className="popupBox">
                    <div className="close" onClick={ ()=>this.props.openPopup()}> x </div>
                    <div className="content">
                        <h3>{this.state.basic.title}</h3>
                        <ul>
                            { content ? content.map( (item, i) => {
                                return <li key={i} onClick={
                                    () => this.setState({thisNO: i+1, newData: this.state.basic.content[i]})
                                }>第 {i+1} 名：{item.title}</li>
                            }) : <li/>}
                        </ul>
                        <h3> 第 {this.state.thisNO} 名 </h3>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    {renderPieChart}
                                    {/* {console.log("tt", this.state.newData)} */}
                                </div>
                                <div className="col-md-6">
                                    {renderLineChart}
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>

        </>);
    }
}

export default AnalyticAssetDetail;