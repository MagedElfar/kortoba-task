import passport from "passport";
import {Strategy , ExtractJwt} from "passport-jwt";
import {Request , Response , NextFunction} from "express";
import {config} from "dotenv";

config();

declare global {
    namespace Express {
    interface User {
        id: number
    }
}
}

const authStrategy = new Strategy(
    {
        secretOrKey: process.env.TOKEN_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
        return done(null, payload);
    }
);

const authMiddleware = (req:Request , res:Response , next:NextFunction) => {
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

export default authMiddleware;

