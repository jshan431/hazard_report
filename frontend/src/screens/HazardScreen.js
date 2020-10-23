import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Map from '../components/Map';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CustomModal from '../components/CustomModal';

import {
  listHazardDetails
} from '../actions/hazardActions';

const HazardScreen = ({ history, match}) => {

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const dispatch = useDispatch();

  const hazardDetails = useSelector((state) => state.hazardDetails);
  const { loading, error, hazard } = hazardDetails;

  useEffect(() => {
    dispatch(listHazardDetails(match.params.id))
  }, [dispatch, match])

  //const coordinates = {lat: -34.397, lng: 150.644};

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
              <Col md={6}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{hazard.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>Category: {hazard.category}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {hazard.description}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Address: {hazard.address}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button variant="primary" onClick={handleShowModal}>
                      Show on map
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Card>
                  <div className="reviews-container">
                    Selection for the reviews
                  </div>
                </Card>
              </Col>
            </Row>
            <CustomModal show={showModal} onHide={handleCloseModal} heading={hazard.address ? hazard.address : ''}>
              <div className="map-container">
                <Map center={hazard.location} zoom={16} />
              </div>
            </CustomModal>
          </Fragment>
        )
      }
    </Fragment>
  )
}

export default HazardScreen;

//<Map center={hazard.coordinates} zoom={16}/>
