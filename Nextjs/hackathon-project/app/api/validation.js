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

// Schema for validating get plant posts request
export const plantPostsSchema = Joi.object({
  userId: Joi.number().integer().required(),
}).unknown(); // Allows other fields like 'type'

// Schema for validating get harvests request
export const harvestSchema = Joi.object({
  userId: Joi.number().integer().required(),
}).unknown(); // Allows other fields like 'type'

// Schema for validating get plant posts request
export const plantHarvestsSchema = Joi.object({
  userId: Joi.number().integer().required(),
}).unknown(); // Allows other fields like 'type'

// Schema for validating get user questions request
export const userQuestionsSchema = Joi.object({
  userId: Joi.number().integer().required(),
}).unknown(); // Allows other fields like 'type'

// Schema for validating get questions by plant name request
export const plantNameSchema = Joi.object({
  plantName: Joi.string().min(1).required(), // Ensures plantName is a non-empty string
}).unknown(); // Allows other fields like 'type'

// Schema for validating get reactions request
export const reactionsSchema = Joi.object({
  answerId: Joi.number().integer().required(),
}).unknown(); // Allows other fields like 'type'

// Schema for validating user reaction check request
export const userReactSchema = Joi.object({
  answerId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
}).unknown(); // Allows other fields like 'type'


