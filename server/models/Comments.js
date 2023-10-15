module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Comments;
};
