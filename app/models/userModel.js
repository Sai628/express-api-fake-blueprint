/**
 * userModel
 */

var Constants = require('../../config/constants');

var createUser = function(uid, user_id, name, logo, cellphone, email, more)
{
    var user = {
        uid: uid,
        user_id: user_id,
        name: name, 
        logo: logo, 
        cellphone: cellphone,
        email: email,
        more: more
    };

    return user;
}

exports.getUser1 = function()
{
    return createUser(Constants.uid, Constants.user_id, Constants.user_name, Constants.logo1, 0, Constants.user_email, Constants.user_more);
}

exports.getUser2 = function()
{
    return createUser(2, 13800000002, "Abert", Constants.logo2, 0, "", "");
}

exports.getUser3 = function()
{
    return createUser(3, 13800000003, "Bill", Constants.logo3, 0, "", "");
}

exports.getUser4 = function()
{
    return createUser(4, 13800000004, "Denny", Constants.logo4, 0, "", "");
}

exports.getUser5 = function()
{
    return createUser(5, 13800000005, "Jack", Constants.logo5, 0, "", "");
}

exports.getUser6 = function()
{
    return createUser(6, 13800000006, "Kevin", Constants.logo6, 0, "", "");
}

exports.getUser7 = function()
{
    return createUser(7, 13800000007, "Roy", Constants.logo7, 0, "", "");
}

exports.getUsers = function()
{
    return [
        this.getUser1(),
        this.getUser2(),
        this.getUser3(),
        this.getUser4(),
        this.getUser5(),
        this.getUser6(),
        this.getUser7(),
    ];
}

exports.getUserByUid = function(uid)
{
    var users = this.getUsers();
    for (var item in users)
    {
        if (users[item].uid == uid)
        {
            return users[item];
        }
    }

    return null;
}
