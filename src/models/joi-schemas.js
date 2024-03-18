import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}

export const PlacemarkSpec = {
  title: Joi.string().required(),
  artist: Joi.string().required(),
  duration: Joi.number().required(),
}

export const CollectionSpec = {
  name: Joi.string().required(),
}