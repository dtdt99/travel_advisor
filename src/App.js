import React, { Component, useEffect, useState} from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/header/header";
import List from "./components/list/list";
import Map from "./components/map/map";
import placeDetails from "./components/placeDetails/placeDetails";
import  { getPlaceData, getWeatherData } from "./api"


const App = () => {
  
  const [filteredPlaces,setFilteredPlaces] = useState([]);
  const [places,setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({lat :0 , lng: 0});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");



  useEffect( () => {
    
    navigator.geolocation.getCurrentPosition (({coords: {latitude, longitude}}) => {
      setCoordinates({lat:latitude, lng:longitude});


    })

  
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);


  }, [rating]) 

  

  useEffect(() => {
  
    setIsLoading(true);
    
    
    getPlaceData( type, bounds.sw, bounds.ne).then((data) => {
      setPlaces(data?.filter((place) => place.name && place.num_reviews > 0)); 
      setIsLoading(false);
      setFilteredPlaces([]);
    })
  
  }, [type,bounds]);


  return (
    <div>
      <CssBaseline />
      <Header setCoordinates = {setCoordinates}/>
      <Grid container spacing={4} style={{ width: "100%" }}>

        <Grid item xs={12} md={4}>
          <List
          places = {filteredPlaces.length ? filteredPlaces : places}
          childClicked = {childClicked}
          isLoading = {isLoading}
          type = {type}
          setType = {setType}
          rating = {rating}
          setRating = {setRating}/>
        </Grid>

        <Grid item xs={12} md={8}>
          <Map
          setCoordinates = {setCoordinates}
          setBounds = {setBounds}
          coordinates = {coordinates}
          places = {filteredPlaces.length ? filteredPlaces : places}
          setChildClicked = {setChildClicked}
          />
        </Grid>


      
      </Grid>
    </div>
  );
};

export default App;
