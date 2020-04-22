import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import { Roller } from 'react-spinners-css';

class Loader extends React.Component {
  
  render() {
    return (
        <div className="col-12 d-flex center-vertical justify-content-center">
          <Roller className="text-recover-new"/>
        </div>
    );
  }
}

export default Loader;
