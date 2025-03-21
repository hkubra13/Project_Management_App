import axios from 'axios';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface DeleteBoardModalProps {
  show: boolean,
  onHide: () => void,
  boardId: number | null
}

function DeleteBoardModal({ show, onHide, boardId }: DeleteBoardModalProps) {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.delete(import.meta.env.VITE_REACT_APP_API + "/Board?id=" + boardId);
      console.log(response.data);
      onHide();
    } catch (error) {
      console.error("Error deleting board:", error)
    }
  }

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Board</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this board?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type='submit'>
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default DeleteBoardModal;