import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";
// import AdvertiseType from '../share/AdvertiseType';
// import previw from '../../images/preview.png';
import { getPushPt, sendPush, modifyPush, deletePush } from '../share/ajax';
import AlertMsg from '../share/AlertMsg';
import PopMsg from '../share/PopMsg';
import { FaTrashAlt } from 'react-icons/fa';

const initialData = {
    "adId": "",
    "title": "",
    "start": "",
    "end": "",
    "usable": true,
    "tags": [],
    "ads": []
}

const initilaContain = {
    "description": "",
    "img": "",
    "title": "",
    "url": ""
}


class PushInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: null,
            laterThan: null, //晚於開始日期
            data: Object.assign({}, initialData),
            editIndex: 0,
            showAlertMsg: false,
            alertText: '',
            showDeleteMsg: false
        }
    }

    componentDidMount() {
        // 設定日期
        const Today = new Date();
        let newToday = { year: null, month: null, date: null };
        newToday.year = Today.getFullYear();
        newToday.month = ('0' + (Today.getMonth() + 1).toString()).slice(-2);
        newToday.date = ('0' + Today.getDate().toString()).slice(-2);
        newToday = newToday.year + '-' + newToday.month + '-' + newToday.date;
        this.setState({
            today: newToday,
            laterThan: newToday
        })

        // 初始化資料，端看是新增或修改
        let newData = this.forInitial(this.props.data);
        let newEditIndex = 0;
        if (this.props.data === undefined) {
            // 新增
            newData.ads = [];
            newData.action = 'add';
            newData.ads[0] = Object.assign({}, initilaContain);
        } else {
            // 修改
            // newData = this.props.data;
            newData.action = 'modify';
        }
        // 將類別加入
        newData.type = this.props.type;
        this.setState({ editIndex: newEditIndex, data: newData })
    }

    //初始化資料函式，避免多餘資料
    forInitial = (data = {}) => {
        let {
            adId = "",
            title = "",
            start = "",
            end = "",
            usable = true,
            tags = [],
            ads = []
        } = data;
        const initData = { adId, title, start, end, usable, tags, ads };
        return initData;
    }

    //彈出視窗
    popMsg = (text) => {
        this.setState({ showAlertMsg: true, alertText: text });
        setTimeout(() => {
            this.setState({ showAlertMsg: false });
        }, 5000);
    }

    //輸入資料（選）
    addingTopic = (e, type) => {
        let content = e.target.value;
        if (type === 'tags') {
            content = content.split(',');
        }
        if (type === 'start') {
            this.endTimeLinit(content);
        }
        const newData = this.state.data;
        newData[type] = content;
        this.setState({ data: newData });
    }

    //輸入資料（寫）
    addingContent = async (e, type) => {
        const content = e.target.value;
        const newData = this.state.data;
        newData.ads[this.state.editIndex][type] = content;
        if (type === 'url') {
            // 貼上來源，取得圖片
            if (content) {
                await getPushPt(content).then(res => {
                    newData.ads[this.state.editIndex]['img'] = res;
                })
            } else {
                newData.ads[this.state.editIndex]['img'] = "";
            }
        }
        this.setState({ data: newData });
    }

    // 取得tags數
    tagsAmount = () => {
        let tags = this.state.data.tags;
        if (!tags[tags.length - 1]) {
            // 如果最後一個為空
            tags.pop();
        }
        return tags.length;
    }

    // 取得結束時間限制
    endTimeLinit = (val) => {
        let start = new Date(val);
        let end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1)
        end = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
        this.setState({ laterThan: end });
    }

    // 在此主題下新增一筆
    addOne = () => {
        const index = this.state.data.ads.length;
        const newData = this.state.data;
        newData.ads[index] = Object.assign({}, initilaContain);
        this.setState({ data: newData, editIndex: index });
    }

    //切換至下一筆
    selectContent = id => {
        this.setState({ editIndex: parseInt(id) });
    }

    // 刪除一筆
    deleteELement = (e, index) => {
        e.stopPropagation();
        const newData = this.state.data;
        newData.ads.splice(index, 1);
        this.setState({ data: newData });
    }

    // 送出
    submit = () => {
        const postData = this.state.data;
        if (postData.action === 'add') {
            delete postData.adId;
            delete postData.usable;
        }

        // 確認皆為必填
        for (let i in postData) {
            if (!String(postData[i]).trim()) {
                // console.log(i, postData[i])
                this.popMsg('內容皆為必填');
                return;
            }
        }
        postData.ads.forEach(val => {
            for (let i in val) {
                if (!String(val[i]).trim() && i !== 'img') {
                    // console.log(i, val[i])
                    this.popMsg('內容皆為必填');
                    return;
                }
            }
        })

        // 判斷時間邏輯
        if (postData.start >= postData.end) {
            this.popMsg('開始時間不可等於或晚於結束時間');
            return;
        }

        //tags檢查
        if (!postData.tags[postData.tags.length - 1]) {
            // 如果最後一個為空則清除
            postData.tags.pop();
        }

        //加入brand、view
        let view = localStorage.getItem('view');
        let brand = JSON.parse(localStorage.getItem('website')).filter(val => val.websiteId === view);
        postData.brand = brand[0].siteName;
        postData.view = view;
        // console.log(postData)
        if (postData.action === 'add') {
            // 新增
            delete postData.action;
            sendPush(postData)
                .then(res => {
                    if (typeof res === 'string') {
                        this.popMsg(res);
                    }
                    if (res === 1) {
                        //成功
                        this.popMsg('資料傳送成功');
                        setTimeout(() => {
                            let param = this.props.type === 'theme' ? '主題活動' : '專題報導';
                            this.props.goback(param);
                        }, 4500);
                    } else {
                        this.popMsg('資料傳送失敗');
                    }
                })
                .catch(err => {
                    this.popMsg('發生錯誤，請稍後再試');
                    console.log(err);
                })
        } else {
            //修改
            delete postData.action;
            modifyPush(postData)
                .then(res => {
                    if (typeof res === 'string') {
                        this.popMsg(res);
                    }
                    if (res === 1) {
                        //成功
                        this.popMsg('資料修改成功');
                        setTimeout(() => {
                            let param = this.props.type === 'theme' ? '主題活動' : '專題報導';
                            this.props.goback(param);
                        }, 4500);
                    } else {
                        this.popMsg('資料修改失敗');
                    }
                })
                .catch(err => {
                    this.popMsg('發生錯誤，請稍後再試');
                    console.log(err);
                })
        }
    }

    delete = () => {
        deletePush({ adId: this.state.data.adId })
            .then(res => {
                this.setState({ showDeleteMsg: false }, () => {
                    if (typeof res === 'string') {
                        this.popMsg(res);
                    }
                    if (res === 1) {
                        //成功
                        this.popMsg('資料刪除成功');
                        setTimeout(() => {
                            let param = this.props.type === 'theme' ? '主題活動' : '專題報導';
                            this.props.goback(param);
                        }, 4500);
                    } else {
                        throw new Error();
                    }
                })
            })
            .catch(err => {
                this.popMsg('發生錯誤，請稍後再試');
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                {/* <h4 className="mt-4">選擇廣告格式</h4>
                <div className="cards">
                    {advtiseTypes.map(val => {
                        return (
                            <AdvertiseType
                                key={val.title}
                                title={val.title}
                                srcs={val.srcs}
                                value={val.index}
                                check={this.state.data.ads.length > 0 ? (val.index === parseInt(this.state.data.advertiseType) ? true : false) : false}
                                changeType={this.addingTopic}
                            />
                        )
                    })}
                </div> */}
                <AlertMsg
                    text={this.state.alertText}
                    attr={this.state.showAlertMsg ? 'opacity1' : 'opacity0'}
                    close={() => this.setState({ showAlertMsg: false })}
                />
                <PopMsg
                    show={this.state.showDeleteMsg}
                    title={'刪除資料'}
                    close={() => this.setState({ showDeleteMsg: false })}
                >
                    <h4 className="my-2">您確定要刪除此筆推播?</h4>
                    <div className="d-flex mt-3">
                        <button
                            className="btn btn-outline-primary w-100 m-3 radius20 font_20"
                            onClick={this.delete}
                        >確認
                        </button>
                        <button
                            className="btn btn-outline-primary w-100 m-3 radius20 font_20"
                            onClick={() => this.setState({ showDeleteMsg: false })}
                        >取消
                        </button>
                    </div>
                </PopMsg>
                <div className="box radius10">
                    <h4 className="my-3">新增廣告推播</h4>
                    <input
                        type="text"
                        className="input_r"
                        id="activity_name"
                        placeholder="活動名稱"
                        value={this.state.data.ads.length > 0 ? this.state.data.title : ''}
                        onChange={(e) => this.addingTopic(e, 'title')}
                    />

                    <Row className="mt-4">
                        <Col sm="6">
                            <input
                                type="date"
                                className="input_r"
                                id="start-time"
                                min={this.state.today}
                                value={this.state.data.start}
                                onChange={(e) => this.addingTopic(e, 'start')}
                            />
                        </Col>
                        <Col sm="6">
                            <input
                                type="date"
                                className="input_r"
                                id="end-time"
                                min={this.state.laterThan}
                                value={this.state.data.end}
                                onChange={(e) => this.addingTopic(e, 'end')}
                            />
                        </Col>
                    </Row>
                    <div className="mt-3">
                        <div className="box srollX">
                            <ul>
                                {
                                    this.state.data.ads.length > 0 && this.state.data.ads.map((val, index) => (
                                        <li
                                            key={index}
                                            id={this.state.editIndex === index ? 'focus' : ''}
                                            className="btn_like"
                                            onClick={() => this.selectContent(index)}
                                        >
                                            <FaTrashAlt
                                                className="delete"
                                                onClick={(e) => this.deleteELement(e, index)}
                                            />
                                            {val.title}
                                        </li>
                                    ))
                                }
                                <li className="add_li_content">
                                    <button
                                        className=" btn_noborder"
                                        onClick={this.addOne}
                                    >
                                        &#10010;
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <input
                        id="link"
                        className="input_r mt-4"
                        type="text"
                        placeholder="輸入你想推播的連結"
                        value={this.state.data.ads.length > 0 ? this.state.data.ads[this.state.editIndex].url : ''}
                        onChange={(e) => this.addingContent(e, 'url')}
                    />
                    <input
                        id="title"
                        className="input_r mt-4"
                        type="text"
                        placeholder="標題（字數限制為15字最佳）"
                        value={this.state.data.ads.length > 0 ? this.state.data.ads[this.state.editIndex].title : ''}
                        onChange={(e) => this.addingContent(e, 'title')}
                    />
                    <textarea
                        id="word"
                        className="input_r mt-4"
                        placeholder="文字（字數限制為30字最佳）"
                        rows="5"
                        value={this.state.data.ads.length > 0 ? this.state.data.ads[this.state.editIndex].description : ''}
                        onChange={(e) => this.addingContent(e, 'description')}
                    />
                    <input
                        id="tag"
                        className="input_r mt-4"
                        type="text"
                        placeholder="標籤（請用逗號分隔）"
                        value={this.state.data.ads.length > 0 ? String(this.state.data.tags) : ''}
                        onChange={(e) => this.addingTopic(e, 'tags')}
                    />
                    <p className="ml-2 mt-2">目前有 {this.tagsAmount()} 個標籤</p>
                    <div className="box_border text-left radius10">
                        <h3>預覽</h3>
                        <h4 className="text-center mt-4">{this.state.data.ads.length > 0 && this.state.data.title}</h4>
                        <div className="cards">
                            {
                                this.state.data.ads.length > 0 && this.state.data.ads.map((val, index) => (
                                    <div className="box card-item" key={index}>
                                        <img src={val.img} alt={"pt"} className="radius10" />
                                        <h6>{val.title}</h6>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {this.props.data &&
                        <div className="pl-1 mt-3">
                            <FaTrashAlt className="font_30 btn_like" onClick={() => this.setState({ showDeleteMsg: true })} />
                            <span className="d-inline-block ml-2">刪除此推播</span>
                        </div>
                    }
                    <div className="d-flex mt-3">
                        <button className="btn btn-outline-primary w-100 m-3 radius20 font_20" onClick={this.submit}>確認</button>
                        <button className="btn btn-outline-primary w-100 m-3 radius20 font_20" onClick={this.props.handleOpen}>取消</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default PushInput;