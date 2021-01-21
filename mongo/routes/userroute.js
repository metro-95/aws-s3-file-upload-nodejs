
module.exports = function(app) {
    var employee = require('../controllers/usercontroller');
    var validateToken = require('../middlewares/tokenvalidation')

    app.route('/employees')
       .get(validateToken, employee.index)
       .post(employee.create)

    app.route('/employees/:id')
       .get(employee.show)
       .put(employee.update)
       .delete(employee.destroy)
    
};