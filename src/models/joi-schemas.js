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
  name: Joi.string().required(),
  county: Joi.string().required(),
  locality: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  description: Joi.string().required(),
  monument_class: Joi.string().required(),
}

export const CollectionSpec = {
  name: Joi.string().required(),
}