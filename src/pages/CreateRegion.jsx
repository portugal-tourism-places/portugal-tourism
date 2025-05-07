import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


function CreateRegion(props){
    const [cityName, setCityName]= useState("")
    const [history, setHistory]= useState("")
    const [food, setFood]= useState("")
    const [restaurant, setRestaurant]= useState("")
    const [placesToVisit, setPlacesToVisit]= useState("")
    const [image, setImage]= useState("")

    const navigate= useNavigate();

    const handleSubmit= (e)=> {
        e.preventDefault();

        const newItem={
            cityName: cityName,
            history: history,
            food: food,
            restaurant: restaurant,
            placesToVisit: placesToVisit,
            image: image,
        }

        props.callBackToCreate(newItem);

        setCityName("");
        setHistory("");
        setFood("");
        setRestaurant("");
        setPlacesToVisit("");
        setImage("");

        axios
        .post("https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/cities.json", newItem)
        .then(()=>{
            navigate("/")
        })
        .catch((e) => console.log("Error:", e));
    }

    return(
        <div>

            <h3> Create new city </h3>

            <form onSubmit={handleSubmit}>
                <label>
                    City Name:
                    <input 
                    type="text" 
                    name="City name" 
                    placeholder="enter city name"
                    value={cityName}
                    onChange={(e)=>{setCityName(e.target.value)}}
                     />
                </label>

                <label>
                    History:
                    <input 
                    type="text" 
                    name="History" 
                    placeholder="enter history"
                    value={history}
                    onChange={(e)=>{setHistory(e.target.value)}}
                     />
                </label>

                <label>
                    Food:
                    <input 
                    type="text" 
                    name="Food" 
                    placeholder="enter the type of food"
                    value={food}
                    onChange={(e)=>{setFood(e.target.value)}}
                     />
                </label>

                <label>
                    Restaurants:
                    <input 
                    type="text" 
                    name="Restaurants" 
                    placeholder="enter restaurant"
                    value={restaurant}
                    onChange={(e)=>{setRestaurant(e.target.value)}}
                     />
                </label>

                <label>
                    Places to visit:
                    <input 
                    type="text" 
                    name="Places to visit" 
                    placeholder="enter place to visit"
                    value={placesToVisit}
                    onChange={(e)=>{setPlacesToVisit(e.target.value)}}
                     />
                </label>

                <label>
                    Image:
                    <input 
                    type="text" 
                    name="image" 
                    placeholder="enter image URL"
                    value={image}
                    onChange={(e)=>{setImage(e.target.value)}}
                     />
                </label>

                <button type="submit"> Create </button>

            </form>

        </div>
    )

}


export default CreateRegion