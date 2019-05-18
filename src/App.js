import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Container, Row, Col} from 'react-bootstrap';
import './App.css';

const API = 'https://randomuser.me/api/';
const DEFAULT_QUERY = '?results=50&seed=abc?inc=name,location,email,login,phone,cell.picture,nat';

//https://randomuser.me/api/?nat=us,dk,fr,gb
//https://randomuser.me/api/?inc=gender,name,nat
//https://randomuser.me/api/?page=3&results=10&seed=abc

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      hasMoreItems: true,
      page: 1
    };
  }

  loadItems() {
    let url = API + DEFAULT_QUERY + '&page=' + this.state.page
    fetch(url) 
      .then(response => response.json())
      .then(data => 
        {
          this.setState({
            users: this.state.users.concat(data.results),
            page: this.state.page + 1 
        })
    });
  }

  render() {
    const { users } = this.state;
    const loader = <div className="loader">Loading ...</div>;

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
      <Container>
        <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems.bind(this)}
            hasMore={this.state.hasMoreItems}
            loader={loader}>
       
          <Row>
            {items}
          </Row>
        </InfiniteScroll>
      </Container>
    );
  
  }

}

export default App;
