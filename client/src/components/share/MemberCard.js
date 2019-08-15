import React from 'react';

const MemberCard = props => {
    return (
        <div className="box card-item d-flex flex-column justify-content-between radius10">
            <h4>{props.title}</h4>
            {props.children}
            <div className="text-right"><button className="btn btn-outline-primary radius20" onClick={props.handleClick}>{props.buttonName}</button></div>
        </div>
    )
}
export default MemberCard;