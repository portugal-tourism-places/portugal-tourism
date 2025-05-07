import { NavLink } from "react-router-dom";

function Navbar () {
    return (
        <nav className="Navbar">
            <NavLink to="/">
                <button> Home </button>
            </NavLink>
            <NavLink to="/about">
                <button> About us </button>
            </NavLink>
            <NavLink to="/createRegion">
                <button> Create new city </button>
            </NavLink>
        </nav>
    );
}

export default Navbar;