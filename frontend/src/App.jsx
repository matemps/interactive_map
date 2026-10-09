import { useState } from "react";
import TreeView from "./components/TreeView";
import Map from "./components/Map";
import "./App.css";


const App = () => {
  const [dataFetched, setDataFetched] = useState(false);
  const [currentData, setData] = useState(null);

  const fetchData = async () => {
    try {      
      const response = await fetch("http://127.0.0.1:3000/map");
      const data = await response.json();

      setData(data);
      setDataFetched(true);
    } catch (err) {
      console.log(err.message);
    }
  }

  if (!dataFetched) {
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
