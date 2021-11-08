import { Router, Request, Response } from 'express';
import { messsges } from '../../config/messages';
import { ProjectContorller } from '../../controllers';
import { ProjectDTO } from '../../dtos/Project/ProjectDTO';
import { ResponseService } from '../../services/Response/Response';

export class ProjectRouter {
 
  //constructor() {}

  route () {
    const router: Router = Router(); 
    const projectController = new ProjectContorller();

    router.post('/create', async (req: Request, res: Response) => {            
      await projectController.create(req.body)
        .then((data:ProjectDTO) => {
          const response = new ResponseService(200, true, data, messsges.projectCreated);

          res.status(200).json(response);
        })
        .catch((_error) => {
          const response = new ResponseService(200, true, _error, messsges.projectError);

          res.status(200).json(response);
        });
    });

    router.get('/get-projects', async (req: Request, res: Response) => {
      const limit = (req.query.limit) ? Number(req.query.limit) : 10;
      const skip = (req.query.skip) ? Number(req.query.skip) : 0;
      
      await projectController.getProjects({}, limit, skip)
        .then((data) => {
          const response = new ResponseService(200, true, data, messsges.getProjects);

          res.status(200).json(response);
        })
        .catch((_error) => {
          const response = new ResponseService(200, true, _error, messsges.projectError);

          res.status(200).json(response);
        });
    });

    return router;
  }

}

