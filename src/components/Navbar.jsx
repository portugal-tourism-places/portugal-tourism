import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="Navbar">
            <NavLink to="/">
                <button>Home</button>
            </NavLink>
        </nav>
    );
}

export default Navbar;