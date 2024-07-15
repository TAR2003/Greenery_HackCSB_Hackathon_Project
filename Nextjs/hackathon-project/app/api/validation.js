// validation.js
import Joi from 'joi';

// Schema for validating user info request
export const userInfoSchema = Joi.object({
  userid: Joi.number().integer().required(),
}).unknown(); // Allows other fields like 'type'

// Schema for validating login request
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
}).unknown(); // Allows other fields like 'type'

// Schema for validating get user posts request
export const userPostsSchema = Joi.object({
  userId: Joi.number().integer().required(),
}).unknown(); // Allows other fields like 'type'

