import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

interface EditListModalProps {
  onHide: () => void;
  show: boolean;
  list: any;
  boardId: number | null;
}

function EditListModal({ show, onHide, list, boardId }: EditListModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedList = {
      name,
      boardId: boardId,
      listId: list.listId
    }
    try {
      const response = await axios.put(import.meta.env.VITE_REACT_APP_API + "/List/" + list.listId, updatedList);
      console.log(response.data);
      onHide();
    } catch (error) {
      console.error("Error updating list:", error);
    }
  }

  return (
    <>

      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit List</Modal.Title>
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

export default EditListModal;