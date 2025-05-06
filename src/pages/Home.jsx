import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/";

function HomePage() {
    const [regions, setRegions] = useState({});

    useEffect(() => {
        axios.get(`${API_URL}.json`)
            .then(response => setRegions(response.data))
            .catch(error => console.error("Error finding cities", error));
    }, []);

    const handleDeleteCity = async (cityName) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${cityName}"?`);
        if (!confirmed) return;
      
        await axios.delete(`${API_URL}/${cityName}.json`)
          .then(() => {
            setRegions(prev => {
              const updated = { ...prev };
              delete updated[cityName];
              return updated;
            });
          })
          .catch((error) => {
            console.error("Error deleting city", error);
          });
      };

    return (
        <div>
            <h1>Portugal Tourism</h1>
            <div className="city-cards">
                {Object.entries(regions).map(([cityName]) => (
                    <div key={cityName} className="city">
                        <h2>{cityName}</h2>
                        <div className="buttons">
                            <Link to={`/regions/${cityName}`} className="details-btn">More details</Link>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteCity(cityName)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
