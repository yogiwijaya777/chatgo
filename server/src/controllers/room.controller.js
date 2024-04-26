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
  const options = {
    take: req.query.take || 10,
    page: req.query.page || 1,
    sort: req.query.sort === 'latest' ? { createdAt: 'desc' } : { createdAt: 'asc' },
  };

  options.skip = (options.page - 1) * options.take;

  const { sort } = req.query;

  // If sort a-z or z-a
  if (sort === 'a-z') options.sort = { name: 'asc' };
  if (sort === 'z-a') options.sort = { name: 'desc' };

  const result = await roomService.getRooms(options);

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

const deleteRoom = catchAsync(async (req, res) => {
  await roomService.deleteRoomById(req.params.roomId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Delete Room Success',
    data: null,
  });
});

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
