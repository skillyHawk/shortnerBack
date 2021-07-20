const DataBaseHandler = require("../config/DataBaseHandler");
const dataBaseHandler = new DataBaseHandler();
const connection = dataBaseHandler.createConnection();

//Link object create
const Link = function(link){
  this.longLink = link.longLink;
  this.shortLink = link.shortLink;
  this.qrCode = link.qrCode;
  this.idUser = link.idUser;
  this.title = link.title;
  this.dateLink = new Date();
};

Link.create = function (newLink, result) {
    console.log(newLink)
    connection.query("INSERT INTO link set ?", newLink, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Link.findById = function (id, result) {
    connection.query("Select * from link where idLink = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Link.findAll = function (result) {
    connection.query("Select * from link", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('link : ', res);
            result(null, res);
        }
    });
};

Link.update = function(id, link, result){
    console.log(link);
    connection.query("UPDATE link SET longLink=?,shortLink=?,qrCode=?,title=? WHERE idLink = ?", [link.longLink,link.shortLink,link.qrCode,link.title, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};

Link.delete = function(id, result){
    connection.query("DELETE FROM link WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports= Link;