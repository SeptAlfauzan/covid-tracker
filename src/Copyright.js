import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';

class Copyright extends React.Component{
  render(){
      return (
          <div className="col-12 row d-block pt-4 text-center">
          <small className="text-secondary">&copy;septa alfauzan</small>
          <br/>
          <small className="text-secondary">Icons made by <a className="text-dark" href='https://www.flaticon.com/authors/freepik' title="Freepik">Freepik</a> from <a className="text-dark" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></small>
          <br/>
          <small className="text-secondary">Illustration made by <a className="text-dark" href="https://www.ls.graphics/illustrations/clak" title="Clak">Clak</a> from <a className="text-dark" href="https://www.ls.graphics.com/" title="Is.graphics/illustration">www.flaticon.com</a></small>
          </div>
      );
    }
  
}

export default Copyright;

