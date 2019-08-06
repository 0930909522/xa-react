import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Header from "../Header";
import NavLeftPush from "./share/NavLeftPush";
import PushTitle from "./share/PushTitle";
import { FaPlusCircle } from "react-icons/fa";
import TextItem from './share/TextItem';
import TemporaryTextBar from './share/TemporaryTextBar';
import TextItemEdit from './share/TextItemEdit';

class BlackList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: [{ name: 'wantweekly.chinatimes.com', choose: true, editing: true, editingText: null }, { name: 'www.nextmag.com.tw', choose: false, editing: false, editingText: null }],
            temporaryText: [],
            writingLinks: [],
            show: false
        };
        this.textareaVal = null;
    }
    chooseAllBlackList = (e) => {
        let newText = [...this.state.text];
        newText = newText.map(value => {
            let element = value;
            element.choose = e.target.checked;
            return element;
        })
        this.setState({ text: newText });
    }
    handleTextTick = index => {
        let newText = [...this.state.text];
        newText[index].choose = !newText[index].choose;
        this.setState({ text: newText });
    }
    deleteBlackList = () => {
        let newText = [...this.state.text];
        newText = newText.filter(value => value.choose === false);
        this.setState({ text: newText });
    }
    handleWriting = e => {
        let target = e.target.value;
        let links = target.match(/^\w+|\n[\w]+/g);
        if(links !== null){
            links = links.map(function (val) {
                return val.replace('\n', '');
            })
        }else{
            links = [];
        }
        this.setState({ writingLinks: links })
    }
    passTemporaryText = () => {
        let newText = [...this.state.temporaryText];
        newText = newText.concat(this.state.writingLinks);
        this.setState({ temporaryText: newText, writingLinks: [] });
        this.textareaVal.value = '';
    }
    deleteTemporaryText = index => {
        let newText = [...this.state.temporaryText];
        newText = newText.filter((value, ind) => ind !== index);
        this.setState({ temporaryText: newText });
    }
    saveTemporaryText = () => {
        let newText = [...this.state.temporaryText];
        newText = newText.map(val => {
            return { name: val, choose: false, editing: false }
        });
        this.setState({
            text: this.state.text.concat(newText),
            temporaryText: [],
            show: false
        });
    }
    editiTextItem = index => {
        let newText = [...this.state.text];
        newText[index].editing = true;
        this.setState({ text: newText });
    }
    editingTextItem = (index, e) =>{
        let newText = [...this.state.text];
        newText[index].editingText = e.target.value;
        console.log(newText[index].editingText)
        this.setState({ text: newText });
    }
    updateTextItem = index =>{
        let newText = [...this.state.text];
        if(newText[index].editingText !== null){
            newText[index].name = newText[index].editingText;
            newText[index].editingText = null;
        }
        newText[index].editing = false;
        this.setState({ text: newText });
    }
    render() {
        return (
            <>
                <Header />
                <div className="layout_main min_h_100">
                    <Container className="main_analytic">
                        <Row>
                            <NavLeftPush />
                            <div className="main_right">
                                <h2>推播設定<span style={{ fontSize: '20px' }}>&nbsp;/ 特定頁面推播 / 熱門商品</span></h2>
                                <PushTitle />
                                <div className="box">
                                    <div className="my-3 d-flex justify-content-between">
                                        <button className="btn_noborder" onClick={() => this.setState({ show: true })}><FaPlusCircle /></button>
                                        {this.state.text.length !== 0 && <button className="btn_outline" onClick={this.deleteBlackList}>移除</button>}
                                    </div>
                                    <table className="table_r w-100" cellPadding="15">
                                        <tbody>
                                            <tr>
                                                <td><input type="checkbox" onClick={(e) => this.chooseAllBlackList(e)} /></td>
                                                <td colSpan="2">黑名單網址</td>
                                            </tr>
                                            {(this.state.text.length !== 0) && this.state.text.map((value, index) => {
                                                return (
                                                    (value.editing !== false) ?
                                                        <TextItemEdit
                                                            name={value.name}
                                                            key={value.name}
                                                            handleTextClick={() => this.handleTextTick(index)}
                                                            isChecked={value.choose}
                                                            updateTextEdit={() => this.updateTextItem(index)}
                                                            handleTextEdit={(e)=>this.editingTextItem(index, e)}
                                                        /> :
                                                        <TextItem
                                                            name={value.name}
                                                            key={value.name}
                                                            handleTextClick={() => this.handleTextTick(index)}
                                                            isChecked={value.choose}
                                                            handleTextEdit={() => this.editiTextItem(index)}
                                                        />
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    {this.state.show &&
                                        <TemporaryTextBar
                                            handleClick={this.passTemporaryText}
                                            handleChange={(e) => this.handleWriting(e)}
                                            number={this.state.writingLinks.length}
                                            inputRef={el => this.textareaVal = el}
                                            temporaryTextLength={this.state.temporaryText.length}
                                            clearTemporaryText={() => { this.setState({ temporaryText: [] }) }}
                                            temporaryText={this.state.temporaryText}
                                            deleteTemporaryText={this.deleteTemporaryText}
                                            saveTemporaryText={this.saveTemporaryText}
                                            hideTemporaryTextBar={() => this.setState({ show: false })}
                                        />}
                                    {this.state.text.length === 0 && (
                                        <div className="text-center my-3">
                                            <h2>您尚未建立任何黑名單</h2>
                                            <button className="btn_noborder_r text-info"><h2>&nbsp;<FaPlusCircle />建立黑名單</h2></button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
}
export default BlackList;