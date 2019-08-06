import React, { Component } from 'react';
import Pt from '../../../images/menu.png';

export default class AdvertiseType2 extends Component {
    render() {
        return (
            <>
                <h4 className="my-3">選擇廣告格式</h4>
                <div className="cards">
                    <div className="box card-item">
                        <input type="radio" name="advertisement" />
                        <div className="text-center">
                            <img src={Pt} alt="page" />
                            <h4 className="mt-3">廣告一：網頁側欄</h4>
                        </div>
                    </div>
                    <div className="box card-item">
                        <input type="radio" name="advertisement" />
                        <div className="text-center">
                            <img src={Pt} alt="page" />
                            <h4 className="mt-3">廣告三：文章列表</h4>
                        </div>
                    </div>
                    <div className="box card-item">
                        <input type="radio" name="advertisement" />
                        <div className="text-center">
                            <img src={Pt} alt="page" />
                            <h4 className="mt-3">廣告二：網頁側欄</h4>
                        </div>
                    </div>
                    <div className="box card-item">
                        <input type="radio" name="advertisement" />
                        <div className="text-center">
                            <img src={Pt} alt="page" />
                            <h4 className="mt-3">廣告四：網頁上方或下方</h4>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
