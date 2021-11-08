import { WorkLoadsController } from '../../controllers';

export class WorkLoadsServices {

  //constructor () {}

  workLoadController = new WorkLoadsController();
  async existsReportByWeekNumber (filter:object) {
    const report = await this.workLoadController.getAllList(filter, {}, 0, 0)
      .catch((error) => {
        throw error;
      });

    return report;
  }

}