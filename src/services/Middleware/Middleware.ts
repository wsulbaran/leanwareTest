import { NextFunction, Request, Response } from 'express';
import { ResponseService } from '../Response/Response';
import * as moment from 'moment';
import { WorkLoadsServices } from '../WorkLoads/WorkLoads';
import { messsges } from '../../config/messages';

export const validatorBody = function  (schema) {
  return function (req: Request, res: Response, next: NextFunction) { 
    const body = req.body;
    const responseValidate = schema.validate(body);
    const message = msg => new ResponseService(400, false, msg, messsges.paramRequired);

    if (responseValidate.error) return res.status(200).json(message(responseValidate.error.details));

    next();
  };
};

export const validateReportPerWeekNumber = () => {
  const workLoadsServices = new WorkLoadsServices();

  return async  function (req: Request, res: Response, next: NextFunction) { 
    const body = req.body;
    const week = moment().isoWeek();
    const filter = {
      user: req.user['_id'],
      week,
      project: body.project,
    };
    const response =  new ResponseService(400, false, {}, messsges.reportExistOnWeek);

    const findReport: [] = await workLoadsServices.existsReportByWeekNumber(filter)
      .catch((error) => {
        const response =  new ResponseService(400, false, error, messsges.errorFindReport);

        return res.status(200).json(response);
      });

    if (findReport.length > 0) return res.status(200).json(response);

    next();
  };
};