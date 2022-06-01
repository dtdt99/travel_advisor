import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(min-width:600px)");
  

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={11}
        margin={[50, 0, 50, 50]}
        options={""}
        onChildClick={(child) => setChildClicked(child)}
        onChange={(e) => {
          console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            !isDesktop ? (
            <LocationOnOutlinedIcon color="primary" fontSize="large" />) : (
            <Paper elevation={3} className={classes.paper}>
              <Typography
                className={classes.typography}
                variant="subtitle2"
                gutterbottom
              >
                {place.name}
              </Typography>
              <img
                className={classes.pointer}
                src={
                  place.photo
                    ? place.photo.images.large.url
                    : "https://media.istockphoto.com/photos/cozy-restaurant-for-gathering-with-friends-picture-id1159992039?k=20&m=1159992039&s=612x612&w=0&h=t2lqevaWYLXvcjDeKzbHvIRF6GE3gxiqO6AIezr3Mws="
                }
                alt={place.name}
              />

              <Rating size = "small" value = {Number(place.rating)} readOnly/>
            </Paper>
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
