// /client/App.js
import React, { Component } from 'react';
import './App.scss'; 
import './style.scss';
// import axios from 'axios';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Main';
import AnalyticGeneral from './components/analytic/AnalyticGeneral';
import AnalyticSource from './components/analytic/AnalyticSource';
import AnalyticHot from './components/analytic/AnalyticHot';
import AnalyticInteraction from './components/analytic/AnalyticInteraction';
import AnalyticAsset from './components/analytic/AnalyticAsset';
import AnalyticPortrait from './components/analytic/AnalyticPortrait';
import AnalyticGroup from './components/analytic/AnalyticGroup';
import DBTest from './components/DBTest';
import Push from './components/push/Push';
// import ActivityNew from './components/push/ActivityNew';
// import ActivityBuilt from './components/push/ActivityBuilt';
// import ActivityModify from './components/push/ActivityModify';
// import SegmentReportNew from './components/push/SegmentReportNew';
// import SegmentReportBuilt from './components/push/SegmentReportBuilt';
// import RecoProduct from './components/push/RecoProduct';
// import RecoProductBuilt from './components/push/RecoProductBuilt';
// import HotItems from './components/push/HotItems';
// import HotItemsBuilt from './components/push/HotItemsBuilt';
// import BusinessPlaform from './components/push/BusinessPlaform';
// import RecoArticle from './components/push/RecoArticle';
// import RecoArticleBuilt from './components/push/RecoArticleBuilt';
// import PopularArticle from './components/push/PopularArticle';
// import PopularArticleBuilt from './components/push/PopularArticleBuilt';
// import MediaPlaform from './components/push/MediaPlaform';
import BlackList from './components/push/BlackList';
// import PushPage from './components/push_install/PushPage';
// import SetBlacklist from './components/push_install/SetBlackList'; 
// import InstallationGuide from './components/push_install/InstallationGuide';
import SetTrackingCode from './components/install_setting/SetTrackingCode';
import ModifySetting from './components/install_setting/ModifySetting';
import InstallTrackingCode from './components/install_setting/InstallTrackingCode';
import CheckSuccess from './components/install_setting/CheckSuccess';
import Register from './components/main_page/Register';
import Verification from './components/main_page/Verification';
import VerifySuccess from './components/main_page/VerifySuccess';
import SignIn from './components/main_page/SignIn';
import EditUserInfo from './components/main_page/EditUserInfo';
import LoginAndSecure from './components/main_page/LoginAndSecure';
import Billing from './components/main_page/Billing';
import DebitCard from './components/main_page/DebitCard';
import Service from './components/main_page/Service';
import Board from './components/install_setting/Board';
import EditPage from './components/main_page/EditPage';

class App extends Component {
  state = {}
  render() {
    return (
      <div className="all">
        <Router>
          <Route exact path="/" component={AnalyticPortrait} /> 
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
          {/* 推播 主題活動-新增 */}
          {/* <Route path="/push/add" component={ActivityNew} /> */}
          {/* 推播 主題活動-修改廣告 */}
          {/* <Route path="/push/modify" component={ActivityModify} /> */}
          {/* 推播 主題活動-已建立 */}
          {/* <Route path="/push/built" component={ActivityBuilt} /> */}
          {/* 推播 專題報導-新增 */}
          {/* <Route path="/push/reportAdd" component={SegmentReportNew} /> */}
          {/* 推播 專題報導-已建立 */}
          {/* <Route path="/push/reportBuilt" component={SegmentReportBuilt} /> */}
          {/* 推播 推薦商品 */}
          {/* <Route path="/push/recoProduct" component={RecoProduct} /> */}
          {/* 推播 推薦商品-已建立 */}
          {/* <Route path="/push/recoProductBuilt" component={RecoProductBuilt} /> */}
          {/* 推播 熱門商品 */}
          {/* <Route path="/push/hotItem" component={HotItems} /> */}
          {/* 推播 熱門商品-已建立 */}
          {/* <Route path="/push/hotItemBuilt" component={HotItemsBuilt} /> */}
          {/* 推播 選擇電商平台 */}
          {/* <Route path="/push/businessPlaform" component={BusinessPlaform} /> */}
          {/* 推播 推薦文章 */}
          {/* <Route path="/push/recoArticle" component={RecoArticle} /> */}
          {/* 推播 推薦文章-已建立 */}
          {/* <Route path="/push/recoArticleBuilt" component={RecoArticleBuilt} /> */}
          {/* 推播 熱門文章 */}
          {/* <Route path="/push/popularArticle" component={PopularArticle} /> */}
          {/* 推播 熱門文章-已建立 */}
          {/* <Route path="/push/popularArticleBuilt" component={PopularArticleBuilt} /> */}
          {/* 推播 選擇媒體平台 */}
          {/* <Route path="/push/mediaPlaform" component={MediaPlaform} /> */}
          {/* 安裝追蹤碼(設定追蹤碼) */}
          <Route path="/trackingCode/setting" component={SetTrackingCode} />
          {/* 安裝追蹤碼(修改設定) */}
          <Route path="/trackingCode/modify" component={ModifySetting} />
          {/* 安裝追蹤碼*/}
          <Route path="/trackingCode/install" component={InstallTrackingCode} />
          {/* 安裝追蹤碼(測試安裝是否成功) */}
          <Route path="/trackingCode/check" component={CheckSuccess} />
          {/* sign up(建立帳號) */}
          <Route path="/signup/register" component={Register} />
          {/* sign up(驗證) */}
          <Route path="/signup/verification" component={Verification} />
          {/* sign up(驗證成功) */}
          <Route path="/signup/success" component={VerifySuccess} />
          {/* sign in*/}
          <Route path="/signup/signin" component={SignIn} />
          {/* 會員中心 (編輯使用者資訊) */}
          <Route path="/memberCentre/edit" component={EditUserInfo} />
          {/* 會員中心 (編輯網站資訊) */}
          <Route path="/memberCentre/website" component={EditPage} />
          {/* 會員中心 (登入與帳號安全) */}
          <Route path="/memberCentre/loginAndSecure" component={LoginAndSecure} />
          {/* 會員中心(帳單與儲值) */}
          <Route path="/memberCentre/billing/:type" component={Billing} />
          {/* 會員中心 (管理方案付款-金融卡) */}
          <Route path="/memberCentre/debitCard" component={DebitCard} />
          {/* 會員中心 (服務與用量) */}
          <Route path="/memberCentre/service" component={Service} />
          {/* 推播 */}
          <Route exact path="/push" component={Push} />
          {/* 推播 黑名單 */}
          <Route path="/push/blacklist" component={BlackList} />
          {/* 布告欄（清單） */}
          <Route path="/board" component={Board} />
          {/* 特定頁面推播 */}
          {/* <Route exact path="/pushInstall" component={PushPage} /> */}
          {/* 設定黑名單-已建立 */}
          {/* <Route path="/pushInstall/blacklist" component={SetBlacklist} /> */}
          {/* 安裝教學 */}
          {/* <Route path="/pushInstall/installationGuide" component={InstallationGuide} /> */}
        </Router>
      </div>
    );
  }
}
export default App;