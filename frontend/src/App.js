// function App() {
//   return (
//     <h1>Hello from App</h1>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import SignupFormPage from "./components/SignupFormPage/index";
import AllSongs from "./components/Song/index";
import MySongs from "./components/Song/mysong";
import MyPlaylists from "./components/Playlist/index";
import TestUserHome from "./components/UserHome/UserHome";
import Navigation from "./components/Navigation";
import PageNotFound from "./components/PageNotFound";
import AllAlbums from "./components/Album/index";
import MyAlbums from "./components/Album/myalbum";
import AlbumDetails from "./components/Album/albumDetails";
import AllPlaylists from "./components/Playlist";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <TestUserHome />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/songs/mysongs">
            <MySongs />
          </Route>
          <Route exact path="/songs">
            <AllSongs />
          </Route>
          <Route path="/songs/:songId">
            <AllSongs />
          </Route>
          <Route path="/playlists">
            <AllPlaylists />
          </Route>
          <Route exact path="/albums/myalbums">
            <MyAlbums />
          </Route>
          <Route exact path="/albums">
            <AllAlbums />
          </Route>
          <Route path="/albums/:albumId">
            <AlbumDetails />
          </Route>
          {/*
          <Route path="/playlists/myplaylists">
            <MyPlaylists />
          </Route> 
          */}
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
