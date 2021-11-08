import { IProject } from '../Project/IProject';
import { IUser } from '../User/IUser';

export interface IWorkLoads {
  user: IUser,
  project: IProject,
  percentage: number, 
  week: number,
  createdAt: Date,
  updatedAt: Date
}