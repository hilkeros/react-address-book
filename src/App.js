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
      shownUsers: [],
      hasMoreItems: true,
      page: 1,
      cursor: 0
    };
  }

  loadItems() {
    let cursor = this.state.cursor;
    let hasMoreItems = this.state.hasMoreItems;
    let shownUsers = this.state.shownUsers;
     console.log('shown ' + shownUsers.length);
     console.log('loaded ' + this.state.users.length);
    if (this.state.users.length > 49){
      shownUsers = this.state.shownUsers.concat(this.state.users.slice(cursor, cursor + 50));
      cursor = cursor + 50;
    } 
    if ( this.state.users.length > 999) {
      console.log('stop');
      hasMoreItems = false;
    }
    let url = API + DEFAULT_QUERY + '&page=' + this.state.page;
    console.log('fetching ' + url);
    fetch(url) 
      .then(response => response.json())
      .then(data => 
        {
          this.setState({
            shownUsers: shownUsers,
            cursor: cursor,
            hasMoreItems: hasMoreItems,
            users: this.state.users.concat(data.results),
            page: this.state.page + 1
        })
    });
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;

    let items = [];
    this.state.shownUsers.map((user, i) => {
        items.push(
            <User user={user} key={user.login.uuid} />
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
