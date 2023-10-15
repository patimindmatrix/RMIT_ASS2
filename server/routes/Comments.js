const express = require("express");
const commentRouter = express.Router();
const { Comments } = require("../models");
const { Op, where } = require("sequelize");

commentRouter.get("/:id", async (req, res) => {
  const listComments = await Comments.findAll({ where: {movie_id: req.params.id}});
  res.status(200).json(listComments);
});

commentRouter.post('/', async (req, res) => {
    const comment = req.body
    create_comment = await Comments.create(comment);

    res.status(200).json(create_comment)
})

commentRouter.delete('/delete/:id', async (req, res, next) => {
  Comments.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(function (deletedRecord) {
      if (deletedRecord === 1) {
        res.status(200).json({ message: "Deleted successfully" });
      } else {
        res.status(404).json({ message: "record not found" });
      }
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
})

module.exports = commentRouter;