
export class CrudController {

  constructor(_model, _key) {
    this.model = _model;
    this.key = _key;
  }

  model: any;
  key: string;

  create(data) {
    return this.model
      .create(data)
      .then((modelInstance) => {
        return modelInstance;
      })
      .catch((error) => {
        throw error;
      });
  }

  insertMany(data) {
    return this.model
      .insertMany(data)
      .then((modelInstances) => {
        return modelInstances;
      })
      .catch((error) => {
        throw error;
      });
  }

  getAllList(filter: object, sort: object, skip: number, limit: number, select?: object) {
    return this.model.find(filter, select).sort(sort).skip(skip).limit(limit)
      .then((modelInstances) => {
        return modelInstances;
      })
      .catch((error) => {
        throw error;
      });
  }

  getById(id: string, select?: object) {
    const filter = {};

    filter[this.key] = id;

    return this.model
      .findOne(filter, select)
      .then((modelInstance) => {
        return modelInstance;
      })
      .catch((error) => {
        throw error;
      });
  }

  getOne(data, sort, select?: object) {
    if (typeof (data._id) === 'boolean') {  
      return Promise.resolve(false);
    }    

    return this.model
      .findOne(data, select)
      .sort(sort)
      .then((modelInstance) => {
        return modelInstance;
      })
      .catch((error) => {
        throw error;
      });
  }
  findOneAndUpdate(filter, data) {
    return this.model.findOneAndUpdate(filter, data, { 'new': true })
      .then((modelInstances) => {
        return modelInstances;
      })
      .catch((error) => {
        throw error;
      });
  }

  update(id, data) {
    const filter = {};

    filter[this.key] = id;

    return this.model
      .findOne(filter)
      .then((modelInstance) => {
        for (const att in data) {
          if (data.hasOwnProperty(att) && att !== this.key && att != '_id') {
            modelInstance[att] = data[att];
          }
        }

        return modelInstance.save();
      })
      .catch((error) => {
        throw error;
      });
  }

  updateMassives(ids, data) {
    return this.model.update({ '_id': ids }, { '$set': data }, { 'multi': true })
      .catch((error) => {
        throw error;
      });
  }

  delete(id) {
    const filter = {};

    filter[this.key] = id;

    return this.model
      .remove(filter)
      .then(() => {
        return {};
      })
      .catch((error) => {
        throw error;
      });
  }

}
