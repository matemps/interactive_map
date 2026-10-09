import { useState } from "react";
import TreeView from "./components/TreeView";
import Map from "./components/Map";
import "./App.css";


const App = () => {
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
      console.log(err.message);
    } finally {
      setAttemptedFetch(true);
    }
  }

  if (!attemptedFetch) {
    fetchData();
  }

  console.log(currentData);
  
  return (
    <div id="app">
      <TreeView />
      <Map />
    </div>
  );
};

export default App
