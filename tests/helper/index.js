/**
 * File: index.js
 * Project: example
 * FilePath: /tests/helper/index.js
 * Created Date: 2020-02-25 19:16:42
 * Author: Zz
 * -----
 * Last Modified: 2020-02-25 19:44:52
 * Modified By: Zz
 * -----
 * Description:
 */
const supertest = require('supertest');
const app =  require('../../app');

module.exports = supertest(app.listen());