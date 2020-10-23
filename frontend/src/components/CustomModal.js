import React, {Fragment} from 'react'
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({show, onHide, children, heading}) => {
  return (
    <Fragment>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default CustomModal
