import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import AddBoardModal from "../Modals/AddBoardModal";
import EditBoardModal from "../Modals/EditBoardModal";
import DeleteBoardModal from "../Modals/DeleteBoardModal";


interface ProjectPageBoardsProps {
    projectId: number;
    onBoardSelect: (boardId: number | null) => void;
}

function ProjectPageBoards({ projectId, onBoardSelect }: ProjectPageBoardsProps) {
    const [boards, setBoards] = useState<any[]>([]);
    const [showAddBoardModal, setShowAddBoardModal] = useState(false);
    const [showEditBoardModal, setShowEditBoardModal] = useState(false);
    const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);
    const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);


    const handleShowAddBoardModal = () => {
        setShowAddBoardModal(true);
    }
    const handleCloseAddBoardModal = () => {
        setShowAddBoardModal(false);
    }
    const handleShowEditBoardModal = () => {
        setShowEditBoardModal(true);
    }
    const handleCloseEditBoardModal = () => {
        setShowEditBoardModal(false);
    }
    const handleShowDeleteBoardModal = () => {
        setShowDeleteBoardModal(true);
    }
    const handleCloseDeleteBoardModal = () => {
        setShowDeleteBoardModal(false);
    }

    useEffect(() => {
        fetch(import.meta.env.VITE_REACT_APP_API + "/Board/BoardByProjectId/" + projectId)
            .then((response) => response.json())
            .then((data) => {
                setBoards(data);
            })
            .catch((error) => {
                console.error("Error fetching boards:", error);
            });
    }, [projectId]);



    return (
        <>
            <div className="boards-container">
                <h2>Boards</h2>
                <div className="board-list">

                    <Card className="board-page-card" onClick={handleShowAddBoardModal}>
                        <Card.Body className="board-page-content">
                            <Card.Title>Add Board</Card.Title>
                        </Card.Body>
                    </Card>

                    {boards.map((board) => (
                        <Card key={board.boardId} className="board-page-card" onClick={() => onBoardSelect(board.boardId)}>
                            <Card.Body className="board-page-content">
                                <Card.Title>{board.name}</Card.Title>
                                <div className="board-page-buttons">
                                    <Button
                                        variant="outline-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedBoardId(board.boardId);
                                            handleShowEditBoardModal();
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedBoardId(board.boardId);
                                            handleShowDeleteBoardModal();
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            <AddBoardModal show={showAddBoardModal} onHide={handleCloseAddBoardModal} projectId={projectId} />
            <EditBoardModal show={showEditBoardModal} onHide={handleCloseEditBoardModal} projectId={projectId} boardId={selectedBoardId} />
            <DeleteBoardModal show={showDeleteBoardModal} onHide={handleCloseDeleteBoardModal} boardId={selectedBoardId} />
        </>
    )
};

export default ProjectPageBoards;