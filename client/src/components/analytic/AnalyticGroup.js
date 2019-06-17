import React, { Component } from 'react';
import axios from 'axios';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import BubbleChart from '@weknow/react-bubble-chart-d3';

class AnalyticGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: "",
            isDetail: false,
            circles: "",
        }
    }

    componentDidMount() {
        this.getDataFromDb();
    }

    getDataFromDb = () => {
        axios.get('/datas/analyticGroup.json')
            .then(response => {
                this.setState({
                    circles: response.data.circles
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    openPopup = () => {
        this.setState(prev => ({ isDetail: !prev.isDetail }));
    }
    bubbleClick = (label) => {
        this.setState({ now: this.state.circles.findIndex(item => item.label === label) });
        this.openPopup();
    }

    render() {
        return (<>
            <Header />
            <div className="layout_main">
                <Container className="main_analytic">
                    <Row>
                        <NavLeft />
                        {this.state.isDetail ?
                            <div className="popup">
                                <div className="popupBox"  >
                                    <div className="close" onClick={() => this.openPopup()}> x </div>
                                    {this.state.circles ?
                                        <div className="content box" style={{ paddingTop: 0 }}>

                                            <h3>
                                                <div className="leftbox">
                                                    <CircularProgressbarWithChildren value={this.state.circles[this.state.now].value} strokeWidth='8'
                                                        styles={buildStyles({
                                                            pathColor: `${this.state.circles[this.state.now].color}`,
                                                            textColor: '#333',
                                                            trailColor: '#dedede'
                                                        })}
                                                    >
                                                        <div style={{ fontSize: '13px' }}>{this.state.circles[this.state.now].value}%</div>
                                                        <div>{this.state.circles[this.state.now].label}</div>
                                                    </CircularProgressbarWithChildren>
                                                </div>
                                                <div className="rightbox">
                                                    <span>興趣排行</span> {this.state.now} <br />
                                                    <span>閱讀總數</span> {this.state.circles[this.state.now].count}
                                                </div>
                                            </h3>

                                            <ul className="article_list">
                                                <li className="title">
                                                    <div className="left">
                                                        文章名稱
                                                </div>
                                                    <div className="right">
                                                        觀看次數
                                                </div>
                                                </li>
                                                {this.state.circles[this.state.now].aticles.map((item, i) =>
                                                    <li key={i}>
                                                        <div className="left">
                                                            {item.title}
                                                        </div>
                                                        <div className="right">
                                                            {item.count}
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                        : <span />}
                                </div>
                            </div>
                            : <span />}

                        <div className="main_right">
                            <h2>用戶分群</h2>
                            <div className="box">
                                {this.state.circles ?
                                    <div className="chart_box">
                                        <BubbleChart
                                            graph={{
                                                zoom: 1.1,
                                                offsetX: -0.05,
                                                offsetY: -0.01,
                                            }}
                                            width={900}
                                            height={800}
                                            padding={8} // optional value, number that set the padding between bubbles
                                            showLegend={true} // optional value, pass false to disable the legend.
                                            legendPercentage={20} // number that represent the % of with that legend going to use.
                                            legendFont={{
                                                family: 'Arial',
                                                size: 15,
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
                                                size: 20,
                                                color: '#fff',
                                                weight: 'normal',
                                                padding: '10px'
                                            }}
                                            //Custom bubble/legend click functions such as searching using the label, redirecting to other page
                                            bubbleClickFun={this.bubbleClick}
                                            legendClickFun={this.legendClick}
                                            data={this.state.circles}
                                        />

                                    </div>
                                    : <span />}
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