import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import "./ProjectPage.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import EditProjectModal from "../Modals/EditProjectModal";
import DeleteProjectModal from "../Modals/DeleteProjectModal";
import ProjectPageBoards from "./ProjectPageBoards";
import BoardPage from "./BoardPage";

interface ProjectPageProps {
    projectId: number;
}

function ProjectPage({ projectId }: ProjectPageProps) {
    const [project, setProject] = useState<any>(null);
    const [showEditModal, setEditShowModal] = useState(false);
    const [showDeleteModal, setDeleteShowModal] = useState(false);
    const [boardPageId, setBoardPageId] = useState<number | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API}/Project/ByProjectId/${projectId}`)
            .then((response) => response.json())
            .then((data) => {
                setProject(data);
            })
            .catch((error) => {
                console.error("Error fetching project details:", error);
            });
    }, [projectId]);

    if (!project) {
        return <p></p>;
    }

    if (boardPageId) {
        return <BoardPage boardId={boardPageId} onBack={() => setBoardPageId(null)} />;
    }

    return (
        <main className="project-main-content">
            <div className="project-header">
                <h2>{project.name}</h2>
                <div className="project-actions">
                    <Button
                        variant="outline-primary"
                        style={{ padding: "5px 10px", fontSize: "18px" }}
                        onClick={() => setEditShowModal(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outline-danger"
                        style={{ padding: "5px 10px", fontSize: "18px" }}
                        onClick={() => setDeleteShowModal(true)}
                    >
                        Delete
                    </Button>

                </div>
            </div>

            <p>{project.description}</p>

            <ProjectPageBoards projectId={projectId} onBoardSelect={setBoardPageId} />

            <EditProjectModal
                show={showEditModal}
                onHide={() => setEditShowModal(false)}
                projectId={projectId}
                userId={project.userId}
            />

            <DeleteProjectModal
                show={showDeleteModal}
                onHide={() => setDeleteShowModal(false)}
                projectId={projectId}
            />
        </main>
    );
}

export default ProjectPage;
