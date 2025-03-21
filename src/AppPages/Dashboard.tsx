import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import './Dashboard.css';
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import ProjectPage from "./ProjectPage";
import AddProjectModal from "../Modals/AddProjectModal";
import DashboardNavbar from "./DashboardNavbar";
import EditUserModal from "../Modals/EditUserModal";
import axios from "axios";

function Dashboard({ userId }: { userId: number | null }) {
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [user, setUser] = useState<any>(null);

    const { logout } = useAuth();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API}/Project`)
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_REACT_APP_API + "/User/ByUserId/" + userId)
                setUser(response.data)
            } catch (error) {
                console.error("Error fetching user:", error)
            }
        }
        if (userId) {
            fetchUser();
        }
    }, [userId])

    const handleModalShow = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);
    const handleShowProfileModal = () => setShowProfileModal(true);
    const handleCloseProfileModal = () => setShowProfileModal(false);

    return (
        <div className="dahsboard">
            <div className="dashboard-container">
                <div className="dashboard-body">
                    <DashboardNavbar logout={logout} show={handleShowProfileModal} />
                    <div className="main-content">
                        <Sidebar
                            projects={projects}
                            onProjectSelect={setSelectedProjectId}
                            onAddProjectClick={handleModalShow}
                            onViewAllProjects={() => setSelectedProjectId(null)}
                            userId={userId}
                        />
                        <div className="content-container">
                            {selectedProjectId ? (
                                <ProjectPage projectId={selectedProjectId} />
                            ) : (
                                <DashboardContent userId={userId} projects={projects} onProjectSelect={setSelectedProjectId} />
                            )}
                        </div>
                    </div>
                    <AddProjectModal userId={userId} show={showModal} onHide={handleModalClose} />
                    <EditUserModal show={showProfileModal} onHide={handleCloseProfileModal} userId={userId} user={user} />
                </div>
            </div>
        </div>

    );
}

export default Dashboard;
