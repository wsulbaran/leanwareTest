import { CrudController } from '..';
import * as Project  from '../../model/Project/Project';

export class ProjectContorller extends CrudController {

  constructor () {
    super(Project, '_id');
  }

  async getProjects (filter, limit, skip) {    
    const count = await Project.countDocuments(filter);
    let newData = [];
    
    while (skip < limit) {
      const dataPaginate = await this.getAllList(filter, {},  skip, limit);

      newData = [ ...newData, ...dataPaginate ];

      skip += limit;
    }

    return {
      newData,
      limit,
      skip,
      count,
    };
  }

}