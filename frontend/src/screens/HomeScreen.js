import React, {Fragment, useState, useEffect} from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createHazard, listHazards } from '../actions/hazardActions';
import Hazard from '../components/Hazard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { HAZARD_CREATE_RESET } from '../constants/hazardConstants';

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const hazardList = useSelector((state) => state.hazardList)
  const { loading, error, hazards} = hazardList

  const hazardCreate = useSelector((state) => state.hazardCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    hazard: createdHazard,
  } = hazardCreate;

  useEffect(() => {
    
    dispatch({ type: HAZARD_CREATE_RESET });

    if(successCreate) {
      history.push(`/hazard/${createdHazard._id}/edit`)
    } else {
      dispatch(listHazards());
    }

  }, [dispatch, userInfo, successCreate]);

  const createHazardHandler = () => {
    dispatch(createHazard());
  }
  
  return (
    <Fragment>
      <Row className='align-items-center'>
        <Col>
          <h1>Environmental Hazards</h1>
        </Col>
        <Col className='text-right'>
          {
            userInfo ? 
              <Button className='my-3' onClick={createHazardHandler}>
                <i className='fas fa-plus'></i> Report New Hazard
              </Button> : (
                <Fragment>
                  <Button className='my-3' disabled>
                    <i className='fas fa-plus'></i> Report New Hazard
                  </Button>
                  <p><small>(Must be logged in)</small></p>
                </Fragment> 
                )
          }
        </Col>
      </Row>
      <h3>Latest Reported Hazards</h3>
      {
        loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Fragment>
          <Row>
            {hazards.map((hazard) => (
              <Col key={hazard._id} sm={12} md={6} lg={4} xl={3}>
                <Hazard hazard={hazard} />
              </Col>
            ))}
          </Row>
          </Fragment>
        )
      }
    </Fragment>
  )
}

export default HomeScreen
