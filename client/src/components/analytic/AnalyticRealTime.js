import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import {IoMdPeople} from "react-icons/io";
import { FaBell } from 'react-icons/fa';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import Detail from './AnalyticAssetDetail';
import Loading from '../../images/loading.svg';
import icon01 from '../../images/icon01.png';
import icon02 from '../../images/icon02.png';
import icon03 from '../../images/icon03.png';
import icon04 from '../../images/icon04.png';
// import icon04 from '../../images/icon04.png';
import { PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend, CartesianGrid, XAxis, YAxis, BarChart, Bar, } from 'recharts';

class AnalyticRealTime extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      realTime: ''
    }
  }
  componentDidMount(){
      this.get_ga('foodnext', 'realtime');
      // this.get_ga('foodnext', 'ga');
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
    // .then(response=>{
    //     return response.json();
    // })
    .then(response=>{
        //console.log(response);
        this.setState({realTime: response});
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
                {/* <div className="box">
                  <h3>即時資訊</h3>
                  <Row>
                  <div className="col-md-6">
                  <h4>即時活躍人數</h4>
                  <p>目前網站上的活躍人數</p>
                  </div>
                  <div className="col-md-6">
                  即時瀏覽量: 122
                  <p>近30分鐘內累積的瀏覽量</p>
                  </div>
                  <div className="col-md-3">
                  即時熱門關鍵字: 122
                  </div>
                  <div className="col-md-3">
                  即時熱門頁面: 122
                  </div>
                  </Row>s
                </div> */}
                <Container className="box">
                  <Row>
                  <div className="col-md-3 realtime">
                    <div className="icon"> <img src={icon01} alt=""/></div> 
                    <div className="active">在線活躍人數</div> 
                    <div className="value">150</div> 
                  </div>
                  <div className="col-md-3 realtime">
                    <div className="icon"> <img src={icon02} alt=""/></div> 
                    <div className="active">即時瀏覽量</div> 
                    <div className="value">150</div> 
                  </div>
                  <div className="col-md-3 realtime">
                    <div className="icon"> <img src={icon03} alt=""/></div> 
                    <div className="active">即時熱門關鍵字</div> 
                    <div className="value">150</div> 
                  </div>
                  <div className="col-md-3 realtime">
                    <div className="icon"><img src={icon04} alt=""/></div> 
                    <div className="active">即時熱門頁面</div> 
                    <div className="value">150</div> 
                  </div>
                  </Row>
                </Container>
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