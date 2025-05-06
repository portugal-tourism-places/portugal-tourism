import { Link } from "react-router-dom";

function HomePage(props) {
    // Convert the object to an array of city objects
    const cities = Object.entries(props.regions).map(([id, details]) => ({
        id, // The key becomes the city ID
        ...details, // Spread the rest of the city details
    }));

    return (
        <>
            <h1>Portugal Tourism</h1>
            <div className="city-cards">
                {props.regions.map((city) => (
                    <div key={city} className="city">
                        <div>
                            <h2>{city}</h2>
                        </div>
                        <div className="buttons">
                            <Link to={`/regions/${city}`} className="details-btn">More Details</Link>
                            <Link to={``} className="delete-btn">Delete</Link>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
}

export default HomePage;