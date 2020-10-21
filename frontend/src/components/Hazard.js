import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Hazard = ({hazard}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/hazard/${hazard._id}`}>
        <Card.Img src={hazard.image} variant="top" />
      </Link>
      <Card.Body>
      <Link to={`/hazard/${hazard._id}`}>
        <Card.Title as="div">
          <strong>{hazard.name}</strong>
        </Card.Title>
      </Link>
      </Card.Body>
    </Card>
  )
}

export default Hazard
