import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRegion() {
  const { regionId } = useParams();
  const navigate = useNavigate();

  const [cityData, setCityData] = useState(null); 
  const [history, setHistory] = useState("");

  useEffect(() => {
    if (regionId) {
      axios
        .get(`https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/cities/${regionId}.json`)
        .then((response) => {
          if (response.data) {
            setCityData(response.data);
            setHistory(response.data.history || "");
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
      history,
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

  if (!cityData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Edit History for Region: {regionId}</h3>

      <form onSubmit={handleSubmit}>
        <label>
          History:
          <textarea
            name="history"
            placeholder="Edit history"
            value={history}
            onChange={(e) => setHistory(e.target.value)}
          />
        </label>

        <button type="submit">Update History</button>
      </form>
    </div>
  );
}

export default EditRegion;


