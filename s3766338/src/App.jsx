
import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/Home/index.jsx";
import ProfilePage from "./pages/Profile/index.jsx";
import RegisterPage from "./pages/Register/index.jsx";
import LoginPage from "./pages/Login/index.jsx";
import {typeLocal} from "./constants/index.js";
import {LIST_MOVIE} from "./data.js";
function App() {
  const movieList = JSON.parse(localStorage.getItem(typeLocal.MOVIE_LIST))
  if(!movieList) {
    localStorage.setItem(typeLocal.MOVIE_LIST, JSON.stringify(LIST_MOVIE))
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </>
  )
}

export default App
