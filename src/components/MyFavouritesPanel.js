import React from "react";
import {
  Grid,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
} from "@mui/material";
import CustomButton from "../custom/CustomButton";

function MyFavouritesPanel({favs, clearFavourites}) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography>Favourites:</Typography>
      </Grid>
      <Grid item>
        <CustomButton
          variant="contained"
          onClick={clearFavourites}
          disabled={favs.length === 0}
        >
          Clear all
        </CustomButton>
      </Grid>
      <Grid item xs={12}>
        {favs.map((fav) => (
          <List key={fav.url} disablePadding>
            <ListItem disablePadding>
              <ListItemButton
                href={fav.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemText primary={fav.title} />
              </ListItemButton>
            </ListItem>
            <Divider color="warning" />
          </List>
        ))}
      </Grid>
    </Grid>
  );
}

export default MyFavouritesPanel;
