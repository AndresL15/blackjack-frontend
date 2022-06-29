import { NavLink } from "react-router-dom"
import { logout } from "../../user/userService"

export default function MainMenu() {
    const logoutApp = () => {
        void logout();
    }
    return (
        <ul className="nav flex-column">
            <li className="nav-item">
                <NavLink to="/room" className="menu_item btn btn-sm btn-link">Blackjack</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/info" className="menu_item btn btn-sm btn-link">Info</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/" onClick={logoutApp} className="menu_item btn btn-sm btn-link">Logout</NavLink>
            </li>
        </ul>
    )
}
