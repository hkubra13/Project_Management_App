import { useAuth } from "./AuthProvider";
import "./Header.css";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  openSignInModal: () => void;
  openSignUpModal: () => void;
}

function Header({ openSignInModal, openSignUpModal }: HeaderProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = (route: string) => {
    navigate(route);
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list-left">
          <li className="nav-item">
            <button className="nav-button" onClick={() => handleClick("/")}>Home</button>
          </li>
          <li className="nav-item">
            <button className="nav-button" onClick={() => handleClick("/features")}>Features</button>
          </li>
          <li className="nav-item">
            <button className="nav-button" onClick={() => handleClick("/solutions")}>Solutions</button>
          </li>
          <li className="nav-item">
            <button className="nav-button" onClick={() => handleClick("/plans")}>Plans</button>
          </li>
          <li className="nav-item">
            <button className="nav-button" onClick={() => handleClick("/support")}>Support</button>
          </li>
        </ul>

        {!isAuthenticated && (
          <ul className="nav-list-right">
            <li className="nav-item">
              <button className="nav-button" onClick={openSignInModal}>Sign In</button>
            </li>
            <li className="nav-item">
              <button className="nav-button" onClick={openSignUpModal}>Sign Up</button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;

