import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

import MainAnalytic from './analytic/AnalyticSource'

class Main extends Component {
    state = {}
    render() {
        return (
            <>
                <Header />
                <div className="xs">
                    <MainAnalytic />
                </div>
                <Footer />
            </>
        );
    }
}

export default Main;