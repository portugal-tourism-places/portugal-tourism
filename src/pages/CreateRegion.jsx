import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


function CreateRegion(props) {
    const [cityName, setCityName] = useState("")
    const [history, setHistory] = useState("")
    const [food, setFood] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [placesToVisit, setPlacesToVisit] = useState([])
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
                    Food:
                    <textarea
                        name="Food"
                        placeholder="Enter the types of food (comma-separated)"
                        value={food.join(", ")} // Convert array to a comma-separated string
                        onChange={(e) => setFood(e.target.value.split(",").map(item => item.trim()))} // Convert string back to array
                    />
                </label>

                <label className="create">
                    Restaurants:
                    <textarea
                        name="Restaurants"
                        placeholder="Enter restaurants (comma-separated)"
                        value={restaurants.join(", ")}
                        onChange={(e) => setRestaurants(e.target.value.split(",").map(item => item.trim()))}
                    />
                </label>

                <label className="create">
                    Places to visit:
                    <textarea
                        name="Places to visit"
                        placeholder="Enter places to visit (comma-separated)"
                        value={placesToVisit.join(", ")}
                        onChange={(e) => setPlacesToVisit(e.target.value.split(",").map(item => item.trim()))}
                    />
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