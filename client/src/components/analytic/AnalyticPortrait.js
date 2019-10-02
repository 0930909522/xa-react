import React, { Component } from 'react';
import axios from 'axios';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import { Container, Row, Nav, Navbar, Form, FormControl, Button, OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { PieChart, Pie, Cell, LineChart, Line, Legend, CartesianGrid, XAxis, YAxis, BarChart, Bar, } from 'recharts';

import 'react-circular-progressbar/dist/styles.css';

class AnalyticPortrait extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openExample: false,
            fish: [
                { "id": "g1", "name": "海豚", "info": "友善、可馴化", "percent": "0", "bgColor": "#f19ec2" },
                { "id": "g2", "name": "烏龜", "info": "動作緩慢慢", "percent": "0", "bgColor": "#f6b37f" },
                { "id": "g3", "name": "蝦子", "info": "雜食、消費種類廣泛", "percent": "0", "bgColor": "#f6e206" },
                { "id": "g4", "name": "鮟鱇魚", "info": "潛在消費者", "percent": "0", "bgColor": "#8f82bc" },
                { "id": "g5", "name": "鮪魚", "info": "經濟價值高", "percent": "0", "bgColor": "#b3d465" },
                { "id": "g6", "name": "鯊魚", "info": "消費兇猛、追求速度", "percent": "0", "bgColor": "#a09f9f" },
                { "id": "g7", "name": "鯨魚", "info": "消費量大", "percent": "0", "bgColor": "#3e95de" }
            ],
            basic: "",
        }
    }
    componentDidMount() {
        this.getDataFromDb();
        this.getFishFromDb();
    }

    getFishFromDb = (id) => {
        const url = "http://r.xnet.world/demo/analyticFish.json";
        axios.get(url)
            .then(response => {
                this.setState({
                    fish: response.data.fish
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    getDataFromDb = (id) => {
        const url = id ? "http://r.xnet.world/demo/analyticProtrait/" + id + ".json" : "http://r.xnet.world/demo/analyticProtrait/main.json"
        axios.get(url)
            .then(response => {
                this.setState({
                    basic: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    changeFish = (id) => {
        this.getDataFromDb(id);
        //console.log(id)
    }
    showExample = () => {
        this.setState(prev => ({ openExample: !prev.openExample }));
    }

    render() {
        const { fishType, articles, proportion, detail, barInfo } = this.state.basic;

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

        const renderProportion = (
            <>
                <div className="chart_ids">
                    {proportion ? <ul className="type_raw">
                        {proportion.map((item, i) => <li key={i}><span className="dot" style={{ backgroundColor: item.color }}></span> {item.name}</li>)}
                    </ul> : <span />}
                </div>
                {
                    this.state.basic ? <PieChart width={430} height={250} onMouseEnter={this.onPieEnter}>
                        <Pie
                            data={proportion}
                            cx={130}
                            cy={110}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={110}
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

        const popover = (
            <Popover id="popover-basic" title="Popover right">
                And here's some <strong>amazing</strong> content. It's very engaging. right?
            </Popover>
        );
        return (<>
            <Header cateIndex={1} />
            <div className="layout_main">
                <Container className="main_analytic">
                    <Row>
                        <NavLeft />
                        <div className="main_right">
                            <h2>用戶畫像</h2>
                            <div className="box">
                                <div className="icon_box">
                                    <div className={fishType + " icon"}  ></div>
                                </div>
                                <div className="info">
                                    <div className="small">
                                        網站核心用戶
                                    </div>
                                    {fishType ? <div className="title">
                                        {this.state.fish.find((item) => item.id === fishType).name}
                                        <span> {this.state.fish.find((item) => item.id === fishType).info}</span>
                                    </div> : <span />}
                                    <div className="detail">
                                        <div className="small">
                                            詳細指標
                                        </div>
                                        <ul>
                                            {detail ? detail.map((item, i) =>
                                                <li key={i}>
                                                    <div className="head">
                                                        {item.name }
                                                    </div>
                                                    <div className="cont">
                                                        {item.score ? item.score : "無"}
                                                        <span> {item.info ? `(${item.info})` : ""}</span>
                                                    </div>
                                                </li>
                                            ) : <li />}

                                        </ul>
                                    </div>

                                </div>
                                <div className="progress_round">
                                    <ul>
                                        {barInfo ? barInfo.map((item, i) =>
                                            <li key={i}>
                                                {/* <CircularProgressbar value={item.percent} text={`${item.percent}%`} strokeWidth='11' */}
                                                <CircularProgressbar value={item.percent} text={item.show} strokeWidth='11'
                                                    styles={buildStyles({
                                                        pathColor: item.bgcolor,
                                                        textColor: '#aaa',
                                                        textSize: '20px',
                                                        trailColor: '#dedede'
                                                    })}
                                                />
                                                <div className="title">{item.name}</div>
                                            </li>
                                        ) : <li />}
                                    </ul>
                                </div>
                            </div>
                            <div className="box">

                                <div style={{ display: "flex", alignItem: "center", justifyContent: "center" }}>
                                    <h3 className="no_border inline">用戶分佈 <br /> 
                                    <div style={{ fontSize: "15px", color: "#3472ff", cursor: "pointer" }} onClick={() => this.showExample()}>分布範例</div> </h3> <br />

                                    <ul className="icons">
                                        {this.state.fish.map((item, i) =>

                                            <li onClick={() => this.changeFish(item.id)} key={i} className={"icon_box ss" + fishType ? item.id === fishType ? "icon_box ss now" : "icon_box ss" : null}>
                                                <CircularProgressbarWithChildren value={item.percent} strokeWidth='8'
                                                    styles={buildStyles({
                                                        pathColor: `${item.bgColor}`,
                                                        textColor: '#333',
                                                        trailColor: '#dedede'
                                                    })}
                                                >
                                                    <OverlayTrigger trigger="hover" placement="right" overlay={<Popover title={item.name}> {item.info} </Popover>}>
                                                        <div className={item.id + " icon"}></div>
                                                    </OverlayTrigger>
                                                </CircularProgressbarWithChildren>

                                                <div style={{ marginTop: "3px" }}>{item.percent}%</div>

                                            </li>

                                        )}

                                    </ul>

                                </div>

                                {this.state.openExample ?
                                    <div>
                                        {/* <hr /> */}
                                        <h3>分布範例</h3>
                                        {/* <img src="./fish_example.jpg" alt="" style={{maxWidth: "100%"}} /> */}
                                        <img src="./fish_example1.jpg" alt="" style={{maxWidth: "100%"}} />
                                    </div> : <span />
                                }

                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="box">
                                        <h3 className="no_border">觀看文章排行</h3>
                                        <ul className="article_list">
                                            <li className="title">
                                                <div className="left">
                                                    文章名稱
                                                </div>
                                                <div className="right">
                                                    觀看次數
                                                </div>
                                            </li>
                                            {articles ? articles.map((item, i) =>
                                                <li key={i}>
                                                    <div className="left">{item.name}</div>
                                                    <div className="right">{item.count}</div>
                                                </li>
                                            ) : <li />}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="box">
                                        <h3 className="no_border">閱讀偏好</h3>
                                        <div className="chart_box" style={{ marginTop: "40px" }}>
                                            <div className="chart">
                                                {renderProportion}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>);
    }
}

export default AnalyticPortrait;