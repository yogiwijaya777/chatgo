const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

/**
 * Create a room
 * @param {Object} room
 * @returns {Promise<Room>}
 */
const createRoom = async (room) => {
  const roomDoc = await prisma.room.create({
    data: room,
  });

  return roomDoc;
};

/**
 * Get all rooms
 * @returns {Promise<Room[]>}
 */
const getRooms = async () => {
  const { name } = filter;
  const { take, skip, sort: orderBy } = options;

  const rooms = await prisma.room.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    include: { products: true },
    orderBy,
    take: Number(take),
    skip,
  });

  if (!rooms) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No rooms found');
  }

  return rooms;
};

/**
 * Get a room by id
 * @param {string} roomId
 * @returns {Promise<Room>}
 */
const getRoomById = async (roomId) => {
  const room = await prisma.room.findUnique({
    where: { id: roomId },
  });

  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }

  return room;
};

/**
 * Update a room by id
 * @param {string} roomId
 * @param {Object} room
 * @returns {Promise<Room>}
 */
const updateRoomById = async (roomId, room) => {
  // Check if room exists
  const roomDoc = await getRoomById(roomId);

  const updatedRoom = await prisma.room.update({
    where: { id: roomDoc.id },
    data: {
      ...room,
    },
  });
  return updatedRoom;
};

/**
 * Delete a room by id
 * @param {string} roomId
 * @returns {Promise<void>}
 */
const deleteRoomById = async (roomId) => {
  // Check if room exists
  const roomDoc = await getRoomById(roomId);

  await prisma.room.delete({
    where: { id: roomDoc.id },
  });
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
};
