import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


interface EditTaskModalProps {
    show: boolean;
    onHide: () => void;
    listId: number | null;
    task: any;
    userId: number | null;
}

function EditTaskModal({ show, onHide, listId, task, userId }: EditTaskModalProps) {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [dueDate, setDueDate] = useState<Date | null>(task?.dueDate || new Date());
    const [status, setStatus] = useState<number>(task?.status || 0);

    useEffect(() => {
        if(task){
            setTitle(task.title || "");
            setDescription(task.description || "");
            setDueDate(task.dueDate ? new Date(task.dueDate) : new Date());
            setStatus(task.status || 0);
        }
    }, [task]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const updatedTask = {
            title,
            description,
            dueDate:  dueDate?.toISOString(),
            status,
            listId: listId,
            userId: userId,
            taskId: task.taskId
        }
        try {
            console.log(updatedTask);
            const response = await axios.put(import.meta.env.VITE_REACT_APP_API + "/Task/" + task.taskId, updatedTask);
            console.log(response.data);
            onHide();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={3}>
                                Description
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <fieldset>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>
                                    Due Date 
                                </Form.Label>
                                <Col sm={10}>
                                    <InputGroup>
                                        <DatePicker
                                            selected={dueDate}
                                            onChange={(date: Date | null) => setDueDate(date)}
                                            className="form-control"
                                            dateFormat="yyyy-MM-dd"
                                            popperPlacement="bottom"
                                        />
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label as="legend" column sm={3}>
                                    Status
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label="Pending"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                        value={0}
                                        checked={status === 0}
                                        onChange={() => setStatus(0)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="On Progress"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                        value={1}
                                        checked={status === 1}
                                        onChange={() => setStatus(1)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Completed"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios3"
                                        value={2}
                                        checked={status === 2}
                                        onChange={() => setStatus(2)}
                                    />
                                </Col>
                            </Form.Group>

                        </fieldset>
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

export default EditTaskModal;