import React from 'react';
import { FaEdit } from "react-icons/fa";

const translate = (val) => {
    // 英翻中
    switch (val) {
        case 'newmedia':
            val = '新媒體';
            break;
        case 'ecommerce':
            val = '電商';
            break;
        case 'house':
            val = '房地產';
            break;
        case 'finance':
            val = '金融';
            break;
        case 'art_entertainment':
            val = '藝術與娛樂';
            break;
        case 'others':
            val = '其他';
            break;
        default:
            break;
    }
    return val;
}

const TableElement = (props) => {
    const { val, index, editData, toCheckPage } = props;
    return (
        <React.Fragment>
            <tr>
                <td
                    className="align-items-center"
                    onClick={toCheckPage}
                >
                    {/* <input type="checkbox" className="table_checkbox" checked={val.choose} onChange={() => clickCheckbox(index)} /> */}
                    {val.verified ? <div className="warning_icon bg-success">已認證</div> : <div className="warning_icon bg-danger">未認證</div>}
                </td>
                <td>
                    {val.siteName}
                </td>
                <td>
                    {val.domainName}
                </td>
                <td>
                    {translate(val.type)}
                </td>
                <td>
                    <FaEdit onClick={(e) => editData(index)} className="btn_like" />
                </td>
            </tr>
        </React.Fragment>
    )
}
export default TableElement;
