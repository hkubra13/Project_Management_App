import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavbarDropdown from './NavbarDropdown';

function DashboardNavbar({ logout, show }: { logout: () => void, show: () => void }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-custom">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand>Navbar</Navbar.Brand>
        <NavbarDropdown logout={logout} show={show} />
      </Container>
    </Navbar>
  );
}

export default DashboardNavbar;