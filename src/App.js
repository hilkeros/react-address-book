import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Container, Row, Col} from 'react-bootstrap';
import './App.css';

import User from './Components/User'

const API = 'https://randomuser.me/api/';
const DEFAULT_QUERY = '?results=50&seed=abc?inc=name,location,email,login,phone,cell.picture,nat';

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

    let items = [];
    users.map((user, i) => {
        items.push(
            <User user={user} />
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
