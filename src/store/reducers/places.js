import {
  FETCH_PLACES,
  UPDATE_COORDINATES,
  UPDATE_BOUNDS,
  MAP_CARD_CLICKED,
  FILTER_PLACES,
} from "../constants";

let initialState = {
  places: [],
  filteredPlaces: [],
  coordinates: {},
  bounds: null,
  mapCardClickedIdx: null,
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES:
      const actualPlaces = action.payload?.filter(
        (place) => place?.name && place?.num_reviews > 0
      );
      return {
        ...state,
        places: actualPlaces,
        filteredPlaces: actualPlaces,
      };
    case FILTER_PLACES:
      return {
        ...state,
        filteredPlaces: action.payload,
      };
    case UPDATE_COORDINATES:
      return {
        ...state,
        coordinates: action.payload,
      };
    case UPDATE_BOUNDS:
      return {
        ...state,
        bounds: action.payload,
      };
    case MAP_CARD_CLICKED:
      return {
        ...state,
        mapCardClickedIdx: Number(action.payload),
      };
    default:
      return state;
  }
};

export default placesReducer;
