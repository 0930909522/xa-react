import React from 'react'

const EditUserInfoElement = (props) => {
    return (
        <>
            {(props.editData) ?
                <input
                    type={props.keyElement === 'email' ? 'email' : 'text'}
                    defaultValue={props.name}
                    id={props.keyElement}
                    className="input_1 mb-3"
                    onChange={(e) => props.inputWord(e)}
                    readOnly={props.readOnly}
                />
                :
                <h6 className="mb-4">{props.name}</h6>
            }
        </>
    )
}

export default EditUserInfoElement;
