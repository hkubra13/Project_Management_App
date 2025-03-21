import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface NavbarDropdownProps {
  logout: () => void
  show: () => void
}

function NavbarDropdown({ logout, show }: NavbarDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Settings
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={show}><i className="bi bi-person-circle"></i> Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={logout}><i className="bi bi-box-arrow-right"></i> Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavbarDropdown;