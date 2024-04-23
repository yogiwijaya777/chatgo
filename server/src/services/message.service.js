const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');

const createMessage = async(body) => {
	return prisma.message.create({
		data: body,
		include: {User: true}
	})
}

const getMessage = async (filter, option) => {
	return prisma.message.findMany()
}

const getMessageById = async (id) => {
	return prisma.message.findUnique({
		where: {
			id: id
		}
	})
}

const updateMessage = async (body, id) => {
	const message = await getMessageById(id);

	return prisma.message.update({
		where: {
			id: message.id
		},
		data: {
			...body
		}
	})
}

const deleteMessage = async (id) => {
	return prisma.message.delete({
		where: {
			id: id
		}
	})
}

module.exports = {
	createMessage,
	getMessage,
	getMessageById,
	updateMessage,
	deleteMessage
}