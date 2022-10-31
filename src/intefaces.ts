import {TaskType} from './enums';


export interface ITaskItem {
  id: number
  text: string
  type: TaskType
}