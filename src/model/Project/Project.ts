import * as mongoose  from 'mongoose';
import { IProject } from './IProject';

interface IProjectModel extends IProject, mongoose.Document {}

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default:  Date.now },
  updatedAt: { type: Date },
});

const Project = mongoose.model<IProjectModel>('Project', ProjectSchema);
export = Project;
