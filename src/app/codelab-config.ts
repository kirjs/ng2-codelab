import {MilestoneConfig} from "./milestone-config";

export interface CodelabConfig {
  name: string,
  page: 'milestone'|'feedback',
  selectedMilestoneIndex: number,
  milestones: Array<MilestoneConfig>,
  user: string
}
