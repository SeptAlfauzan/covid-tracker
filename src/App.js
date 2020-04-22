import React from 'react';
import Home from './Home';
import Detail from './Detail';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: false,
      country: '',
      weekBefore: '',
      now: ''
    }
  }
  handleSearch(country, weekBefore, now) {
    this.setState({
      country: country,
      weekBefore: weekBefore,
      now: now,
      searchValue: true
    })
  }
  handleResetSearch(value) {
    this.setState({
      searchValue: value
    })
  }
  render() {
    if (!this.state.searchValue) {
      return (
        <div>
          <Home search={(country, weekBefore, now) => this.handleSearch(country, weekBefore, now)} />
        </div>
      );
    } else {
      return (
        <div>
          <Detail resetSearch={(value) => this.handleResetSearch(value)} query={{
            country: this.state.country,
            weekBefore: this.state.weekBefore,
            now: this.state.now
          }} />
        </div>
      );
    }
  }
}

export default App;
