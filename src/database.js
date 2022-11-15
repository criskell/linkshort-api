import { Sequelize } from "sequelize";

import config from "../config/database.js";
import defineUser from "./models/user.js";
import defineLink from "./models/link.js";

const sequelize = new Sequelize(config[process.env.NODE_ENV || "development"]);

[defineUser, defineLink]
  .map((defineModel) => defineModel(sequelize))
  .forEach((associateModel) => associateModel(sequelize.models));

export const truncate = () => {
  return sequelize.truncate({ cascade: true });
};

export default sequelize;