const Joi = require("joi");
const validatorHandler = require("../middlewares/validatorHandler");

const signup = (req, res, next) => {
  console.log(req.body);
  const schema = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(3).max(50).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string()
      .trim()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
    role: Joi.number().required(),
  });
  validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string()
      .trim()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
  });
  validatorHandler(req, res, next, schema);
};

const login = (req, res, next) => {
  console.log("this is login val");
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string()
      .trim()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
  });
  validatorHandler(req, res, next, schema);
};

module.exports = {
  signup,
  signin,
  login,
};
