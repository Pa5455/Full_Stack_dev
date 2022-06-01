import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required().regex(/^[A-Z][a-zA-Z'-]{8,}$/),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const FarmSpec = Joi.object()
  .keys({
    farmername: Joi.string().required().example("John Murphy"),
    address: Joi.string().required().example("Lixnaw Kerry"),
    enterprise: Joi.string().required().example("tillage"),
    placemarkid: IdSpec,
  })
  .label("Farm");

export const FarmSpecPlus = FarmSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("FarmPlus");

export const FarmArraySpec = Joi.array().items(FarmSpecPlus).label("FarmArray");
  
export const PlacemarkSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Murphy Farms"),
    country: Joi.string().required().example("Ireland"),
    userid: IdSpec,
    farms: FarmArraySpec,
  })
  .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");