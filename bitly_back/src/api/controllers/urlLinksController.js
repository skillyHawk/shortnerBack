const urlLink = require('../models/urlLinks');
const DataBaseHandler = require("../config/DataBaseHandler");
const dataBaseHandler = new DataBaseHandler();

const connection = dataBaseHandler.createConnection();
const validUrl = require("valid-url");
const shortid = require("shortid");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  //the API base URL
  const baseUrl = "http://localhost:8125"
  const longUrl= req.body.longUrl;

  if(!validUrl.isUri(baseUrl)){
      return res.status(401).json("Invalid baseUrl");
  }

  const urlCode = shortid.generate()

  if (validUrl.isUri(longUrl)) {
    try {
      connection.query(`SELECT longLink, shortLink FROM link WHERE longLink = ${longUrl}`, [longUrl], (err, result)=>{
        if (result) {
          return  res.status(200).json(result);
        }
        else {
          const shortUrl = baseUrl + "/" + urlCode;
          const newLinks = new urlLink({
            longLink: longUrl,
            shortLink: shortUrl,
            qrCode: urlCode,
            date : req.body.dateLink
          });
          urlLink.create(newLinks, (err, data) => {
            if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Customer."
            });
            else res.send(data);
          });
        }
      }
    );
  }
  // exception handler
  catch (err) {
      res.status(500).json('Server Error')
    }
  } else {
    res.status(401).json('Invalid longUrl')
  }
}

exports.findAll = (req, res) => {
  urlLink.findAll((err, links)=>{
    if(err)
    res.send(err);
    console.log('res', links)
    res.send(links)
  })
}

exports.update = (req, res)=> {
  urlLink.update(req.params.id, new urlLink(req.body), (err, data) =>{
    if (err) {
      res.status(500);
      res.json({
          message: "Erreur serveur."
      });
    } else {
      res.status(200);
      res.json({ message: 'Link successfully updated' });
    }
  });
};

exports.delete = (req, res)=> {
  urlLink.delete( req.params.id, (err, data)=> {
    if (err){
      res.send(err);
      res.json({ error:false, message: 'Link successfully deleted' });
    }else{
      res.send({ message: `link is deleted successfully!` })
    }
  });
};

exports.findById = function(req, res) {
  urlLink.findById(req.params.id, function(err, link) {
    if (err)
    res.send(err);
    res.json(link);
  });
};