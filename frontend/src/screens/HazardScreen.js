import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import Map from '../components/Map';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CustomModal from '../components/CustomModal';
import TinyHazard from '../components/TinyHazard';
import {
  listHazardDetails,
  listHazardsForUser
} from '../actions/hazardActions';
import { HAZARD_CREATE_REVIEW_RESET } from '../constants/hazardConstants';
import {createHazardReview} from '../actions/hazardActions';
import Rating from '../components/Rating';

const HazardScreen = ({ history, match}) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const dispatch = useDispatch();

  const hazardDetails = useSelector((state) => state.hazardDetails);
  const { loading, error, hazard } = hazardDetails;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const hazardListForUser = useSelector((state) => state.hazardListForUser)

  //Already have loading, so we rename
  const { loading: loadingHazards, error: errorHazards, hazards } = hazardListForUser

  const hazardReviewCreate = useSelector((state) => state.hazardReviewCreate)
  const {
    success: successHazardReview,
    error: errorHazardReview,
  } = hazardReviewCreate

  useEffect(() => {

    if(successHazardReview){
      alert('Comment Submitted');
      setRating(0);
      setComment('');
      dispatch({ type: HAZARD_CREATE_REVIEW_RESET })
    }

    dispatch(listHazardDetails(match.params.id));

    if(hazard){
      dispatch(listHazardsForUser(hazard.user));
    }

  }, [dispatch, match, successHazardReview])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createHazardReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  const editHazardHandler = (e) => {
    e.preventDefault();
    history.push(`/hazard/${hazard._id}/edit`);
  }

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
                  <ListGroup.Item>Reported By: {hazard.user.name}</ListGroup.Item>
                  <ListGroup.Item>Reported On: {hazard.createdAt && hazard.createdAt.substring(0,10)}</ListGroup.Item>
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
                  {
                    hazard.user._id === userInfo._id && (
                      <ListGroup.Item>
                        <Button variant="warning" onClick={editHazardHandler}>
                          Edit Hazard
                        </Button>
                      </ListGroup.Item>
                    )
                  }
                </ListGroup>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
              <h2>Comments</h2>
              {hazard.reviews.length === 0 && <Message>No Comments</Message>}
              <ListGroup variant='flush'>
                {hazard.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Comment</h2>
                  {errorHazardReview && (
                    <Message variant='danger'>{errorHazardReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Danger Level</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Low</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Moderate</option>
                          <option value='4'>4 - Very</option>
                          <option value='5'>5 - Extremely</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <h3>More reports by {hazard.user.name}</h3>
              </Col>
            </Row>
            <Row>
              {hazards ? hazards.filter((thisHazard) => thisHazard._id !== hazard._id).map((hazard) => <Col key={hazard._id}><TinyHazard key={hazard._id} hazard={hazard}/></Col>) : <Loader />}
            </Row> 
            <CustomModal show={showModal} onHide={handleCloseModal} heading={hazard.address ? hazard.address : ''}>
              <div className="map-container">
                <Map center={hazard.location} zoom={16} hazard={hazard}/>
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

                 
// { hazard.user.hazards && hazard.user.hazards.map((hazard) => (
//   <Col key={hazard._id} sm={12} md={6} lg={4} xl={3}>
//   <Hazard hazard={hazard}/>
// </Col>
// ))}

//                   {hazards ? hazards.map((hazard) => <Hazard hazard={hazard}/>) : <Loader />}