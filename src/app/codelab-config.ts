import {MilestoneConfig} from "./milestone-config";

export interface CodelabConfig {
  name: string,
  selectedMilestoneIndex: number,
  milestones: Array<MilestoneConfig>
}
