import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";
import AdvertiseType from '../share/AdvertiseType';
// import previw from '../../images/preview.png';
import Pt from '../../images/menu.png';

const initialData = {
    "title": "",
    "advertiseType": "",
    "start": ["", ""],
    "end": ["", ""],
    "state": "",
    "contain": []
}

const initilaContain = {
    "name": "",
    "url": "",
    "title": "",
    "content": "",
    "tag": "",
    "img": null
}

const advtiseTypes = [
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
]

class PushInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: null,
            data: Object.assign({}, initialData),
            editIndex: null
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

        let newData = Object.assign({}, initialData);
        let newEditIndex = 0;
        if (this.props.data === undefined) {
            newData.contain = [];
            newData.action = 'add';
            newData.contain[0] = Object.assign({}, initilaContain);
        } else {
            newData = this.props.data;
            newData.action = 'modify';
        }
        newData.type = this.props.type;
        this.setState({ editIndex: newEditIndex, data: newData })
    }
    addingTopic = (e, type, index) => {
        const content = e.target.value;
        const newData = this.state.data;
        (index === undefined) ? newData[type] = content : newData[type][index] = content;
        this.setState({ data: newData });
    }
    addingContent = (e, type) => {
        const content = e.target.value;
        const newData = this.state.data;
        newData.contain[this.state.editIndex][type] = content;
        this.setState({ data: newData });
    }

    addOne = () => {
        const index = (this.state.data.contain.length === 0) ? 0 : this.state.editIndex + 1;
        const newData = this.state.data;
        newData.contain[index] = Object.assign({}, initilaContain);
        this.setState({ data: newData, editIndex: index });
    }
    selectContent = id => {
        this.setState({ editIndex: parseInt(id) });
    }
    submit = () =>{
        console.log(this.state.data)
    }

    render() {
        return (
            <div>
                <h4 className="mt-4">選擇廣告格式</h4>
                <div className="cards">
                    {advtiseTypes.map(val => {
                        return (
                            <AdvertiseType
                                key={val.title}
                                title={val.title}
                                srcs={val.srcs}
                                value={val.index}
                                check={this.state.data.contain.length > 0 ? (val.index === parseInt(this.state.data.advertiseType) ? true : false) : false}
                                changeType={this.addingTopic}
                            />
                        )
                    })}
                </div>
                <div className="box radius10">
                    <h4 className="my-3">新增廣告推播</h4>
                    <input
                        type="text"
                        className="input_r"
                        id="activity_name"
                        placeholder="活動名稱"
                        value={this.state.data.contain.length > 0 ? this.state.data.title : ''}
                        onChange={(e) => this.addingTopic(e, 'title')}
                    />

                    <Row className="mt-4">
                        <Col sm="9">
                            <input
                                type="date"
                                className="input_r"
                                id="start-time"
                                min={this.state.today}
                                value={this.state.data.contain.length > 0 ? this.state.data.start[0] : ''}
                                onChange={(e) => this.addingTopic(e, 'start', 0)}
                            />
                        </Col>
                        <Col sm="3">
                            <input
                                type="time"
                                className="input_r"
                                value={this.state.data.contain.length > 0 ? this.state.data.start[1] : ''}
                                onChange={(e) => this.addingTopic(e, 'start', 1)}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col sm="9">
                            <input
                                type="date"
                                className="input_r"
                                id="end-time"
                                value={this.state.data.contain.length > 0 ? this.state.data.end[0] : ''}
                                onChange={(e) => this.addingTopic(e, 'end', 0)}
                            />
                        </Col>
                        <Col sm="3">
                            <input
                                type="time"
                                className="input_r"
                                value={this.state.data.contain.length > 0 ? this.state.data.end[1] : ''}
                                onChange={(e) => this.addingTopic(e, 'end', 1)}
                            />
                        </Col>
                    </Row>
                    <div className="mt-3">
                        <div className="box srollX">
                            <ul>
                                {
                                    this.state.data.contain.length > 0 && this.state.data.contain.map((val, index) => <li key={index} className="btn_like" onClick={() => this.selectContent(index)}>{val.title}</li>)
                                }
                                <li className="add_li_content">
                                    <button className=" btn_noborder" onClick={this.addOne}>&#10010;</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <input
                        id="link"
                        className="input_r mt-4"
                        type="text"
                        placeholder="輸入你想推播的連結"
                        value={this.state.data.contain.length > 0 ? this.state.data.contain[this.state.editIndex].url : ''}
                        onChange={(e) => this.addingContent(e, 'url')}
                    />
                    <input
                        id="title"
                        className="input_r mt-4"
                        type="text"
                        placeholder="標題（字數限制為15字最佳）"
                        value={this.state.data.contain.length > 0 ? this.state.data.contain[this.state.editIndex].title : ''}
                        onChange={(e) => this.addingContent(e, 'title')}
                    />
                    <textarea
                        id="word"
                        className="input_r mt-4"
                        placeholder="文字（字數限制為30字最佳）"
                        rows="5"
                        value={this.state.data.contain.length > 0 ? this.state.data.contain[this.state.editIndex].content : ''}
                        onChange={(e) => this.addingContent(e, 'content')}
                    />
                    <input
                        id="tag"
                        className="input_r mt-4"
                        type="text"
                        placeholder="標籤（最多只會出現兩個）"
                        value={this.state.data.contain.length > 0 ? this.state.data.contain[this.state.editIndex].tag : ''}
                        onChange={(e) => this.addingContent(e, 'tag')}
                    />
                    <div className="box_border text-left radius10">
                        <h3>預覽</h3>
                        <h4 className="text-center mt-4">{this.state.data.contain.length > 0 && this.state.data.title}</h4>
                        <div className="cards">
                            {
                                this.state.data.contain.length > 0 && this.state.data.contain.map((val, index) => (
                                    <div className="box card-item" key={index}>
                                        <img src={val.img} alt={val.id} className="radius10" />
                                        <h6>{val.title}</h6>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

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