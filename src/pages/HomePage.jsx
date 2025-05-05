import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
    const [cities, setCities] = useState(null);

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
            });
    }, []);

    if (cities === null) {
        return <h3>Loading...</h3>
    }

    return (
        <>
            <h1>Portugal Tourism</h1>
            {cities.map((city) => (
                <div className="city">

                    <h2>{city}</h2>

                </div>
            ))}
        </>
    );
}

export default HomePage;