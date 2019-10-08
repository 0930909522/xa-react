import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";



class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount() {
        this.certificate();
    }

    getQueryObject = () => {
        let query = window.location.search;
        const queryArr = query.replace('?', '').split('&');
        let queryObject = {};
        queryArr.forEach(kev => {
            const kav = kev.split('=');
            queryObject[kav[0]] = kav[1];
        })
        return queryObject;
    }

    certificate = () => {
        const queryObject = this.getQueryObject();
        const postOption = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                "accept": 'application/json',
                "content-type": 'application/json'
            },
            body: JSON.stringify(queryObject)
        }
        fetch('https://node.aiday.org/sbir/user/verify', postOption)
        // fetch('http://192.168.50.103/sbir/user/verify', postOption)
            .then(res => res.json())
            .then(res => {
                if (res.status === 1) {
                    alert('認證成功。');
                    window.location.href = 'http://xa.aiday.org/signup/success';
                } else {
                    alert('認證失敗，請洽客服。');
                }
            })
            .catch(e => {
                console.log(e);

                alert('伺服器錯誤，請稍後再試');
            })

    }


    render() {
        return (
            <>
                <div style={{width: "100%", lineHeight: "200px", textAlign: "center"}}>認證中，請稍後...</div>
            </>
        )
    }
}
export default Billing;