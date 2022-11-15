import jwt from "jsonwebtoken";

import sequelize from "../database.js";

const { models } = sequelize;

export default (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Você precisa fornecer um token." });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    const id = decoded?.id ?? "missing-id";

    if (err || !id) return res.status(500).json({ message: "Token inválido." });

    const user = await models.User.findByPk(id);

    if (! user) return res.send(500).json({ message: "Token inválido." });

    req.user = user;

    next();
  });
};