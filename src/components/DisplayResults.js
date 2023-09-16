import React from "react";
import {Grid, Typography} from "@mui/material";
import NewsItem from "./NewsItem";
import CustomButton from "../custom/CustomButton";

function DisplayResults({
  keyword,
  news,
  isLoading,
  onLoadMore,
  noMoreNews,
  handleFavourites,
  favs,
}) {
  const FormNewsItems = () => {
    return news.map((newsArticle) => (
      <Grid item key={newsArticle.url}>
        <NewsItem
          newsArticle={newsArticle}
          handleFavourites={handleFavourites}
          favs={favs}
        />
      </Grid>
    ));
  };

  return (
    <>
      <Grid>
        {news.length === 0 && !isLoading ? (
          <Grid item>
            <Typography variant="h4">
              Sorry, we could not find any news for your search
            </Typography>
          </Grid>
        ) : (
          <Grid item alignItems="center" justifyContent="center">
            {!keyword ? (
              <Typography variant="h6">Latest news today:</Typography>
            ) : (
              <Typography variant="h6">Latest news for '{keyword}':</Typography>
            )}
            <Grid
              container
              rowSpacing={1}
              spacing={1}
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              className="news-item-container"
            >
              <FormNewsItems />
            </Grid>
            <Grid
              container
              className="load-more-button"
              alignContent="center"
              justifyContent="center"
              sx={{mt: 1}}
            >
              {!isLoading && keyword && (
                <CustomButton
                  variant="contained"
                  disabled={noMoreNews}
                  onClick={onLoadMore}
                >
                  Load more
                </CustomButton>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default DisplayResults;
