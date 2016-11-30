import {MilestoneConfig} from "./milestone-config";

export interface CodelabConfig {
  name: string,
  page: 'milestone'|'feedback',
  selectedMilestoneIndex: number,
  autorun:boolean,
  milestones: Array<MilestoneConfig>,
  user: string,
  auth:{}
}
