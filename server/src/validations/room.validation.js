const Joi = require('joi');
const { objectId } = require('./custom.validation');

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

const deleteRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
};
