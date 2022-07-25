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
import MyPlaylists from "./components/Playlist/index";
import TestUserHome from "./components/UserHome/UserHome";
import Navigation from "./components/Navigation";
import PageNotFound from "./components/PageNotFound";
import AllAlbums from "./components/Album";

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
          <Route path="/songs">
            <AllSongs />
          </Route>
          <Route path="/playlists/myplaylists">
            <MyPlaylists />
          </Route>
          <Route path="/albums">
            <AllAlbums />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
