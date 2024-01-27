import Joi from "joi";

const registerSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  
  const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  
  const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  });
  
  export default {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
  };