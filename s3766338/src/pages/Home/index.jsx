import TheSidebar from "../../components/TheSidebar/index.jsx";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {isEmptyObject, typeLocal} from "../../constants/index.js";
import {useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";
import CardItem from "../../components/CardItem/index.jsx";
const HomePage = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem(typeLocal.ACCOUNT_LOGIN)) || null)
  const [movieList, setMovieList]= useState(JSON.parse(localStorage.getItem(typeLocal.MOVIE_LIST)) || [])

  useEffect(() => {
    if(!profile || isEmptyObject(profile)) navigate('/login')
  }, [profile])

  if(!profile || isEmptyObject(profile)) return
  return <Box>
    <TheSidebar/>
    <Box sx={{marginTop: "100px", padding: 2}}>
      <Grid container spacing={2} >
        {
          movieList.map((movie, index) => (
            <Grid item xs={3} key={index}>
              <CardItem movie={movie} profile={profile}/>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  </Box>
}

export default  HomePage