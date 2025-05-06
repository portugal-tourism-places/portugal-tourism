import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRegion() {
  const { regionId } = useParams();
  const navigate = useNavigate();

  const [cityData, setCityData] = useState(null); 
  const [history, setHistory] = useState("");
  const [cityName, setCityName] = useState("");
  const [food, setFood] = useState([]);
  const [placesToVisit, setPlacesToVisit] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (regionId) {
      axios
        .get(`https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/cities/${regionId}.json`)
        .then((response) => {
          if (response.data) {
            setCityData(response.data);
            setHistory(response.data.history || "");
            setCityName(response.data["city-name"] || "");
            setFood(response.data.food || []);
            setPlacesToVisit(response.data["places-to-visit"] || []);
            setRestaurants(response.data.restaurants || []);
          }
        })
        .catch((error) => {
            console.log("Error loading data", error);
        });
    }
  }, [regionId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...cityData,
      "city-name": cityName,
      history,
      food,
      "places-to-visit": placesToVisit,
      restaurants,
    };

    axios
      .put(`https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/cities/${regionId}.json`, updatedData)
      .then(() => {
        navigate(`/regions/${regionId}`);
      })
      .catch((error) => {
        console.log("Error updating data", error);
      });
  };

  const handleFoodChange = (index, field, value) => {
    const updatedFood = [...food];
    updatedFood[index] = { ...updatedFood[index], [field]: value };
    setFood(updatedFood);
  };

  const handlePlacesToVisitChange = (index, field, value) => {
    const updatedPlaces = [...placesToVisit];
    updatedPlaces[index] = { ...updatedPlaces[index], [field]: value };
    setPlacesToVisit(updatedPlaces);
  };

  const handleRestaurantsChange = (index, field, value) => {
    const updatedRestaurants = [...restaurants];
    updatedRestaurants[index] = { ...updatedRestaurants[index], [field]: value };
    setRestaurants(updatedRestaurants);
  };

  if (!cityData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Edit</h3>

      <form >
        <label>
          City Name:
          <input
            type="text"
            name="city-name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </label>

        <label>
          History:
          <textarea
            name="history"
            placeholder="Edit history"
            value={history}
            onChange={(e) => setHistory(e.target.value)}
          />
        </label>

        <div>
          <h4>Edit Food</h4>
          {food.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Food description"
                value={item.description}
                onChange={(e) => handleFoodChange(index, "description", e.target.value)}
              />
              <input
                type="text"
                placeholder="Food photo URL"
                value={item.photo}
                onChange={(e) => handleFoodChange(index, "photo", e.target.value)}
              />
            </div>
          ))}
        </div>

        <div>
          <h4>Edit Places to Visit</h4>
          {placesToVisit.map((place, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Place name"
                value={place.name}
                onChange={(e) => handlePlacesToVisitChange(index, "name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Place photo URL"
                value={place.photo}
                onChange={(e) => handlePlacesToVisitChange(index, "photo", e.target.value)}
              />
            </div>
          ))}
        </div>

        <div>
          <h4>Edit Restaurants</h4>
          {restaurants.map((restaurant, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Restaurant name"
                value={restaurant.name}
                onChange={(e) => handleRestaurantsChange(index, "name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Restaurant link"
                value={restaurant.link}
                onChange={(e) => handleRestaurantsChange(index, "link", e.target.value)}
              />
              <input
                type="number"
                placeholder="Rating"
                value={restaurant.rating}
                onChange={(e) => handleRestaurantsChange(index, "rating", e.target.value)}
              />
            </div>
          ))}
        </div>

        <button onClick={handleSubmit}>Update City</button>

      </form>
    </div>
  );
}

export default EditRegion;



