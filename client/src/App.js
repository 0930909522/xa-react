// /client/App.js
import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Main';
import AnalyticGeneral from './components/analytic/AnalyticGeneral';
import AnalyticSource from './components/analytic/AnalyticSource';
import AnalyticHot from './components/analytic/AnalyticHot';
import AnalyticInteraction from './components/analytic/AnalyticInteraction';
import AnalyticAsset from './components/analytic/AnalyticAsset';
import AnalyticPortrait from './components/analytic/AnalyticPortrait';
import AnalyticGroup from './components/analytic/AnalyticGroup';
import DBTest from './components/DBTest'

class App extends Component {
  state = {}
  render() {
    return (
      <div className="all">
        <Router>
        <Route exact path="/" component={Home} /> 
          {/* 訪客總覽 */}
          <Route path="/general" component={AnalyticGeneral} /> 
          {/* 流料來源 */}
          <Route path="/source" component={AnalyticSource} /> 
          {/* 熱門頁面 */}
          <Route path="/hot" component={AnalyticHot} /> 
          {/* 互動指標 */}
          <Route path="/interaction" component={AnalyticInteraction} /> 
          {/* 資產價值 */}
          <Route path="/asset_rise" component={AnalyticAsset} />
          {/* 用戶畫像 */}
          <Route path="/portrait" component={AnalyticPortrait} />
          {/* 用戶分群 */}
          <Route path="/group" component={AnalyticGroup} />
        </Router>
      </div>
    );
  }
}
export default App;