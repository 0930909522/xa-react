import React, { Component } from 'react';
import { pushpage } from '../share/ajax';
// import { Container, Row } from "react-bootstrap";
// import Header from "../Header";
// import Footer from '../Footer';
// import NavLeftPush from "../share/NavLeftPush";
// import PushTitle from '../share/PushTitle';

class PushPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [
                {
                    'title': '文章',
                    'choose': false
                },
                {
                    'title': '商品',
                    'choose': false
                }
            ],
            showBtn: false,
        };
    }
    componentDidMount() {
        const getData = this.props.sendData;
        if (getData.acceptType !== null) {
            const newData = this.state.content;
            switch (getData.acceptType) {
                case 'm':
                    newData[0].choose = true;
                    break;
                case 'e':
                    newData[1].choose = true;
                    break;
                case 'me':
                    newData[0].choose = true;
                    newData[1].choose = true;
                    break;
                default:
                    break;
            }
            this.setState({ content: newData, showBtn: true });
        }
    }

    toggleClickAll = e => {
        const newContent = [...this.state.content];
        newContent.forEach(function (val) {
            val.choose = e.target.checked;
        })
        this.setState({
            content: newContent,
            showBtn: e.target.checked
        });
    }
    clickCheckbox = index => {
        const newContent = [...this.state.content];
        let booleanBtn = false;
        newContent[index].choose = !newContent[index].choose;
        for (let i of newContent) {
            if (i.choose) {
                booleanBtn = true;
                break;
            }
        }
        this.setState({
            content: newContent,
            showBtn: booleanBtn
        });
    }
    submit = () => {
        let acceptType = '';
        if (this.state.content[0].choose) {
            acceptType += 'm';
        }
        if (this.state.content[1].choose) {
            acceptType += 'e';
        }
        if (acceptType === '') {
            //不可為空
            return;
        }
        pushpage(acceptType)
            .then(res => {
                this.props.getResponseData('acceptType', acceptType);
                this.props.getResponseData('step1Data', res);
                this.props.changeStatus(2);
            })

    }

    render() {
        return (
            <>
                <div className="box radius10">
                    <table className="pushTable_r w-100" cellPadding="15">
                        <thead>
                            <tr>
                                <th colSpan="2"><input type="checkbox" onClick={this.toggleClickAll} />&nbsp;&nbsp;選取類型</th>
                            </tr>
                        </thead>
                        {this.state.content.map((val, index) => (
                            <tbody key={val.title}>
                                <tr>
                                    <td><input type="checkbox" checked={val.choose} onChange={() => this.clickCheckbox(index)} /></td>
                                    <td>{val.title}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
                <div className="text-center my-3">
                    <button className="btn btn-secondary mx-1" disabled={!this.state.showBtn} onClick={() => this.submit()}>&nbsp;&nbsp;&nbsp;確認&nbsp;&nbsp;&nbsp;</button>
                    <button className="btn btn-secondary mx-1" onClick={() => this.props.changeStatus(0)}>&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;</button>
                </div>
            </>
        )
    }
}
export default PushPage;