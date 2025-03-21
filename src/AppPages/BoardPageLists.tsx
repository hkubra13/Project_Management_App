import { Button, Card, CloseButton, Form } from "react-bootstrap";
import "./BoardPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ListCardDropdown from "./ListCardDropdown";
import DeleteListModal from "../Modals/DeleteListModal";
import EditListModal from "../Modals/EditListModal";

interface BoardPageListsProps {
    boardId: number | null;
}

export default function BoardPageLists({ boardId }: BoardPageListsProps) {
    const [lists, setLists] = useState<any[]>([]);
    const [tasks, setTasks] = useState<{ [key: number]: any[] }>({});
    const [name, setName] = useState("");
    const [taskName, setTaskName] = useState<{ [key: number]: string }>({});
    const [addTaskButton, setAddTaskButton] = useState<{ [key: number]: boolean }>({});
    const [listId, setListId] = useState<number[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [showEditListModal, setShowEditListModal] = useState(false);
    const [showDeleteListModal, setShowDeleteListModal] = useState(false);
    const [selectedList, setSelectedList] = useState<any>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(parseInt(storedUserId));
        }
    }, []);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_REACT_APP_API + "/List/ListByBoardId/" + boardId);
                console.log(response.data);
                setLists(response.data);
            } catch (error) {
                console.error("Error fetching lists:", error);
            }
        }
        if (boardId) {
            fetchList();
        }
    }, [boardId])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newList = {
            boardId: boardId,
            name
        }
        try {
            const response = await axios.post(import.meta.env.VITE_REACT_APP_API + "/List", newList);
            console.log(response.data);
        } catch (error) {
            console.error("Error adding list:", error)
        }
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const taskRequests = listId.map(async (id) => {
                    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/Task/TaskByListId/${id}`);
                    return { listId: id, tasks: response.data };
                });

                const taskResponses = await Promise.all(taskRequests);
                const tasksByList = taskResponses.reduce((acc, { listId, tasks }) => {
                    acc[listId] = tasks;
                    return acc;
                }, {} as { [key: number]: any[] });

                setTasks(tasksByList);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        if (listId.length > 0) {
            fetchTasks();
        }
    }, [listId]);

    useEffect(() => {
        if (lists.length > 0) {
            const ids = lists.map(list => list.listId);
            setListId(ids);
        }
    }, [lists]);

    const handleAddTaskButton = (listId: number) => {
        setAddTaskButton(prevState => ({
            ...prevState,
            [listId]: !prevState[listId]
        }));
    }

    const handleAddTask = async (listId: number) => {
        const newTask = {
            listId,
            title: taskName[listId] || "",
            description: "",
            userId: userId,
            staus: 0
        };

        try {
            const response = await axios.post(import.meta.env.VITE_REACT_APP_API + "/Task", newTask);
            console.log(response.data);
            setTaskName(prevState => ({
                ...prevState,
                [listId]: ""
            }));

            const updatedTasks = { ...tasks, [listId]: [...tasks[listId], response.data] };
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    const handleEditClick = (list: any) => {
        setSelectedList(list);
        setShowEditListModal(true);
    }

    const handleDeleteClick = (list: any) => {
        setSelectedList(list);
        setShowDeleteListModal(true);
    }

    return (
        <>
            <div className="board-content">
                <h2>Lists</h2>
                <div className="board-items">
                    <Card className="board-card">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Card.Title>Add List</Card.Title>
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                <Button type="submit">Save</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    {lists.map((list) => (
                        <Card className="board-card" id={list.listId} key={list.listId}>
                            <Card.Body>
                                <Form>

                                    <Card.Title className="list-title">
                                        {list.name}
                                        <ListCardDropdown
                                            onEdit={() => handleEditClick(list)}
                                            onDelete={() => handleDeleteClick(list)} />
                                    </Card.Title>
                                    {tasks[list.listId]?.map((task) => (
                                        <Button key={task.id}>{task.title}</Button>
                                    ))}
                                    {addTaskButton[list.listId] && (
                                        <>
                                            <Form.Control
                                                type="text"
                                                value={taskName[list.listId] || ""}
                                                onChange={(e) => setTaskName(prev => ({
                                                    ...prev,
                                                    [list.listId]: e.target.value
                                                }))}
                                            />
                                            <CloseButton onClick={() => handleAddTaskButton(list.listId)} />
                                            <Button onClick={() => handleAddTask(list.listId)}>Add Task</Button>
                                        </>
                                    )}
                                    {!addTaskButton[list.listId] && (
                                        <Button onClick={() => handleAddTaskButton(list.listId)}>Add Task</Button>
                                    )}
                                </Form>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>

            <EditListModal
                onHide={() => setShowEditListModal(false)}
                show={showEditListModal}
                list={selectedList}
                boardId={boardId} />

            <DeleteListModal
                show={showDeleteListModal}
                onHide={() => setShowDeleteListModal(false)}
                listId={selectedList?.listId}
            />
        </>
    );
}
