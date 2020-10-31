import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const TinyHazard = ({hazard}) => {
  return (
    <Card style={{width: '7rem'}} className="my-3 rounded">
      <Link to={`/hazard/${hazard._id}`}>
        <Card.Img src={hazard.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/hazard/${hazard._id}`}>
          <Card.Title as="div">
            <small>{hazard.name}</small>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default TinyHazard;