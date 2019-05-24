import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Container, Row, Col, Form} from 'react-bootstrap';
import User from './User';
import spinner from '../loading.gif'

const API = 'https://randomuser.me/api/';
const DEFAULT_QUERY = '?results=50&seed=abc?inc=name,location,email,login,phone,cell.picture,nat';

class UserList extends Component {

	constructor(props) {
    super(props);

    this.state = {
      users: [],
      filteredUsers: [],
      shownUsers: [],
      hasMoreItems: true,
      page: 1,
      cursor: 0,
      endOfListMessage: '',
      query: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.loadItems = this.loadItems.bind(this);
  }

 
  loadItems() {
    let {cursor, hasMoreItems, endOfListMessage, users, shownUsers, page, query} = this.state;
    if (users.length > 49){
      let filteredUsers = this.filterUsers(users, query);
      shownUsers = shownUsers.concat(filteredUsers.slice(cursor, cursor + 50));
      cursor = cursor + 50;
    } 
    if (users.length > 999) {
      hasMoreItems = false;
      endOfListMessage = 'End of user catalog';
    }
    const url = API + DEFAULT_QUERY + '&nat=' + this.props.nationality + '&page=' + page;
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

  filterUsers(users, query) {
    const lowercasedQuery = query.toLowerCase();
    if (lowercasedQuery === "") {
      return users;
    } else {
     return users.filter(u => (u.name.first + ' ' + u.name.last).includes(lowercasedQuery));
    }
  }

  handleSearch(event){
    const users = this.state.users;
    const query = event.target.value;
    const filteredUsers = this.filterUsers(users, query);
    this.setState({ 
      filteredUsers: filteredUsers,
      shownUsers: filteredUsers,
      query: query,
      hasMoreItems: query.length < 1
    })
  }

 
  render() {
    const loader = (
    	<div className="centered" key="loader">
    		<img src={spinner} alt="Loading ..." width="30" />
  		</div>
  		);

    let items = [];
    this.state.shownUsers.map((user) => {
        items.push(
            <User user={user} key={user.login.uuid} />
        );
    });

    return (
      <Container>
        <Row className="header">
          <Col>
            <h1>Address Book ({this.props.nationality})</h1>
            <Form>
              <Form.Control type="text" placeholder="Search..." onChange={this.handleSearch}/>
            </Form>
          </Col>
        </Row>
        <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems}
            hasMore={this.state.hasMoreItems}
            loader={loader}>
       
          <Row className='userlist'>
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
