const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRoom = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    userId: Joi.string().custom(objectId).required(),
    userId2: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createRoom,
};
