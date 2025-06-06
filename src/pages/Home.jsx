import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function HomePage({ regions, onDeleteCity }) {
    const handleDeleteCity = (cityId) => {
        onDeleteCity(cityId);
    };

    return (
        <div>
            <article className="homePage">
                <h1> Discover Portugal</h1>
            </article>
            <div className="city-cards">
                {regions.length > 0 ? (
                    regions.map((city) => (
                        <div key={city.id} className="city"
                            style={{
                                backgroundImage: `url(${city.image})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}
                        >
                            <h2>{city["city-name"]}</h2>
                            <div className="buttons">
                                <Link to={`/regions/${city.id}`} className="details-btn">More details</Link>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteCity(city.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No cities match your search.</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;

