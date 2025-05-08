import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RegionDetails() {
  const { regionId } = useParams();
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/cities.json");
        const data = response.data;
        const city = data[regionId];
        setCityData(city);
      } catch (error) {
        console.error("Error finding data", error);
      }
    }

    fetchData();
  }, [regionId]);

  if (!cityData) {
    return <p>Loading</p>;
  }

  return (
    <div className="region-details">

      <img src={cityData.image} className="region-details-img" />

      <h1>{cityData["city-name"]}</h1>

      <div className="region-details-history">
        <h2>History 📖</h2>
        <p>{cityData.history}</p>
      </div>

      <div className="region-details-food">
        <h2>Food 🥘</h2>
        <div className="region-details-food-cards">
          {cityData.food.map((item, index) => (
            <div key={index} className="region-details-food-recipes">
              {item.photo && <img src={item.photo} />}
              <h3>{item.description}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="region-details-visit">
        <h2>Places to Visit 🗺️</h2>
        <div className="region-details-visit-cards">
          {cityData["places-to-visit"].map((place, index) => (
            <div key={index} className="region-details-visit-places">
              {place.photo && <img src={place.photo} />}
              <h3>{place.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <h2>Restaurants 🍽️</h2>
    <div className="region-details-restaurants">
      {
        cityData.restaurants.map((restaurant, index) => (
          <div key={index}>
            <a href={restaurant.link} target="_blank" rel="noopener noreferrer">
              {restaurant.name}
            </a>
            <p>Rating: {restaurant.rating}</p>
          </div>
        ))
      }
      </div>
      <div className="edit-btn-div">
        <Link to={`/regions/edit/${regionId}`} className="edit-btn">Edit Region</Link>
      </div>
    </div >
  );
}

export default RegionDetails;

