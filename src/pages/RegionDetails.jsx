import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

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
    <div>
      <h1>{cityData["city-name"]}</h1>
      <img src={cityData.photo} />

      <h2>History</h2>
      <p>{cityData.history}</p>

      <h2>Food</h2>
      {cityData.food.map((item, index) => (
        <div key={index}>
          <p>{item.description}</p>
          {item.photo && <img src={item.photo} />}
        </div>
      ))}

      <h2>Places to Visit</h2>
      {cityData["places-to-visit"].map((place, index) => (
        <div key={index}>
          <p>{place.name}</p>
          {place.photo && <img src={place.photo} />}
        </div>
      ))}

      <h2>Restaurants</h2>
      {cityData.restaurants.map((restaurant, index) => (
        <div key={index}>
          <a href={restaurant.link} target="_blank" rel="noopener noreferrer">
            {restaurant.name}
          </a>
          <p>Rating: {restaurant.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default RegionDetails;

