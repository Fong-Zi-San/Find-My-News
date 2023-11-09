import React from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Link,
} from "@mui/material";

function NewsItem({newsArticle, favs, handleFavourites}) {
  const {url, urlToImage, title, source, publishedAt} = newsArticle;
  const sourceWebsite = newsArticle.url.split("https://").pop().split("/")[0];
  const favicon = (
    <img
      src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE%2CSIZE%2CURL&url=http://${sourceWebsite}&size=16`}
      alt="favicon"
    />
  );

  const handleFavouriteClick = () => {
    handleFavourites(newsArticle);
  };

  const isFavourite = favs.some((item) => item.url === url);

  return (
    <Card sx={{height: 375, width: 220}}>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
        underline="none"
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="170"
            image={urlToImage}
            alt={title}
          />
          <CardContent
            sx={{
              pb: 0,
              display: "flex",
              direction: "row",
              alignItems: "center",
            }}
          >
            {favicon}
            <Typography variant="caption" sx={{ml: "5px"}}>
              {source.name}
            </Typography>
          </CardContent>

          <CardContent sx={{height: 80, overflow: "hidden"}}>
            <Typography variant="body1">{title}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton color="primary" onClick={handleFavouriteClick}>
          {isFavourite ? (
            <FavoriteRoundedIcon />
          ) : (
            <FavoriteBorderRoundedIcon />
          )}
        </IconButton>
        <Typography variant="caption">
          Published on: {new Date(publishedAt).toLocaleDateString("en-GB")}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default NewsItem;
