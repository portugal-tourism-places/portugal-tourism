import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="Navbar">
            <div className="navbar-items">
                <NavLink to="/" className={"home-btn"}>
                <button className="home-btn-2" >
                        Home
                    </button>
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