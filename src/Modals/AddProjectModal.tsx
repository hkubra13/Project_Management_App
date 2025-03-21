import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

interface AddProjectModalProps {
    show: boolean;
    onHide: () => void;
    userId: number | null;
}

function AddProjectModal({ show, onHide, userId }: AddProjectModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newProject = {
            name,
            description,
            userId: userId
        }
        try {
            const response = await axios.post(import.meta.env.VITE_REACT_APP_API + '/Project', newProject)
            console.log(response.data);
            onHide();
        } catch (error) {
            console.error('Error adding project:', error)
        }
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="projectName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter project name"
                            autoFocus
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="projectDescription">
                        <Form.Label>Project Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter project description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
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
    );
}

export default AddProjectModal;
