import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import EditBoardModal from "../Modals/EditBoardModal";
import DeleteBoardModal from "../Modals/DeleteBoardModal";
import "./BoardPage.css";
import BoardPageLists from "./BoardPageLists";

interface BoardPageProps {
    onBack: () => void;
    boardId: number | null;
}

export default function BoardPage({ onBack, boardId }: BoardPageProps) {
    const [board, setBoard] = useState<any>(null);
    const [showEditBoardModal, setShowEditBoardModal] = useState(false);
    const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_REACT_APP_API + "/Board/ByBoardId/" + boardId);
                console.log(response.data);
                setBoard(response.data);
            } catch (error) {
                console.log("Error fetching board:", error);
            }
        };
        if (boardId) {
            fetchBoard();
        }
    }, [boardId]);

    if (!board) {
        return <p></p>;
    }

    return (
        <main className="board-main-content">
            <Button variant="secondary" onClick={onBack}>Back to Project</Button>
            <div className="board-header">
                <h2>{board.name}</h2>
                <div className="board-actions">
                    <Button
                        variant="outline-primary"
                        onClick={() => setShowEditBoardModal(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outline-danger"
                        onClick={() => setShowDeleteBoardModal(true)}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            <BoardPageLists boardId={boardId} />

            <EditBoardModal
                show={showEditBoardModal}
                onHide={() => setShowEditBoardModal(false)}
                projectId={board.projectId}
                boardId={boardId}
            />

            <DeleteBoardModal
                show={showDeleteBoardModal}
                onHide={() => setShowDeleteBoardModal(false)}
                boardId={boardId}
            />
        </main>
    );
}
