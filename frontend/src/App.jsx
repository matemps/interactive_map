import { useState } from "react";
import TreeView from "./components/TreeView";
import Map from "./components/Map";
import "./App.css";


const App = () => {
  const [error, setError] = useState("");
  const [attemptedFetch, setAttemptedFetch] = useState(false);
  const [treeState, setTreeState] = useState([]);
  const [mapState, setMapState] = useState([]);
  const [locationsLookup, setLocationsLookup] = useState([]);

  const fetchData = async () => {
    try {      
      const response = await fetch("http://127.0.0.1:3000/map");
      const data = await response.json();

      // handle http 400 & 500 errors
      if (!response.ok) {
        throw new Error(data.message);
      }

      // convert data and set location lookup, tree state, and map state
      let id = 0;
      let initialTreeState = [];
      let locations = new Set();

      data.forEach((p) => {
        const parentId = id;
        const parentCompanyName = p.parentCompanyName;
        let parentCompanyLocations = [];

        p.parentCompanyLocations.forEach((l) => {
          id++;

          const childNode = {
            id: id,
            label: l.name,
            data: {
              latitude: l.latitude,
              longitude: l.longitude
            },
            children: [],
            checked: false
          };

          const location = {
            id: id,
            label: l.name,
            latitude: l.latitude,
            longitude: l.longitude
          }

          parentCompanyLocations.push(childNode);
          locations.add(location);
        });

        const parentNode = {
          id: parentId,
          label: parentCompanyName,
          data: null,
          children: parentCompanyLocations,
          checked: false
        };

        initialTreeState.push(parentNode);
        id++;
      });

      setTreeState(initialTreeState);
      setLocationsLookup([...locations]);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setAttemptedFetch(true);
    }
  }

  if (!attemptedFetch) {
    fetchData();
  }

  const errorContainer = error ?
    <div id="error-container">
      <p id="error-text">{error}</p>
    </div>
    : null;
  
  return (
    <div id="app">
      {errorContainer}
      <div id="flex-container">
        <TreeView ts={treeState} ms={mapState} ll={locationsLookup} callback={
          (newTreeState, newMapState) => {
            setTreeState(newTreeState);
            setMapState(newMapState);
          }
        } />
        <Map ms={mapState}/>
      </div>
    </div>
  );
};

export default App
