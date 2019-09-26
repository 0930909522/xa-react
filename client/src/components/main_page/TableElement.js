import React from 'react';
import { FaEdit } from "react-icons/fa";

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
                    {val.type}
                </td>
                <td>
                    <FaEdit onClick={(e) => editData(index)} className="btn_like" />
                </td>
            </tr>
        </React.Fragment>
    )
}
export default TableElement;
