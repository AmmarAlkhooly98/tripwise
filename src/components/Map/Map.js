import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBounds,
  updateCoordinates,
  mapCardClicked,
} from "../../store/actions/places";

import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Rating } from "@material-ui/lab";

import useStyles from "./styles";

function Map() {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();

  const coordinates = useSelector((state) => state.place.coordinates);
  const filteredPlaces = useSelector((state) => state.place.filteredPlaces);
  const currentWeather = useSelector((state) => state.weather.currentWeather);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        dispatch(updateCoordinates({ lat: latitude, lng: longitude }));
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        onChange={(e) => {
          dispatch(updateCoordinates({ lat: e.center.lat, lng: e.center.lng }));
          dispatch(updateBounds({ sw: e.bounds.sw, ne: e.bounds.ne }));
        }}
        onChildClick={(childIdx) => dispatch(mapCardClicked(childIdx))}
      >
        {filteredPlaces.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={place.latitude}
            lng={place.longitude}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.Typography}
                  gutterBottom
                  variant="subtitle2"
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place?.photo
                      ? place?.photo?.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
        {currentWeather && (
          <div lat={coordinates.lat} lng={coordinates.lng}>
            <img
              height={100}
              src={`http://openweathermap.org/img/w/${currentWeather?.weather[0]?.icon}.png`}
              alt={`Weather Icon - ${currentWeather?.weather[0]?.main}`}
            />
          </div>
        )}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
