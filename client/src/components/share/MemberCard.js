import React from 'react';

const MemberCard = props => {
    return (
        <div className="box card-item d-flex flex-column justify-content-between">
            <h4>{props.title}</h4>
            {props.children}
            <div className="text-right"><button className="btn btn-info">{props.buttonName}</button></div>
        </div>
    )
}
export default MemberCard;