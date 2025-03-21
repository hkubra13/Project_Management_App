import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/esm/Form"
import Modal from "react-bootstrap/esm/Modal"

interface EditProjectModalProps {
    show: boolean;
    onHide: () => void;
    projectId: number | null;
    userId: number | null;
}

function EditProjectModal({ show, onHide, projectId, userId }: EditProjectModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const updatedProject = {
            projectId: projectId,
            name,
            description,
            userId: userId
        }
        try {
            console.log(updatedProject)
            const response = await axios.put(import.meta.env.VITE_REACT_APP_API + '/Project/' + projectId, updatedProject)
            console.log(response.data)
            onHide();
        } catch (error) {
            console.error('Error updating project:', error)
        }

    }

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
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
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
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
    )
}

export default EditProjectModal