
import "./Sidebar.css";

interface SidebarProps {
    projects: { projectId: number; name: string; userId: number; }[];
    onProjectSelect: (projectId: number | null) => void;
    onAddProjectClick: () => void;
    onViewAllProjects: () => void;
    userId: number | null;
}

function Sidebar({ projects, onProjectSelect, onAddProjectClick, onViewAllProjects, userId }: SidebarProps) {
    const userProjects = projects.filter(project => project.userId === userId)

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2 onClick={onViewAllProjects}>Projects</h2>
            </div>
            <ul className="sidebar-menu">
                <li>
                    <button onClick={onAddProjectClick}>➕ Add Project</button>
                </li>
                {userProjects.length === 0 ? (
                    <p>No projects available</p>
                ) : (
                    userProjects.map((project) => (
                        <li key={project.projectId}>
                            <button onClick={() => onProjectSelect(project.projectId)}>
                                {project.name}
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </aside>
    );
}

export default Sidebar;
