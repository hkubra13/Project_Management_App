import { Button, Card, CloseButton, Form } from "react-bootstrap";
import "./BoardPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ListCardDropdown from "./ListCardDropdown";
import DeleteListModal from "../Modals/DeleteListModal";
import EditListModal from "../Modals/EditListModal";
import TaskDropdown from "./TaskDropdown";
import EditTaskModal from "../Modals/EditTaskModal";
import DeleteTaskModal from "../Modals/DeleteTaskModal";

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
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);

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

    const handleEditListClick = (list: any) => {
        setSelectedList(list);
        setShowEditListModal(true);
    }

    const handleDeleteListClick = (list: any) => {
        setSelectedList(list);
        setShowDeleteListModal(true);
    }

    const handleEditTaskClick = (task: any) => {
        setSelectedTask(task);
        setShowEditTaskModal(true);
    }

    const handleDeleteTaskClick = (task: any) => {
        setSelectedTask(task);
        setShowDeleteTaskModal(true);
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
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter list name" />
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
                                            onEdit={() => handleEditListClick(list)}
                                            onDelete={() => handleDeleteListClick(list)} />
                                    </Card.Title>

                                    {tasks[list.listId]?.map((task) => (
                                        <div key={task.id} className="task-item-container">
                                            <Button>{task.title}</Button>
                                            <TaskDropdown
                                                onEdit={() => handleEditTaskClick(task)}
                                                onDelete={() => handleDeleteTaskClick(task)} />
                                        </div>
                                    ))}

                                    {addTaskButton[list.listId] && (
                                        <>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter task title"
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
                boardId={boardId}
            />

            <DeleteListModal
                show={showDeleteListModal}
                onHide={() => setShowDeleteListModal(false)}
                listId={selectedList?.listId}
            />

            <EditTaskModal
                show={showEditTaskModal}
                onHide={() => setShowEditTaskModal(false)}
                listId={selectedTask?.listId}
                task={selectedTask}
                userId={userId}
            />

            <DeleteTaskModal 
                show={showDeleteTaskModal} 
                onHide={() => setShowDeleteTaskModal(false)} 
                taskId={selectedTask?.taskId} 
            />
        </>
    );
}
