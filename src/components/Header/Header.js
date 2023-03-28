import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCoordinates } from "../../store/actions/places";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Box, Typography, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [autoComplete, setAutoComplete] = useState(null);

  const onLoad = (autoC) => setAutoComplete(autoC);
  const onPlaceChanged = () => {
    const lat = autoComplete?.getPlace()?.geometry?.location?.lat();
    const lng = autoComplete?.getPlace()?.geometry?.location?.lng();
    if (lat && lng) dispatch(updateCoordinates({ lat, lng }));
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Tripwise
        </Typography>
        <Box style={{ display: "flex" }}>
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
