import {ActionTypes} from "./action-types.enum";
export interface Action {
  type: ActionTypes,
  data: any,
  providers?: any
}
