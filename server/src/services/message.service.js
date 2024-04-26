const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');
const { getReceiverSocketId, io } = require('../socket');

const createMessage = async (body) => {
  // Check if room is exist
  let room = await prisma.room.findFirst({
    where: {
      messages: {
        some: {
          OR: [
            {
              senderId: body.senderId,
              receiverId: body.receiverId,
            },
            {
              senderId: body.receiverId,
              receiverId: body.senderId,
            },
          ],
        },
      },
    },
    include: {
      messages: {
        where: {
          OR: [
            {
              senderId: body.senderId,
              receiverId: body.receiverId,
            },
            {
              senderId: body.receiverId,
              receiverId: body.senderId,
            },
          ],
        },
      },
    },
  });

  if (!room) {
    room = await prisma.room.create({ data: {} });

    console.log(room);
  }

  const newMessage = await prisma.message.create({
    data: {
      content: body.content,
      senderId: body.senderId,
      receiverId: body.receiverId,
      roomId: room.id,
    },
  });

  const receiverSocketId = getReceiverSocketId(newMessage.receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('newMessage', newMessage);
  }

  return newMessage;
};

const getMessages = async (senderId, receiverId) => {
  const room = await prisma.room.findFirst({
    where: {
      messages: {
        some: {
          OR: [
            {
              senderId: senderId,
              receiverId: receiverId,
            },
            {
              senderId: receiverId,
              receiverId: senderId,
            },
          ],
        },
      },
    },
  });

  if (!room) {
    return [];
  }

  const messages = await prisma.message.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      roomId: room.id,
    },
  });

  return messages;
};

const getMessageById = async (id) => {
  return prisma.message.findUnique({
    where: {
      id: id,
    },
  });
};

const updateMessage = async (body, id) => {
  const message = await getMessageById(id);

  return prisma.message.update({
    where: {
      id: message.id,
    },
    data: {
      ...body,
    },
  });
};

const deleteMessage = async (id) => {
  return prisma.message.delete({
    where: {
      id: id,
    },
  });
};

module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};
