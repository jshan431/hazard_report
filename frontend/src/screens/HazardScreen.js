import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listHazardDetails
} from '../actions/hazardActions';

const HazardScreen = ({ history, match}) => {

  const dispatch = useDispatch();

  const hazardDetails = useSelector((state) => state.hazardDetails);
  const { loading, error, hazard } = hazardDetails;

  useEffect(() => {
    dispatch(listHazardDetails(match.params.id))
  }, [dispatch, match])

  return (
    <Fragment>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {
        loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Fragment>
            <Row>
              <Col md={6}>
                <Image src={hazard.image} alt={hazard.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{hazard.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>Category: {hazard.category}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {hazard.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <h1>Map Area</h1>
                </Card>
              </Col>
            </Row>
          </Fragment>
        )
      }
    </Fragment>
  )
}

export default HazardScreen
