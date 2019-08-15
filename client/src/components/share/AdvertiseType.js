import React from 'react';

const AdvertiseType = props => {
    return (
        <div className="box card-item radius10">
            <input
                type="radio"
                name="advertisement"
                onChange={(e) => props.changeType(e, 'advertiseType')}
                checked={props.check}
                value={props.value}
            />
            <div className="text-center">
                <img src={props.srcs} alt="page" />
                <h4 className="mt-3">{props.title}</h4>
            </div>
        </div>
    )
}
export default AdvertiseType;
