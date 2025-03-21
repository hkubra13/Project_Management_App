import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import EditProjectModal from "../Modals/EditProjectModal";
import DeleteProjectModal from "../Modals/DeleteProjectModal";
import './Dashboard.css';

interface DashboardContentProps {
    projects: any[];
    onProjectSelect: (projectId: number | null) => void;
    userId: number | null;
}

function DashboardContent({ projects, onProjectSelect, userId }: DashboardContentProps) {
    const [showEditModal, setEditShowModal] = useState(false);
    const [showDeleteModal, setDeleteShowModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

    const handleEditModalShow = (projectId: number) => {
        setSelectedProjectId(projectId);
        setEditShowModal(true);
    };
    const handleEditModalClose = () => {
        setEditShowModal(false);
        setSelectedProjectId(null);
    };

    const handleDeleteModalShow = (projectId: number) => {
        setSelectedProjectId(projectId);
        setDeleteShowModal(true);
    };
    const handleDeleteModalClose = () => {
        setDeleteShowModal(false);
        setSelectedProjectId(null);
    };

    const userProjects = projects.filter(project => project.userId === userId)
    console.log(userProjects);

    return (
        <>
            <main className="dashboard-main-content">
                <header>
                    <h1>Welcome, User</h1>
                </header>

                <section className="projects-section">
                    <h2>Projects</h2>
                    <div className="project-list">
                        {userProjects.length === 0 ? (
                            <p>No projects available</p>
                        ) : (
                            userProjects.map((project) => (
                                <Card
                                    id={project.projectId}
                                    key={project.projectId}
                                    className="clickable-card"
                                    onClick={() => onProjectSelect(project.projectId)} >
                                    <Card.Body>
                                        <Card.Title>{project.name}</Card.Title>
                                        <Card.Text>
                                            {project.description}
                                        </Card.Text>
                                        <div className="clickable-card-buttons">
                                            <Button variant="outline-primary" onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditModalShow(project.projectId)
                                            }}>
                                                Edit
                                            </Button>
                                            <Button variant="outline-danger" onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteModalShow(project.projectId)
                                            }}>
                                                Delete
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </div>
                </section>
            </main>

            <EditProjectModal
                show={showEditModal}
                onHide={handleEditModalClose}
                projectId={selectedProjectId}
                userId={userId} />

            <DeleteProjectModal
                show={showDeleteModal}
                onHide={handleDeleteModalClose}
                projectId={selectedProjectId} />

        </>
    );
}

export default DashboardContent;
