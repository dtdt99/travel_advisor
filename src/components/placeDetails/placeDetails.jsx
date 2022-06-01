import React, { Component } from 'react';

import {Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import StarIcon from '@mui/icons-material/Star';

const PlaceDetails = ({ place, selected, refProp}) => {
    const classes = useStyles();

    if (selected) refProp?.current?.scrollIntoView({behavior:"smooth", block: "start"});


    console.log(place);
    return (
        <Card eleveation = {6}>
            <CardMedia
            style = {{height:350}}
            image = {place.photo? place.photo.images.large.url : "https://media.istockphoto.com/photos/cozy-restaurant-for-gathering-with-friends-picture-id1159992039?k=20&m=1159992039&s=612x612&w=0&h=t2lqevaWYLXvcjDeKzbHvIRF6GE3gxiqO6AIezr3Mws="}
            title = {place.name}
            />
            
            
            <CardContent>
                
                <Typography gutterBottom variant = "h5">{place.name}</Typography>
                
                <Box display = "flex" justifyContent={"space-between"}>
                    <Typography variant = "subtitle1">Price</Typography>
                    <Typography gutterBottom variant = "subtitle1">{place.price_level}</Typography>
                </Box>
                
                <Box display = "flex" justifyContent={"space-between"}>
                    <Typography variant = "subtitle1">Rating</Typography>
                    <Typography gutterBottom variant = "subtitle1">{place.rating} <StarIcon fontsSize = "small" />  </Typography>
               
                </Box>

                <Box display = "flex" justifyContent={"space-between"}>
                    <Typography variant = "subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant = "subtitle1">{place.ranking}</Typography>
               
                </Box>
                {place?.awards?.map((award) => (
                    <Box my = {1} display= "flex" justifyContent={"space-between"} alignItems = "center" >
                        
                        <img src ={award.images.small} alt = {award.display_name} />
                        <Typography variant = "subtitle2" color = "textSecondary">{award.display_name}</Typography>
                         </Box>

                ))}

                {place?.cuisine?.map( ( { name } ) => (
                    <Chip key = {name + "1"} size = "small" label = {name} className = {classes.chip}  />))}

                {place?.address && (
                    <Typography gutterBottom variant = "subtitle2" color = "textSecondary" className = {classes.subtitle} >
                        <LocationOnIcon /> {place.address}
                    </Typography>
                )}

                {place?.address && (
                    <Typography gutterBottom variant = "subtitle2" color = "textSecondary" className = {classes.subtitle} >
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
                
                <CardActions>
                    <Button size ="small" color = "primary" onClick = {() => window.open(place.web_url, "_blank")}>
                        Trip Advisor
                    </Button>

                    <Button size ="small" color = "primary" onClick = {() => window.open(place?.website, "_blank")}>
                        Website
                    </Button>
                </CardActions>
                
            


            </CardContent>

            </Card>
        
    )

}
 
export default PlaceDetails;