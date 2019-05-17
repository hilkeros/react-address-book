import React, { Component } from 'react';
import './App.css';

const API = 'https://randomuser.me/api/';
const DEFAULT_QUERY = '?results=50';

//https://randomuser.me/api/?nat=us,dk,fr,gb
//https://randomuser.me/api/?inc=gender,name,nat
//https://randomuser.me/api/?page=3&results=10&seed=abc

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch(API + DEFAULT_QUERY) 
      .then(response => response.json())
      .then(data => this.setState({ users: data.results }));
  }

  render() {
    const { users } = this.state;

    return (
      <ul>
        {users.map(user =>
          <li>
            {user.email}
          </li>
        )}
      </ul>
    );
  }

}

export default App;
