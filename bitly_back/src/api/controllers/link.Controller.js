const Link = require('../models/link.model');

exports.findAll = function(req, res) {
    Link.findAll(function(err, link) {
        console.log('controller')
        if (err)
        res.send(err);
        console.log('res', link);
        res.send(link);
    });
};

exports.create = function(req, res) {
    const newLink = new Link(req.body);
    console.log(newLink);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Link.create(newLink, function(err, link) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Link added successfully!",data:link});
        });
    }
};

exports.findById = function(req, res) {
    Link.findById(req.params.id, function(err, link) {
        if (err)
        res.send(err);
        res.json(link);
    });
};

exports.update = function(req, res) {
    console.log(req.body);
    Link.update(req.params.id, new Link(req.body), function(err, link) {
        if (err) {
            res.status(500);
            console.log(err);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            res.status(200);
            res.json({ message: 'Link successfully updated' });
        }
    });
};

exports.delete = function(req, res) {
    Link.delete( req.params.id, function(err, link) {
        if (err)
        res.send(err);
        res.json({ error:false, message: 'Link successfully deleted' });
    });
};