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
import SongDetails from "./components/Song/songDetails";
import MyPlaylists from "./components/Playlist/myPlaylist";
import PlaylistsDetails from "./components/Playlist/playlistDetails";
import TestUserHome from "./components/UserHome/UserHome";
import Navigation from "./components/Navigation/index";
import ButtomNavigation from "./components/Navigation/buttomNav";
import PageNotFound from "./components/PageNotFound";
import AllAlbums from "./components/Album/index";
import MyAlbums from "./components/Album/myalbum";
import AlbumDetails from "./components/Album/albumDetails";
import AllPlaylists from "./components/Playlist";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [songName, setSongName] = useState('Gameboy');
  const [artistName, setArtistName] = useState('alice');
  const [playing, setPlaying] = useState('https://soniccloud886.s3.amazonaws.com/tunetank.com_6037_gameboy_by_omka.mp3');
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <TestUserHome playing={playing} setPlaying={setPlaying} setSongName={setSongName} setArtistName={setArtistName} />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/songs/mysongs">
            <MySongs />
          </Route>
          <Route exact path="/songs">
            <AllSongs playing={playing} setPlaying={setPlaying} setSongName={setSongName} setArtistName={setArtistName} />
          </Route>
          <Route path="/songs/:songId">
            <SongDetails playing={playing} setPlaying={setPlaying} setSongName={setSongName} setArtistName={setArtistName} />
          </Route>
          <Route exact path="/playlists/myplaylists">
            <MyPlaylists />
          </Route>
          <Route exact path="/playlists/:playlistId">
            <PlaylistsDetails playing={playing} setPlaying={setPlaying} setSongName={setSongName} setArtistName={setArtistName} />
          </Route>
          <Route path="/playlists">
            <AllPlaylists />
          </Route>
          <Route exact path="/albums/myalbums">
            <MyAlbums />
          </Route>
          <Route exact path="/albums">
            <AllAlbums playing={playing} setPlaying={setPlaying} setSongName={setSongName} setArtistName={setArtistName} />
          </Route>
          <Route path="/albums/:albumId">
            <AlbumDetails playing={playing} setPlaying={setPlaying} />
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
      <ButtomNavigation playing={playing} songName={songName} artistName={artistName} />
    </>
  );
}

export default App;
