module.exports = function(app) {
    var auth = require('../controllers/authcontroller');

    app.route('/auths/register')
        .post(auth.create)


    app.route('/auths/login')
       .post(auth.login)

    
};