import { Link } from "react-router-dom";

function HomePage({ regions }) {
    const handleDeleteCity = (cityId) => {
        const confirmed = window.confirm(`Are you sure you want to delete this city?`);
        if (!confirmed) return;
        alert("Delete functionality should be moved to App.jsx to affect the state.");
    };

    return (
        <div>
            <h1>Portugal Tourism</h1>
            <div className="city-cards">
                {regions.length > 0 ? (
                    regions.map((city) => (
                        <div key={city.id} className="city">
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

