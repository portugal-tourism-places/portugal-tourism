import { Link, useParams } from "react-router-dom";

function RegionDetails({ regions }) {
  const { regionId } = useParams();

  
  const region = regions?.find((region) => region.id === regionId);


  if (!region) {
    return (
      <div>
        <h1>Region not found</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>{region.name}</h1>
        <p>{region.description}</p>
        <img src={region.image} alt={region.name} />
      </div>

      <div>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default RegionDetails;