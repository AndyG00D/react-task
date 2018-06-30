import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<div>
//   <link
//     rel="stylesheet"
//     href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
//   />
//   <link
//     href="https://fonts.googleapis.com/css?family=Roboto:100,400,700"
//     rel="stylesheet"
//     type="text/css"
//   />
// </div>, document.head);
ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();

