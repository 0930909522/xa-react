import React, { Component } from 'react';
import { FaCheck, FaTimes } from "react-icons/fa";

class TableElementEdit extends Component {
    constructor(props){
        super(props);
        this.sn = null;
        this.type = null;
        this.dn = null;
    }
    submit = () =>{
        if(this.sn.value === '' || this.type.value === '' || this.dn.value === ''){
            return;
        }
        let dn = this.dn.value.replace('https://', '').replace('http://', '').split('/')[0];
        this.props.submitData(this.props.index, [this.sn.value, this.type.value, dn]);
    }
    render() {
        const { val, index, editData } = this.props;
        return (
            <React.Fragment>
                <tr>
                    <td 
                        className="align-items-center"
                        onClick={this.props.toCheckPage}
                    >
                        {/* <input type="checkbox" className="table_checkbox" checked={val.choose} onChange={() => clickCheckbox(index)} /> */}
                        {val.verified ? <div className="warning_icon bg-success">已認證</div> : <div className="warning_icon bg-danger">未認證</div>}
                    </td>
                    <td>
                        <input type="text" className="pl-1" defaultValue={val.sn} ref={(e)=>this.sn = e} />
                    </td>
                    <td>
                        <input type="text" className="pl-1" defaultValue={val.dn} disabled={val.verified} ref={(e)=>this.dn = e} />
                    </td>
                    <td>
                        <select defaultValue={val.type} ref={(e)=>this.type = e} >
                            <option value="newmedia">新媒體</option>
                            <option value="ecommerce">電商</option>
                            <option value="house">房地產</option>
                            <option value="finance">金融</option>
                            <option value="art_entertainment">藝術與娛樂</option>
                            <option value="others">其他</option>
                        </select>
                    </td>
                    <td>
                        <FaCheck onClick={this.submit} className="btn_like mx-1" />
                        <FaTimes onClick={() => editData(index)} className="btn_like mx-1" />
                    </td>
                </tr>
            </React.Fragment>
        )
    }

}
export default TableElementEdit;