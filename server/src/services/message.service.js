const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

const createMessage = async (body) => {
  // Check if room is exist
  const room = await prisma.room.findFirst({
    where: {
      messages: {
        some: {
          senderId: body.senderId, // ID pengguna yang ingin Anda cocokkan
        },
      },
    },
    include: {
      messages: {
        where: {
          senderId: body.senderId, // ID pengguna yang ingin Anda cocokkan
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

const getMessage = async (filter, option) => {
  return prisma.message.findMany();
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
  getMessage,
  getMessageById,
  updateMessage,
  deleteMessage,
};
