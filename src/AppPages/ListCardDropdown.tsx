import { Dropdown } from "react-bootstrap";
import { FaEllipsisH } from "react-icons/fa";

interface ListCardDropdown {
    onEdit: () => void;
    onDelete: () => void;
}

export default function ListCardDropdown({ onEdit, onDelete }: ListCardDropdown) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-custom-components">
                <FaEllipsisH />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
