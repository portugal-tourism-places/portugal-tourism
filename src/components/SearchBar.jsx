import { useState } from "react"


function SearchBar({onSearch}){
    const [searchInput, setSearchInput]=useState("")

    const handleChange= (e)=>{
        const value= e.target.value;
        setSearchInput(value);
        console.log("Search input:", value);
        onSearch(value);
    }

    return (
        <div>
            <input 
            type="text"
            placeholder="Search here 🔎"
            onChange={handleChange}
            value={searchInput} />
        </div>
    )

}





export default SearchBar