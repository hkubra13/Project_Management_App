import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

interface EditBoardModalProps {
  show: boolean,
  onHide: () => void,
  projectId: number | null,
  board: any;
}

function EditBoardModal({ show, onHide, projectId, board }: EditBoardModalProps) {
  const [name, setName] = useState(board?.name || "");

  useEffect(() => {
    if(board){
      setName(board.name || "");
    }
  }, [board])

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedBoard = {
      boardId: board.boardId,
      name,
      projectId: projectId
    }
    try {
      const response = await axios.put(import.meta.env.VITE_REACT_APP_API + "/Board/" + board.boardId, updatedBoard);
      console.log(response.data);
      onHide();
    } catch (error) {
      console.error("Error updating board:", error)
    }
  }

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Board</Modal.Title>
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

export default EditBoardModal;