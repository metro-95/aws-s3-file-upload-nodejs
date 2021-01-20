var mongoose = require('mongoose'),

User = mongoose.model('User');


/** Create Item */
exports.create = (req, res) => {
    const usr = new User(req.body);
    usr.save(function(err, result) {
        if (err)
          res.send(err);
        res.send(result);
    });
}

/** Get All Items */
exports.index = (req, res) => {
    User.find({}, function(err, task) {
      if (err)
        res.send(err);
      res.send(task);
    });
};

/** Get Single Item */
exports.show = (req, res) => {
    const id = req.params.id;
    User.findById(id, function(err, result){
      if(err) 
        res.send(err)
      res.send(result);
    });
};

/** Update Item */
exports.update = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    User.findByIdAndUpdate(id, data, (err, result) => {
        if(err)
            res.send(err);
        res.send(result);
    })
};


/** Delete Item */
exports.destroy = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, (err,result) => {
        if(err)
            res.send(err);
        res.send(result);
    })
};

