import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <ul className="nav flex-column">
            <li className="nav-item">
                <NavLink to="/" className="nav-link">Welcome</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/login" className="nav-link">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/register" className="nav-link">Registrarse</NavLink>
            </li>
        </ul>
    );
}

