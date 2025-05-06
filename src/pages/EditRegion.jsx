import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function EditRegion() {

    const { regionId } = useParams();
    const navigate = useNavigate();

    const [history, setHistory] = useState("");
    const [food, setFood] = useState("");
    const [placesToVisit, setPlacesToVisit] = useState("");

    useEffect(()=>{
        axios
        .get(`https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/${regionId}.json`)
        .then((response)=>{
            setHistory(response.data.history)
            setFood(response.data.food)
            setPlacesToVisit(response.data.placesToVisit)
        })
        .catch((error)=> console.log("error"))
    }, [regionId])

    const handleSubmit=(e)=>{
        e.preventDefault()

        const newDetails={
            "history": history,
            "food": food,
            "placesToVisit": placesToVisit,
        }

        axios.put(`https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/${regionId}.json`, newDetails)
        .then(response=>{
            navigate(`/regions/${regionId}`)
        })
        .catch(e=> console.log("error", e))
    }


  return (
    <div>
     <h3>Edit the District</h3>

     <form onSubmit={handleSubmit}>
        <label>
            History:
            <input 
            type="text"
            name= "History"
            placeholder="edit history"
            value={history}
            onChange={(e)=>{setHistory(e.target.value)}}
            />
        </label>

        <label>
            Food:
            <input 
            type="text"
            name= "Food"
            placeholder="edit food"
            value={food}
            onChange={(e)=>{setFood(e.target.value)}}
            />
        </label>

        <label>
            Places to visit:
            <input 
            type="text"
            name= "Places to visit"
            placeholder="edit places to visit"
            value={placesToVisit}
            onChange={(e)=>{setPlacesToVisit(e.target.value)}}
            />
        </label>

        <button>Update project</button>

     </form>
    </div>
  );
}

export default EditRegion;