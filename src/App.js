import React, { Component } from 'react';
import './App.css';

import UserList from './Components/UserList'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {nationality: 'CH'}
  }
  render() {
    return <UserList nationality={this.state.nationality} />
  }

}

export default App;
