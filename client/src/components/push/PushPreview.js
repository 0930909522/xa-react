import React, { Component } from 'react';

class PushPreview extends Component {
    constructor(props){
        super(props);
        this.state ={
            index: 0
        }
    }
    switch = (dir)=>{
        let newIndex = this.state.index;
        if(dir === 'l' && newIndex > 0){
            this.setState({index: newIndex-1})
        }
        if(dir === 'r' && newIndex < this.props.ads.length-1){
            this.setState({index: newIndex+1})
        }
    }
    render() {
        return (
            <div id="xnet_preview">
                <div className="xnet_theme">
                    <h1>
                        <span className="title">
                            {this.props.ads.length > 0 && this.props.title}
                        </span>
                    </h1>
                    <div className="list" style={{ height: "418px" }}>
                        <div className="prev" style={{ top: "130px" }} onClick={()=>this.switch('l')} />
                        <div className="next" style={{ top: "130px" }} onClick={()=>this.switch('r')} />
                        <ul>
                            {
                                this.props.ads.length > 0 && this.props.ads.map((val, index) => (
                                    <li className={(index === this.state.index ? 'act' : '')} key={index}>
                                        <div
                                            className="img xnetBu"
                                            style={{"backgroundImage":'url('+ val.img+')'}}
                                        >
                                            <div className="count">
                                                <span>{index+1}</span> / {this.props.ads.length}
                                            </div>
                                        </div>
                                        <h2>
                                            {val.title}
                                        </h2>
                                        <p>
                                            {val.description}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default PushPreview;
