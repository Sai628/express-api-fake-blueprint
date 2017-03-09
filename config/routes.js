/*
 * Router Control.
 */

var Test = require('../app/controllers/test');
var User = require('../app/controllers/user');

module.exports = function(app)
{
    // test
    app.get('/test', Test.test);

    // User
    app.get('/user/register/get_verify', User.get_verify);
    app.post('/user/register', User.register);
    app.post('/user/login', User.login);
    app.get('/user/password/change', User.password_change);
    app.get('/user/password/get_verify', User.password_get_verify);
    app.post('/user/password/reset', User.password_reset);
    app.post('/user/checkin', User.checkin);
    app.get('/user/info', User.info);
    app.post('/user/update', User.update);
    app.post('/user/update_logo', User.update_logo);
};
