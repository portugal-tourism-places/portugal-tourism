import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RegionDetails() {
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

      {region.photo &&
        Object.values(region.photo).map((item, index) => (
          <img key={index} src={item.image} alt="City view" />
        ))}

      <h2>History</h2>
      {region.history &&
        Object.values(region.history).map((item, index) => (
          <p key={index}>{item.text}</p>
        ))}

      <h2>Food</h2>
      {region.food &&
        Object.values(region.food).map((item, index) => (
          <div key={index}>
            {item.text && <p>{item.text}</p>}
            {item.description && <p>{item.description}</p>}
            {Object.entries(item)
              .filter(([key]) => key.startsWith("recommendation"))
              .map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
          </div>
        ))}

      <h2>Places to visit</h2>
      {region["places-to-visit"] &&
        Object.values(region["places-to-visit"]).map((item, index) => {
          const imageKeys = Object.keys(item)
            .filter((key) => key.startsWith("image"))
            .sort();
          const recommendationKeys = Object.keys(item)
            .filter((key) => key.startsWith("recommendation"))
            .sort();

          return (
            <div key={index}>
              {imageKeys.map((imgKey, i) => {
                const recKey = recommendationKeys[i];
                return (
                  <div key={imgKey}>
                    <img src={item[imgKey]} alt={`Place ${i + 1}`} />
                    <p>{item[recKey]}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
        <Link to={`/regions/edit/${regionId}`}>Edit Region</Link>
    </div>
  );
}

export default RegionDetails;
