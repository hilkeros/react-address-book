import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Container, Row, Col} from 'react-bootstrap';
import User from './User';
import spinner from '../loading.gif'

const API = 'https://randomuser.me/api/';
const DEFAULT_QUERY = '?results=50&seed=abc?inc=name,location,email,login,phone,cell.picture,nat';

class UserList extends Component {

	constructor(props) {
    super(props);

    this.state = {
      users: [],
      shownUsers: [],
      hasMoreItems: true,
      page: 1,
      cursor: 0,
      endOfListMessage: ''
    };
  }

  loadItems() {
    let {cursor, hasMoreItems, endOfListMessage, users, shownUsers, page} = this.state;
    if (users.length > 49){
      shownUsers = shownUsers.concat(users.slice(cursor, cursor + 50));
      cursor = cursor + 50;
    } 
    if (users.length > 999) {
      hasMoreItems = false;
      endOfListMessage = 'End of user catalog';
    }
    const url = API + DEFAULT_QUERY + '&page=' + page;
    fetch(url) 
      .then(response => response.json())
      .then(data => 
        {
          this.setState({
            shownUsers: shownUsers,
            cursor: cursor,
            hasMoreItems: hasMoreItems,
            endOfListMessage: endOfListMessage,
            users: users.concat(data.results),
            page: page + 1
        })
    });
  }

  render() {
    const loader = (
    	<div className="centered">
    		<img src={spinner} alt="Loading ..." width="30" />
  		</div>
  		);

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
        <Row>
        	<Col className='centered'>
        		{this.state.endOfListMessage}
        	</Col>
      	</Row>
      </Container>
    );
  
  }

}

export default UserList;
