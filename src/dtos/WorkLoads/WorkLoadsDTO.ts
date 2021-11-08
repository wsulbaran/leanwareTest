export interface WorkLoadsDTO {
  user:string,
  project: string,
  percentage: number
}

export interface WorkLoadsResponseDTO {
  _id:string, 
  user:string,
  project: string,
  percentage: number
  week: number,
  createdAt: Date,
  updatedAt: Date
}
