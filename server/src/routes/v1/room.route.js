const express = require('express');
const validate = require('../../middlewares/validate');
const { roomValidation } = require('../../validations');
const { roomController } = require('../../controllers');
// const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(validate(roomValidation.createRoom), roomController.createRoom).get(roomController.getRooms);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Room
 *   description: Room
 */

/**
 * @swagger
 * /room:
 *   post:
 *     summary: Create room
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 20
 *             example:
 *               name: room1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room:
 *                   $ref: '#/components/schemas/Room'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 */
