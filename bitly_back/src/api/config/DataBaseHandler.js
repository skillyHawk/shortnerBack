const mysql = require("mysql");

function DataBaseHandler() {
    this.connection = null;
}

DataBaseHandler.prototype.createConnection = function () {

    this.connection = mysql.createConnection({
        host: process.env.DATABASE_HOST || "localhost",
        user: process.env.USER || "root",
        password: process.env.PASSWORD || "1234",
        database: process.env.DATABASE || "bitly",
	    port: process.env.PORT || "3306"
    });

    this.connection.connect(function (err) {
        if (err) {
            console.error("error connecting " + err);
            return null;
        }
        console.log("connected");
    });
    return this.connection;
};

module.exports = DataBaseHandler;
