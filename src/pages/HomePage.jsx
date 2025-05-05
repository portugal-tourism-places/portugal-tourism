import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage(props) {
    return (
        <>
            <h1>Portugal Tourism</h1>
            {props.regions.map((city) => (
                <div key={city} className="city">
                    <div>
                        <h2>{city}</h2>
                    </div>
                    <div>
                        <Link to={`/regions/${city}`}> More Details</Link>
                    </div>
                </div>
            ))}
        </>
    );
}

export default HomePage;