import { useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces } from "../../store/actions/places";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

import useStyles from "./styles";
import { filterPlaces } from "../../store/actions/places";
import { fetchWheaterData } from "../../store/actions/weather";

function List() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [elRefs, setElRefs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtersDisabled, setFiltersDisabled] = useState(false);

  const places = useSelector((state) => state.place.places);
  const filteredPlaces = useSelector((state) => state.place.filteredPlaces);
  const cardIdx = useSelector((state) => state.place.mapCardClickedIdx);
  const coordinates = useSelector((state) => state.place.coordinates);
  const bounds = useSelector((state) => state.place.bounds);

  const filterByRating = () => {
    const filteredData = places.filter((place) => place.rating > rating);
    dispatch(filterPlaces(filteredData));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => filterByRating(), [rating, places]);

  useEffect(() => {
    setIsLoading(true);
    setFiltersDisabled(true);
    const delayFetch = setTimeout(() => {
      if (bounds) {
        dispatch(fetchWheaterData(coordinates));
        dispatch(fetchPlaces(bounds.sw, bounds.ne, type)).then(() => {
          setIsLoading(false);
          setFiltersDisabled(false);
        });
      }
    }, 2000);
    return () => clearTimeout(delayFetch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds, coordinates, type]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restraunts, Hotels & Attractions around you
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select
          disabled={filtersDisabled}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="restaurants">Restraunts</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select
          disabled={filtersDisabled}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>

      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Grid container spacing={3} className={classes.list}>
            {filteredPlaces?.map((place, i) => (
              <Grid item key={i} xs={12} ref={elRefs[i]}>
                <PlaceDetails
                  selected={cardIdx === i}
                  place={place}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

export default List;
