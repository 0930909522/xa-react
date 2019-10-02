import React, { Component } from 'react';
import axios from 'axios';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import { Table, Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import BubbleChart from '@weknow/react-bubble-chart-d3';

class AnalyticGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "foodnext",
            keywords: "",
            hot: "",
            now: "",
            isDetail: false,
            wordCloudCount: 45,
            wordCloudInterval: 7,
            hotCount: 10,
            hotInterval: 7,
        }
    }
    componentDidMount() {
        this.getWordCloudData();
        this.getHotData();
    }
    getWordCloudData = () => {
        // axios.get('/datas/analyticHot.json')
        axios.get("https://node.aiday.org/sbir/asset/wordCloud", {
            params: {
                view: this.state.view,
                interval: this.state.wordCloudInterval,
                n: this.state.wordCloudCount,
                pno: 10
            }
        })
            .then(response => {
                let ary = [];
                response.data.data.map((item, index) => {
                    let one = {
                        "label": item._id,
                        "value": item.value,
                    }
                    ary.push(one);
                });
                this.setState({
                    keywords: ary
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    };
    getHotData = () => {
        // axios.get('/datas/analyticHot.json')
        axios.get("https://node.aiday.org/sbir/asset/hot", {
            params: {
                view: this.state.view,
                interval: this.state.hotInterval,
                n: this.state.hotCount,
                pno: 10
            }
        })
            .then(response => {
                //console.log(response.data);
                this.setState({
                    hot: response.data.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    setWordCloudInterval = (e) => {
        this.setState({
            wordCloudInterval: e.target.value
        }, () => {
            this.getWordCloudData();
        });
    }
    setWordCloudCount = (e) => {
        this.setState({
            wordCloudCount: e.target.value,
        }, () => {
            this.getWordCloudData();
        });
    }
    setHotInterval = (e) => {
        this.setState({
            hotInterval: e.target.value
        }, () => {
            this.getHotData();
        });
    }
    setHotCount = (e) => {
        this.setState({
            hotCount: e.target.value,
        }, () => {
            this.getHotData();
        });
    }
    render() {
        const { hot } = this.state
        return (<>
            <Header cateIndex={1} />
            <div className="layout_main">
                <Container className="main_analytic">
                    <Row>
                        <NavLeft />
                        <div className="main_right">
                            <h2>熱門頁面</h2>
                            <div className="box hot">
                                <div className="detail">
                                    <h3>熱門頁面關鍵字</h3>
                                    <div>
                                        <div className="select">
                                            <label>
                                                分析區間：
                                                <select onChange={this.setWordCloudInterval}>
                                                    <option value="7">本週熱門</option>
                                                    <option value="5">5日熱門</option>
                                                    <option value="3">3日熱門</option>
                                                    <option value="1">1日熱門</option>
                                                </select>
                                            </label>
                                            <label>
                                                目前數量：{this.state.wordCloudCount}
                                            </label>
                                            <label>
                                                <input type="range" onMouseUp={this.setWordCloudCount} min={10} />
                                            </label>
                                        </div>
                                    </div>

                                    {this.state.keywords ?
                                        <div className="chart_box">
                                            <BubbleChart
                                                graph={{
                                                    zoom: 1,
                                                    offsetX: 0,
                                                    offsetY: 0,
                                                }}
                                                width={650}
                                                height={660}
                                                overflow={false}
                                                padding={0} // optional value, number that set the padding between bubbles
                                                showLegend={false} // optional value, pass false to disable the legend.
                                                legendPercentage={20} // number that represent the % of with that legend going to use.
                                                legendFont={{
                                                    family: 'Arial',
                                                    size: 14,
                                                    color: '#000',
                                                    weight: 'normal',
                                                }}
                                                valueFont={{
                                                    family: 'Arial',
                                                    size: 0,
                                                    color: '#fff',
                                                    weight: 'normal',
                                                }}
                                                labelFont={{
                                                    family: 'Arial',
                                                    size: 15,
                                                    color: '#fff',
                                                    weight: 'normal',
                                                    padding: '10px'
                                                }}
                                                //Custom bubble/legend click functions such as searching using the label, redirecting to other page
                                                // bubbleClickFun={this.bubbleClick}
                                                // legendClickFun={this.legendClick}
                                                data={this.state.keywords}
                                            />
                                        </div>
                                        : <span />}

                                    <h3>熱門頁面排行 </h3>
                                    <div>
                                        <div className="select">
                                            <label>
                                                排行時間：
                                                <select onChange={this.setHotInterval}>
                                                    <option value="7">本週</option>
                                                    <option value="5">5日</option>
                                                    <option value="3">3日</option>
                                                    <option value="1">1日</option>
                                                </select>
                                            </label>
                                            <label>
                                                觀看筆數：
                                                <select onChange={this.setHotCount}>
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="30">30</option>
                                                </select>
                                            </label>
                                        </div>
                                    </div>


                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th width="8%">排名</th>
                                                <th>文章名稱</th>
                                                <th width="8%">人數</th>
                                                <th width="8%">流量</th>
                                                <th width="10%">新客戶</th>
                                                <th width="10%">舊客戶</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {hot ? hot.map((item, index) =>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td> <a href={item._id}>{item.title}</a> </td>
                                                    <td>{item.uv}</td>
                                                    <td>{item.pv}</td>
                                                    <td>{item.newVisitor}</td>
                                                    <td>{item.oldVisitor}</td>

                                                </tr>
                                            ) : console.log()}

                                        </tbody>
                                    </Table>


                                    {/* <ul>
                                        {this.state.basic ? this.state.basic.detail.map((item, i) =>
                                            <li key={i} className={i == 1 ? "artice" : ""}>
                                                <div className="head">
                                                    {item.name}
                                                </div>
                                                {item.list.map((one, j) =>
                                                    <div key={j} className="cont">
                                                        {one}
                                                    </div>
                                                )}

                                            </li>
                                        ) : <li />}
                                    </ul> */}

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

export default AnalyticGroup;