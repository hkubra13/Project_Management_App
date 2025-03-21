import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

interface AddBoardModalProps {
  show: boolean;
  onHide: () => void;
  projectId: number | null;
}

function AddBoardModal({ show, onHide, projectId }: AddBoardModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newBoard = {
      name,
      projectId: projectId
    }
    try {
      const response = await axios.post(import.meta.env.VITE_REACT_APP_API + "/Board", newBoard);
      console.log(response.data);
      onHide();
    } catch (error) {
      console.error("Error adding board:", error);
    }
  }

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Close
              </Button>
              <Button variant="primary" type='submit'>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddBoardModal;