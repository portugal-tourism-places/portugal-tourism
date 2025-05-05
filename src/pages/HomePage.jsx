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
            {cities.map((city) => (
                <div key={city.id} className="city">
                    <h2>{city.name}</h2>
                    <img src={city.image} alt={city.name} />
                    <Link to={`/regions/${city.id}`}>More Details</Link>
                </div>
            ))}
        </>
    );
}

export default HomePage;