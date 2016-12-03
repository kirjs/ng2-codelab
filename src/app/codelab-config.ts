import {MilestoneConfig} from "./milestone-config";
export interface AppConfig {
  name: string,
  page: string,
  user: string,
  auth: string,
  feedbackEnabled: boolean
}

export interface CodelabConfig {
  app: AppConfig,
  name: string,
  page: 'milestone'|'feedback',
  selectedMilestoneIndex: number,
  milestones: Array<MilestoneConfig>,
  user: string,
  auth: {}
}
