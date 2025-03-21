import axios from 'axios';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface DeleteListModalProps {
  show: boolean;
  onHide: () => void;
  listId: number;
}

function DeleteListModal({ show, onHide, listId }: DeleteListModalProps) {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.delete(import.meta.env.VITE_REACT_APP_API + "/List?id=" + listId);
      console.log(response.data);
      onHide();
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Delete List</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this list?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type='submit'>Delete</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default DeleteListModal;