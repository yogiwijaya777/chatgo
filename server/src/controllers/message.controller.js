const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { messageService } = require('../services');

const createMessage = catchAsync(async (req, res) => {
	const message = await messageService.createMessage(req.body)

	res.status(httpStatus.CREATED).send({
		status: httpStatus.CREATED,
		message: 'Message succesfully created',
		data: message
	})
})

const getMessage = catchAsync(async(req, res) => {
	const { text, skip, take, sort, page } = req.query
	const filter = {
		text: text
	};
	const options = {
		skip: Number(skip) || 0,
		take: Number(take) || 5,
		page: Number(page) || 1,
		sort: sort == 'lastest' ? { createdAt: 'desc' } : { createdAt: 'asc' }
	}

	const message = await messageService.getMessage(filter, options);

	res.status(httpStatus.OK).send({
		status: httpStatus.OK,
		message: 'Get Message Success',
		data: message
	})
})

const getMessageById = catchAsync(async(req, res) => {
	const message = await messageService.getMessageById(req.params.id);

	res.status(httpStatus.OK).send({
		status: httpStatus.OK,
		message: 'Get Message Success',
		data: message
	})
})

const updateMessage = catchAsync(async(req, res) => {
	const {id} = req.params;
	const messageData = req.body;

	const updateMessage = await messageService.updateMessage(messageData, id);

	res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Update Message Success',
    data: updateMessage,
  });
})

const deleteMessage = catchAsync(async(req, res) => {
	const { id } = req.params;

	const deletMessage = await messageService.deleteMessage(id);

	res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Delete Message Success',
    data: null,
  });
})


module.exports = {
	createMessage,
	getMessage,
	getMessageById,
	updateMessage,
	deleteMessage
}