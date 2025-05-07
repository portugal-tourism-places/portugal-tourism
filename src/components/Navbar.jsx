import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="Navbar">
            <div className="navbar-items">
                <NavLink to="/">
                    <button> Home </button>
                </NavLink>
                <NavLink to="/about">
                    <button> About us </button>
                </NavLink>
                <NavLink to="/createRegion">
                    <button> Create new city </button>
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;