import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Rating } from "@mui/material";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { isEmptyObject, typeLocal } from "../../constants/index.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function CardItem(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(2);
  const [comment, setComment] = useState("");
  const [openList, setOpenList] = useState(false);
  const { movie, profile } = props;
  const [movieList, setMovieList] = useState([]);

  const handleOpenList = () => {
    setOpenList(!openList);
    axios
      .get(`http://localhost:3001/comments/${movie.id}`)
      .then((response) => {
        setMovieList(response.data);
        console.log(movieList);
      })
      .catch((error) => toast.error("Cannot fetch the comments"));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseList = () => {
    setOpenList(false);
  };
  const handleSubmitComment = () => {
    if (comment === "") {
      toast.error("Comment can not be empty");
      return;
    } else if (comment.length > 250) {
      toast.error("Comment can not have more than 250 words");
      return;
    }
    const newComment = {
      movie_id: movie.id,
      rate: value,
      message: comment,
      user: profile.username,
    };
    axios
      .post("http://localhost:3001/comments", newComment)
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        toast.error("Fail to review");
      });
    setOpen(false);
    toast.success("You have review successful");
  };
  const removeComment = (comment) => {
    axios.delete(`http://localhost:3001/comments/delete/${comment.id}`)
    .then((response) => {
      toast.success("You have deleted review");
      handleOpenList()
    })
    .catch(error => toast.error("Delete fail"))
    
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 240 }}
          image={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          title="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className="t-ellipsis-1"
          >
            {movie.title}
          </Typography>
          <div className="t-ellipsis-3">
            <Typography variant="body2" color="text.secondary">
              {movie.overview}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            size="small"
          >
            Review
          </Button>
          <Button size="small" onClick={() => handleOpenList()}>
            Review Lists
          </Button>
        </CardActions>
      </Card>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Comment</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="New Review"
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Button onClick={handleSubmitComment}>Comment</Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        onClose={handleCloseList}
        open={openList}
        PaperProps={{
          sx: {
            width: "100%",
            minWidth: "720px!important",
          },
        }}
      >
        <DialogTitle>Review Lists</DialogTitle>
        <DialogContent>
          <div className="scroll-list">
            {!movieList ? (
              <h3> No reviews</h3>
            ) : null}
            {movieList &&
              movieList.map((comment, index) => (
                <div key={index} className="comment-item">
                  <div className="comment-item-image">
                    <img src="https://mymoonlight.vercel.app/me.jpg" alt="" />
                  </div>
                  <div className="flex-1">
                    <div>
                      <div className="context">
                        <h3 className="comment-item-title">{comment.user}</h3>
                        <Rating
                          name="simple-controlled"
                          value={Number(comment.rate)}
                          readOnly
                        />
                      </div>
                      <div className="action-comment">
                        <p className="comment-item-desciption">
                          {comment.message}
                        </p>
                        {profile.username === comment.user && (
                          <div>
                            <span onClick={() => removeComment(comment)}>
                              Xóa
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
