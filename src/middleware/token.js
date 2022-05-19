const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
require("dotenv").config();

const authStrategy = new Strategy(
    {
        secretOrKey: process.env.TOKEN_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
        return done(null, payload);
    }
);

exports.authMiddleware = (req, res, next) => {
    passport.authenticate("jwt", { session: false } , (error, decryptToken, jwtError) => {
        if (error || jwtError) {
            return next( {
                status: 401,
                message: "ACCESS_TOKEN_EXPIRED"
            })
        } 
        req.user = decryptToken;
        next()
    })(req, res, next);
}

passport.use(authStrategy);