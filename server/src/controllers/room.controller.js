const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { roomService } = require('../services');

const createRoom = catchAsync(async (req, res) => {
  const room = await roomService.createRoom(req.body);

  res.status(httpStatus.CREATED).send({
    sucess: true,
    message: 'Create Room Success',
    data: room,
  });
});

const getRooms = catchAsync(async (req, res) => {
  const result = await roomService.getRooms();

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get rooms Success',
    data: result,
  });
});

const getRoom = catchAsync(async (req, res) => {
  const room = await roomService.getRoomById(req.params.roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'room not found');
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Room Success',
    data: room,
  });
});

const updateRoom = catchAsync(async (req, res) => {
  const room = await roomService.updateRoomById(req.params.roomId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Update Room Success',
    data: room,
  });
});

// const deleteRoom = catchAsync(async (req, res) => {
//   await roomService.deleteRoomById(req.params.roomId);

//   res.status(httpStatus.OK).send({
//     status: httpStatus.OK,
//     message: 'Delete Room Success',
//     data: null,
//   });
// });

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  // deleteRoom,
};
