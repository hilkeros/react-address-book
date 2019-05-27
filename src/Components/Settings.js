import React from 'react';
import { connect } from 'react-redux';
import { setNationality } from "../redux/actions";
import {Container, Row, Col, Form} from 'react-bootstrap';

// The Settings Component contains a select box to dispatch the nationality to the redux store.
class Settings extends React.Component {
  handleChange(event){
  	const nationality = event.target.value;
  	this.props.setNationality(nationality);
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
    	    	    <Form.Control 
    	    	    	as="select"
    	    	    	value={this.props.nationality}
    	    	    	onChange={this.handleChange.bind(this)}
	    	    		>
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

const mapStateToProps = state => {
    return { nationality: state.nationality };
};

function mapDispatchToProps(dispatch) {
  return {
    setNationality: nationality => dispatch(setNationality(nationality))
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Settings)