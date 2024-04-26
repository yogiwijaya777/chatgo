const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

const createMessage = async (body) => {
  // Check if room is exist
  const room = await prisma.room.findFirst({
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
    const newRoom = await prisma.room.create({
      data: {
        messages: {
          create: {
            senderId: body.senderId,
            receiverId: body.receiverId,
            content: body.content,
          },
        },
      },
    });

    return newRoom;
  }

  return prisma.message.create({
    data: {
      content: body.content,
      senderId: body.senderId,
      receiverId: body.receiverId,
      roomId: room.id,
    },
  });
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
    return null;
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
