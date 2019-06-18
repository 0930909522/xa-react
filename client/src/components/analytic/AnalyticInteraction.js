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
        axios.get('/datas/analyticInteraction.json')
            .then(response => {
                this.setState({
                    circles: response.data.circles
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (<>
            <Header />
            <div className="layout_main">
                <Container className="main_analytic">
                    <Row>
                        <NavLeft />
                        <div className="main_right">
                            <h2>互動指標</h2>
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
                                            height={900}
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
                                                size: 30,
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