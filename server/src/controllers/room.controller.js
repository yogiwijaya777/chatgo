const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createRoom = catchAsync(async (req, res) => {
  const room = await roomService.createRoom(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create Room Success',
    data: room,
  });
});

// const getrooms = catchAsync(async (req, res) => {
//   const result = await roomService.queryrooms();

//   res.status(httpStatus.OK).send({
//     status: httpStatus.OK,
//     message: 'Get rooms Success',
//     data: result,
//   });
// });

// const getRoom = catchAsync(async (req, res) => {
//   const room = await roomService.getRoomById(req.params.roomId);
//   if (!room) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'room not found');
//   }

//   res.status(httpStatus.OK).send({
//     status: httpStatus.OK,
//     message: 'Get Room Success',
//     data: room,
//   });
// });

// const updateRoom = catchAsync(async (req, res) => {
//   const room = await roomService.updateRoomById(req.params.roomId, req.body);

//   res.status(httpStatus.OK).send({
//     status: httpStatus.OK,
//     message: 'Update Room Success',
//     data: room,
//   });
// });

// const deleteRoom = catchAsync(async (req, res) => {
//   await roomService.deleteRoomById(req.params.roomId);

//   res.status(httpStatus.OK).send({
//     status: httpStatus.OK,
//     message: 'Delete Room Success',
//     data: null,
//   });
// });
