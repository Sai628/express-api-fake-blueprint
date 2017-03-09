/*
 * user controller
 */

var UserModel = require('../models/userModel');
var Constants = require('../../config/constants');

exports.get_verify = function(req, res)
{
    res.json({status: 1})
}

exports.register = function(req, res)
{
    var data = {
        status: 1,
        uid: Constants.uid,
        user_id: Constants.user_id,
        access_token: Constants.access_token,
        user_info: UserModel.getUser1()
    }
    res.json(data)
}

exports.login = function(req, res)
{
    var data = {
        status: 1,
        uid: Constants.uid,
        user_id: Constants.user_id,
        access_token: Constants.access_token
    }
    res.json(data)
}

exports.password_change = function(req, res)
{
    res.json({status: 1})
}

exports.password_get_verify = function(req, res)
{
    res.json({status: 1})
}

exports.password_reset = function(req, res)
{
    res.json({status: 1})
}

exports.checkin = function(req, res)
{
    res.json({status: 1})
}

exports.info = function(req, res)
{
    var data = {
        status: 1,
        user_info: UserModel.getUser1()
    }
    res.json(data)
}

exports.update = function(req, res)
{
    res.json({status: 1})
}

exports.update_logo = function(req, res)
{
    var data = {
        status: 1,
        img: Constants.logo1
    }
    res.json(data)
}
