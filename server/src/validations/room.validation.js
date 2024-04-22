const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRoom = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    userId: Joi.string().custom(objectId).required(),
    userId2: Joi.string().custom(objectId).required(),
  }),
};

const getRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().custom(objectId).required(),
  }),
};

const updateRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      userId: Joi.string().custom(objectId),
      userId2: Joi.string().custom(objectId),
    })
    .min(1),
};

module.exports = {
  createRoom,
  getRoom,
};
