import axios from 'axios';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface DeleteTaskModalProps {
    show: boolean;
    onHide: () => void;
    taskId: number | null;
}

function DeleteTaskModal({show, onHide, taskId} : DeleteTaskModalProps) {

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.delete(import.meta.env.VITE_REACT_APP_API + "/Task?id=" + taskId);
            console.log(response.data);
            onHide();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default DeleteTaskModal;