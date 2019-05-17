import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Container, Row, Col} from 'react-bootstrap';
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
      hasMoreItems: true
    };
  }

  loadItems() {
    console.log('loading');
    fetch(API + DEFAULT_QUERY) 
      .then(response => response.json())
      .then(data => this.setState({ users: data.results }));
  }

  render() {
    const { users } = this.state;
    const loader = <Row className="loader">Loading ...</Row>;

    var items = [];
    users.map((user, i) => {
        items.push(
            <Col xs={6} md={3} className="thumb" key={i}>
              <a href="#" target="_blank">
                  <img src={user.picture.large} width="128" height="128" />
                  <div className="name">{user.name.first} {user.name.last}</div>
              </a>
              <div className="login">{user.login.username}</div>
              <div className="email">{user.email}</div> 
            </Col>
        );
    });

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems.bind(this)}
            hasMore={this.state.hasMoreItems}
            loader={loader}>

            <Container>
              <Row>
                {items}
              </Row>
            </Container>
        </InfiniteScroll>
    );
  
  }

}

export default App;
