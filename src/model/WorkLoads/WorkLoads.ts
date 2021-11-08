import * as mongoose  from 'mongoose';
import { IWorkLoads } from './IWorkLoads';

interface IWorkLoadsModel extends IWorkLoads, mongoose.Document {}

const WorkLoadsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref:'Project' },
  percentage: { type: Number },
  week: { type: Number },
  createdAt: { type: Date, default:  Date.now },
  updatedAt: { type: Date },
});

const WorkLoads = mongoose.model<IWorkLoadsModel>('WorkLoads', WorkLoadsSchema);
export = WorkLoads;
