import React from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import App from '../App';


class Settings extends React.Component {
  handleChange(event){
  	const nat = event.target.value;
  	console.log(nat);
  	this.setState({nationality: nat})
  }
  render() {
    return (
    	<Container>
    	  <Row className="header">
    	    <Col xs={6} md={3}>
    	    	<h1>Settings</h1>
    	    	<Form>
    	    		<Form.Group>
    	    	    <Form.Label>Nationality</Form.Label>
    	    	    <Form.Control as="select" onChange={this.handleChange.bind(this)}>
    	    	      <option>CH</option>
    	    	      <option>ES</option>
    	    	      <option>FR</option>
     	    	      <option>GB</option>
    	    	    </Form.Control>
    	    	  </Form.Group>
  	    	  </Form>
  	    	</Col>
	    	</Row>
    	</Container>
  	)
  }
}

export default Settings;