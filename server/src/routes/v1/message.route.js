const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {messageController} = require('../../controllers')

const router = express.Router();

router
	.route('/')
	.post(auth(), messageController.createMessage)
	.get(auth(), messageController.getMessage)

router
	.route('/:id')
	.get(auth(), messageController.getMessageById)
	.patch(auth(), messageController.updateMessage)
	.delete(auth(), messageController.deleteMessage)

module.exports = router
