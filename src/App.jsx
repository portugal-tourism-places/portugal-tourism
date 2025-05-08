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
import SearchBar from "./components/SearchBar";

function App() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    updateRegions()
  }, []);

  const updateRegions = () => {
    axios
      .get("https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/.json")
      .then((response) => {
        const data = response.data?.cities;

        if (data) {

          const citiesArray = Object.entries(data).map(([id, cityData]) => {
            return {
              id,
              ...cityData
            };
          });

          setCities(citiesArray);
          setFilteredCities(citiesArray);
        } else {
          setCities([]);
          setFilteredCities([]);
        }
      })
      .catch((e) => {
        console.log("Error finding cities", e);
        setError("Failed to load cities. Please try again later.");
      });
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  if (cities.length === 0) {
    return <h3>Loading...</h3>;
  }


  const handleSearch = (input) => {
    const filtered = cities.filter((city) =>
      city["city-name"].toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleDeleteCity = (cityId) => {
    const confirmed = window.confirm("Are you sure you want to delete this city?");
    if (!confirmed) return;

    axios
      .delete(`https://portugal-tourism-places-default-rtdb.europe-west1.firebasedatabase.app/cities/${cityId}.json`)
      .then(() => {
        setCities((prev) => prev.filter(city => city.id !== cityId));
        setFilteredCities((prev) => prev.filter(city => city.id !== cityId));
      })
      .catch((err) => console.error("Error deleting city", err));
  };

  return (
    <>
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<HomePage regions={filteredCities} onDeleteCity={handleDeleteCity}/>} />
        <Route path="/regions/:regionId" element={<RegionDetails />} />
        <Route path="/regions/edit/:regionId" element={<EditRegion updateRegions={updateRegions} />} />
        <Route path="/about" element={<About></About>} />
        <Route path="/createRegion" element={<CreateRegion updateRegions={updateRegions} />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
