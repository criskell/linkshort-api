import sequelize from "../database.js";

const { models } = sequelize;

export const redirect = async (req, res) => {
  const link = await models.Link.findOne({
    where: {
      code: req.params.linkCode,
    }
  });

  if (! link) return res.status(404).send("<h1>Link não encontrado!</h1>");

  res.status(302).location(link.fullurl).end();
};