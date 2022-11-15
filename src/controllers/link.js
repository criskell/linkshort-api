import sequelize from "../database.js";
import { generateLinkCode } from "../services/generate-link-code.js";

const { models } = sequelize;

export const list = async (req, res) => {
  const links = await req.user.getLinks({
    attributes: [
      "id",
      "code",
      "fullurl",
    ],
    raw: true,
  });

  res.json({
    data: links.map((link) => ({
      ...link,
      redirectpath: `/go/${link.code}`,
    })),
  });
};

export const show = async (req, res) => {
  const link = await models.Link.findByPk(req.params.linkId, {
    attributes: [
      "id",
      "code",
      "fullurl",
    ],
    raw: true,
    where: {
      userId: req.user.id
    }
  });

  if (! link) return res.status(404);

  link.redirectpath = `/go/${link.code}`;

  res.json({
    data: link
  });
};

export const create = async (req, res) => {
  if (! req.body.code) {
    req.body.code = await generateLinkCode();
  }

  const hasCode = !! await models.Link.count({
    where: {
      code: req.body.code,
    }
  });

  if (hasCode) return res.status(400).json({
    errors: {
      code: `Já existe um link com o código ${req.body.code}`
    }
  });

  const link = await models.Link.create({
    code: req.body.code,
    fullurl: req.body.fullurl,
    userId: req.user.id,
  });

  const redirectpath = `/go/${link.code}`;

  res.json({
    id: link.id,
    redirectpath
  });
};

export const update = async (req, res) => {
  const link = await models.Link.findByPk(req.params.linkId, {
    attributes: [
      "id",
      "code",
      "fullurl"
    ],
    where: {
      userId: req.params.id
    }
  });

  if (! link) return res.status(404);

  link.code = req.body.code || link.code;
  link.fullurl = req.body.fullurl || link.fullurl;

  const hasCode = !! await models.Link.count({
    where: {
      code: link.code,
    }
  });

  if (hasCode) return res.status(400).json({
    errors: {
      code: `Já existe um link com o código ${req.body.code}`
    }
  });

  await link.save();

  return res.json({
    data: {
      code: link.code,
      fullurl: link.fullurl,
      redirectpath: `/go/${link.code}`,
    }
  });
};

export const remove = async (req, res) => {
  await models.Link.destroy({
    where: {
      id: req.params.linkId,
      userId: req.user.id
    }
  });

  res.sendStatus(200);
};