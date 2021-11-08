import * as passport from 'passport';
import { UserController } from '../controllers';
import { Strategy as localStrategy } from 'passport-local';
import { IUser } from '../model/User/IUser';
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const userController = new UserController();

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser((id:string, done) => {
  userController.getById(id);
});

passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await userController.create({ email, password });

    return done(null, user);
  } catch (error) {
    done(error);
  }
}));

passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await userController.getOne({ email }, {});

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const validate = await user.isValidPassword(password);
      
    if (!validate) {
      return done(null, false, { message: 'Wrong password' });
    }
      
    return done(null, user, { message: 'Login successfull' });
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JWTStrategy({
  secretOrKey: 'secret',
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
  try {
    const expiredIn =  new Date(token.exp * 1000);
    const user = (token.user) ? token.user : false;

    if (!user) {
      return done(null, false, { message: 'Wrong token' });
    }

    const getUser: IUser[] = await userController.getAllList({ _id: user._id }, {}, 0, 0); 

    if (getUser.length == 0) {
      return done(null, false, { message: 'Wrong token' });
    }
    
    if (expiredIn < new Date()) {
      done(null, false, { message: 'token expired' });
    }

    done(null, token.user);
  } catch (error) {
    done(error);
  }
}));