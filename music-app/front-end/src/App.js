import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SongsList from "./components/SongsList";
import Playlist from "./components/Playlist";
import PlaySongList from "./components/playlistSongs"; 
import useProtectedRoute from "./utils/protectedRoute";
import ProtectedRoute from "./utils/auth";
import { Dashboard } from "./components/Dashboard";
import LikedSongs from "./components/likedSongs";

const App = () => {
  const result = useProtectedRoute();
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={result ? <Navigate to="/songs" /> : <Login />}
        />
         <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute result={result} />}>
        <Route path="/songs" element={<SongsList />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/playlist/:id" element={<PlaySongList />} />
          <Route path="/likedSongs" element={<LikedSongs/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
