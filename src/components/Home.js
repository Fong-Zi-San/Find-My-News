import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import {Grid, Stack, Alert, LinearProgress} from "@mui/material";
import MyFavouritesPanel from "./MyFavouritesPanel";
import DisplayResults from "./DisplayResults";
import Header from "./Header";
import ".././styles/Home.css";

function Home({isLogin}) {
  const [username, setUsername] = useState("");
  const [keyword, setKeyword] = useState("");
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [page, setPage] = useState(1);
  const [noMoreNews, setNoMoreNews] = useState(false);
  const [favs, setFavs] = useState(
    () => JSON.parse(localStorage.getItem(`${username}'s favourites`)) || []
  );

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setNoMoreNews(false);
    axios
      .get(
        `https://newsapi.org/v2/everything?apiKey=${process.env.REACT_APP_API_KEY}&Q=${keyword}&searchIn=title&language=en&sortBy=publishedAt&pageSize=12&page=${page}`
      )
      .then((response) => {
        setNews((prevNews) => [...prevNews, ...response.data.articles]);
        setIsLoading(false);
        if (response.data.articles.length < 12) {
          setNoMoreNews(true);
        }
      })
      .catch((error) => {
        console.log("Error fetching data", error);
        setIsLoading(false);
      });
  }, [keyword, page]);

  useEffect(() => {
    if (keyword) {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    setIsLoading(true);
    setNoMoreNews(false);
    async function fetchDefaultData() {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=12`
        );
        setNews(response.data.articles);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        setIsLoading(false);
      }
    }
    fetchDefaultData();
  }, []);

  const handleSearch = (searchValue) => {
    setNews([]);
    setPage(1);
    setKeyword(searchValue);
  };

  const handleError = () => {
    setErrorMessage(true);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  //favourites are loaded according to account logged in
  useEffect(() => {
    const currentUsername = localStorage.getItem("username");
    setUsername(currentUsername);
    setFavs(JSON.parse(localStorage.getItem(`${username}'s favourites`)) || []);
  }, [username]);

  //add or remove favourites
  const handleFavourites = (newsArticle) => {
    const isFavourite = favs.some((fav) => fav.url === newsArticle.url);
    if (!isFavourite) {
      const newFavs = [...favs, newsArticle];
      setFavs(newFavs);
      localStorage.setItem(`${username}'s favourites`, JSON.stringify(newFavs));
    } else {
      const newFavs = favs.filter((fav) => fav.url !== newsArticle.url);
      setFavs(newFavs);
      localStorage.setItem(`${username}'s favourites`, JSON.stringify(newFavs));
    }
  };

  //clear all favourites
  const handleClearFavourites = () => {
    const emptyFavs = [];
    setFavs(emptyFavs);
    localStorage.setItem(`${username}'s favourites`, JSON.stringify(emptyFavs));
  };

  return (
    <>
      <Header
        isLogin={isLogin}
        handleSearch={handleSearch}
        handleError={handleError}
      />

      <Stack direction="column" className="home-page-container">
        {errorMessage && (
          <Alert
            severity="warning"
            onClose={() => {
              setErrorMessage(false);
            }}
          >
            Please enter a valid search keyword
          </Alert>
        )}
        {isLoading && <LinearProgress color="primary" />}

        <Grid container direction="row" className="home-page">
          <Grid
            className="favourites-container"
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            xl={3}
          >
            <MyFavouritesPanel
              favs={favs}
              clearFavourites={handleClearFavourites}
            />
          </Grid>
          <Grid
            className="results-container"
            item
            xs={12}
            sm={6}
            md={9}
            lg={9}
            xl={9}
          >
            <DisplayResults
              keyword={keyword}
              news={news}
              isLoading={isLoading}
              onLoadMore={handleLoadMore}
              noMoreNews={noMoreNews}
              handleFavourites={handleFavourites}
              favs={favs}
              username={username}
            />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default Home;
