import React, { Component } from 'react';
import axios from 'axios';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import BubbleChart from '@weknow/react-bubble-chart-d3';

class AnalyticGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: "",
            isDetail: false,
            basic: "",
            keywords: ""
        }
    }
    componentDidMount() {
        this.getDataFromDb();
    }

    getDataFromDb = () => {
        // axios.get('/datas/analyticHot.json')
        axios.get('http://r.xnet.world/demo//analyticHot.json')
            .then(response => {
                this.setState({
                    basic: response.data,
                });

                console.log(response.data.keywords)
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    render() {

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
                                    {this.state.basic.keywords ?
                                        <div className="chart_box">
                                            <BubbleChart
                                                graph={{
                                                    zoom: 1.1,
                                                    offsetX: -0.05,
                                                    offsetY: -0.01,
                                                }}
                                                width={630}
                                                height={660}
                                                padding={8} // optional value, number that set the padding between bubbles
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
                                                bubbleClickFun={this.bubbleClick}
                                                legendClickFun={this.legendClick}
                                                data={this.state.basic.keywords}
                                            />
                                        </div>
                                        : <span />}


                                    <h3>熱門頁面排行 </h3>


                                    <ul>
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

                                    </ul>
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