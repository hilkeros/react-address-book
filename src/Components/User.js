import React, { Component } from 'react';
import {Col} from 'react-bootstrap';

import UserDetail from './UserDetail'

class User extends Component {
	constructor(...args) {
		super(...args);
		this.state = { modalShow: false}
	}
	render() {
		let user = this.props.user;
		let modalClose = () => this.setState({ modalShow: false });

		return (
			<Col xs={6} md={3} className="thumb" key={user.login.uuid}>
			  <a href='#' onClick={() => this.setState({ modalShow: true })}>
			      <img src={user.picture.large} alt={user.name.first} width="128" height="128" />
			      <div className="name">{user.name.first} {user.name.last}</div>
			  </a>
			  <div className="login">{user.login.username}</div>
			  <div className="email">{user.email}</div> 

			  <UserDetail
          user={user}
          show={this.state.modalShow}
          onHide={modalClose}
        />
			</Col>
		)
	}
}

export default User