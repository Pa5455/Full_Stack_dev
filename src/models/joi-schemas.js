import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };
  
  export const FarmSpec = {
    farmername: Joi.string().required(),
    address: Joi.string().required(),
    enterprise: Joi.string().required(),
  };
  
  export const PlacemarkSpec = {
    title: Joi.string().required(),
  };