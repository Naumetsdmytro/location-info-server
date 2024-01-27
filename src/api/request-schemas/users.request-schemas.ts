import Joi from "joi";

const registerSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });
  
  const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  
  export default {
    registerSchema,
    loginSchema,
  };