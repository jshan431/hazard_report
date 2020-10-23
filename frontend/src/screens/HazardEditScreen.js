import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { HAZARD_UPDATE_RESET } from '../constants/hazardConstants';
import { listHazardDetails, updateHazard, deleteHazard } from '../actions/hazardActions';

const HazardEditScreen = ({ match, history}) => {
  const hazardId = match.params.id;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  //const [uploading, setUploading] = useState(false);
  const [address, setAddress] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const hazardDetails = useSelector((state) => state.hazardDetails)
  const { loading, error, hazard } = hazardDetails

  const hazardUpdate = useSelector((state) => state.hazardUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = hazardUpdate

  useEffect(() => {
    
    // If successUpdate, redirect
    if (successUpdate) {
      dispatch({ type: HAZARD_UPDATE_RESET })
      history.push('/')
    } else {
      // fetch the product details
      if (!hazard.name || hazard._id !== hazardId) {
        dispatch(listHazardDetails(hazardId))
      } else {
        // Check to see if the user is authorized to update on the frontend
        if(hazard.user !== userInfo._id){
          history.push('/');
        } else {
          // set the product details in the component's state
          setName(hazard.name)
          setImage(hazard.image)
          setCategory(hazard.category)
          setAddress(hazard.address)
          setDescription(hazard.description)
        }
      }
    }
  }, [dispatch, history, hazardId, hazard, successUpdate, userInfo])

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0]          // only grab the first file in the array of target.files
  //   const formData = new FormData()
  //   formData.append('image', file)
  //   setUploading(true)

  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }

  //     // What we get back is a path
  //     const { data } = await axios.post('/api/upload', formData, config)

  //     setImage(data)        // set the path to the state
  //     setUploading(false)
  //   } catch (error) {
  //     console.error(error)
  //     setUploading(false)
  //   }
  // }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateHazard({
        _id: hazardId,
        name,
        image,
        category,
        description,
        address,
      })
    )
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteHazard(id));
      history.push('/');
    }
  }

  return (
    <Fragment>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Hazard</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Title'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button
              variant='danger'
              className='mr-5'
              onClick={() => deleteHandler(hazard._id)}
            >
              Cancel
            </Button>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  )
}

export default HazardEditScreen
