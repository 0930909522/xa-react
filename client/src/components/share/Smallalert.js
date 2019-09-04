import React from 'react';

const Smallalert = (props) => {
    return (
        <div className={props.attr}>
            <p className="content">{props.text}</p>
        </div>
    )
}

export default Smallalert;

