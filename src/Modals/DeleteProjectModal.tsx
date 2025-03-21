import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/Modal';

interface DeleteProjectModalProps {
    show: boolean,
    onHide: () => void,
    projectId: number | null
}

function DeleteProjectModal({ show, onHide, projectId }: DeleteProjectModalProps) {
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.delete(import.meta.env.VITE_REACT_APP_API + '/Project?id=' + projectId);
            console.log(response.data);
            onHide();
        } catch (error) {
            console.error("Selected project couldn't get deleted. Error:", error)
        }
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this project?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button variant="danger" type='submit'>
                        Delete
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default DeleteProjectModal;