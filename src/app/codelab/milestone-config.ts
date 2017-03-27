import {ExerciseConfig, SlideConfig} from "./exercise-config";

export interface MilestoneConfig {
  name: string,
  selectedExerciseIndex?: number;
  exercises: Array<ExerciseConfig|SlideConfig>
}
