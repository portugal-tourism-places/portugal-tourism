import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


function CreateRegion(props) {
    const [cityName, setCityName] = useState("")
    const [history, setHistory] = useState("")
    const [food, setFood] = useState([{ description: "", photo: "" }]);
    const [restaurants, setRestaurants] = useState([{ name: "", link: "", rating: "" }]);
    const [placesToVisit, setPlacesToVisit] = useState([{ name: "", photo: "" }]);
    const [image, setImage] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            "city-name": cityName,
            history: history,
            food: food,
            "restaurants": restaurants,
            "places-to-visit": placesToVisit,
            image: image,
        }

        setCityName("");
        setHistory("");
        setFood([]);
        setRestaurants([]);
        setPlacesToVisit([]);
        setImage("");

        axios
            .post("https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/cities.json", newItem)
            .then(() => {
                props.updateRegions();
                navigate("/")
            })
            .catch((e) => console.log("Error:", e));
    }

    const handleRestaurantChange = (index, field, value) => {
        const updated = [...restaurants];
        updated[index][field] = value;
        setRestaurants(updated);
    };

    const addRestaurant = () => {
        setRestaurants([...restaurants, { name: "", link: "", rating: "" }]);
    };

    const removeRestaurant = (index) => {
        const updated = [...restaurants];
        updated.splice(index, 1);
        setRestaurants(updated);
    };

    const handleFoodChange = (index, field, value) => {
        const updated = [...food];
        updated[index][field] = value;
        setFood(updated);
    };

    const addFood = () => {
        setFood([...food, { description: "", photo: "" }]);
    };

    const removeFood = (index) => {
        const updated = [...food];
        updated.splice(index, 1);
        setFood(updated);
    };

    const handlePlaceChange = (index, field, value) => {
        const updated = [...placesToVisit];
        updated[index][field] = value;
        setPlacesToVisit(updated);
    };

    const addPlace = () => {
        setPlacesToVisit([...placesToVisit, { name: "", photo: "" }]);
    };

    const removePlace = (index) => {
        const updated = [...placesToVisit];
        updated.splice(index, 1);
        setPlacesToVisit(updated);
    };


    return (
        <div>
            <h3 className="create-city-title"> Create new city </h3>
            <div className="edit-form">
                <form onSubmit={handleSubmit}>
                    <div className="edit-form-cityName">
                        <h4>Name 🌎</h4>
                        <input
                            className="city-name"
                            type="text"
                            name="City name"
                            placeholder="enter city name"
                            value={cityName}
                            onChange={(e) => { setCityName(e.target.value) }}
                        />
                    </div>

                    <div className="edit-form-cityImage">
                        <h4>Photo 📸</h4>
                        <input
                            className="city-photo"
                            type="text"
                            name="image"
                            placeholder="enter image URL"
                            value={image}
                            onChange={(e) => { setImage(e.target.value) }}
                        />
                    </div>


                    <div className="edit-form-history">
                        <h4>History 📖</h4>
                        <textarea
                            className="city-history"
                            type="text"
                            name="History"
                            placeholder="enter history"
                            value={history}
                            onChange={(e) => { setHistory(e.target.value) }}
                        />
                    </div>

                    <div className="edit-form-food">
                        <h4>Food 🥘</h4>
                        {food.map((item, index) => (
                            <div key={index} className="city-food">
                                <input
                                    className="city-food-name"
                                    type="text"
                                    placeholder="enter food name"
                                    value={item.description}
                                    onChange={(e) => handleFoodChange(index, "description", e.target.value)}
                                />
                                <input
                                    className="city-food-photo"
                                    type="text"
                                    placeholder="enter image URL"
                                    value={item.photo}
                                    onChange={(e) => handleFoodChange(index, "photo", e.target.value)}
                                />
                                {food.length > 1 && (<button type="button" className="remove-food-btn" onClick={() => removeFood(index)}>Delete</button>)}
                            </div>
                        ))}
                        <button type="button" className="add-food-btn" onClick={addFood}>Add New</button>
                    </div>

                    <div className="edit-form-places">
                        <h4>Places to Visit 📍</h4>
                        {placesToVisit.map((place, index) => (
                            <div key={index} className="city-places">
                                <input
                                    className="city-places-name"
                                    type="text"
                                    placeholder="enter place name"
                                    value={place.name}
                                    onChange={(e) => handlePlaceChange(index, "name", e.target.value)}
                                />
                                <input
                                    className="city-places-photo"
                                    type="text"
                                    placeholder="enter image URL"
                                    value={place.photo}
                                    onChange={(e) => handlePlaceChange(index, "photo", e.target.value)}
                                />
                                {placesToVisit.length > 1 && (<button type="button" className="remove-places-btn" onClick={() => removePlace(index)}>Delete</button>)}
                            </div>
                        ))}
                        <button type="button" className="add-places-btn" onClick={addPlace}>Add New</button>

                    </div>

                    <div className="edit-form-restaurants">
                        <h4>Restaurants 🍴</h4>
                        {restaurants.map((restaurant, index) => (
                            <div key={index} className="city-restaurants">
                                <input
                                    className="city-restaurants-name"
                                    type="text"
                                    placeholder="enter restaurant name"
                                    value={restaurant.name}
                                    onChange={(e) => handleRestaurantChange(index, "name", e.target.value)}
                                />
                                <input
                                    className="city-restaurants-link"
                                    type="text"
                                    placeholder="enter tripadvisor link"
                                    value={restaurant.link}
                                    onChange={(e) => handleRestaurantChange(index, "link", e.target.value)}
                                />
                                <input
                                    className="city-restaurants-rating"
                                    type="number"
                                    placeholder="rating"
                                    min="1"
                                    max="10"
                                    value={restaurant.rating}
                                    onChange={(e) => handleRestaurantChange(index, "rating", e.target.value)}
                                />
                                {restaurants.length > 1 && (<button type="button" className="remove-restaurants-btn" onClick={() => removeRestaurant(index)}>Delete</button>)}
                            </div>
                        ))}
                        <button type="button" className="add-restaurants-btn" onClick={addRestaurant}>Add New</button>
                    </div>

                    <button type="submit" className="create-city-btn"> Create New City</button>

                </form>
            </div>

        </div>
    )

}


export default CreateRegion