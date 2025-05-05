import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function CityInfo() {
  const [region, setRegion] = useState(null);
  const { regionId } = useParams();

  useEffect(() => {
    axios
      .get(`https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/${regionId}.json`)
      .then((response) => {
        setRegion(response.data);
      })
      .catch((e) =>
        console.log("Error getting city details from the API...", e)
      );
  }, [regionId]);

  if (region === null) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h1>{regionId}</h1>
      <div className="card">
        {Object.entries(region).map(([id, data]) => (
          <div className="region">
            <h2>{data.place}</h2>
            <h3>{data.description}</h3>
            <img src={data.image} alt={`Image of ${data.place}`} />
            <h4>{data.recommendation}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CityInfo;