import { useState } from "react";
import TreeView from "./components/TreeView";
import Map from "./components/Map";
import "./App.css";


const App = () => {
  const [error, setError] = useState("");
  const [attemptedFetch, setAttemptedFetch] = useState(false);
  const [currentData, setData] = useState(null);

  const fetchData = async () => {
    try {      
      const response = await fetch("http://127.0.0.1:3000/map");
      const data = await response.json();

      // handle http 400 & 500 errors
      if (!response.ok) {
        throw new Error(data.message);
      }

      setData(data);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setAttemptedFetch(true);
    }
  }

  if (!attemptedFetch) {
    fetchData();
  }

  console.log(currentData);

  const errorContainer = error ?
    <div id="error-container">
      <p id="error-text">{error}</p>
    </div>
    : null;
  
  return (
    <div id="app">
      {errorContainer}
      <div id="flex-container">
        <TreeView />
        <Map />
      </div>
    </div>
  );
};

export default App
