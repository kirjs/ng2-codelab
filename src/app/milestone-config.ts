import {ExerciseConfig} from "./exercise-config";
export interface MilestoneConfig {
  name: string,
  selectedExerciseIndex: number;
  exercises: Array<ExerciseConfig>

}
