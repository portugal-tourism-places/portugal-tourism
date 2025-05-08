import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRegion(props) {
  const { regionId } = useParams();
  const navigate = useNavigate();

  const [cityData, setCityData] = useState(null);

  const [cityName, setCityName] = useState("");
  const [cityImage, setCityImage] = useState("");
  const [history, setHistory] = useState("");
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
            setCityImage(response.data.image || "");
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
      image: cityImage,
      "city-name": cityName,
      history,
      food,
      "places-to-visit": placesToVisit,
      restaurants: restaurants,
    };

    axios
      .put(`https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/cities/${regionId}.json`, updatedData)
      .then(() => {
        props.updateRegions()
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


  const handleRemoveFood = (index) => {
    const updatedFood = [...food];
    updatedFood.splice(index, 1);
    setFood(updatedFood);
  };

  const handleAddFood = () => {
    const newItem = { description: "", photo: "" };
    setFood([...food, newItem]);
  };

  const handleRemovePlaces = (index) => {
    const updatedPlaces = [...placesToVisit];
    updatedPlaces.splice(index, 1);
    setPlacesToVisit(updatedPlaces);
  };

  const handleAddPlaces = () => {
    const newItem = { name: "", photo: "" };
    setPlacesToVisit([...placesToVisit, newItem]);
  };

  const handleRemoveRestaurants = (index) => {
    const updatedRestaurants = [...restaurants];
    updatedRestaurants.splice(index, 1);
    setRestaurants(updatedRestaurants);
  };

  const handleAddRestaurants = () => {
    const newItem = { name: "", link: "", rating: "" };
    setRestaurants([...restaurants, newItem]);
  };

  return (
    <div>
      <div className="edit-form">
        <form >
          <div className="edit-form-cityName">
            <h4>Name 🌎</h4>
            <input
              className="city-name"
              type="text"
              name="city-name"
              placeholder="City Name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />

          </div>

          <div className="edit-form-cityImage">
            <h4>Photo 📸</h4>
            <input
              className="city-photo"
              type="text"
              name="image"
              placeholder="City image URL"
              value={cityImage}
              onChange={(e) => setCityImage(e.target.value)}
            />
          </div>

          <div className="edit-form-history">
            <h4>History 📖</h4>
            <textarea
              className="city-history"
              name="history"
              type="text"
              placeholder="history"
              value={history}
              onChange={(e) => setHistory(e.target.value)}
            />
          </div>

          <div className="edit-form-food">
            <h4>Food 🥘</h4>
            {food.map((item, index) => (
              <div key={index} className="city-food">
                <input
                  className="city-food-name"
                  type="text"
                  placeholder="Food description"
                  value={item.description}
                  onChange={(e) => handleFoodChange(index, "description", e.target.value)}
                />
                <input
                  className="city-food-photo"
                  type="text"
                  placeholder="Food photo URL"
                  value={item.photo}
                  onChange={(e) => handleFoodChange(index, "photo", e.target.value)}
                />
                {food.length > 1 && (<button type="button" className="remove-food-btn" onClick={() => handleRemoveFood(index)}>Delete</button>)}
              </div>
            ))}
            <button type="button" className="add-food-btn" onClick={handleAddFood}>Add New</button>
          </div>

          <div className="edit-form-places">
            <h4>Places to Visit 📍</h4>
            {placesToVisit.map((place, index) => (
              <div key={index} className="city-places">
                <input
                  className="city-places-name"
                  type="text"
                  placeholder="Place name"
                  value={place.name}
                  onChange={(e) => handlePlacesToVisitChange(index, "name", e.target.value)}
                />
                <input
                  className="city-places-photo"
                  type="text"
                  placeholder="Place photo URL"
                  value={place.photo}
                  onChange={(e) => handlePlacesToVisitChange(index, "photo", e.target.value)}
                />
                {placesToVisit.length > 1 && (<button type="button" className="remove-places-btn" onClick={() => handleRemovePlaces(index)}>Delete</button>)}
              </div>
            ))}
            <button type="button" className="add-places-btn" onClick={handleAddPlaces}>Add New</button>
          </div>

          <div className="edit-form-restaurants">
            <h4>Restaurants 🍴</h4>
            {restaurants.map((restaurant, index) => (
              <div key={index} className="city-restaurants">
                <input
                  className="city-restaurants-name"
                  type="text"
                  placeholder="Restaurant name"
                  value={restaurant.name}
                  onChange={(e) => handleRestaurantsChange(index, "name", e.target.value)}
                />
                <input
                  className="city-restaurants-link"
                  type="text"
                  placeholder="Tripadvisor link"
                  value={restaurant.link}
                  onChange={(e) => handleRestaurantsChange(index, "link", e.target.value)}
                />
                <input
                  className="city-restaurants-rating"
                  type="number"
                  placeholder="Rating"
                  min="1"
                  max="10"
                  value={restaurant.rating}
                  onChange={(e) => handleRestaurantsChange(index, "rating", e.target.value)}
                />
                {restaurants.length > 1 && (<button type="button" className="remove-restaurants-btn" onClick={() => handleRemoveRestaurants(index)}>Delete</button>)}
              </div>
            ))}
            <button type="button"  className="add-restaurants-btn" onClick={handleAddRestaurants}>Add New</button>
          </div>

          <button onClick={handleSubmit} className="update-city-btn" type="submit">Update City</button>

        </form>
      </div>
    </div>
  );
}

export default EditRegion;



