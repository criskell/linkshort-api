import Joi from "joi";

export const createLinkSchema = Joi.object({
  code: Joi.string(),
  fullurl: Joi.string().uri().required(),
});

export const updateLinkSchema = Joi.object({
  code: Joi.string().required(),
  fullurl: Joi.string().uri().required(),
});