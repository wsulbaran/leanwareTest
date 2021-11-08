import * as moment from 'moment';
import { CrudController } from '..';
import { messsges } from '../../config/messages';
import { WorkLoadsDTO, WorkLoadsResponseDTO } from '../../dtos/WorkLoads/WorkLoadsDTO';
import { IWorkLoads } from '../../model/WorkLoads/IWorkLoads';
import * as WorkLoads from '../../model/WorkLoads/WorkLoads';

export class WorkLoadsController  extends CrudController {

  constructor () {
    super(WorkLoads, '_id');
  }

  async createReport(work:WorkLoadsDTO): Promise<IWorkLoads> {    
    const week = moment().isoWeek();
    const report: WorkLoadsResponseDTO = {} as WorkLoadsResponseDTO;

    report.user = work.user;
    report.project = work.project;
    report.percentage = work.percentage;
    report.week = week;

    return this.create(report)
      .catch((error) => {
        throw error;
      });
  }

  async updateReport (_id:string, work:WorkLoadsDTO) {    
    const findReport: IWorkLoads = await this.getOne({ _id }, {})
      .catch((error) => {
        throw error;
      });
    
    const monthDifference =  moment(new Date()).diff(new Date(findReport.createdAt), 'months', true);
    
    if (Number(monthDifference.toFixed()) > 0) throw messsges.notUpdate;

    return await this.update(_id, { percentage: work.percentage, updatedAt:new Date() })
      .catch((error) => {
        throw error;
      });
  }

  async getReports (filter, limit, skip) {    
    const count = await WorkLoads.countDocuments(filter);
    let data = [];

    while (skip < limit) {
      const dataPaginate = await this.getAllList(filter, {},  skip, limit);

      data = [ ...data, ...dataPaginate ];

      skip += limit;
    }

    return {
      data,
      limit,
      skip: limit * skip,
      count,
    };
  }

}