module.exports = function(app) {
    var employee = require('../controllers/usercontroller');

    app.route('/employees')
       .get(employee.index)
       .post(employee.create)

    app.route('/employees/:id')
       .get(employee.show)
       .put(employee.update)
       .delete(employee.destroy)
    
};