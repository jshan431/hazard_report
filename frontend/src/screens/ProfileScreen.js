import React, { useState, useEffect} from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listHazardsForUser } from '../actions/hazardActions';

const ProfileScreen = ({ location, history }) => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ message, setMessage ] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const hazardListForUser = useSelector((state) => state.hazardListForUser)

  //Already have loading, so we rename
  const { loading: loadingHazards, error: errorHazards, hazards } = hazardListForUser

  useEffect(() => {
    // If user is not logged in, redirect to login screen
    if(!userInfo) {
      history.push('/login')
    } else {
      if(!user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listHazardsForUser());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password}));
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Reported Hazards</h2>
        {loadingHazards ? (
          <Loader />
        ) : errorHazards ? (
          <Message variant='danger'>{errorHazards}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>TITLE</th>
                <th>DATE</th>
                <th>ADDRESS</th>
                <th>CATEGORY</th>
                <th>DESCRIPTION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {hazards.map((hazard) => (
                <tr key={hazard._id}>
                  <td>{hazard.name.substring(0,25)}</td>
                  <td>{hazard.createdAt.substring(0, 10)}</td>
                  <td>{hazard.address ? hazard.address : ''}</td>
                  <td>{hazard.category}</td>
                  <td>{hazard.description.substring(0,25)}</td>
                  <td>
                    <LinkContainer to={`/hazard/${hazard._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen;