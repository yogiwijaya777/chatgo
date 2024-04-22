const express = require('express');
const validate = require('../../middlewares/validate');
const { roomValidation } = require('../../validations');
const { roomController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(roomValidation.createRoom), roomController.createRoom)
  .get(auth('getRooms'), roomController.getRooms);

router
  .route('/:roomId')
  .get(auth(), validate(roomValidation.getRoom), roomController.getRoom)
  .patch(auth('manageRooms'), validate(roomValidation.updateRoom), roomController.updateRoom)
  .delete(validate(roomValidation.deleteRoom), roomController.deleteRoom);

module.exports = router;
