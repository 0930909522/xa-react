import React, { Component } from 'react';
import axios from 'axios';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import { Container, Row, Nav, Navbar, Form, FormControl, Button, OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { PieChart, Pie, Cell, LineChart, Line, Legend, CartesianGrid, XAxis, YAxis, BarChart, Bar, } from 'recharts';
import asyncComponent from './AsyncComponent';
import 'react-circular-progressbar/dist/styles.css';
import Loading from '../../images/loading.svg';
const PieReact = asyncComponent(() => import('./EchartsDemo/PieReact'));

class AnalyticPortrait extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "foodnext",
            openExample: false,
            fishType: "",
            topId: 0,
            fish: [
                { "id": "g1", "name": "海豚", "info": "友善、可馴化", "percent": "0", "count": 0, "bgColor": "#f19ec2" },
                { "id": "g2", "name": "烏龜", "info": "很少來不消費", "percent": "0", "count": 0, "bgColor": "#f6b37f" },
                { "id": "g3", "name": "蝦子", "info": "經濟價值高", "percent": "0", "count": 0, "bgColor": "#f6e206" },
                { "id": "g4", "name": "鮟鱇魚", "info": "潛在鐵粉", "percent": "0", "count": 0, "bgColor": "#8f82bc" },
                { "id": "g5", "name": "鮪魚", "info": "經濟價值高", "percent": "0", "count": 0, "bgColor": "#b3d465" },
                { "id": "g6", "name": "鯊魚", "info": "常使用但不消費", "percent": "0", "count": 0, "bgColor": "#a09f9f" },
                { "id": "g7", "name": "鯨魚", "info": "忠誠且大量消費", "percent": "0", "count": 0, "bgColor": "#3e95de" },
                { "id": "g8", "name": "魟魚", "info": "忠誠度高的好客戶", "percent": "0", "count": 0, "bgColor": "#3e95de" },
                { "id": "g9", "name": "秋刀魚", "info": "經濟價值較低", "percent": "0", "count": 0, "bgColor": "#3e95de" }
            ],
            basic: "", //舊搭
            summary: {
                "proportion": 0, //完整瀏覽
                "visitFreq": 0, //使用頻率
                "staytime": 0, //單次使用時間
                "proportionLevel": 0, //完整瀏覽
                "visitFreqLevel": 0, //使用頻率
                "staytimeLevel": 0  //單次使用時間
            },
            hot: "", //排行榜
            interest: "", //查詢用戶畫像喜好分布
            topInterest: "",
            isLoadingSummary: false,
            isLoadingHot: false,
            isLoadingInterest: false,
        }
    }
    componentDidMount() {
        this.getFishFromDb();
    }

    getFishFromDb = (id) => {
        //const url = "http://r.xnet.world/demo/analyticFish.json";
        const url = "https://node.aiday.org/sbir/visitor/overview";
        axios.get( url, {
            params: {
                view: this.state.view,
            }
        })
            .then(response => {
                let data = response.data.data;
                let fishs = this.state.fish;
                let newFishs =[];
                let totalCount = 0;
                let aryCount = [];
                data.map(item => {
                    aryCount.push(parseInt(item.count));
                    totalCount += item.count;
                });
                let maxCount = aryCount.reduce((prev, next) => Math.max(prev, next));
                data.map( item => {
                    let thisFish = fishs.filter( fish => {
                        return fish.name === item.name;
                    })[0];
                    thisFish.count = item.count;
                    thisFish.percent = Math.round((item.count / totalCount) * 10000)/100 ;
                    newFishs.push(thisFish);
                });
                let fishType = newFishs.find( item => item.count === maxCount).id;
                this.getSummaryFromDb(fishType);
                this.getHotFromDb(fishType);
                this.getInterestFromDb(fishType);
                this.setState({
                    fishType: fishType,
                    topId: fishType,
                    fish: newFishs,
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    setLevel = (num) => {
        switch(num) {
            case 1:
                return "低";
                break; 
            case 2:
                return "中";
                break;
            case 3:
                return "高";
                break; 
        }
    }

    getSummaryFromDb = (id) => {
        this.setState({isLoadingSummary: true});
        axios.get( "https://node.aiday.org/sbir/visitor/summary", {
            params: {
                view: this.state.view,
                type: this.state.fish.find( item => item.id === id ).name,
            }
        }).then(res => {
            let summary = res.data.data;
            this.setState({
                summary: summary
            }, ()=> this.setState({isLoadingSummary: false}));
        })
        .catch(error => {
            console.log(error);
        });
    };
    getHotFromDb = (id) => {
        this.setState({isLoadingHot: true});
        axios.get( "https://node.aiday.org/sbir/visitor/hot", {
            params: {
                view: this.state.view,
                type: this.state.fish.find( item => item.id === id ).name,
            }
        }).then( res => {
            this.setState({
                hot: res.data.data
            }, ()=> this.setState({isLoadingHot: false}));
        }).catch(error => {
            console.log(error);
        });
    }
    getInterestFromDb = (id) => {
        this.setState({isLoadingInterest: true});
        axios.get( "https://node.aiday.org/sbir/visitor/cateInterest", {
            params: {
                view: this.state.view,
                type: this.state.fish.find( item => item.id === id ).name,
            }
        }).then( res => {
            let data =  res.data.data;
            let option = {
                tooltip: {
                  trigger: 'item',
                  formatter: "{b} : {c} ({d}%)"
                },
                series: [
                  {
                    name: '访问来源',
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '50%'],
                    data: data,
                  }
                ]
            }

            let aryCount = [];
            data.map(item => aryCount.push(parseInt(item.value)));
            let maxCount = aryCount.reduce((prev, next) => Math.max(prev, next));
            let topInterest = data.find( item => item.value === maxCount).name;

            this.setState({
                interest: option,
                topInterest: topInterest
            }, ()=> this.setState({isLoadingInterest: false}))
        }).catch(error => {
            console.log(error);
        });
    }

    changeFish = (id) => {
        this.setState({
            fishType: id
        })
        this.getSummaryFromDb(id);
        this.getHotFromDb(id);
        this.getInterestFromDb(id);
        
    }
    showExample = () => {
        this.setState(prev => ({ openExample: !prev.openExample }));
    }

    render() {
        const { fish, fishType, summary, hot, interest, topInterest, isLoadingSummary, isLoadingInterest, isLoadingHot } = this.state;
        const { articles, proportion, detail, barInfo } = this.state.basic;
        
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
                                    <div className={fishType + " icon"}></div>
                                </div>
                                <div className="info">
                                    <div className="small">
                                        網站用戶
                                    </div>
                                    {fishType ? <div className="title">
                                        { fish.find((item) => item.id === fishType).name}
                                        <span> { fish.find((item) => item.id === fishType).info}</span>
                                    </div> : <span />}
                                    <div className="detail">
                                        <div className="small">
                                            詳細指標
                                        </div>
                                        <ul>
                                            <li>
                                                <div className="head">單次使用時間</div>
                                                <div className="cont">
                                                    {isLoadingSummary ? 
                                                        <>---</> :
                                                        <>
                                                            {this.setLevel(summary.staytimeLevel)}
                                                            <span> ({summary.staytime} 秒)</span>
                                                        </>}
            
                                                </div>
                                            </li>
                                            <li>
                                                <div className="head">使用頻率</div>
                                                <div className="cont">
                                                    {isLoadingSummary ? 
                                                        <>---</> :
                                                        <>
                                                            {summary.visitFreqLevel}
                                                            <span> ({this.setLevel(summary.visitFreq)} 次/週)</span>
                                                        </>}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="head">轉換率</div>
                                                <div className="cont">
                                                    無
                                                </div>
                                            </li>
                                            <li>
                                                <div className="head">瀏覽偏好</div>
                                                <div className="cont">
                                                    {isLoadingInterest ?
                                                        <>---</> :
                                                        <>{topInterest}</> }
                                                        
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="progress_round">
                                    
                                    <ul>
                                        <li>
                                            <CircularProgressbar value={summary.staytimeLevel * 30} text={this.setLevel(summary.staytimeLevel)} strokeWidth='11'
                                                styles={buildStyles({
                                                    pathColor: '#fe5660',
                                                    textColor: '#aaa',
                                                    textSize: '20px',
                                                    trailColor: '#dedede'
                                                })}
                                            />
                                            <div className="title">停留時間</div>
                                        </li>
                                        <li>
                                            <CircularProgressbar value={summary.visitFreqLevel * 30} text={this.setLevel(summary.visitFreqLevel)} strokeWidth='11'
                                                styles={buildStyles({
                                                    pathColor: '#24ccb8',
                                                    textColor: '#aaa',
                                                    textSize: '20px',
                                                    trailColor: '#dedede'
                                                })}
                                            />
                                            <div className="title">造訪頻率</div>
                                        </li>
                                        <li>
                                            <CircularProgressbar value={summary.proportionLevel * 30} text={this.setLevel(summary.proportionLevel)} strokeWidth='11'
                                                styles={buildStyles({
                                                    pathColor: '#2e6eff',
                                                    textColor: '#aaa',
                                                    textSize: '20px',
                                                    trailColor: '#dedede'
                                                })}
                                            />
                                            <div className="title">完整瀏覽</div>
                                        </li>
                                    </ul> 
                                </div>
                            </div>
                            <div className="box">
                                <div style={{ display: "flex", alignItem: "center", justifyContent: "center" }}>
                                    <h3 className="no_border inline">用戶分佈 <br /> 
                                    <div style={{ fontSize: "15px", color: "#3472ff", cursor: "pointer" }} onClick={() => this.showExample()}>分布說明</div> </h3> <br />
                                    <ul className="icons">
                                        {fish.map((item, i) =>
                                            <li onClick={() => this.changeFish(item.id)} key={i} className={"icon_box ss" + fishType ? item.id === fishType ? "icon_box ss now" : "icon_box ss" : null}>
                                                <CircularProgressbarWithChildren value={item.percent} strokeWidth='8'
                                                    styles={buildStyles({
                                                        pathColor: `${item.bgColor}`,
                                                        textColor: '#333',
                                                        trailColor: '#dedede'
                                                    })}
                                                >
                                                    <OverlayTrigger trigger="hover" placement={ i === fish.length -1 ? "left" : "right" } overlay={<Popover title={item.name}> {item.info} </Popover>}>
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
                                        <h3>分布說明</h3>
                                        <div className="fish_example">
                                            <div className="fbg_box">
                                                <br/>
                                                <div className="align_left f_z20">消費等級（購買力/回購度）</div>
                                                <div className="fbg">
                                                    {fish.map((item, index) => {
                                                        console.log(this.state.topId.split("g")[1])
                                                        let top = "";
                                                        if( index+1 == this.state.topId.split("g")[1]){
                                                            top = "red"
                                                        }
                                                        return <div key={index} className={ "fish g"+ (index+1) + " "+ top }>{fish.find(f=>f.id === "g"+(index+1)).percent}%</div>
                                                    })}
                                                </div>
                                                <div className="align_right f_z20">黏著度/忠誠度</div>
                                            </div>

                                        </div>
                                        {/* <img src="./fish_example1.jpg" alt="" style={{maxWidth: "100%"}} /> */}
                                    </div> : <></>
                                }

                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="box">
                                        <h3 className="no_border">觀看文章排行</h3>
                                        { isLoadingHot ?  
                                            <div className="loading_box"><img src={Loading} alt="Loading" /></div> :
                                            <ul className="article_list">
                                                <li className="title">
                                                    <div className="left">
                                                    觀看次數
                                                    </div>
                                                    <div className="right">
                                                    文章名稱
                                                    </div>
                                                </li>
                                                {hot ? hot.map((item, i) =>
                                                    <li key={i}>
                                                        <div className="left">{item.value}</div>
                                                        <div className="right">{item.name}</div>
                                                    </li>
                                                ) : <li />}
                                            </ul>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="box">
                                        <h3 className="no_border">閱讀偏好</h3>
                                        { isLoadingInterest ?  
                                            <div className="loading_box"><img src={Loading} alt="Loading" /></div> :
                                            <div className="chart_box" style={{ marginTop: "40px" }}>
                                                <div className="chart">
                                                    {interest ? <PieReact option={interest} /> : <></> }
                                                </div>
                                            </div>
                                        }
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