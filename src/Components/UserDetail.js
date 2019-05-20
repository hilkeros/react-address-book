import React, { Component } from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';

class UserDetail extends Component {
	render() {
	    let user = this.props.user;
	    return (
	      <Modal
	        {...this.props}
	        size="md"
	        aria-labelledby="contained-modal-title-vcenter"
	        centered
	      >
	        <Modal.Header closeButton>
	          <Modal.Title id="contained-modal-title-vcenter">
	            {user.name.first} {user.name.last}
	          </Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	          <Container>
	          	<Row>
	          		<Col>
	          			<img src={user.picture.large} alt={user.name.first} width="128" height="128" />
          			</Col>
          			<Col>
				          <p>
				            {user.location.street}<br/>
				            {user.location.postcode} {user.location.city}<br/>
				            {user.phone}<br/>
				            {user.cell}<br/>
				          </p>
			          </Col>
		          </Row>
	          </Container>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button onClick={this.props.onHide}>Close</Button>
	        </Modal.Footer>
	      </Modal>
	    );
	  }
}

export default UserDetail