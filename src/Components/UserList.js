import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import {Container, Row, Col, Form} from 'react-bootstrap';
import User from './User';
import spinner from '../loading.gif'

// We get users form the random users API.
// We fetch users in batches of 50 and include only the fields that we need
// We must provide a seed to get the same batch of users if we go for the next 50 results
const API = 'https://randomuser.me/api/';
const DEFAULT_QUERY = '?results=50&seed=abc?inc=name,location,email,login,phone,cell.picture,nat';

class UserList extends Component {

	constructor(props) {
    super(props);

    // Users are fetched from the random user API.
    // All the users from the API can be filtered because of a search query.
    // The filteredUsers are a subset of all users matching the search query.
    // With infinite scroll we show only 50 users at a time.
    // We prefetch the users for better performance 
    // and need another prop 'shownUsers' to hold the users that are already shown on the page.
    // To keep track of the infinite scroll and the batches we need the props
    // 'hasMoreItems, page and cursor'.
    // We show an endOfListMessage if all 1000 users are loaded.
    // The query prop contains the search query.

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

  // (Pre)Load users from the API and show them with the infinite scroll plugin
  loadItems() {
    let {cursor, hasMoreItems, endOfListMessage, users, shownUsers, page, query} = this.state;
    // Start showing users if 50 users are loaded from the API
    if (users.length > 49){
      // Check if the users should be filtered by a seach query
      let filteredUsers = this.filterUsers(users, query);
      // add 50 users from the fetched users to the shownUsers
      // use the cursor to keep track how many users we aleady transfered to the shownUsers
      shownUsers = shownUsers.concat(filteredUsers.slice(cursor, cursor + 50));
      cursor = cursor + 50;
    }
    // if 1000 users are loaded, stop fetching users from the API.
    // hasMoreItems is a property from the infinite scroll plugin that determines whether it should look for more items
    // also show a message to the user if the list is complete.
    if (users.length > 999) {
      hasMoreItems = false;
      endOfListMessage = 'End of user catalog';
    }
    // call the API with the nationality prop which is in the redux store.
    // the page parameter determines which batch we want to fetch
    // increment the page prop in the state to know how many batches we already fetched
    const url = API + DEFAULT_QUERY + '&nat=' + this.props.nationality + '&page=' + page;
    axios.get(url) 
      .then(result => this.setState({
            shownUsers: shownUsers,
            cursor: cursor,
            hasMoreItems: hasMoreItems,
            endOfListMessage: endOfListMessage,
            users: users.concat(result.data.results),
            page: page + 1
        }))
      .catch(error => this.setState({
        error,
        hasMoreItems: false,
        endOfListMessage: 'No internet connection'
      }))
  }

  // if there is no search query, just give back all users
  // if there is a search query, filter the users on matching first name and last name
  filterUsers(users, query) {
    const lowercasedQuery = query.toLowerCase();
    if (lowercasedQuery === "") {
      return users;
    } else {
     return users.filter(u => (u.name.first + ' ' + u.name.last).includes(lowercasedQuery));
    }
  }

  // if the users types in the search form
  // filter the users
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
    // Prepare a loader and the items for the infinite scroll component
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

    //Show the search form and the infinite scroll
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

const mapStateToProps = state => {
    return { nationality: state.nationality };
  };

export default connect(
  mapStateToProps,
)(UserList)
