import { Modal, Button, Form } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

interface SignInModalProps {
  show: boolean;
  handleClose: () => void;
  currentUser: (userId: number | null) => void
}

export default function SignInModal({ show, handleClose, currentUser }: SignInModalProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(username, password);

      const response = await fetch(import.meta.env.VITE_REACT_APP_API
        + "/User/GetByUsername?username=" + username)
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      currentUser(userData.userId);

      handleClose();
      navigate("/dashboard");

    } catch (error) {

      setError("Invalid credentials or an error occurred. Please try again.");

    } finally {

      setLoading(false);

    }


  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <Form onSubmit={handleSignIn}>
          <Form.Group controlId="userName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>Close</Button>
        <Button variant="primary" onClick={handleSignIn} disabled={loading}>Sign In</Button>
      </Modal.Footer>
    </Modal>
  );
}

