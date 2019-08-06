import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import NavLeftPush from "../share/NavLeftPush";
import SettingTitle from '../share/SettingTitle';

class InstallTrackingCode extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="w-100 bg_gray">
                    <div className="box w-75 mx-auto bg-white my-5">
                        <h5 className="bg-secondary p-2 text-white">
                            以電子郵件寄送程式碼
                            <button className="float-right mr-2 btn_noborder_r text-white">X</button>
                        </h5>
                        <div className="p-4">
                            <label className="w-100">收件人信箱
                                <input type="text" className="w-100 mt-2 pl-2" />
                            </label>
                            <p>操作指示和程式碼安裝</p>
                            <div className="border_gray w-100">
                                <h5 className="p-2">1. 追蹤ID</h5>
                                <h6 className="p-2">追蹤ID是系統指派的一組專屬號碼，您可以在程式碼中 使用這組號碼。</h6>
                                <h5 className="bg-light py-4 px-2 text-center">XN-00001843-1</h5>
                                <h5 className="p-2">2. 安裝程式碼</h5>
                                <h6 className="p-2">程式碼會追蹤網站上的活動，提供您衡量特定事件的基準。 請複製下方的程式碼，並將其貼至網站每一個頁面的標頭標籤之間：</h6>
                                <textarea readOnly rows="9" className="w-90 d-block mx-auto" value={"<!--xnet_java_code-->\n<script async src=\"https://www.xnettagmanager.com/gtag/js?id=XN-00001843-1\"></script>\n<script>\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\n\ngtag('config', 'XN-00001843-1');\n</script>"}></textarea>
                                <div className="text-center">
                                    <button className="btn btn-secondary activity_btn">返回</button>
                                    <button className="btn btn-secondary activity_btn">傳送</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="layout_main">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush />
                            <div className="main_right">
                                <h2>安裝追蹤碼</h2>
                                <SettingTitle three />
                                <div className="mt-20 bg-white">
                                    <div className="box bg-light mb-2">
                                        <Row>
                                            <Col sm={2}>
                                                <span>追蹤ID</span>
                                            </Col>
                                            <Col sm={10}>
                                                <span>XN-00001843-1</span>
                                            </Col>
                                        </Row>
                                    </div>
                                    <h5 className="bg-light p-3">數據狀態</h5>
                                    <div className="box mb-2">
                                        <p>過去 48 小時內曾收到流量資料。<a href="XX" className="text-primary">104</a> 位活躍使用者 (目前)。詳情請參閱<a href="XX" className="text-primary">即時流量報表</a>。</p>
                                    </div>
                                    <h5 className="bg-light p-3">網站追蹤代碼</h5>
                                    <div className="box mb-2">
                                        <p>這是此資源的全域網站代碼 (gtag.js) 追蹤程式碼。請複製這段程式碼，並在您想追蹤的每個網頁上，於 &#60;HEAD&#62; 中當作第一個項目貼上。如果您的網頁已安裝全域網站代碼，則只要從以下程式碼片段將 config 行加入您既有的全域網站代碼就行了。</p>
                                        <h5 className="my-4">1. 找出網站的標頭程式碼</h5>
                                        <p>找出網頁程式碼中的&#60;head&#62;&#60;/head&#62;標籤，或是 CMS 或網頁平台上的頁首範本。</p>
                                        <textarea readOnly rows="7" className="w-100" value={"<!-- 範例 -->\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<script>...</script>\nxnet_java_code_here\n</head>"}></textarea>
                                        <h5 className="my-4">2. 複製完整程式碼，並貼到網站標頭內</h5>
                                            <p>將程式碼貼到標頭區段的底部，緊接在&#60;/head&#62;標籤上方。你可以在網站標頭中既有的追蹤標籤（例如 Google Analytics（分析））上方或下方置入 XNET程式碼。</p>
                                            <textarea readOnly rows="9" className="w-100" value={"<!--xnet_java_code-->\n<script async src=\"https://www.xnettagmanager.com/gtag/js?id=XN-00001843-1\"></script>\n<script>\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\n\ngtag('config', 'XN-00001843-1');\n</script>"}></textarea>
                                    </div>
                                    <div className="text-center pb-4">
                                        <button className="btn btn-secondary">以電子郵件寄送操作方式</button>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
    }

export default InstallTrackingCode;
