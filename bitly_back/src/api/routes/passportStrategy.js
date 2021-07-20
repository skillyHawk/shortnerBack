const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcrypt");
const jwtSecret = process.env.JWT_SECRET || "jwt_secret";

const DataBaseHandler = require("../config/DataBaseHandler");
const dataBaseHandler = new DataBaseHandler();
const connection = dataBaseHandler.createConnection();

passport.use(
    //Passport strategy for authenticating with a username and password
    new LocalStrategy(
    {
      usernameField: "pseudo",
      passwordField: "password"
    },
    (formPseudo, formPassword, done) => {
        connection.query(
        "SELECT pseudo, password FROM User WHERE pseudo=?",
        [formPseudo],
        (err, results) => {
            if (err) {
                return done(err);
            }
            // Put the data from connection attempt into a user variable
            let user;
            if (results && results[0]) {
                user = JSON.parse(JSON.stringify(results[0]));
            }
            // Check if there is data in the inforamtions transmitted by the user
            if (!user || !user.pseudo || !user.password) {
                return done(null, false, { message: "Incorrect password or pseudo!" });
            }
            // Compare the password from the form filled by the user in the front to the encrypted password in the database
            bcrypt.compare(formPassword, user.password, (errBcrypt, result) => {
                if (errBcrypt) return done(errBcrypt);
                if (!result) {
                    return done(null, false, {
                        message: "Incorrect password or pseudo!"
                    });
                }
                return done(null, user);
            });
        }
        );
    }
    )
);

passport.use(
    new JWTStrategy(
        {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret
        },
        (jwtPayload, done) => {
        const user = jwtPayload;
        // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return done(null, user);
        }
    )
);