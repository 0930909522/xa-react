import React from 'react';
import { FaEdit } from "react-icons/fa";

const TableElement = (props) => {
    const { val, index, editData } = props;
    return (
        <React.Fragment>
            <tr>
                <td className="align-items-center">
                    {/* <input type="checkbox" className="table_checkbox" checked={val.choose} onChange={() => clickCheckbox(index)} /> */}
                    {val.verified ? <div className="warning_icon bg-success">已認證</div> : <div className="warning_icon bg-danger">未認證</div>}
                </td>
                <td>
                    <h5>{val.sn}</h5>
                </td>
                <td>
                    {val.dn}
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
