import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import NavLeft from './NavLeft';
import Header from '../Header';
import Footer from '../Footer';
import Loading from '../../images/loading.svg';
import { Redirect } from 'react-router';
import { htmlInstallTrack } from '../share/checkPermission';

import CanvasJSReact from './assets/canvasjs.react';

const thisLevel = 3; //設定本頁權限 1-4

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class AnalyticAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: localStorage.getItem('view'),
      //isDetail: false,
      //assetId: "rise",
      //categoryId: "c1",
      categoryId: "all",
      subCategoryId: "",
      category: [],
      subCategory: [],
      listIndex: 0,
      listInterval: 7,
      intervalIsSet: false,
      newData: "",
      basic: "",
      articles: "",
      isLoading: false,
      noData: false,
      color: ["4f81bc", "c0504e", "9bbb58", "23bfaa", "8064a1", "4aacc5", "f79647", "788c8b", "067795"],
      assetName: [
        "上升資料",
        "衰退資產",
        "主力資產",
        "孱弱資產",
      ],
      getApi: [
        "https://node.aiday.org/sbir/asset/overview",
        "https://node.aiday.org/sbir/asset/summary",
        "https://node.aiday.org/sbir/asset/detail",
      ]
    }
  }

  componentDidMount() {
    this.getApiFromDb(0);
    //this.getDataFromDb();
  }

  apiOverview = (response) =>{
      let res = response.data;
      // if( this.state.listIndex === 2 || this.state.listIndex === 3 ){
      //   res.data = res.data.filter( item => {
      //     return item.lineChart !== null && item.name !== "平均"
      //   });
      // } 
      console.log(response);
      let category = [];
      res.data.map( (item, index) => {
        if(!item.name){
          res.data[index].name = item.id
        }
        category.push({
          id: item.id,
          name: item.name,
        });
      });

      let noData = false;
      noData = res.data.length ? false : true;
      this.setState({
        basic: res,
        isLoading: false,
        noData: noData,
        category: category,
        subCategory: [],
        articles: "",
      });
  }

  apiSummary = (response) => {
    let res = response.data;
    if( this.state.listIndex === 2 || this.state.listIndex === 3 ){
      res.data = res.data.filter( item => {
        return item.lineChart !== null && item.name !== "平均"
      });
    }
    let subCategory = [];
    res.data.map( (item, index) => {
      if(!item.name){
        res.data[index].name = item.id
      }
      subCategory.push({
        id: item.id,
        name: item.name,
      });
    });
    let noData = false;
    noData = res.data.length ? false : true;
    this.setState({
      basic: res,
      isLoading: false,
      noData: noData,
      subCategory: subCategory,
      articles: "",
    });
  }

  apiDetail = (response) => {
    let res = response.data;
    if( this.state.listIndex === 2 || this.state.listIndex === 3 ){
      res.data = res.data.filter( item => {
        return item.lineChart !== null && item.name !== "平均"
      });
    }
    this.setState({ articles: res }, () => {
      //console.log(this.state.articles);
    });
  }
  getApiFromDb = (apiIndex) => {
    axios.get(this.state.getApi[apiIndex], {
      withCredentials: true,
      params: {
        type: this.state.listIndex + 1,
        interval: this.state.listInterval,
        view: this.state.view,
        id1: this.state.categoryId,
        id2: this.state.subCategoryId,
      }
    })
    .then(response => {
      switch(apiIndex) {
        case 0 :
          this.apiOverview(response);
          break;
        case 1 :
          this.apiSummary(response);
          break;
        case 2 :
          this.apiDetail(response);
          break;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}



  //點選大標題（上升...）
  listClick(i) {
    this.setState({ isLoading: true });
    this.setState({
      //newData: this.state.basic.type[i],
      listIndex: i,
      categoryId: "all"
    }, () => {
      this.getApiFromDb(0);
    });
    
  }
  // goDetail = (id) => {
  //   console.log("id", id);
  //   this.setState({ categoryId: id });
  //   this.openPopup()
  // }

  openPopup = () => {
    this.setState(prev => ({ isDetail: !prev.isDetail }));
  }
  setInterval = (e) => {
    this.setState({
      isLoading: true,
      listInterval: e.target.value}, ()=>{
        this.state.categoryId === "all" ?
          this.getApiFromDb(0) :
          this.getApiFromDb(1);
      });
  }


  clickSubCategorylist = e => {
    let id = e.target.value;
    let name = e.target.options[e.target.selectedIndex].text;
    this.setSubCategory(id, name)
  }

  clickCategorylist = e => {
    let id = e.target.value;
    let name = e.target.options[e.target.selectedIndex].text;
    this.setCategory(id, name)
  }
  setCategory = (id, name) => {
    this.setState({
      isLoading: true,
      categoryName: name,
      subCategoryId: "",
      categoryId: id
    }, ()=> {
      if(id === "all"){
        this.getApiFromDb(0);
      } else {
        this.getApiFromDb(1);
      }
    });
  }
  setSubCategory = (id, name) => {
    this.setState({
      subCategoryName: name,
      subCategoryId: id}, ()=>{
        this.getApiFromDb(2);
    });
  }

  addPieData = () => {
    let result = [];
    let sum = 0;
    console.log(this.state.basic.data)
    this.state.basic ? this.state.basic.data.map( item => {
      sum += item.pv
    }): console.log();
    if(sum !== 0){
      let now = this;
      this.state.basic.data.map( item => {
        if( item.name !== "平均" && item.lineChart ){
          let y = item.pv;
          let p = Math.round((item.pv / sum) * 10000) / 100;
          let label = item.name;
          let id = item.id;
          result.push({ y: y, p: p, label: label, id: id, 
            click: (e) => {
              this.state.categoryId !== "all" ? 
                now.setSubCategory(e.dataPoint.id, e.dataPoint.label) :
                now.setCategory(e.dataPoint.id, e.dataPoint.label);
            }
          });
        }
      });
    }
    return result
  }

  addLineData = () => {
    let result = [];
    //console.log("item", this.state.basic.data);
    this.state.basic ? this.state.basic.data.map((item, index) => {
      let subResult = [];
      item.lineChart ? item.lineChart.map((subItem)=>{
        let _y = subItem.date.split("-")[0],
            _m = subItem.date.split("-")[1] - 1,
            _d = subItem.date.split("-")[2];
        subResult.push({
          x: new Date(_y, _m, _d),
          y: subItem.pv,
        })
      }): console.log();
      let info = {
        type: "line",
        showInLegend: true,
        name: item.name,
        markerType: "square",
        xValueFormatString: "DD MMM, YYYY",
        color: "#"+this.state.color[index],
        dataPoints: subResult
      }
      result.push(info);
    }): console.log();
    return result
  }

  addLineDetailData = () => {
    let result = [];
    
    this.state.articles ? this.state.articles.data.map( (item, index) => {
      let subResult = [];
      item.lineChart ? item.lineChart.map((subItem)=>{
        let _y = subItem.date.split("-")[0],
            _m = subItem.date.split("-")[1] - 1,
            _d = subItem.date.split("-")[2];
        subResult.push({
          x: new Date(_y, _m, _d),
          y: subItem.pv,
        })
      }): console.log();
      let info = {
        type: "line",
        showInLegend: true,
        name: item.name,
        markerType: "square",
        xValueFormatString: "DD MMM, YYYY",
        color: "#"+this.state.color[index],
        dataPoints: subResult
      }
      //console.log("info", info);
      result.push(info);
    }): console.log();
    return result
  }

  render() {
    const RADIAN = Math.PI / 180;
    const proportion = this.state.newData.proportion;
    const lineChart = this.state.newData.lineChart;
    const pieData = {
			exportEnabled: false,
      animationEnabled: true,
      // width: 400,
			// title: {
			// 	text: "全部分類"
      // },
      titleFontSize: 14,
      legend:{
        cursor: "pointer",
        verticalAlign	:"top",
        horizontalAlign	:"center",
        itemclick: (e) => {
          console.log(e);
          this.state.categoryId !== "all" ? 
            this.setSubCategory(e.dataPoint.id, e.dataPoint.label) :
            this.setCategory(e.dataPoint.id, e.dataPoint.label);
        }
      },
			data: [{
        type: "pie",
        radius:  "80%",
				startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}",
				showInLegend: true,
				legendText: "{label}",
				indexLabelFontSize: 14,
        indexLabel: "{label}：{p}% - 瀏覽數：{y} ",
				dataPoints: this.addPieData()
			}]
    };
    const lineData = {
			animationEnabled: true,
			// title:{
			// 	text: "Monthly Sales - 2017"
      // },
      // width: 700,
      axisX:{      
        valueFormatString: "DD-MMM 2019" ,
        // labelAngle: -50
      },
			axisY: {
				title: "瀏覽量",
				//prefix: "$",
				includeZero: false
			},
			data: this.addLineData()
    };
    const lineDetailData = {
			animationEnabled: true,
      axisX:{      
        valueFormatString: "DD-MMM" ,
        labelAngle: -50
      },
			axisY: {
				title: "瀏覽量",
				includeZero: false
			},
			data: this.addLineDetailData()
		};
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
                <h2>資產價值</h2>
                { level < thisLevel ? htmlInstallTrack(level, thisLevel) :
                <>
                  <div className="box">
                    <div className="list">
                      <ul>                    
                        {this.state.assetName.map((item, index) =>
                            index === this.state.listIndex ?
                              <li onClick={() => this.listClick(index)} className="act" key={index}>{item}</li> :
                              <li onClick={() => this.listClick(index)} key={index}>{item}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="box">
                    <h3>分類占比
                      <hr className="mobile-show"/>
                      <div className="select inlne">
                        <label>
                          主分類：
                          <select value={this.state.categoryId} onChange={this.clickCategorylist}>
                            <option value="all">全部</option>
                            {this.state.category ? this.state.category.map( (item, index) => 
                              <option key={index} value={item.id}>{item.name}</option>
                            ):console.log("Error")}
                          </select>
                        </label>

                        {this.state.subCategory.length > 0 ? <label>
                          次分類：
                          <select value={this.state.subCategoryId} onChange={this.clickSubCategorylist}>
                            <option value="all">全部</option>
                            {this.state.subCategory ? this.state.subCategory.map( (item, index) => 
                              <option key={index} value={item.id}>{item.name}</option>
                            ):console.log("Error")}
                          </select>
                        </label> : <span/>}

                        {/* subCategory */}
                        <label>
                          分析區間：
                          <select onChange={this.setInterval}>
                            <option value="7">一週趨勢</option>
                            <option value="5">5日趨勢</option>
                            <option value="3">3日趨勢</option>
                            <option value="1">1日趨勢</option>
                          </select>
                        </label>
                      </div>
                    </h3>
                    
                    
                    <div className="chart_box">
                      {this.state.categoryId !== "all" ? 
                        <div className="subtitle">主分類：<span>{this.state.categoryName}</span></div> : <span />
                      }
                      <div className="chart" >
                        {/* {renderProportion} */}
                        {this.state.isLoading ? 
                          <div style={{lineHeight: "300px"}}><img src={Loading} alt="Loading" /></div> : 
                          !this.state.noData ? <CanvasJSChart options = {pieData} /> : <div style={{lineHeight: "300px"}}>該分類區間下無顯著資料</div>
                        }
                      </div>
                    </div>
                    
                    {this.state.articles.data ? <React.Fragment>
                      <h3>{this.state.subCategoryName} <span>文章排行</span></h3>
                      <ul className="articles">
                        {this.state.articles.data.map( (item, index) => 
                          <li key={index}>
                            <span className="pv"><span>瀏覽 </span>{item.pv}</span> <a href={item.id}>{item.name}</a>
                          </li>
                        )}
                      </ul>
                      <hr/>
                      <div className="chart_box">
                        <CanvasJSChart options = {lineDetailData} /> 
                      </div>
                      
                    </React.Fragment> : <span />}
                    
                  </div>
                  <div className="box">
                    <h3>{this.state.newData.name} 流量統計</h3>
                    <div className="chart_box">
                      <div className="chart">

                        {this.state.isLoading ? 
                          <div style={{lineHeight: "300px"}}><img src={Loading} alt="Loading" /></div> : 
                          !this.state.noData ? <CanvasJSChart options = {lineData} /> : <div style={{lineHeight: "300px"}}>該區間無資料</div>
                        }
                        
                      </div>
                    </div>
                  </div>
                </>}
              </div>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
export default AnalyticAsset;