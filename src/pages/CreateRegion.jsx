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

        props.callBackToCreate(newItem);

        setCityName("");
        setHistory("");
        setFood([]);
        setRestaurants([]);
        setPlacesToVisit([]);
        setImage("");

        axios
            .post("https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/cities.json", newItem)
            .then(() => {
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

            <h3> Create new city </h3>

            <form onSubmit={handleSubmit}>
                <label className="create">
                    City Name:
                    <input
                        type="text"
                        name="City name"
                        placeholder="enter city name"
                        value={cityName}
                        onChange={(e) => { setCityName(e.target.value) }}
                    />
                </label>

                <label className="create">
                    History:
                    <input
                        type="text"
                        name="History"
                        placeholder="enter history"
                        value={history}
                        onChange={(e) => { setHistory(e.target.value) }}
                    />
                </label>
                <label className="create">
                    Food:
                    {food.map((item, index) => (
                        <div key={index} className="food-entry">
                            <input
                                type="text"
                                placeholder="Food description"
                                value={item.description}
                                onChange={(e) => handleFoodChange(index, "description", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={item.photo}
                                onChange={(e) => handleFoodChange(index, "photo", e.target.value)}
                            />
                            {food.length > 1 && (<button type="button" onClick={() => removeFood(index)}>-</button>)}
                        </div>
                    ))}
                    <button type="button" onClick={addFood}>+</button>
                </label>

                <label className="create">
                    Restaurants:
                    {restaurants.map((restaurant, index) => (
                        <div key={index} className="restaurant-entry">
                            <input
                                type="text"
                                placeholder="Restaurant name"
                                value={restaurant.name}
                                onChange={(e) => handleRestaurantChange(index, "name", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Restaurant link"
                                value={restaurant.link}
                                onChange={(e) => handleRestaurantChange(index, "link", e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Rating (1-10)"
                                min="1"
                                max="10"
                                value={restaurant.rating}
                                onChange={(e) => handleRestaurantChange(index, "rating", e.target.value)}
                            />
                            {restaurants.length > 1 && (<button type="button" onClick={() => removeRestaurant(index)}>-</button>)}
                        </div>
                    ))}
                    <button type="button" onClick={addRestaurant}>+</button>
                </label>

                <label className="create">
                    Places to Visit:
                    {placesToVisit.map((place, index) => (
                        <div key={index} className="place-entry">
                            <input
                                type="text"
                                placeholder="Place name"
                                value={place.name}
                                onChange={(e) => handlePlaceChange(index, "name", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={place.photo}
                                onChange={(e) => handlePlaceChange(index, "photo", e.target.value)}
                            />
                            {placesToVisit.length > 1 && (<button type="button" onClick={() => removePlace(index)}>-</button>)}
                        </div>
                    ))}
                    <button type="button" onClick={addPlace}>+</button>

                </label>

                <label className="create">
                    Image:
                    <input
                        type="text"
                        name="image"
                        placeholder="enter image URL"
                        value={image}
                        onChange={(e) => { setImage(e.target.value) }}
                    />
                </label>

                <button type="submit"> Create </button>

            </form>

        </div>
    )

}


export default CreateRegion