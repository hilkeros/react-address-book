import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';

class User extends Component {
	render() {
		let user = this.props.user;
		return (
			<Col xs={6} md={3} className="thumb" key={user.login.uuid}>
			  <a href="#" target="_blank">
			      <img src={user.picture.large} width="128" height="128" />
			      <div className="name">{user.name.first} {user.name.last}</div>
			  </a>
			  <div className="login">{user.login.username}</div>
			  <div className="email">{user.email}</div> 
			</Col>
		)
	}
}

export default User