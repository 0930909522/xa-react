import React, { Component } from 'react';
import Smallalert from '../share/Smallalert';
import AlertMsg from '../share/AlertMsg';

class CheckTrackingCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vertify: false,
            showAlertMsg: false,
            alertMsg: '測試中．．．',
            data: {
                url: '',
                name: ''
            }
        }
    }
    componentDidMount() {
        this.setState({ data: this.props.data });
    }
    copyId = () => {
        document.getElementById('copiedText').select();
        let copyState = false;
        if (document.execCommand('copy')) {
            copyState = 1;
        } else {
            copyState = 2;
        }
        this.setState({ showAlert: copyState });
        setTimeout(() => {
            this.setState({ showAlert: false });
        }, 4000);
    }
    check = () => {
        this.setState({ showAlertMsg: true });
        setTimeout(() => {
            this.setState({ showAlertMsg: false });
        }, 3000);
        // 成功的話要按按鈕才會回到列表
    }

    render() {
        return (
            <>
                <AlertMsg
                    text={this.state.alertMsg}
                    attr={this.state.showAlertMsg ? 'opacity1' : 'opacity0'}
                    close={() => this.setState({ showAlertMsg: false })}
                />
                <div className="box mb-2 bg-white radius10">
                    <h4 className="py-4 px-2 ">安裝程式碼</h4>
                    <p>程式碼會追蹤網站上的活動，提供您衡量特定事件的基準。 請複製下方的程式碼，並將其貼至網站每一個頁面的標頭標籤之間：</p>
                    <code><script src="https://r.xnet.world/xnetAnalytics.js"></script></code>
                    <div className="my-3 text-center">
                        <textarea value="<script src='https://r.xnet.world/xnetAnalytics.js'></script>" id="copiedText" className="p-2 w-75 text-center" readOnly></textarea>
                        <button className="d-block btn btn-info mx-auto my-3" onClick={this.copyId}>點我複製程式碼</button>
                        <Smallalert text="複製成功" attr={this.state.showAlert === 1 ? 'small_alert_success opacity1' : 'opacity0'} />
                        <Smallalert text="無法複製" attr={this.state.showAlert === 2 ? 'small_alert_danger opacity1' : 'opacity0'} />
                    </div>
                    <hr />
                    <h4 className="py-4 px-2 ">確認追蹤程式碼運作正常</h4>
                    <h6>若要確認追蹤程式碼運作正常，請造訪您的網站並確認該造訪已登錄在<a href="XX">即時報表</a>中。</h6>
                    <h6>初次設定需要3個工作天，若在3個工作天後狀態依然顯示「尚無活動」，你的程式碼將可能無法正確安裝。你可以查看<a href="XX">常見問題</a>以瞭解安裝方式來解決問題。</h6>
                    <div className="mt-4 d-flex  align-items-center flex-column">
                        <h5>網站名稱：{this.state.data.name}</h5>
                        <h5>網站網址：{this.state.data.url}</h5>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary btn-lg activity_btn radius20 w-50" onClick={this.check}>確認是否安裝成功</button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-primary activity_btn radius20 w-100" onClick={()=>window.location.reload()}>返回列表</button>
                    </div>
                </div>
            </>
        )
    }
}
export default CheckTrackingCode;
