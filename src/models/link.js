import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Link = sequelize.define("Link", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullurl: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return () => Link.belongsTo(sequelize.models.User, {
    foreignKey: "userId"
  });
};