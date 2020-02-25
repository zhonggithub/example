/**
 * File: test.js
 * Project: example
 * FilePath: /tests/routes/test.js
 * Created Date: 2020-02-25 19:18:48
 * Author: Zz
 * -----
 * Last Modified: 2020-02-25 20:06:00
 * Modified By: Zz
 * -----
 * Description:
 */

const test = require('ava');
const queryString = require('query-string');
const request = require('../helper');

test.afterEach.always(() => {
});

test.serial('GET /app/api/reservations ok', async (t) => {
  const params = {
    beginTime: 1582592400,
    endTime: 1582595999,
  };

  const url = `/app/api/reservations?${queryString.stringify(params)}`
  const res = await request.get(url);
  if (res.status >= 400) console.log(res.text);
  t.is(res.status, 200);
});

test.serial('POST /app/api/reservationOrders ok', async (t) => {
  const body = {
    reservationID: 'xxx',
    userID: 'xxx',
  };

  const url = `/app/api/reservationOrders`
  const res = await request.post(url).send(body);
  if (res.status >= 400) console.log(res.text);
  t.is(res.status, 201);
  // TODO: test reservationID, userID
});