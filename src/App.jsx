import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import RegionDetails from "./pages/RegionDetails";
import About from "./pages/About";
import EditRegion from "./pages/EditRegion"
import CreateRegion from "./pages/CreateRegion";

function App() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/.json")
      .then((response) => {
        const data = response.data;

        if (data) {
          const cityNames = Object.keys(data);
          setCities(cityNames);
        } else {
          setCities([]);
        }
      })
      .catch((e) => {
        console.log("Error finding cities", e);
        setError("Failed to load cities. Please try again later.");
      });
  }, []);

  if (error) {
    return <h3>{error}</h3>;
  }

  if (cities.length === 0) {
    return <h3>Loading...</h3>;
  }

  const createRegion = (newRegionDetails)=>{
    const regionIds= cities.map((cityObj)=>cityObj.id);
    const maxId= Math.max(...regionIds);
    const nextId= maxId +1;

    const newRegion= {
      ...newRegionDetails,
      id: nextId
    }

    setCities([...cities, newRegion])
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage regions={cities} />} />
        <Route path="/regions/:regionId" element={<RegionDetails />} />
        <Route path="/regions/edit/:regionId" element={<EditRegion />} />
        <Route path="/about" element={<About></About>} />
        <Route path="/createRegion" element={<CreateRegion callBackToCreate={createRegion} />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
