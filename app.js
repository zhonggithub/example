/**
 * File: app.js
 * Project: example
 * FilePath: /app.js
 * Created Date: 2020-02-25 19:11:18
 * Author: Zz
 * -----
 * Last Modified: 2020-02-25 19:58:08
 * Modified By: Zz
 * -----
 * Description: 预约
 *
 * 预约项 reservation
 * {
 *  day: 0, // unix时间戳，例如2020-2-25为1582560000
 *  beginTime: 0, //unix时间戳，例如2020-2-25 09:00为1582592400
 *  endTime: 0, //unix时间戳，例如2020-2-25 09:59为1582595999
 *  qty: 6, // 可预约次数
 * }
 *
 * 预约单 reservationOrder
 * {
 *   day: 0,
 *   beginTime: 0,
 *   endTime: 0,
 *   userID: '',
 *   ......
 * }
 */
const Koa = require('koa');
const Router = require('koa-router');
const rawBody = require('raw-body');

const app = new Koa();

const router = new Router();

/**
 * @api {get} http://localhost:3000/app/api/reservations 获取可预约的时间段
 *
 * @apiName retreveEnableReservations
 * @apiGroup Reservations
 *
 * @apiDescription 根据beginTime和endTime获取时间可预约的时间段，不填则获取所有可
 * 预约时间段
 *
 * @apiParam {Number} [beginTime] 起始时间 unix 时间戳. 如:1522681177
 * @apiParam {Number} [endTime] 截止时间 unix 时间戳. 如:1522681177
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 0,
 *       message: 'SUCCESS',
 *       data: [{
 *           day: 1582560000,
 *           items: [{
 *            day: 1582560000,
 *            beginTime: 1582592400,
 *            endTime: 1582595999,
 *            qty: 6,
 *       }]
 *     }
 */
router.get('/app/api/reservations', async (ctx) => {
  const { beginTime, endTime } = ctx.query;
  // TODO:1，参数判断

  // 2, 通过beginTime, endTime 查找数据库，返回数据
  ctx.body = {
    code: 0,
    message: 'SUCCESS',
    data: [{
      day: 1582560000,
      items: [{
        day: 1582560000,
        beginTime: 1582592400,
        endTime: 1582595999,
        qty: 6,
      }, {
        day: 1582560000,
        beginTime: 1582614000,
        endTime: 1582617599,
        qty: 6,
      }],
    }, {
      day: 1582646400,
      items: [{
        day: 1582646400,
        beginTime: 1582678800,
        endTime: 1582682399,
        qty: 6,
      }],
    }],
  };

  ctx.status = 200;
});

/**
 * @api {post} http://localhost:3000/app/api/reservationOrders 预约
 *
 * @apiName CreateReservationOrders
 * @apiGroup ReservationOrders
 *
 * @apiDescription 创建预约单
 *
 * @apiParam {Number} reservationID 预约项id
 * @apiParam {Number} userID 预约人id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 0,
 *       message: 'SUCCESS',
 *       data: {
 *            day: 1582560000,
 *            beginTime: 1582592400,
 *            endTime: 1582595999,
 *            usrID: 'xx',
 *       }
 *     }
 * 
 * @apiError 没有可预约的时间段
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 410 Gone
 *     {
 *       "code": "NOT_ENABLE_RESERVATE",
 *       "message": "没有可预约的时间段",
 *     }
 */
router.post('/app/api/reservationOrders', async (ctx, next) => {
  try {
    const body = await rawBody(ctx.req);
    ctx.request.body = JSON.parse(body);
  } catch (err) {
    ctx.throw(err, 400);
  }
  await next();
}, async (ctx) => {
  // TODO: 1, 参数判断
  const { reservationID, userID } = ctx.request.body;
  // TODO: 2, 通过reservationID 判断是否该时间段可预约
  // TODO: 3, 判断该用户在该时间段内是否已预约
  // 4, 参数合法则创建数据
  ctx.body = {
    code: 0,
    message: 'SUCCESS',
    data: {
      day: 1582560000,
      beginTime: 1582592400,
      endTime: 1582595999,
      userID: 'xxx',
    },
  };
  ctx.status = 201;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;

if (!module.parent) {
  app.listen(3000);
}