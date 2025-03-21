import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

interface EditUserModal {
    show: boolean;
    onHide: () => void;
    userId: number | null;
    user: { FirstName: string, LastName: string, Username: string, EmailAddres: string }[]
}

function EditUserModal({ show, onHide, userId, user }: EditUserModal) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [passwordHash, setPasswordHash] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const updatedUser = {
            userId: userId,
            firstName,
            lastName,
            userName,
            email,
            passwordHash,
            role: 1
        }
        try {
            console.log(updatedUser)
            const response = await axios.put(import.meta.env.VITE_REACT_APP_API + "/User/" + userId, updatedUser);
            console.log(response.data);
            onHide();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }


    return (
        <>

            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                value={passwordHash}
                                onChange={(e) => setPasswordHash(e.target.value)} />
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

export default EditUserModal;