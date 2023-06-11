import { useState } from "react";
import "./App.css";
import GetData from "./components/GetData/GetData";
import PostData from "./components/PostData/PostData";

function App() {
  const [name, setName] = useState("");
  const [selectedSectors, setSelectedSectors] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSectorChange = (e) => {
    const { options } = e.target;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].innerText.trim());
      }
    }
    setSelectedSectors((prev) => [...prev, selectedValues]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the data to the database or perform any desired action
    console.log("Name:", name);
    console.log("Selected Sectors:", selectedSectors.flat());
  };
  return (
    <div className="app">
      <PostData
        handleNameChange={handleNameChange}
        handleSectorChange={handleSectorChange}
        handleSubmit={handleSubmit}
        name={name}
        selectedSectors={selectedSectors}
      />
      <GetData />
    </div>
  );
}

export default App;
