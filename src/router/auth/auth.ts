import * as passport from 'passport';
import { Router, Request, Response } from 'express';
import { UserController } from '../../controllers';
import UserSchemaValidator from '../../controllers/User/Validator';
import { IUser } from '../../model/User/IUser';
import { validatorBody } from '../../services/Middleware/Middleware';
import { ResponseService } from '../../services/Response/Response';
import { UserDTO } from '../../dtos/User/UserDTO';
import { messsges } from '../../config/messages';

const jwt = require('jsonwebtoken');

export class AuthRouter {
 
  //constructor() {}

  route () {
    const router: Router = Router(); 
    const userController = new UserController();

    router.post('/signup', validatorBody(UserSchemaValidator), async (req: Request, res: Response) => {  
      await userController.create(req.body)
        .then((data:IUser) => {
          const response = new ResponseService(200, true, data, messsges.signup);

          res.status(200).json(response);
        })
        .catch((_error) => {
          const response = new ResponseService(200, true, _error, messsges.errorToRegisted);

          res.status(200).json(response);
        });
    });

    router.post('/login', async (req, res, next) => {
      passport.authenticate('login', async (err, user, info) => {
        try {            
          if (err || !user) {
            const error = (err) ? err : info.message;
                  
            return next(error);
          }

          req.login(user, { session: false }, async (errlogin) => {
            if (errlogin) return next(errlogin);

            const body: UserDTO = user;
            const token = jwt.sign({ user: body }, 'secret', { expiresIn:'60000' });

            return res.json({ token });
          });
        } catch (e) {
          return next(e);
        }
      })(req, res, next);
    });

    return router;
  }

}
