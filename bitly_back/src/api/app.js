const express = require("express");
const cors = require("cors");
const passport = require("passport");
// Setup server port
const hostname = '0.0.0.0';
const port = 8125;
// create express app
const app = express();

app.use(cors({
    credentials:true,
    origin:'http://localhost'
}));

const login = require('./routes/login');
const signUp = require('./routes/signUp');

const linkRoute = require('./routes/link.Route');
linkRoute(app);

/* const userRoute = require('./routes/userRoute');
userRoute(app); */

app.use(cors());
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/login', login);
app.use('/signUp', signUp);

// listen for requests
app.listen(port, hostname);