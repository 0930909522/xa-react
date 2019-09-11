import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import Detail from './AnalyticAssetDetail';
import Loading from '../../images/loading.svg';
import { PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend, CartesianGrid, XAxis, YAxis, BarChart, Bar, } from 'recharts';

class AnalyticRealTime extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount(){
      this.get_ga('foodnext', 'realtime');
      this.get_ga('foodnext', 'ga');
  }
  openPopup = () => {
    this.setState(prev => ({ isDetail: !prev.isDetail }));
  }
  get_ga = (view_project, url) => {
    let postData = JSON.stringify({ view_project: view_project });
    let postOption = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: postData
    };

    fetch('http://localhost/xa/' + url, postOption)
    //fetch('http://192.168.50.103/xa/' + url, postOption)
    .then(response=>{
        return response.json();
    })
    .then(response=>{
        console.log(response);
        //realtime_render(response);
    })
    .catch((err) => {
        console.log(err);
    });
  }

  

  render() {
    return (
      <>
        <Header cateIndex={1} />
        <div className="layout_main">
          <Container className="main_analytic">
            <Row>
              <NavLeft />
              
              <div className="main_right">
                <h2>即時資訊</h2>
                <div className="box">
                 
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
export default AnalyticRealTime;