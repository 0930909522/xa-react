import React, { Component } from 'react';
import axios from 'axios';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import Loading from '../../images/loading.svg';
import { Redirect } from 'react-router';
import { htmlInstallTrack } from '../share/checkPermission';
import {clearLogin} from "../share/clearLogin";
import { Table, Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import BubbleChart from '@weknow/react-bubble-chart-d3';

const thisLevel = 2; //設定本頁權限 1-4
class AnalyticGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: localStorage.getItem('view'),
            keywords: "",
            hot: "",
            now: "",
            chartWidth: 650,
            chartHeight: 660,
            isDetail: false,
            wordCloudCount: 15,
            wordCloudInterval: 7,
            hotCount: 10,
            hotInterval: 7,
            isLoadingList: true,
            isLoadingWordCloud: true,
        }
    }
    componentDidMount() {
        this.getWordCloudData();
        this.getHotData();
        this.checkSize();
    }
    getWordCloudData = () => {
        // axios.get('/datas/analyticHot.json')
        this.setState({ isLoadingWordCloud: true });
        axios.get("https://node.aiday.org/sbir/asset/wordCloud", {
            withCredentials: true,
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
                }, ()=> this.setState({isLoadingWordCloud: false}) );

            })
            .catch( (err) => {
                clearLogin(err.response);
            });
    };
    getHotData = () => {
        // axios.get('/datas/analyticHot.json')
        this.setState({isLoadingList: true})
        axios.get("https://node.aiday.org/sbir/asset/hot", {
            withCredentials: true,
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
                }, ()=> this.setState({isLoadingList: false}));
            })
            .catch((err) => {
                clearLogin(err.response);
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
    checkSize = () => {
        if(window.innerWidth < 768){
            this.setState({ 
                chartWidth: window.innerWidth - 40, 
                chartHeight: window.innerWidth - 30, 
            })

        }
    }
    render() {
        const { hot, isLoadingWordCloud, isLoadingList, chartWidth, chartHeight } = this.state
        const { name, level, verified } = this.props.permissionData;
        return (
        verified !== true ?
        <Redirect to="/signup/signin" /> :
        <>
            <Header cateIndex={1} />
            <div className="layout_main">
                <Container className="main_analytic">
                    <Row>
                        <NavLeft view={this.state.view}/>
                        <div className="main_right">
                            {localStorage.getItem('viewName') ?
                            <h2 className="mobile-show">{localStorage.getItem('viewName')} <span style={{fontSize: "18px"}}>熱門頁面</span></h2> : <></>}
                            <h2 className="mobile-hide">熱門頁面</h2>
                            
                            { level < thisLevel ? htmlInstallTrack(level, thisLevel) : 
                            <>
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
                                                    <input type="range" onMouseUp={this.setWordCloudCount} onTouchend={this.setWordCloudCount} min={10} />
                                                </label>
                                            </div>
                                        </div>

                                        
                                        { isLoadingWordCloud ?  
                                            <div className="loading_box"><img src={Loading} alt="Loading" /></div> :
                                            this.state.keywords ?
                                                <div className="chart_box">
                                                        <BubbleChart
                                                            graph={{
                                                                zoom: 1,
                                                                offsetX: 0,
                                                                offsetY: 0,
                                                            }}
                                                            width={chartHeight}
                                                            height={chartHeight}
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

                                        { isLoadingList ?
                                        <div className="loading_box"><img src={Loading} alt="Loading" /></div> :
                                        <div className="table_box">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th width="8%">排名</th>
                                                        <th>文章名稱</th>
                                                        <th width="8%">人數</th>
                                                        <th width="10%">瀏覽量</th>
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
                                        </div> }


                                       

                                    </div>
                                </div> 
                            </>}
                        </div>
                    </Row>
                </Container>
            </div>
            <Footer />

        </>);
    }
}

export default AnalyticGroup;