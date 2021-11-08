import { Router, Request, Response } from 'express';
import { WorkLoadsController } from '../../controllers';
import workLoadchemaValidator from '../../controllers/WorkLoads/Validator';
import { WorkLoadsDTO } from '../../dtos/WorkLoads/WorkLoadsDTO';
import { validateReportPerWeekNumber, validatorBody } from '../../services/Middleware/Middleware';
import { ResponseService } from '../../services/Response/Response';

export class WorkLoadsRouter {
 
  //constructor() {}

  route () {
    const router: Router = Router(); 
    const workLoadController = new WorkLoadsController();
    
    router.post('/load', [ validatorBody(workLoadchemaValidator), validateReportPerWeekNumber() ], 
      async (req: Request, res: Response) => {
        const data:WorkLoadsDTO = {
          user: req.user['_id'],
          project: req.body.project,
          percentage: req.body.percentage,
        };
            
        await workLoadController.createReport(data)
          .then((data) => {
            const response = new ResponseService(200, true, data, 'Work loads completed.');

            res.status(200).json(response);
          })
          .catch((_error) => {
            const response = new ResponseService(200, true, _error, 'Error');

            res.status(200).json(response);
          });
      });

    router.put('/update-work-load/:work',
      async (req: Request, res: Response) => {
        const data:WorkLoadsDTO = {}  as WorkLoadsDTO;

        data.percentage = req.body?.percentage;            
        await workLoadController.updateReport(req.params.work, data)
          .then((data) => {
            const response = new ResponseService(200, true, data, 'update work completed.');

            res.status(200).json(response);
          })
          .catch((_error) => {
            const response = new ResponseService(200, true, _error, 'Error');

            res.status(200).json(response);
          });
      });

    router.get('/reports', async (req: Request, res: Response) => {
      const limit = (req.query.limit) ? Number(req.query.limit) : 10;
      const skip = (req.query.skip) ? Number(req.query.skip) : 0;

      await workLoadController.getReports({}, limit, skip)
        .then((data) => {
          const response = new ResponseService(200, true, data, 'List reports.');

          res.status(200).json(response);
        })
        .catch((_error) => {
          const response = new ResponseService(200, true, _error, 'Error');

          res.status(200).json(response);
        });
    });

    return router;
  }

}

