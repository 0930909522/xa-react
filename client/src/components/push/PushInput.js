import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";
import AdvertiseType from '../share/AdvertiseType';
import previw from '../../images/preview.png';
import Pt from '../../images/menu.png';

class PushInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ['畢業季來了！ 公司如何利用數位行銷招募進行校園徵才？', '銀行定存領1％太吃虧了！ 4招投資術教你如何穩穩賺到錢', '商業地產交易量飆高 建商競相出手搶地'],
            advertiseType: [
                {
                    index: 1,
                    title: '廣告一：網頁側欄',
                    srcs: Pt
                },
                {
                    index: 3,
                    title: '廣告三：網頁側欄(最少2則)',
                    srcs: Pt
                },
                {
                    index: 2,
                    title: '廣告二：網頁側欄',
                    srcs: Pt
                },
                {
                    index: 4,
                    title: '廣告四：網頁下方(最少3則)',
                    srcs: Pt
                }
            ],
            today: null,
            data: {
                "id": null,
                "advertiseType": null,
                "activityName": null,
                "start": [null, null],
                "end": [null, null],
                "url": null,
                "title": null,
                "content": '',
                "tag": null,
                "state": null,
                "img": null
            },
            editId: null
        }
        this.initialData = {
            
        }


    }
    componentDidMount() {
        const Today = new Date();
        const newToday = { year: null, month: null, date: null };
        newToday.year = Today.getFullYear();
        newToday.month = ('0' + (Today.getMonth() + 1).toString()).slice(-2);
        newToday.date = ('0' + Today.getDate().toString()).slice(-2);
        this.setState({
            today: newToday.year + '-' + newToday.month + '-' + newToday.date
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.editId !== prevProps.editId) {
            let newData = {
                "id": null,
                "advertiseType": null,
                "activityName": null,
                "start": [null, null],
                "end": [null, null],
                "url": null,
                "title": null,
                "content": '',
                "tag": null,
                "state": null,
                "img": null
            };
            let newEditId = isNaN(parseInt(this.props.editId)) ? null : parseInt(this.props.editId);
            if (this.props.editId !== null) {
                this.props.data.forEach(val => {
                    if (parseInt(val.id) === newEditId) {
                        newData = val;
                    }
                })
            }
            this.setState({ editId: newEditId, data: newData })
        }
    }
    addingData = (e, type, index) => {
        const content = e.target.value;
        const newData = this.state.data;
        (index === undefined) ? newData[type] = content : newData[type][index] = content;
        this.setState({ data: newData });
    }

    render() {
        return (
            <div className={!this.props.open ? 'd-none' : ''}>
                <h4 className="mt-4">選擇廣告格式</h4>
                <div className="cards">
                    {this.state.advertiseType.map(val => {
                        return (
                            <AdvertiseType
                                key={val.title}
                                title={val.title}
                                srcs={val.srcs}
                                value={val.index}
                                check={this.state.data !== null ? (val.index === parseInt(this.state.data.advertiseType) ? true : false) : false}
                                changeType={this.addingData}
                            />
                        )
                    })}
                </div>
                <div className="box">
                    <h4 className="my-3">新增廣告推播</h4>
                    <input
                        type="text"
                        className="input_r"
                        id="activity_name"
                        placeholder="活動名稱"
                        defaultValue={this.state.editId !== null ? this.state.data.activityName : ''}
                        onChange={(e) => this.addingData(e, 'activityName')}
                    />

                    <Row className="mt-4">
                        <Col sm="9">
                            <input
                                type="date"
                                className="input_r"
                                id="start-time"
                                min={this.state.today}
                                defaultValue={this.state.editId !== null ? this.state.data.start[0] : ''}
                                onChange={(e) => this.addingData(e, 'start', 0)}
                            />
                        </Col>
                        <Col sm="3">
                            <input
                                type="time"
                                className="input_r"
                                defaultValue={this.state.editId !== null ? this.state.data.start[1] : ''}
                                onChange={(e) => this.addingData(e, 'start', 1)}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col sm="9">
                            <input
                                type="date"
                                className="input_r"
                                id="end-time"
                                defaultValue={this.state.editId !== null ? this.state.data.end[0] : ''}
                                onChange={(e) => this.addingData(e, 'end', 0)}
                            />
                        </Col>
                        <Col sm="3">
                            <input
                                type="time"
                                className="input_r"
                                defaultValue={this.state.editId !== null ? this.state.data.end[1] : ''}
                                onChange={(e) => this.addingData(e, 'end', 1)}
                            />
                        </Col>
                    </Row>
                    <div className="mt-3">
                        <div className="box srollX">
                            <ul>
                                {this.state.editId !== null ?
                                    <li>{this.state.data.title}</li> :
                                    this.state.title.map(val => <li key={val}>{val}</li>)
                                }
                                <li className="add_li_content">
                                    <button className=" btn_noborder">&#10010;</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <input
                        id="link"
                        className="input_r mt-4"
                        type="text"
                        placeholder="輸入你想推播的連結"
                        defaultValue={this.state.editId !== null ? this.state.data.url : ''}
                        onChange={(e) => this.addingData(e, 'url')}
                    />
                    <input
                        id="title"
                        className="input_r mt-4"
                        type="text"
                        placeholder="標題（字數限制為15字最佳）"
                        defaultValue={this.state.editId !== null ? this.state.data.title : ''}
                        onChange={(e) => this.addingData(e, 'title')}
                    />
                    <textarea
                        id="word"
                        className="input_r mt-4"
                        placeholder="文字（字數限制為30字最佳）"
                        rows="5"
                        value={this.state.data !== null ? this.state.data.content : ''}
                        onChange={(e) => this.addingData(e, 'content')}
                    />
                    <input
                        id="tag"
                        className="input_r mt-4"
                        type="text"
                        placeholder="標籤（最多只會出現兩個）"
                        defaultValue={this.state.editId !== null ? this.state.data.tag : ''}
                        onChange={(e) => this.addingData(e, 'tag')}
                    />
                    <div className="box_border text-left radius10">
                        <h3>預覽</h3>
                        <h4 className="text-center mt-4">今周刊</h4>
                        <div className="cards">
                            <div className="box card-item">
                                <img src={this.state.editId !== null ? this.state.data.img : previw} alt="1" className="radius10" />
                                <h6>資金潮讓投資人「嗨」到高點　樂觀之餘台股要留意這4個重點</h6>
                            </div>
                            <div className="box card-item">
                                <img src={previw} alt="1" className="radius10" />
                                <h6>銀行定存領1％太吃虧了！ 4招投資術教你如何穩穩賺到錢</h6>
                            </div>
                            <div className="box card-item">
                                <img src={previw} alt="1" className="radius10" />
                                <h6>商業地產交易量飆高 建商競相出手搶地</h6>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex mt-3">
                        <button className="btn btn-outline-primary w-100 m-3 radius20 font_20" onClick={this.props.handleOpen}>確認</button>
                        <button className="btn btn-outline-primary w-100 m-3 radius20 font_20" onClick={this.props.handleOpen}>取消</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default PushInput;