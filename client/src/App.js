// /client/App.js
import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AnalyticSource from './components/analytic/AnalyticSource'
import DBTest from './components/DBTest'

class App extends Component {
  state = {}
  render() {
    return (
      <div className="all">
        <Router>
          {/* 流料來源 */}
          <Route path="/source" component={AnalyticSource} /> 
          {/* 熱門頁面 */}
          <Route path="/hot" component={AnalyticSource} />
        </Router>
      </div>
    );
  }
}
export default App;


//架構
//Header
//Main
//  analytic
//    NavLeft
//    MainAnalytic
//Footer


// import React, { Component, useEffect, useState } from 'react';
// import NavTop from './components/NavTop';

// function Box(props) {
//   return (
//     <div>
//       <h1>{props.text} bbbbbb</h1>
//       <div>{props.subtitle}</div>
//     </div>
//   );
// }
// // = function App
// const App = () => {
//   const [count, setCount] = useState(10);
//   useEffect(() => {
//     document.title = `${count} times.`
//   })
//   return (
//     <div className="xnet">
//       <NavTop
//         text='test'
//       />
//       <Box
//         text="Hi, Buzz"
//         subtitle="React Nice!"
//       />
//       <br />
//       <br />
//       <p>You clicked {count} times</p>
//       <br />
//       <br />
//       <button onClick={() => setCount(count + 1)}>Click Me</button>
//     </div>

//   );
// }

// export default App;